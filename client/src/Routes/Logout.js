import { useEffect } from "react";
import { useNavigate } from "react-router";

function Logout({ handleLogout }) {
  const navigate = useNavigate();
  useEffect(() => {
    handleLogout();
  });
  return null;
}

export default Logout;
