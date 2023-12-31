import React, { useState } from "react";
import {
  Drawer,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";

import { NavLink } from "react-router-dom";
import { BsReverseLayoutSidebarInsetReverse } from "react-icons/bs";

const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <div className="pb-5">
      <button onClick={openDrawer}>
        <BsReverseLayoutSidebarInsetReverse className="h-8 w-8 fill-appThemeDarkBlue hover:fill-appThemeBlue" />
      </button>
      <Drawer
        open={open}
        onClose={closeDrawer}
        className="bg-appThemeDarkBlue text-white"
      >
        <div className="mb-2 flex items-center justify-between p-4">
          <Typography variant="h5" color="blue-gray">
            DashBoard
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5 hover:bg-red-500 rounded-full"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <List>
          <NavLink
            to="/dashboard/user/profile"
            className="hover:bg-appThemeYellow hover:text-appThemeDarkBlue active:bg-appThemeYellow active:text-appThemeDarkBlue focus:bg-appThemeYellow focus:text-appThemeDarkBlue rounded-lg"
          >
            <ListItem>
              <ListItemPrefix>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474l-1.17-3.513H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.04 16.5l.5-1.5h6.42l.5 1.5H8.29zm7.46-12a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6zm-3 2.25a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V9zm-3 2.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </ListItemPrefix>
              Profile
            </ListItem>
          </NavLink>

          <NavLink
            to="/dashboard/user/orders"
            className="hover:bg-appThemeYellow hover:text-appThemeDarkBlue active:bg-appThemeYellow active:text-appThemeDarkBlue focus:bg-appThemeYellow focus:text-appThemeDarkBlue rounded-lg"
          >
            <ListItem>
              <ListItemPrefix>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z"
                    clipRule="evenodd"
                  />
                </svg>
              </ListItemPrefix>
              Orders
            </ListItem>
          </NavLink>
        </List>
      </Drawer>
    </div>
  );
};

export default UserMenu;
