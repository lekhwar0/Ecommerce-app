import React, { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

import Layout from "./../../components/layout/Layout";
import { appConfig } from "../../config/appConfig";
import { BiArrowBack, BiReset } from "react-icons/bi";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  const handleFormOnSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post(
        `${appConfig.serverBaseUrl}/api/v1/auth/forgot-password`,
        { email, newPassword, answer }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went Wrong");
      console.log(error);
    }
  };

  return (
    <Layout title="Forgot Password - Ecommerce">
      <div className="min-h-screen flex justify-center items-center gap-10">
        <div className="-ml-32 self-start">
          <NavLink to="/login">
            <Button className="bg-transparent inline-flex items-center justify-center gap-2 text-appThemeDarkBlue border border-appThemeDarkBlue hover:bg-appThemeDarkBlue hover:text-white shadow-none">
              <BiArrowBack size={20} /> Back
            </Button>
          </NavLink>
        </div>
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue">
            Reset Password
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Enter your details to reset Password.
          </Typography>
          <form
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            onSubmit={handleFormOnSubmit}
          >
            <div className="mb-4 flex flex-col gap-6">
              <Input
                type="email"
                size="md"
                label="Email"
                color="blue"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                size="md"
                label="New Password"
                color="blue"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <Input
                type="text"
                size="lg"
                label="What is your first class teacher name"
                color="blue"
                name="question"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                required
              />
            </div>

            <Button
              className="bg-appThemeDarkBlue mt-6 inline-flex items-center justify-center gap-2 hover:bg-appThemeBlue"
              fullWidth
              type="submit"
            >
              Reset Password <BiReset size={20} />
            </Button>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
