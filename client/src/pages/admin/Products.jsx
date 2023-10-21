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

  //getAll products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${appConfig.serverBaseUrl}/api/v1/product/get-product`
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong while fetching the data");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title={"DashBoard - Products"}>
      <div className="flex gap-6">
        <AdminMenu />
        <div className="w-full space-y-2">
          <h3 className="inline-flex items-center gap-5 text-appThemeDarkBlue text-2xl font-medium">
            <NavLink to="/dashboard/admin">
              <BiArrowBack className="my-smooth-transition-1 bg-transparent p-1 cursor-pointer hover:bg-appThemeDarkBlue hover:text-white rounded-full" />{" "}
            </NavLink>
            Products
          </h3>
          <div className="bg-white w-full p-5 grid grid-cols-3 gap-5 border rounded-lg shadow-md">
            {products?.map((p) => (
              <Link to={`/dashboard/admin/product/${p?.slug}`} key={p?._id}>
                <Card className="h-full">
                  <CardHeader shadow={false} floated={false} className="h-44">
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
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
