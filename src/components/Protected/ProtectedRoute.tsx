import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../redux/selectors/auth.selectors";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const user = selectUser();
  console.log('user :>> ', user);
  const navigation = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigation("/login");
    }
  }, [user]);

  if(user === null) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
