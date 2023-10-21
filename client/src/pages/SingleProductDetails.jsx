import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { BsFillCartPlusFill } from "react-icons/bs";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { MdExpandMore } from "react-icons/md";

import Layout from "./../components/layout/Layout";
import axios from "axios";
import { appConfig } from "../config/appConfig";
import { BiArrowBack } from "react-icons/bi";

const SingleProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});

  const [similarProducts, setSimilarProducts] = useState([]);

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${appConfig.serverBaseUrl}/api/v1/product/get-product/${params?.slug}`
      );
      setProduct(data?.product);
      getSimilarProducts(data?.product?._id, data?.product?.category?._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get similar products
  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${appConfig.serverBaseUrl}/api/v1/product/related-product/${pid}/${cid}`
      );
      setSimilarProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getSingleProduct();
    // eslint-disable-next-line
  }, [params?.slug]);

  //   useEffect(() => {
  //     getSimilarProducts();
  //   }, []);

  return (
    <Layout>
      <NavLink to="/">
        <BiArrowBack className="my-smooth-transition-1 bg-transparent h-8 w-8 p-1 -mt-2 fill-appThemeDarkBlue cursor-pointer hover:bg-appThemeDarkBlue hover:fill-white rounded-full" />{" "}
      </NavLink>
      <div className="space-y-5">
        <div className="flex gap-4">
          <div className="w-1/2 px-8 border-r">
            <img
              src={`${appConfig.serverBaseUrl}/api/v1/product/product-photo/${product?._id}`}
              alt={product?.name + " - Product Image"}
              className="object-cover"
            />
          </div>
          <div className="w-1/2 px-3">
            <h3 className="pb-5 text-xl font-medium">Product Details</h3>
            <div>
              <h2 className="font-medium"> {product?.category?.name}</h2>
              <h2 className="text-appThemeDarkBlue text-2xl font-medium capitalize">
                {product?.name}
              </h2>
              <p className="text-3xl text-slate-800"> {product?.description}</p>
              <h2 className="text-red-600 text-3xl font-medium">
                {" "}
                $ {product?.price}
              </h2>
            </div>
            <Button
              ripple={false}
              fullWidth={true}
              className="bg-appThemeDarkBlue inline-flex items-center justify-center gap-2  shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 hover:bg-appThemeBlue"
            >
              Add to Cart <BsFillCartPlusFill size={20} />
            </Button>
          </div>
        </div>
        <hr />
        <div>
          <h3 className="pb-5 text-xl font-medium">Similar Products</h3>
          {similarProducts?.length < 1 && (
            <p className="text-center">No Similar Products Found</p>
          )}
          <div className="grid grid-cols-4 gap-5">
            {similarProducts?.map((p) => (
              <Card key={p?._id}>
                <CardHeader shadow={false} floated={false} className="h-44">
                  <img
                    src={`${appConfig.serverBaseUrl}/api/v1/product/product-photo/${p?._id}`}
                    alt={p?.name + " - Product Image"}
                    className="h-full w-full object-cover"
                  />
                </CardHeader>
                <CardBody className="pb-2">
                  <div className="w-full flex items-center justify-between">
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
                <CardFooter className="pt-0 space-y-2">
                  <Button
                    ripple={false}
                    fullWidth={true}
                    className="bg-appThemeDarkBlue inline-flex items-center justify-center gap-2  shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 hover:bg-appThemeBlue"
                  >
                    Add to Cart <BsFillCartPlusFill size={20} />
                  </Button>
                  <Button
                    ripple={false}
                    fullWidth={true}
                    className="bg-transparent inline-flex items-center justify-center gap-2 text-appThemeDarkBlue hover:text-white hover:bg-appThemeDarkBlue border border-appThemeDarkBlue"
                    onClick={() => navigate(`/product/${p?.slug}`)}
                  >
                    More Detils <MdExpandMore size={20} />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SingleProductDetails;
