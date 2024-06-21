import "swiper/css";
import "swiper/css/pagination";
import "./Dashboard.style.scss";
import { UserPanel } from "../";
import { Link } from "react-router-dom";
import ProjectsViewer from "../Organisms/ProjectsViewer";
import { selectUserProjects } from "../../redux/selectors/project.selector";
import FilterList from "../Organisms/FilterList";

const DashboardUser = () => {

  const projects = selectUserProjects();

  return (
    <div className="dashboard">
      <section className="dashboard__panel">
        <h2>Dashboard de usuario</h2>
        <section className="dashboard__panel-cards">
          <span className="dashboard__panel-cards__item">
            <h3 className="dashboard__panel-cards__item-cantidad">12</h3>
            <p className="dashboard__panel-cards__item-label">
              Proyectos Postulados
            </p>
          </span>
          <span className="dashboard__panel-cards__item">
            <h3 className="dashboard__panel-cards__item-cantidad">2</h3>
            <p className="dashboard__panel-cards__item-label">
              Proyectos Financiados
            </p>
          </span>
          <span className="dashboard__panel-cards__item">
            <h3 className="dashboard__panel-cards__item-cantidad">10</h3>
            <p className="dashboard__panel-cards__item-label">
              Proyectos Pendientes
            </p>
          </span>
        </section>
        <h2>Crear un nuevo proyecto</h2>
        <section className="dashboard__panel-create">
            <Link to={'create'}>
            <button className="dashboard__panel-create-button">+ Nuevo Proyecto</button>
            </Link>
        </section>
        <FilterList/>
        <ProjectsViewer projects={projects || []}/>
      </section>
      <UserPanel/>
    </div>
  );
};

export default DashboardUser;
