import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import "./index.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Login,
  Register,
  Landing,
  Dashboard,
  CreateProject,
} from "./views/index.ts";
import { store } from "./redux/store.ts";
import ProtectedRoute from "./components/Protected/ProtectedRoute.tsx";
import DashboardRouter from "./views/DashboardRouter/DashboardRouter.tsx";
import NotFound from "./components/NotFound/NotFound.tsx";
import ForgotPassword from "./views/Access/ForgotPassword.tsx";
import ProjectDetail from "./views/Dashboard/ProjectDetail.tsx";
import UpdateProject from "./views/CreateProject/UpdateProject.tsx";
import Forms from "./views/Forms/Forms.tsx";
import SharedComponent from "./views/SharedComponent/SharedComponent.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="forms" element={<Forms />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <DashboardRouter />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="create" element={<CreateProject />} />
            <Route path="update-project" element={<UpdateProject />} />
            <Route path="project-detail" element={<ProjectDetail />} />
            <Route path="join" element={<SharedComponent type={0} />} />
            <Route path="invest" element={<SharedComponent type={1} />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
