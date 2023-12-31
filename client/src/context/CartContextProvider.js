import { useState, useContext, createContext, useEffect } from "react";
import { appConfig } from "../config/appConfig";
import axios from "axios";
const cartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);

  const [isOrdersLoading, setIsOrdersLoading] = useState(false);

  const getOrders = async () => {
    setIsOrdersLoading(true);
    try {
      const { data } = await axios.get(
        `${appConfig.serverBaseUrl}/api/v1/auth/get-orders`
      );

      if (data) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].payment.payment_status !== "unpaid") {
            localStorage.removeItem("cartItems");
            setCartItems([]);
          }
        }
        setOrders(data);
        setIsOrdersLoading(false);
      }
    } catch (error) {
      setIsOrdersLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    let existingCartItems = localStorage.getItem("cartItems");

    if (existingCartItems) setCartItems(JSON.parse(existingCartItems));
  }, [cartItems?.length]);

  return (
    <cartContext.Provider
      value={{
        cartItems,
        setCartItems,
        orders,
        setOrders,
        getOrders,
        isOrdersLoading,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};
// custom hook
const useCartContext = () => useContext(cartContext);
export { useCartContext, CartContextProvider };
