import React, { useState } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import Layout from "./../../components/layout/Layout";
import { appConfig } from "../../config/appConfig";
import { useAuthContext } from "../../context/AuthContextProvider";
import { BiSolidLogInCircle } from "react-icons/bi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { auth, setAuth } = useAuthContext();

  const navigate = useNavigate();
  const location = useLocation();

  const handleFormOnSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post(
        `${appConfig.serverBaseUrl}/api/v1/auth/login`,
        { email, password }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went Wrong");
      console.log(error);
    }
  };

  return (
    <Layout title="Login-Ecommerce App">
      <Card
        color="transparent"
        shadow={false}
        className="min-h-screen flex flex-col items-center justify-center"
      >
        <Typography variant="h4" color="blue">
          Login
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to login.
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
          </div>
          <Checkbox
            color="blue"
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                I agree the
                {/* <a
                  href="/signup"
                  className="font-medium transition-colors hover:text-gray-900"
                >
                  &nbsp;Terms and Conditions
                </a> */}
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button
            className="bg-appThemeDarkBlue mt-6 inline-flex items-center justify-center gap-2 hover:bg-appThemeBlue"
            fullWidth
            type="submit"
          >
            Login <BiSolidLogInCircle size={20} />
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Don't have an account?{" "}
            <NavLink to="/register">
              <button className="hover:text-appThemeBlue font-medium text-gray-900">
                Register
              </button>
            </NavLink>
          </Typography>

          <Typography
            color="gray"
            className="flex flex-col mt-4 text-center font-normal"
          >
            Or
            <NavLink to="/forgot-password">
              <button className="hover:text-appThemeBlue font-medium text-gray-900">
                Forgot Password ?
              </button>
            </NavLink>
          </Typography>
        </form>
      </Card>
    </Layout>
  );
};

export default Login;
