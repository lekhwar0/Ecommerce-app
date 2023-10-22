import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import axios from "axios";
import { NavLink, Link } from "react-router-dom";

import AdminMenu from "../../components/AdminMenu";
import Layout from "./../../components/layout/Layout";
import { appConfig } from "../../config/appConfig";
import { BiArrowBack } from "react-icons/bi";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isProductsLoading, setIsProductsLoading] = useState(false);

  //getAll products
  const getAllProducts = async () => {
    setIsProductsLoading(true);
    try {
      const { data } = await axios.get(
        `${appConfig.serverBaseUrl}/api/v1/product/get-product`
      );
      setProducts(data?.products);
      setIsProductsLoading(false);
    } catch (error) {
      console.log(error);
      setIsProductsLoading(false);
      toast.error("something went wrong while fetching the data");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title={"DashBoard - Products"}>
      <div className="md:flex gap-6">
        <AdminMenu />
        <div className="w-full space-y-2">
          <h3 className="inline-flex items-center gap-5 text-appThemeDarkBlue text-2xl font-medium">
            <NavLink to="/dashboard/admin">
              <BiArrowBack className="my-smooth-transition-1 bg-transparent p-1 cursor-pointer hover:bg-appThemeDarkBlue hover:text-white rounded-full" />{" "}
            </NavLink>
            Products
          </h3>
          <div className="bg-white w-full p-5 grid md:grid-cols-2 lg:grid-cols-3 gap-5 border rounded-lg shadow-md">
            {!isProductsLoading
              ? products?.map((p) => (
                  <Link to={`/dashboard/admin/product/${p?.slug}`} key={p?._id}>
                    <Card className="h-full">
                      <CardHeader
                        shadow={false}
                        floated={false}
                        className="h-44"
                      >
                        <img
                          src={`${appConfig.serverBaseUrl}/api/v1/product/product-photo/${p?._id}`}
                          alt={p?.name + " - Product Image"}
                          className="h-full w-full object-cover"
                        />
                      </CardHeader>
                      <CardBody>
                        <div className="mb-2 w-full flex items-center justify-between">
                          <Typography color="blue-gray" className="font-medium">
                            {p?.name}
                          </Typography>
                          <Typography color="blue-gray" className="font-medium">
                            $ {p?.price}
                          </Typography>
                        </div>
                        <p className="my-truncate-lines-2 text-sm font-thin opacity-75">
                          {p?.description}
                        </p>
                      </CardBody>
                    </Card>
                  </Link>
                ))
              : Array(3)
                  .fill()
                  .map((_, index) => (
                    <div className="bg-white p-4 shadow rounded-md" key={index}>
                      <div className="animate-pulse flex space-x-4">
                        <div className="flex-1 space-y-6 py-1">
                          <div className="space-y-8">
                            <div>
                              <div className="bg-slate-400 h-44 rounded-md"></div>
                            </div>
                            <div className="grid grid-cols-3 gap-8">
                              <div className="h-2 bg-slate-400 rounded col-span-2"></div>
                              <div className="h-2 bg-slate-400 rounded col-span-1"></div>
                            </div>
                            <div className="space-y-2">
                              <div className="h-2 bg-slate-400 rounded"></div>
                              <div className="h-2 bg-slate-400 rounded"></div>
                              <div className="h-2 bg-slate-400 rounded"></div>
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

export default Products;
