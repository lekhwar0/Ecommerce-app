import { useState, useContext, createContext } from "react";
import { appConfig } from "../config/appConfig";
import axios from "axios";
const categoryContext = createContext();

const CategoryContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);

  const getCategories = async () => {
    setIsCategoriesLoading(true);
    try {
      const { data } = await axios.get(
        `${appConfig.serverBaseUrl}/api/v1/category/all-categories`
      );
      setCategories(data?.category);
      setIsCategoriesLoading(false);
    } catch (error) {
      setIsCategoriesLoading(false);
      console.log(error);
    }
  };

  return (
    <categoryContext.Provider
      value={{ categories, setCategories, isCategoriesLoading, getCategories }}
    >
      {children}
    </categoryContext.Provider>
  );
};
// custom hook
const useCategoryContext = () => useContext(categoryContext);
export { useCategoryContext, CategoryContextProvider };
