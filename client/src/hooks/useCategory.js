import { useState, useEffect } from "react";
import axios from "axios";
import { appConfig } from "../config/appConfig";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  //get all categories
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `${appConfig.serverBaseUrl}/api/v1/category/all-categories`
      );
      setCategories(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return categories;
}
