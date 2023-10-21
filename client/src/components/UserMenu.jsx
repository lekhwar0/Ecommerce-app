import React from "react";
import { List, ListItem, Card } from "@material-tailwind/react";

import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div>
      <h4 className="mb-5 text-appThemeDarkBlue text-2xl font-medium">
        Dashboard
      </h4>

      <Card className="bg-appThemeDarkBlue w-full h-[95%] text-white">
        <List>
          <NavLink to="/dashboard/user/profile">
            <ListItem className="border-b rounded-none">Profile</ListItem>
          </NavLink>
          <NavLink to="/dashboard/user/orders">
            <ListItem className="border-b rounded-none">Orders</ListItem>
          </NavLink>
        </List>
      </Card>
    </div>
  );
};

export default UserMenu;
