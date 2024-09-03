import { useEffect } from "react";
import { DashboardInversor, DashboardUser } from "../../components";
import { setOverflow } from "../../redux/slices/ui.slice";
import { selectUserProjects } from "../../redux/selectors/project.selector";
import { thunkGetProjectsRecomended, thunkGetUserProjects } from "../../redux/thunks/project.thunk";
import { useAppDispatch } from "../../hooks/useDispatch.hook";
import { selectUser } from "../../redux/selectors/auth.selectors";
import { thunkGetDashboardData } from "../../redux/thunks/dashboard.thunk";

interface DashboardProps {
  type?: string;
}

const Dashboard: React.FC<DashboardProps> = () => {
  const dispatch = useAppDispatch();
  const userProjects = selectUserProjects();
  const {isInvestor} = selectUser()!;

  useEffect(() => {
    if(userProjects === null){
      dispatch(thunkGetUserProjects())
    }
      dispatch(thunkGetProjectsRecomended(isInvestor ? "investor" : "user"));
    dispatch(setOverflow(true));
    dispatch(thunkGetDashboardData(isInvestor));
  }, []);
  return <>{isInvestor ? <DashboardInversor /> : <DashboardUser />}</>;
};

export default Dashboard;
