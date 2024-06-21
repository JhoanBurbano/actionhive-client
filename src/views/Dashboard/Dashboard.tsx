import { useEffect } from "react";
import { DashboardInversor, DashboardUser } from "../../components";
import { setOverflow } from "../../redux/slices/ui.slice";
import { selectUserProjects } from "../../redux/selectors/project.selector";
import { thunkGetUserProjects } from "../../redux/thunks/project.thunk";
import { useAppDispatch } from "../../hooks/useDispatch.hook";

interface DashboardProps {
  type?: string;
}

const Dashboard: React.FC<DashboardProps> = ({ type = "user" }) => {
  const dispatch = useAppDispatch();
  const userProjects = selectUserProjects();

  useEffect(() => {
    if(userProjects === null){
      dispatch(thunkGetUserProjects())
    }
    dispatch(setOverflow(true));
  }, []);
  return <>{type === "user" ? <DashboardUser /> : <DashboardInversor />}</>;
};

export default Dashboard;
