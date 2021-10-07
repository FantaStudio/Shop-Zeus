import React from "react";
import { useRequireAuth } from "./../../../hooks/useRequireAuth";

const Admin = () => {
  useRequireAuth(["Admin"]);

  return <div></div>;
};

export default Admin;
