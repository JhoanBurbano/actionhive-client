import "swiper/css";
import "swiper/css/pagination";
import "./Dashboard.style.scss";
import { UserPanel } from "../";
import { selectRecomendedProjects, selectUserProjects } from "../../redux/selectors/project.selector";
import ProjectsViewer from "../Organisms/ProjectsViewer";
import FilterList from "../Organisms/FilterList";
import { selectDashboardData } from "../../redux/selectors/dashboard.selector";

const DashboardInversor = () => {
  const projects = selectUserProjects();
  const projectsRecomended = selectRecomendedProjects()!;
  const { financedProjects, savedProjects, favoriteProjects } = selectDashboardData()!;

  return (
    <div className="dashboard">
    <section className="dashboard__panel">
      <h2>Dashboard de inversor</h2>
      <section className="dashboard__panel-cards">
        <span className="dashboard__panel-cards__item">
          <h3 className="dashboard__panel-cards__item-cantidad">{savedProjects?.length}</h3>
          <p className="dashboard__panel-cards__item-label">
            Proyectos Guardados
          </p>
        </span>
        <span className="dashboard__panel-cards__item">
          <h3 className="dashboard__panel-cards__item-cantidad">{ financedProjects?.length }</h3>
          <p className="dashboard__panel-cards__item-label">
            Proyectos Financiados
          </p>
        </span>
        <span className="dashboard__panel-cards__item">
          <h3 className="dashboard__panel-cards__item-cantidad">{ favoriteProjects?.length }</h3>
          <p className="dashboard__panel-cards__item-label">
            Proyectos Favoritos
          </p>
        </span>
      </section>
      <h2>Banco de Proyectos</h2>
      {projects?.length ? (
        <>
      <FilterList />
        <ProjectsViewer projects={projects || []} />
        </>
      ) : (
        <section className="dashboard__panel-text">
          No estas financiando ningun proyecto
        </section>
      )}
      {
        projectsRecomended && (
          <>
      <h2>
        Proyectos Recomendados
      </h2>
        <FilterList />
          <ProjectsViewer projects={projectsRecomended || []} userEdit={false} />
          </>
        ) 
      }
    </section>
    <UserPanel/>
  </div>
  )
}

export default DashboardInversor