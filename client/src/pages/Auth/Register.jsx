import React, { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoPersonAddSharp } from "react-icons/io5";

import Layout from "./../../components/layout/Layout";
import { appConfig } from "../../config/appConfig";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  const handleFormOnSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post(
        `${appConfig.serverBaseUrl}/api/v1/auth/register`,
        { name, email, password, phone, address, answer }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        console.log(res);
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
    <Layout title="Register-Ecommerce App">
      <Card
        color="transparent"
        shadow={false}
        className="min-h-screen flex flex-col items-center justify-center"
      >
        <Typography variant="h4" color="blue">
          Register Account
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to register.
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleFormOnSubmit}
        >
          <div className="mb-4 flex flex-col gap-6">
            <Input
              type="text"
              size="md"
              label="Name"
              color="blue"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
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
              required
              autoComplete="true"
            />
            <Input
              type="password"
              size="md"
              label="Password"
              color="blue"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
              required
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
              required
              autoComplete="true"
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
              autoComplete="true"
            />
          </div>

          <Button
            className="bg-appThemeDarkBlue mt-6 inline-flex items-center justify-center gap-2 hover:bg-appThemeBlue"
            fullWidth
            type="submit"
          >
            Register <IoPersonAddSharp size={16} />
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <button
              className="hover:text-appThemeBlue font-medium text-gray-900"
              onClick={() => navigate("/login")}
            >
              Log In
            </button>
          </Typography>
        </form>
      </Card>
    </Layout>
  );
};

export default Register;
