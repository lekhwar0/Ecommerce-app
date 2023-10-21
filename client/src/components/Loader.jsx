import React, { useState, useEffect } from "react";
import { Spinner } from "@material-tailwind/react";
import { useNavigate, useLocation } from "react-router-dom";

const Loader = ({ path = "login" }) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((preValue) => --preValue);
    }, 1000);
    count === 0 &&
      navigate(`${path}`, {
        state: location.pathname,
      });

    return () => clearInterval(interval);
  }, [count, navigate, location, path]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Spinner className="h-8 w-8 text-appThemeBlue" />
      <h3 className="mt-3 text-lg">Redirecting to you in {count} second </h3>
    </div>
  );
};

export default Loader;
