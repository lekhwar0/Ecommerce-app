import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Carousel,
  Drawer,
  IconButton,
  Input,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { BsFillCartPlusFill } from "react-icons/bs";
import { AiOutlineReload, AiOutlineSearch } from "react-icons/ai";
import { Checkbox, Radio } from "antd";
import { BiReset } from "react-icons/bi";
import { MdExpandMore } from "react-icons/md";
import { IoFilterSharp } from "react-icons/io5";

import Layout from "../components/layout/Layout";
import { appConfig } from "../config/appConfig";
import { Prices } from "../components/Prices";
import { useCartContext } from "../context/CartContextProvider";
import carousel_1 from "../images/props/carousel_1.jpg";
import carousel_2 from "../images/props/carousel_2.jpg";
import carousel_3 from "../images/props/carousel_3.jpg";
import carousel_4 from "../images/props/carousel_4.jpg";
import carousel_5 from "../images/props/carousel_5.jpg";
import carousel_6 from "../images/props/carousel_6.jpg";
import { useSearchContext } from "../context/SearchContextProvider";

const HomePage = () => {
  const navigate = useNavigate();
  const { cartItems, setCartItems } = useCartContext();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checkedCategory, setCheckedCategory] = useState([]);
  const [radioPrice, setRadioPrice] = useState([]);

  const [totalProduct, setTotalProduct] = useState(0);
  const [page, setPage] = useState(1);

  const { values, setValues, setIsSearhedProductLoading } = useSearchContext();

  const [loading, setLoading] = useState(false);
  const [isProductsLoading, setIsProductsLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const handleFilterOnCheck = async (value, id) => {
    setIsProductsLoading(true);

    try {
      let allCheckedCategory = [...checkedCategory];
      if (value) {
        allCheckedCategory.push(id);
      } else {
        allCheckedCategory = allCheckedCategory.filter((c) => c !== id);
      }
      setCheckedCategory(allCheckedCategory);
      setIsProductsLoading(false);
    } catch (error) {
      console.log(error);
      setIsProductsLoading(false);
    }
  };

  //getTOtal COunt of products
  const getTotalProducts = async () => {
    try {
      const { data } = await axios.get(
        `${appConfig.serverBaseUrl}/api/v1/product/product-count`
      );

      setTotalProduct(data?.totalProduct);
    } catch (error) {
      console.log(error);
    }
  };

  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${appConfig.serverBaseUrl}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //getAll products
  const getAllProducts = async () => {
    setIsProductsLoading(true);
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${appConfig.serverBaseUrl}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data?.products);
      setIsProductsLoading(false);
    } catch (error) {
      setLoading(false);
      setIsProductsLoading(false);
      console.log(error);
      toast.error("something went wrong while fetching the data");
    }
  };

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${appConfig.serverBaseUrl}/api/v1/category/all-categories`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in getting category");
    }
  };

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${appConfig.serverBaseUrl}/api/v1/product/product-filters`,
        {
          checkedCategory,
          radioPrice,
        }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  //search product
  const handleSearchProductOnSubmitForm = async (e) => {
    e.preventDefault();
    setIsSearhedProductLoading(true);
    try {
      const { data } = await axios.get(
        `${appConfig.serverBaseUrl}/api/v1/product/search-product/${values?.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
      setIsSearhedProductLoading(false);
    } catch (error) {
      setIsSearhedProductLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotalProducts();
  }, []);

  useEffect(() => {
    if (!checkedCategory.length || !radioPrice.length) getAllProducts();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (checkedCategory.length || radioPrice.length) filterProduct();
    //eslint-disable-next-line
  }, [checkedCategory, radioPrice]);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
    // eslint-disable-next-line
  }, [page]);

  return (
    <Layout title={"All Produts - Best offers"}>
      <div className="md:flex gap-6">
        <div className="md:w-1/6 pr-5 text-left border-r border-r-gray-200 space-y-6 hidden md:block">
          <div>
            <h5 className="text-lg font-medium">Filter by Category</h5>
            {categories?.map((c, index) => (
              <Checkbox
                key={index}
                onChange={(e) => {
                  handleFilterOnCheck(e.target.checked, c?._id);
                }}
                className="flex"
              >
                {c?.name}
              </Checkbox>
            ))}
          </div>
          {/* { price filter */}
          <div>
            <h5 className="text-lg font-medium">Filter by Price</h5>
            <Radio.Group onChange={(e) => setRadioPrice(e.target.value)}>
              {Prices?.map((price, index) => (
                <div key={index}>
                  <Radio value={price?.array}>{price?.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>

          <div>
            <Button
              className="bg-transparent flex items-center justify-center gap-1 text-red-500 text-center border border-red-500 hover:text-white hover:bg-red-500"
              onClick={() => window.location.reload()}
            >
              Reset filter
              <BiReset size={20} />
            </Button>
          </div>
        </div>
        <div className="flex md:hidden">
          <div className="mb-5 flex justify-center items-center gap-2">
            <Button
              onClick={openDrawer}
              className="w-fit bg-appThemeDarkBlue hover:bg-appThemeBlue hover:text-appThemeYellow"
            >
              <IoFilterSharp size={20} />
            </Button>
            <form
              className="flex items-center justify-center"
              role="search"
              onSubmit={handleSearchProductOnSubmitForm}
            >
              <Input
                type="text"
                size="lg"
                label="Search Product"
                color="blue"
                name="values"
                className="bg-gray-400 text-appThemeDarkBlue rounded-r-none"
                value={values?.keyword}
                onChange={(e) =>
                  setValues({ ...values, keyword: e.target.value })
                }
                autoComplete="true"
                labelProps={{ className: "text-white" }}
              />

              <Button
                className="w-fit bg-appThemeDarkBlue inline-flex items-center justify-center gap-2 hover:text-appThemeDarkBlue hover:bg-appThemeYellow rounded-l-none border border-l-0 border-white"
                type="submit"
              >
                <AiOutlineSearch size={20} />
              </Button>
            </form>
          </div>
          <Drawer
            open={open}
            onClose={closeDrawer}
            className="p-4 hover:text-red-500"
          >
            <div className="mb-6 flex items-center justify-between">
              <Typography
                variant="h5"
                className="text-lg text-black font-medium"
              >
                Filters
              </Typography>
              <IconButton
                variant="text"
                color="blue-gray"
                onClick={closeDrawer}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </IconButton>
            </div>

            <div>
              <h5 className="text-lg text-appThemeDarkBlue font-medium">
                Filter by Category
              </h5>
              {categories?.map((c, index) => (
                <Checkbox
                  key={index}
                  onChange={(e) => {
                    handleFilterOnCheck(e.target.checked, c?._id);
                  }}
                  className="flex"
                >
                  {c?.name}
                </Checkbox>
              ))}
            </div>
            {/* { price filter */}
            <div>
              <h5 className="mt-5 text-lg text-appThemeDarkBlue font-medium">
                Filter by Price
              </h5>
              <Radio.Group onChange={(e) => setRadioPrice(e.target.value)}>
                {Prices?.map((price, index) => (
                  <div key={index}>
                    <Radio value={price?.array}>{price?.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>

            <div>
              <Button
                className="bg-transparent mt-5 flex items-center justify-center gap-1 text-red-500 text-center border border-red-500 hover:text-white hover:bg-red-500"
                onClick={() => window.location.reload()}
              >
                Reset filter
                <BiReset size={20} />
              </Button>
            </div>
          </Drawer>
        </div>
        <div className="w-full">
          <div className="w-full">
            <Carousel
              transition={{ duration: 2 }}
              className="rounded-xl"
              autoplay={true}
            >
              <img src={carousel_3} alt="carouel-1" className="object-cover" />
              <img src={carousel_4} alt="carouel-2" className="object-cover" />
              <img src={carousel_5} alt="carouel-3" className="object-cover" />
              <img src={carousel_6} alt="carouel-3" className="object-cover" />
              <img src={carousel_1} alt="carouel-4" className="object-cover" />
              <img src={carousel_2} alt="carouel-5" className="object-cover" />
            </Carousel>
          </div>
          {!isProductsLoading ? (
            <div>
              <div className="mt-5 md:-mt-36 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                {products?.map((p, index) => (
                  <Card key={index}>
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
                ))}
              </div>
              <div className="py-5">
                {products && products?.length < totalProduct && (
                  <Button
                    className="bg-appThemeDarkBlue inline-flex items-center justify-center gap-2  hover:bg-appThemeBlue "
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(page + 1);
                    }}
                  >
                    {loading ? (
                      "Loading ..."
                    ) : (
                      <>
                        {" "}
                        Loadmore <AiOutlineReload size={20} />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {Array(4)
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
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
