import React, { useEffect } from "react";
import moment from "moment/moment";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/UserMenu";
import { useAuthContext } from "../../context/AuthContextProvider";
import { useCartContext } from "../../context/CartContextProvider";
import { NavLink } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { appConfig } from "../../config/appConfig";

const Orders = () => {
  const { auth } = useAuthContext();
  const { orders, getOrders } = useCartContext();

  useEffect(() => {
    if (auth?.token) getOrders();
    // eslint-disable-next-line
  }, [auth?.token]);

  return (
    <Layout title={"Your Orders"}>
      <div className="flex gap-6">
        <UserMenu />
        <div className="w-full">
          <h3 className="inline-flex items-center gap-5 mb-5 text-appThemeDarkBlue text-2xl font-medium">
            <NavLink to="/dashboard/user">
              <BiArrowBack className="my-smooth-transition-1 bg-transparent p-1 cursor-pointer hover:bg-appThemeDarkBlue hover:text-white rounded-full" />{" "}
            </NavLink>
            Orders
          </h3>

          <div>
            {orders?.map((o, index) => {
              return (
                <div className="bg-white shadow rounded-lg">
                  <table className="w-full">
                    <thead className="bg-gray-200 p-5 grid grid-cols-6 gap-4 place-items-center rounded-lg">
                      <td>S.No.</td>
                      <td>Status</td>
                      <td>Buyer</td>
                      <td>Date</td>
                      <td>Payment</td>
                      <td>Quantity</td>
                      <td></td>
                    </thead>

                    <tbody
                      className="p-5 grid grid-cols-6 gap-4 place-items-center border-b"
                      key={index}
                    >
                      <tr>{index + 1}</tr>
                      <tr>{o?.status}</tr>
                      <tr>{o?.buyer?.name}</tr>
                      <tr> {moment(o?.createAt).fromNow()}</tr>
                      <tr
                        className={`${
                          o?.payment?.payment_status === "unpaid"
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      >
                        {" "}
                        {o?.payment?.payment_status}
                      </tr>
                      <tr> {o?.products?.length}</tr>
                    </tbody>
                  </table>
                  {o?.products?.map((item) => (
                    <div
                      className="p-4 flex items-center justify-center gap-4 border-b"
                      key={item?._id}
                    >
                      <NavLink to={`/product/${item?.slug}`} className="w-1/4">
                        <img
                          src={`${appConfig.serverBaseUrl}/api/v1/product/product-photo/${item?._id}`}
                          alt={item?.name + " - Product Image"}
                          className="object-cover"
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
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
