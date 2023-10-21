import React, { useState, useEffect } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import axios from "axios";
import { toast } from "react-toastify";

import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/UserMenu";
import { useAuthContext } from "../../context/AuthContextProvider";
import { appConfig } from "../../config/appConfig";
import { MdOutlineUpdate } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

const Profile = () => {
  //context
  const { auth, setAuth } = useAuthContext();

  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleFormOnUpdate = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.put(
        `${appConfig.serverBaseUrl}/api/v1/auth/update-profile`,
        { name, email, password, phone, address }
      );
      if (data?.success) {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data?.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));

        toast.success(data?.message);
      } else {
        toast.error(data?.error);
      }
    } catch (error) {
      toast.error("Something went Wrong");
      console.log(error);
    }
  };

  //get user data
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);

  return (
    <Layout title={"Your Profile"}>
      <div className="flex gap-6">
        <UserMenu />
        <div className="w-full">
          <h3 className="inline-flex items-center gap-5 mb-5 text-appThemeDarkBlue text-2xl font-medium">
            <NavLink to="/dashboard/user">
              <BiArrowBack className="my-smooth-transition-1 bg-transparent p-1 cursor-pointer hover:bg-appThemeDarkBlue hover:text-white rounded-full" />{" "}
            </NavLink>
            User Profile
          </h3>
          <div className="bg-white p-5 border rounded-xl shadow-md">
            <Card color="transparent" shadow={false}>
              <Typography variant="h6">Update Profiele Info</Typography>
              <form className="w-full mt-8 mb-2" onSubmit={handleFormOnUpdate}>
                <div className="mb-4 flex flex-col gap-6">
                  <Input
                    type="text"
                    size="md"
                    label="Name"
                    color="blue"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    autoComplete="true"
                  />
                  <Input
                    type="email"
                    size="md"
                    label="Email"
                    color="blue"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    autoComplete="true"
                    readOnly
                  />
                  <Input
                    type="password"
                    size="md"
                    label="Password"
                    color="blue"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    autoComplete="true"
                  />
                  <Input
                    type="number"
                    size="md"
                    label="Phone"
                    color="blue"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    fullWidth
                    autoComplete="true"
                  />
                  <Input
                    type="text"
                    size="lg"
                    label="Address"
                    color="blue"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    fullWidth
                    autoComplete="true"
                  />
                </div>

                <Button
                  className="bg-appThemeDarkBlue mt-6 inline-flex items-center justify-center gap-2 hover:bg-appThemeBlue"
                  fullWidth
                  type="submit"
                >
                  Update <MdOutlineUpdate size={20} />
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
