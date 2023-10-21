import React from "react";
import Layout from "../../components/layout/Layout";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <Layout title={"Order Success"}>
      <div className="min-h-screen flex flex-col gap-4 items-center justify-center text-center text-appThemeDarkBlue">
        <h1 className="text-8xl font-bold">Yurrah! </h1>
        <h2 className="text-4xl">Order Placed Successfully</h2>
        <Link
          to="/dashboard/user/orders"
          className="px-5 py-3 border border-black"
        >
          Check Orders
        </Link>
      </div>
    </Layout>
  );
};

export default OrderSuccess;
