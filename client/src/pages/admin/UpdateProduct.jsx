import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Select } from "antd";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { BiArrowBack } from "react-icons/bi";

import { appConfig } from "../../config/appConfig";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/AdminMenu";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { MdOutlineUpdate, MdUpload } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();

  const { Option } = Select;
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [productId, setProductId] = useState("");

  const [openDeleteProductModal, setOpenDeleteProductModal] = useState(false);

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${appConfig.serverBaseUrl}/api/v1/product/get-product/${params?.slug}`
      );
      setProductId(data?.product?._id);
      setName(data?.product?.name);
      setDescription(data?.product?.description);
      setPrice(data?.product?.price);
      setQuantity(data?.product?.quantity);
      setShipping(data?.product?.shipping);
      setPhoto(data?.product?.photo);
      setCategory(data?.product?.category?._id);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in getting Product");
    }
  };

  //get all category
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

  //creating product
  const handleUpdateProductOnClick = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);

      const { data } = await axios.put(
        `${appConfig.serverBaseUrl}/api/v1/product/update-product/${productId}`,
        productData
      );
      if (data?.success) {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
        // setName("");
        // setCategory("");
        // setDescription("");
        // setPrice("");
        // setQuantity("");
        // setShipping("");
        // setPhoto("");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  //Deleting product
  const handleDeleteProductOnClick = async () => {
    try {
      const { data } = await axios.delete(
        `${appConfig.serverBaseUrl}/api/v1/product/delete-product/${productId}`
      );
      if (data?.success) {
        toast.success("Product Deleted Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllCategory();
    getSingleProduct();
    //eslint-disable-next-line
  }, []);

  return (
    <Layout title={"DashBoard - Create Product"}>
      <div className="flex gap-6">
        <AdminMenu />

        <div className="w-full space-y-2">
          <h3 className="inline-flex items-center gap-5 text-appThemeDarkBlue text-2xl font-medium">
            <NavLink to="/dashboard/admin/products">
              <BiArrowBack className="my-smooth-transition-1 bg-transparent p-1 cursor-pointer hover:bg-appThemeDarkBlue hover:text-white rounded-full" />{" "}
            </NavLink>
            Update Product
          </h3>

          <div className="bg-white w-full p-5 border rounded-lg shadow-md space-y-6">
            <Select
              placeholder="Select a category"
              size="large"
              showSearch
              className="form-select w-full"
              value={category}
              onChange={(value) => {
                setCategory(value);
              }}
              aria-required
            >
              {categories?.map((c) => (
                <Option key={c?._id} value={c?._id}>
                  {c?.name}
                </Option>
              ))}
            </Select>

            <label className="my-smooth-transition-1 bg-appThemeBlue px-5 py-3 inline-flex items-center gap-2 text-white rounded-md cursor-pointer hover:bg-appThemeDarkBlue">
              {photo ? photo?.name : "Upload Photo"}
              <MdUpload className="h-6 w-6 fill-white" />
              <input
                type="file"
                name="photo"
                accept="images/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                hidden
              />
            </label>

            {photo ? (
              <div className="flex justify-center object-cover">
                <img
                  src={URL.createObjectURL(photo)}
                  alt="product_photo"
                  height={"200px"}
                />
              </div>
            ) : (
              <div className="flex justify-center object-cover">
                <img
                  src={`${appConfig.serverBaseUrl}/api/v1/product/product-photo/${productId}`}
                  alt="product_photo"
                  height={"200px"}
                />
              </div>
            )}

            <input
              type="text"
              value={name}
              placeholder="Write a name"
              className="w-full p-2.5 outline-1 outline-appThemeBlue border border-gray-300 rounded-lg"
              onChange={(e) => setName(e.target.value)}
              required
            />

            <textarea
              type="text"
              value={description}
              placeholder="Write a description"
              className="w-full p-2.5 outline-1 outline-appThemeBlue border border-gray-300 rounded-lg"
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <input
              type="number"
              value={price}
              placeholder="Write a Price"
              className="w-full p-2.5 outline-1 outline-appThemeBlue border border-gray-300 rounded-lg"
              onChange={(e) => setPrice(e.target.value)}
              required
            />

            <input
              type="text"
              value={quantity}
              placeholder="Write a Quantity"
              className="w-full p-2.5 outline-1 outline-appThemeBlue border border-gray-300 rounded-lg"
              onChange={(e) => setQuantity(e.target.value)}
              required
            />

            <Select
              placeholder="Select Shipping"
              size="large"
              className="form-select w-full"
              onChange={(value) => {
                setShipping(value);
              }}
              value={shipping ? "Yes" : "No"}
            >
              <Option value="0">No</Option>
              <Option value="1">Yes</Option>
            </Select>
            <div className="flex gap-5">
              <Button
                onClick={handleUpdateProductOnClick}
                className="bg-appThemeDarkBlue inline-flex items-center gap-2 hover:bg-appThemeBlue"
              >
                Update Product <MdOutlineUpdate size={20} />
              </Button>
              <Button
                onClick={() => {
                  setOpenDeleteProductModal(() => !openDeleteProductModal);
                }}
                className="bg-transparent inline-flex items-center gap-2 text-red-500 border border-red-500 hover:text-white hover:bg-red-500"
              >
                Delete Product <RiDeleteBin6Fill size={20} />
              </Button>
            </div>
          </div>

          <>
            <Dialog size="xs" open={openDeleteProductModal}>
              <DialogBody divider>
                Are you sure you want to delete the Prouct
              </DialogBody>
              <DialogFooter>
                <Button
                  variant="text"
                  color="red"
                  onClick={() => {
                    setOpenDeleteProductModal(() => !openDeleteProductModal);
                  }}
                  className="mr-1"
                >
                  <span>Cancel</span>
                </Button>
                <Button
                  variant="gradient"
                  color="green"
                  onClick={handleDeleteProductOnClick}
                >
                  <span>Confirm</span>
                </Button>
              </DialogFooter>
            </Dialog>
          </>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
