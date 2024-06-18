import { useEffect } from "react";
import { DashboardInversor, DashboardUser } from "../../components";
import { useDispatch } from "react-redux";
import { setOverflow } from "../../redux/slices/ui.slice";

interface DashboardProps {
  type?: string;
}

const Dashboard: React.FC<DashboardProps> = ({ type = "user" }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setOverflow(true));
  }, []);
  return <>{type === "user" ? <DashboardUser /> : <DashboardInversor />}</>;
};

export default Dashboard;
