import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";

import { useAuthContext } from "../../context/AuthContextProvider";
import Loader from "../Loader";
import { appConfig } from "../../config/appConfig";

const PrivateRoute = () => {
  const [ok, setOk] = useState(false);

  const { auth } = useAuthContext();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(
        `${appConfig.serverBaseUrl}/api/v1/auth/user-auth`
      );
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Loader />;
};

export default PrivateRoute;
