import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
const Pagenotfound = () => {
  return (
    <Layout title={"404 - Page not Found"}>
      <div className="min-h-screen flex flex-col gap-4 items-center justify-center text-center text-appThemeDarkBlue">
        <h1 className="text-8xl font-bold">404</h1>
        <h2 className="text-4xl">Oops! Page Not Found</h2>
        <Link to="/" className="px-5 py-3 border border-black">
          Go Back
        </Link>
      </div>
    </Layout>
  );
};
export default Pagenotfound;
