import React from "react";
import Layout from "./../../components/layout/Layout";
import AdminMenu from "../../components/AdminMenu";
import { useAuthContext } from "../../context/AuthContextProvider";

const AdminDashboard = () => {
  const { auth } = useAuthContext();
  return (
    <Layout title={"Admin DashBoard -Ecommerce App"}>
      <div className="md:flex gap-6">
        <AdminMenu />

        <div className="bg-white w-full p-5 space-y-5 border rounded shadow-md">
          <h3 className="text-appThemeDarkBlue text-2xl font-medium">
            Admin Name : {auth?.user?.name}
          </h3>
          <h3 className="text-appThemeDarkBlue text-2xl font-medium">
            Admin Email : {auth?.user?.email}
          </h3>
          <h3 className="text-appThemeDarkBlue text-2xl font-medium">
            Admin Contact. : {auth?.user?.phone}
          </h3>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
