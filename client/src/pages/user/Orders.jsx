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
  const { orders, getOrders, isOrdersLoading } = useCartContext();

  useEffect(() => {
    if (auth?.token) getOrders();
    // eslint-disable-next-line
  }, [auth?.token]);

  return (
    <Layout title={"Your Orders"}>
      <div className="md:flex gap-6">
        <UserMenu />
        <div className="w-full">
          <h3 className="inline-flex items-center gap-5 mb-5 text-appThemeDarkBlue text-2xl font-medium">
            <NavLink to="/dashboard/user">
              <BiArrowBack className="my-smooth-transition-1 bg-transparent p-1 cursor-pointer hover:bg-appThemeDarkBlue hover:text-white rounded-full" />{" "}
            </NavLink>
            Orders
          </h3>

          <div className="space-y-6">
            {!isOrdersLoading
              ? orders?.map((o, index) => {
                  return (
                    <div className="bg-white shadow rounded-lg" key={index}>
                      <table className="w-full flex md:grid">
                        <thead>
                          <tr className="bg-gray-200 p-5 grid md:grid-cols-6 gap-8 md:gap-4 md:place-items-center rounded-lg">
                            <th>S.No.</th>
                            <th>Status</th>
                            <th>Buyer</th>
                            <th>Date</th>
                            <th>Pay</th>
                            <th>Qty</th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr className="p-5 grid md:grid-cols-6 gap-8 md:gap-4 md:place-items-center border-b">
                            <td>{index + 1}</td>
                            <td>{o?.status}</td>
                            <td>{o?.buyer?.name}</td>
                            <td> {moment(o?.createAt).fromNow()}</td>
                            <td
                              className={`${
                                o?.payment?.payment_status === "unpaid"
                                  ? "text-red-500"
                                  : "text-green-500"
                              }`}
                            >
                              {" "}
                              {o?.payment?.payment_status}
                            </td>
                            <td> {o?.products?.length}</td>
                          </tr>
                        </tbody>
                      </table>
                      {o?.products?.map((item) => (
                        <div
                          className="p-4 flex items-center justify-center gap-4 border-b"
                          key={item?._id}
                        >
                          <NavLink
                            to={`/product/${item?.slug}`}
                            className="w-1/4"
                          >
                            <img
                              src={`${appConfig.serverBaseUrl}/api/v1/product/product-photo/${item?._id}`}
                              alt={item?.name + " - Product Image"}
                              className="object-cover"
                            />
                          </NavLink>
                          <div className="w-3/4">
                            <h2 className="font-medium">
                              {" "}
                              {item?.category?.name}
                            </h2>
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
                })
              : Array(2)
                  .fill()
                  .map((_, index) => (
                    <div className="bg-white p-4 shadow rounded-md" key={index}>
                      <div className="animate-pulse flex space-x-4">
                        <div className="flex-1 py-1">
                          <div className="space-y-8">
                            <div className="grid grid-cols-6 gap-8">
                              <div className="h-2 bg-slate-400 rounded"></div>
                              <div className="h-2 bg-slate-400 rounded"></div>
                              <div className="h-2 bg-slate-400 rounded"></div>
                              <div className="h-2 bg-slate-400 rounded"></div>
                              <div className="h-2 bg-slate-400 rounded"></div>
                              <div className="h-2 bg-slate-400 rounded"></div>
                            </div>
                            <div className="grid grid-cols-6 gap-8">
                              <div className="h-8 bg-slate-400 rounded"></div>
                              <div className="h-8 bg-slate-400 rounded"></div>
                              <div className="h-8 bg-slate-400 rounded"></div>
                              <div className="h-8 bg-slate-400 rounded"></div>
                              <div className="h-8 bg-slate-400 rounded"></div>
                              <div className="h-8 bg-slate-400 rounded"></div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                              <div className="h-24 bg-slate-400 rounded col-span-1"></div>
                              <div className="space-y-2">
                                <div className="h-2 bg-slate-400 rounded col-span-2"></div>
                                <div className="h-2 bg-slate-400 rounded col-span-2"></div>
                                <div className="h-2 bg-slate-400 rounded col-span-2"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
