import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import {
  Card,
  Typography,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { RxCross2 } from "react-icons/rx";
import { BiArrowBack, BiSolidEditAlt } from "react-icons/bi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { NavLink } from "react-router-dom";

import { appConfig } from "../../config/appConfig";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/AdminMenu";
import CategoryForm from "../../components/form/CategoryForm";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);

  const [openDeleteCategoryModal, setOpenDeleteCategoryModal] = useState(false);
  const [isAllCategoriesLoading, setIsAllCategoriesLoading] = useState(false);

  //handle create new category form
  const handleFormOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${appConfig.serverBaseUrl}/api/v1/category/create-category`,
        { name }
      );
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
        setName("");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in input form");
    }
  };

  //update category
  const handleUpadateCategoryOnSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.put(
      `${appConfig.serverBaseUrl}/api/v1/category/update-category/${selectedCategory?._id}`,
      { name: updatedName }
    );
    if (data?.success) {
      toast.success(`${updatedName} is Updated Successfully`);
      setSelectedCategory(null);
      setUpdatedName("");
      setOpenEditCategoryModal(false);
      getAllCategory();
    } else {
      toast.error(data?.message);
    }

    try {
    } catch (error) {
      console.log(error);
      toast.error("something went wrong while updating category name");
    }
  };

  //delete category
  const handleDeleteCategoryOnClick = async () => {
    try {
      const { data } = await axios.delete(
        `${appConfig.serverBaseUrl}/api/v1/category/delete-category/${selectedCategory?._id}`
      );
      if (data?.success) {
        toast.success(`Category is Deleted Successfully`);
        setSelectedCategory(null);
        setOpenDeleteCategoryModal(false);
        getAllCategory();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong while deleting category");
    }
  };

  //get all cat
  const getAllCategory = async () => {
    setIsAllCategoriesLoading(true);
    try {
      const { data } = await axios.get(
        `${appConfig.serverBaseUrl}/api/v1/category/all-categories`
      );
      if (data?.success) {
        setCategories(data?.category);
        setIsAllCategoriesLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsAllCategoriesLoading(false);
      toast.error("something went wrong in getting category");
    }
  };

  const categoriesTableHead = ["Name", "Actions"];

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <Layout title={"DashBoard - Create Category"}>
      <div className="md:flex gap-6">
        <AdminMenu />

        <div className="w-full">
          <h3 className="inline-flex items-center gap-5 mb-5 text-appThemeDarkBlue text-2xl font-medium">
            <NavLink to="/dashboard/admin">
              <BiArrowBack className="my-smooth-transition-1 bg-transparent p-1 cursor-pointer hover:bg-appThemeDarkBlue hover:text-white rounded-full" />{" "}
            </NavLink>
            Manage Category
          </h3>
          <div className="pb-5">
            <CategoryForm
              handleFormOnSubmit={handleFormOnSubmit}
              value={name}
              setValue={setName}
            />
          </div>
          <Card className={`w-full overflow-auto`}>
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {categoriesTableHead?.map((head, index) => (
                    <th
                      key={index}
                      className="bg-gray-200 border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {!isAllCategoriesLoading
                  ? categories?.map((category, index) => {
                      const isLastRow = index === categories?.length - 1;
                      const classes = isLastRow
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";

                      return (
                        <tr key={category?._id}>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal capitalize"
                            >
                              {category?.name}
                            </Typography>
                          </td>

                          <td className={`${classes} space-x-2`}>
                            <Button
                              className="my-smooth-transition-1 bg-appThemeBlue px-5 py-2 inline-flex items-center gap-2 text-white font-medium rounded-md hover:bg-appThemeDarkBlue"
                              onClick={() => {
                                setOpenEditCategoryModal(
                                  () => !openEditCategoryModal
                                );
                                setUpdatedName(category?.name);
                                setSelectedCategory(category);
                              }}
                            >
                              Edit <BiSolidEditAlt />
                            </Button>
                            <Button
                              className="my-smooth-transition-1 bg-red-500 px-5 py-2 inline-flex items-center gap-2 text-white font-medium rounded-md hover:bg-appThemeDarkBlue"
                              onClick={() => {
                                setOpenDeleteCategoryModal(
                                  () => !openDeleteCategoryModal
                                );
                                setSelectedCategory(category);
                              }}
                            >
                              Delete <RiDeleteBin6Fill />
                            </Button>
                          </td>
                        </tr>
                      );
                    })
                  : Array(4)
                      .fill()
                      .map((_, index) => (
                        <div className="p-4" key={index}>
                          <div className="animate-pulse flex space-x-4">
                            <div className="flex-1 py-1">
                              <div className="grid grid-cols-2 gap-32">
                                <div className="h-2 bg-slate-400 rounded"></div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="h-8 bg-slate-400 rounded"></div>
                                  <div className="h-8 bg-slate-400 rounded"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
              </tbody>
            </table>
          </Card>
        </div>
      </div>
      <>
        <Dialog
          size="xs"
          open={openEditCategoryModal}
          className="py-5 flex items-start justify-center gap-4 shadow-none"
        >
          <CategoryForm
            value={updatedName}
            setValue={setUpdatedName}
            handleFormOnSubmit={handleUpadateCategoryOnSubmit}
          />
          <button
            className="px-1 py-1 border-2 border-gray-700 rounded-full group hover:border-red-500"
            onClick={() => {
              setOpenEditCategoryModal(() => !openEditCategoryModal);
            }}
          >
            <RxCross2 className="group-hover:text-red-500" />
          </button>
        </Dialog>
      </>

      <>
        <Dialog size="xs" open={openDeleteCategoryModal}>
          <DialogBody divider>
            Are you sure you want to delete the Category
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={() => {
                setOpenDeleteCategoryModal(() => !openDeleteCategoryModal);
              }}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button
              variant="gradient"
              color="green"
              onClick={handleDeleteCategoryOnClick}
            >
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </>
    </Layout>
  );
};

export default CreateCategory;
