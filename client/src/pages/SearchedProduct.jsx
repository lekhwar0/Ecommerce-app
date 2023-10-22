import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { BsFillCartPlusFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { MdExpandMore } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { useSearchContext } from "../context/SearchContextProvider";
import { useCartContext } from "../context/CartContextProvider";
import Layout from "../components/layout/Layout";
import { appConfig } from "../config/appConfig";
import { toast } from "react-toastify";

const SearchedProduct = () => {
  const { values, isSearchedProductLoading } = useSearchContext();
  const { cartItems, setCartItems } = useCartContext();

  const navigate = useNavigate();

  return (
    <Layout title="Search results">
      <div className="w-full">
        <div className="flex gap-2">
          <NavLink to="/">
            <BiArrowBack className="my-smooth-transition-1 bg-transparent h-8 w-8 p-1 fill-appThemeDarkBlue cursor-pointer hover:bg-appThemeDarkBlue hover:fill-white rounded-full" />{" "}
          </NavLink>
          <h3 className="text-3xl text-appThemeDarkBlue font-medium">
            Searched Results
          </h3>
        </div>
        <h5 className="text-center text-lg">
          {values?.results.length < 1
            ? "No Products Found !😔"
            : `Found ${values?.results.length} result`}
        </h5>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {!isSearchedProductLoading
            ? values?.results.map((p) => (
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
                      onClick={() => {
                        setCartItems([...cartItems, p]);
                        localStorage.setItem(
                          "cartItems",
                          JSON.stringify([...cartItems, p])
                        );
                        toast.success("Item Added to Cart");
                      }}
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
              ))
            : Array(4)
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
                          <div className="space-y-2">
                            <div className="bg-slate-400 h-8 rounded-md"></div>
                            <div className="bg-slate-400 h-8 rounded-md"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
        </div>
      </div>
    </Layout>
  );
};

export default SearchedProduct;
