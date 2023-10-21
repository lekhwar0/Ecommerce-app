import React from "react";
import Layout from "../../components/layout/Layout";
import { Link } from "react-router-dom";

const OrderCancel = () => {
  return (
    <Layout title={"Order Canceled"}>
      <div className="min-h-screen flex flex-col gap-4 items-center justify-center text-center text-appThemeDarkBlue">
        <h1 className="text-8xl font-bold">Order Canel</h1>
        <h2 className="text-4xl">Oops! order canceled</h2>
        <Link to="/cart" className="px-5 py-3 border border-black">
          Go Back to Cart
        </Link>
      </div>
    </Layout>
  );
};

export default OrderCancel;
