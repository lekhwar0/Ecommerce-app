import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Select } from "antd";
import { Button } from "@material-tailwind/react";
import { NavLink, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { MdUpload } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";

import { appConfig } from "../../config/appConfig";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/AdminMenu";

const CreateProduct = () => {
  const navigate = useNavigate();
  const { Option } = Select;
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  //creating product
  const handleCreateProductOnClick = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      const { data } = await axios.post(
        `${appConfig.serverBaseUrl}/api/v1/product/create-product`,
        productData
      );
      if (data?.success) {
        toast.success("Product Created Successfully");
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

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <Layout title={"DashBoard - Create Product"}>
      <div className="md:flex gap-6">
        <AdminMenu />

        <div className=" w-full space-y-2">
          <h3 className="inline-flex items-center gap-5 text-appThemeDarkBlue text-2xl font-medium">
            <NavLink to="/dashboard/admin">
              <BiArrowBack className="my-smooth-transition-1 bg-transparent p-1 cursor-pointer hover:bg-appThemeDarkBlue hover:text-white rounded-full" />{" "}
            </NavLink>
            Create Product
          </h3>

          <div className="bg-white w-full p-5 border rounded-lg shadow-md space-y-6">
            <Select
              placeholder="Select a category"
              size="large"
              showSearch
              className="form-select w-full"
              onChange={(value) => {
                setCategory(value);
              }}
              value={category?.name}
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

            {photo && (
              <div className="flex justify-center object-cover">
                <img
                  src={URL.createObjectURL(photo)}
                  alt="product_photo"
                  height={"200px"}
                  className=""
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
              value={shipping}
              onChange={(value) => {
                setShipping(value);
              }}
            >
              <Option value="0">No</Option>
              <Option value="1">Yes</Option>
            </Select>
            <Button
              onClick={handleCreateProductOnClick}
              className="bg-appThemeDarkBlue w-full inline-flex items-center justify-center gap-2 hover:bg-appThemeBlue"
            >
              Create Product <IoMdAddCircle size={20} />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
