import React from "react";

import useCategory from "../hooks/useCategory";
import Layout from "./../components/layout/Layout";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title={"All Categories"}>
      <h3 className="text-3xl text-appThemeDarkBlue text-center font-medium">
        All Categories
      </h3>

      <div className="mt-10 grid grid-cols-3 gap-4">
        {categories.map((c) => (
          <Link to={`/category/${c.slug}`} key={c._id}>
            <div className="bg-appThemeDarkBlue px-10 py-5 rounded-lg text-center font-medium text-2xl text-white hover:bg-appThemeBlue">
              {c.name}
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Categories;
