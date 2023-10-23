import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  Collapse,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Typography,
} from "@material-tailwind/react";
import { FaShopify, FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";

import { useAuthContext } from "../../context/AuthContextProvider";
import { useCartContext } from "../../context/CartContextProvider";
import { BiSolidLogInCircle } from "react-icons/bi";
import SearchInput from "../form/SearchInput";
import { Badge } from "antd";
import { BsCartFill } from "react-icons/bs";
import { useCategoryContext } from "../../context/CategoryContextProvider";

const Header = () => {
  const [openNav, setOpenNav] = useState(false);
  const { auth, setAuth } = useAuthContext();
  const { categories, getCategories } = useCategoryContext();

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line
  }, []);

  const { cartItems } = useCartContext();

  const handleLogoutOnClick = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  const navList = (
    <ul className="my-4 flex flex-col gap-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 text-white text-center font-medium">
      <SearchInput />

      <NavLink
        to="/"
        className="my-hover-effect-1 active:text-appThemeYellow focus:text-appThemeYellow focus:font-bold"
      >
        Home
      </NavLink>

      <Menu>
        <MenuHandler>
          <NavLink
            to="/categories"
            className="my-hover-effect-1 active:text-appThemeYellow focus:text-appThemeYellow focus:font-bold"
          >
            Category
          </NavLink>
        </MenuHandler>
        <MenuList className="pb-4 pt-2">
          {categories?.map((c) => (
            <NavLink to={`/category/${c?.slug}`} key={c?._id}>
              <MenuItem className="text-black hover:text-appThemeYellow border-b hover:border-appThemeYellow">
                {c?.name}
              </MenuItem>
            </NavLink>
          ))}
        </MenuList>
      </Menu>

      <NavLink
        to="/cart"
        className="my-hover-effect-1 mr-4 active:text-appThemeYellow focus:text-appThemeYellow focus:font-bold"
      >
        <Badge count={cartItems?.length} showZero offset={[10, -5]}>
          <BsCartFill className="h-8 w-8 fill-white" />
        </Badge>
      </NavLink>

      {!auth.user ? (
        <>
          <NavLink to="/login">
            <Typography className="my-smooth-transition-1 bg-appThemeYellow px-5 py-3 inline-flex items-center gap-2 text-appThemeDarkBlue hover:bg-appThemeDarkBlue hover:text-white font-medium rounded-md">
              Login <BiSolidLogInCircle size={20} />
            </Typography>
          </NavLink>
        </>
      ) : (
        <>
          <Menu>
            <MenuHandler>
              <Typography className="my-smooth-transition-1 bg-appThemeYellow px-4 py-3 flex items-center justify-center gap-2 text-appThemeDarkBlue font-bold cursor-pointer hover:bg-appThemeDarkBlue hover:text-white rounded-md capitalize">
                {auth?.user?.name}

                <FaUserCircle size={20} />
              </Typography>
            </MenuHandler>
            <MenuList>
              <NavLink
                to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
              >
                <MenuItem className="my-hover-effect-1 flex items-center gap-2 outline-none border-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Dashboard
                </MenuItem>
              </NavLink>

              <hr className="my-2 border-blue-gray-50" />
              <MenuItem className="mt-2 flex items-center gap-2 outline-none">
                <NavLink
                  to="/login"
                  onClick={handleLogoutOnClick}
                  className="my-hover-effect-1 bg-appThemeYellow px-5 py-2 inline-flex gap-2 items-center justify-center focus:after:scale-x-100 focus:after:origin-bottom-left focus:text-appThemeDarkBlue rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
                    />
                  </svg>{" "}
                  Logout
                </NavLink>
              </MenuItem>
            </MenuList>
          </Menu>
        </>
      )}
    </ul>
  );

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <nav className="bg-appThemeBlue sticky z-10 h-max rounded-none rounded-b-lg overflow-hidden">
      <div className="px-5 pt-2 flex justify-between items-center">
        <NavLink
          to="/"
          className="pb-3 inline-flex items-center gap-2 text-appThemeYellow text-2xl font-bold"
        >
          <FaShopify /> Ecommerce App
        </NavLink>

        <div className="flex items-center gap-4">
          <div className="mr-4 hidden lg:block">{navList}</div>

          <IconButton
            variant="text"
            children=""
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="white"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="white"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      <Collapse open={openNav} className="px-5">
        {navList}

        <IconButton
          variant="text"
          children=""
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
        ></IconButton>
      </Collapse>
    </nav>
  );
};

export default Header;
