import React, { useEffect } from "react";

import Layout from "./../components/layout/Layout";
import { Link } from "react-router-dom";
import { useCategoryContext } from "../context/CategoryContextProvider";

const Categories = () => {
  const { categories, isCategoriesLoading, getCategories } =
    useCategoryContext();

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line
  }, []);

  return (
    <Layout title={"All Categories"}>
      <h3 className="text-3xl text-appThemeDarkBlue text-center font-medium">
        All Categories
      </h3>

      <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {!isCategoriesLoading
          ? categories?.map((c) => (
              <Link to={`/category/${c.slug}`} key={c._id}>
                <div className="bg-appThemeDarkBlue px-10 py-5 rounded-lg text-center font-medium text-2xl text-white hover:bg-appThemeBlue">
                  {c.name}
                </div>
              </Link>
            ))
          : Array(5)
              .fill()
              .map((_, index) => (
                <div
                  className="animate-pulse p-4 flex space-x-4 shadow rounded-md"
                  key={index}
                >
                  <div className="flex-1 py-1">
                    <div className="bg-slate-400 h-8 rounded-md"></div>
                  </div>
                </div>
              ))}
      </div>
    </Layout>
  );
};

export default Categories;
