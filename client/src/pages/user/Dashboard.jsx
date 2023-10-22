import React from "react";
import Layout from "./../../components/layout/Layout";
import UserMenu from "../../components/UserMenu";
import { useAuthContext } from "../../context/AuthContextProvider";

const Dashboard = () => {
  const { auth } = useAuthContext();

  return (
    <Layout title="Dashboard - Ecommerce App">
      <div className="md:flex gap-6">
        <UserMenu />

        <div className="bg-white w-full p-5 space-y-5 border rounded-lg shadow-md">
          <h3 className="text-appThemeDarkBlue text-2xl font-medium">
            User Name : {auth?.user?.name}
          </h3>
          <h3 className="text-appThemeDarkBlue text-2xl font-medium">
            User Email : {auth.user?.email}
          </h3>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
