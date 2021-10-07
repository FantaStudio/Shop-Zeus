import React from "react";
import { useRequireAuth } from "./../../../../hooks/useRequireAuth";

const Profile = ({ routes }) => {
  useRequireAuth(["Client"]);

  return <div></div>;
};

export default Profile;
