import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

import Layout from "../components/layout/Layout";
import { appConfig } from "../config/appConfig";
import { BsFillCartPlusFill } from "react-icons/bs";
import { MdExpandMore } from "react-icons/md";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  const getPrductsByCategory = async () => {
    try {
      const { data } = await axios.get(
        `${appConfig.serverBaseUrl}/api/v1/product/product-category/${params?.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getPrductsByCategory();
    // eslint-disable-next-line
  }, [params?.slug]);

  return (
    <Layout>
      <div>
        <h3 className="text-3xl text-center text-appThemeDarkBlue text-center font-medium capitalize">
          {category?.name}
        </h3>
        <h6 className="-mt-4 pb-4 text-xl text-center text-center font-medium">
          {products?.length} result found
        </h6>
        <div className="grid grid-cols-4 gap-5">
          {products?.map((p) => (
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
    </Layout>
  );
};

export default CategoryProduct;
