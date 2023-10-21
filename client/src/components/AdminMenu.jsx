import React from "react";
import { List, ListItem, Card } from "@material-tailwind/react";

import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div>
      <h4 className="mb-5 text-appThemeDarkBlue text-2xl font-medium">
        Admin Panel
      </h4>

      <Card className="bg-appThemeDarkBlue w-full h-[95%] text-white">
        <List>
          <NavLink to="/dashboard/admin/create-category">
            <ListItem className="border-b rounded-none">
              Create Category
            </ListItem>
          </NavLink>
          <NavLink to="/dashboard/admin/create-product">
            <ListItem className="border-b rounded-none">
              Create Product
            </ListItem>
          </NavLink>
          <NavLink to="/dashboard/admin/products">
            <ListItem className="border-b rounded-none">Products</ListItem>
          </NavLink>

          <NavLink to="/dashboard/admin/orders">
            <ListItem className="border-b rounded-none">All Orders</ListItem>
          </NavLink>
        </List>
      </Card>
    </div>
  );
};

export default AdminMenu;
