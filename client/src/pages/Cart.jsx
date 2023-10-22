import React, { useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { loadStripe } from "@stripe/stripe-js";
import { MdRemoveCircle } from "react-icons/md";
import { toast } from "react-toastify";

import Layout from "./../components/layout/Layout";
import { useCartContext } from "../context/CartContextProvider";
import { useAuthContext } from "../context/AuthContextProvider";
import { NavLink, useNavigate } from "react-router-dom";
import { appConfig } from "../config/appConfig";

const Cart = () => {
  const { auth } = useAuthContext();
  const { cartItems, setCartItems, getOrders } = useCartContext();

  const navigate = useNavigate();

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cartItems?.map((item) => {
        return (total = total + item?.price);
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //remove item from cart
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cartItems];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCartItems(myCart);
      localStorage.setItem("cartItems", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //handle payments
  const handlePaymentOnClick = async () => {
    try {
      const stripe = await loadStripe(appConfig.stripePublishableKey);

      const headers = {
        "Content-Type": "application/json",
        Authorization: auth?.token,
      };
      const response = await fetch(
        `${appConfig.serverBaseUrl}/api/v1/product/create-checkout-session`,
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify({ cartItems }),
        }
      );

      if (response.status === 500) {
        console.error(`HTTP error! Status: ${response.status}`);
      } else {
        const session = await response.json();

        toast.loading("Redirecting...");

        stripe.redirectToCheckout({
          sessionId: session.id,
        });

        // localStorage.removeItem("cartItems");
        // setCartItems([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
    // eslint-disable-next-line
  }, [auth?.token]);

  return (
    <Layout>
      <div>
        <div>
          <h3 className="text-3xl text-center bg-light p-2 mb-1">
            {!auth?.user
              ? "Hello Guest"
              : `Hello  ${auth?.token && auth?.user?.name}`}
          </h3>
          <p className="text-lg text-center">
            {cartItems?.length
              ? `You Have ${cartItems.length} items in your cart ${
                  auth?.token ? "" : "please login to checkout !"
                }`
              : ""}
          </p>
        </div>
        {cartItems.length > 0 ? (
          <div className="md:flex gap-5 space-y-5 md:space-y-0">
            <div className="md:w-2/3 space-y-4">
              {cartItems?.map((item) => (
                <div
                  className="bg-white p-2 flex items-center justify-center gap-4 shadow rounded-lg"
                  key={item?._id}
                >
                  <NavLink to={`/product/${item?.slug}`} className="w-1/4">
                    <img
                      src={`${appConfig.serverBaseUrl}/api/v1/product/product-photo/${item?._id}`}
                      alt={item?.name + " - Product Image"}
                      className=" object-cover"
                    />
                  </NavLink>
                  <div className="w-3/4">
                    <h2 className="font-medium"> {item?.category?.name}</h2>
                    <h2 className="text-appThemeDarkBlue text-xl font-medium capitalize">
                      {item?.name}
                    </h2>
                    <p className="my-truncate-lines-2 text-slate-800">
                      {" "}
                      {item?.description}
                    </p>
                    <h2 className="text-red-600 text-xl font-medium">
                      {" "}
                      $ {item?.price}
                    </h2>
                    <Button
                      ripple={false}
                      className="bg-transparent inline-flex items-center justify-center gap-2 text-red-500 hover:text-white hover:bg-red-500 border border-red-500"
                      onClick={() => removeCartItem(item?._id)}
                    >
                      Remove Item <MdRemoveCircle size={20} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white md:w-1/3 p-5 shadow rounded-lg text-center">
              <h3 className="text-2xl">Cart Summary</h3>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4 className="mt-2 text-lg">Total : {totalPrice()} </h4>
              {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <h4>Current Address</h4>
                    <h5>{auth?.user?.address}</h5>
                    <Button
                      className="bg-appThemeDarkBlue"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </Button>
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <Button
                      className="bg-appThemeDarkBlue"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </Button>
                  ) : (
                    <div className="mt-4 flex gap-2 items-center justify-center">
                      <Button
                        className="bg-appThemeYellow text-appThemeDarkBlue hover:bg-appThemeDarkBlue hover:text-white"
                        onClick={() =>
                          navigate("/login", {
                            state: "/cart",
                          })
                        }
                      >
                        Login Now
                      </Button>
                      <Button
                        className="bg-appThemeYellow text-appThemeDarkBlue hover:bg-appThemeDarkBlue hover:text-white"
                        onClick={() =>
                          navigate("/register", {
                            state: "/cart",
                          })
                        }
                      >
                        Register Now
                      </Button>
                    </div>
                  )}
                </div>
              )}
              <div>
                {!auth?.token || !cartItems?.length ? (
                  ""
                ) : (
                  <Button
                    onClick={handlePaymentOnClick}
                    className="bg-appThemeBlue"
                  >
                    Proceed to Buy
                  </Button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full bg-white p-5 rounded-lg">
            <h3 className="text-3xl text-center text-appThemeBlue mb-1">
              Your Cart Is Empty
            </h3>
            <div className="mt-4 flex gap-2 items-center justify-center">
              <Button
                className="bg-appThemeYellow text-appThemeDarkBlue hover:bg-appThemeDarkBlue hover:text-white"
                onClick={() =>
                  navigate("/login", {
                    state: "/cart",
                  })
                }
              >
                Login Now
              </Button>
              <Button
                className="bg-appThemeYellow text-appThemeDarkBlue hover:bg-appThemeDarkBlue hover:text-white"
                onClick={() =>
                  navigate("/register", {
                    state: "/cart",
                  })
                }
              >
                Register Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
