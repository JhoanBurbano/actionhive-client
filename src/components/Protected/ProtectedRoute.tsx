import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/slices/auth.slice";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const user = useSelector(selectUser);
  const navigation = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigation("/login");
    }
  }, [user]);

  return <>{children}</>;
};

export default ProtectedRoute;
