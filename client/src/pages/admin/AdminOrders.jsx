import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import moment from "moment";

import { appConfig } from "../../config/appConfig";
import AdminMenu from "./../../components/AdminMenu";
import Layout from "./../../components/layout/Layout";
import { useCartContext } from "../../context/CartContextProvider";
import { useAuthContext } from "../../context/AuthContextProvider";
import axios from "axios";
import { Select } from "antd";
import { toast } from "react-toastify";
const { Option } = Select;

const AdminOrders = () => {
  const { auth } = useAuthContext();
  const { getOrders } = useCartContext();
  // eslint-disable-next-line
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);
  const [isAllOrdersLoading, setIsAllOrdersLoading] = useState(false);

  const [allOrders, setAllOrders] = useState([]);

  //all orders for admin
  const getAllOrders = async () => {
    setIsAllOrdersLoading(true);
    try {
      const { data } = await axios.get(
        `${appConfig.serverBaseUrl}/api/v1/auth/all-orders`
      );

      setAllOrders(data);
      setIsAllOrdersLoading(false);
    } catch (error) {
      setIsAllOrdersLoading(false);
      console.log(error);
    }
  };

  const handleUpdateStatusOnChange = async (value, orderId) => {
    try {
      const { data } = await axios.put(
        `${appConfig.serverBaseUrl}/api/v1/auth/order-status/${orderId}`,
        { status: value }
      );
      if (data?.success) {
        toast.success(data?.message);
        getAllOrders();
        getOrders();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while updating order status");
    }
  };

  useEffect(() => {
    if (auth?.token) getAllOrders();
    // eslint-disable-next-line
  }, [auth?.token]);

  return (
    <Layout title="All Orders Data">
      <div className="md:flex gap-6">
        <AdminMenu />
        <div className="w-full">
          <h3 className="inline-flex items-center gap-5 mb-5 text-appThemeDarkBlue text-2xl font-medium">
            <NavLink to="/dashboard/admin">
              <BiArrowBack className="my-smooth-transition-1 bg-transparent p-1 cursor-pointer hover:bg-appThemeDarkBlue hover:text-white rounded-full" />{" "}
            </NavLink>
            All Orders
          </h3>
          <div className="space-y-6">
            {!isAllOrdersLoading
              ? allOrders?.map((o, index) => {
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
                            <th>Qty.</th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr className="p-5 grid md:grid-cols-6 gap-8 md:gap-4 md:place-items-center border-b">
                            <td>{index + 1}</td>
                            <td>
                              <Select
                                bordered={false}
                                onChange={(value) =>
                                  handleUpdateStatusOnChange(value, o?._id)
                                }
                                defaultValue={o?.status}
                              >
                                {status?.map((state, index) => (
                                  <Option key={index} value={state}>
                                    {state}
                                  </Option>
                                ))}
                              </Select>
                            </td>
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
        <div></div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
