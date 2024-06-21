import ProjectDetailComponent from "../../components/Projects/ProjectDetailComponent";
import { selectProjectView } from "../../redux/selectors/project.selector"


const ProjectDetail = () => {
    const selectProjectDetail = selectProjectView();
    if (!selectProjectDetail) return null;
  return (
    <ProjectDetailComponent project={selectProjectDetail} actions={
    <>
    <button className="project-detail__body-aside-card">Editar</button>
    <button className="project-detail__body-aside-card">Eliminar</button>
    </>  
    }/>
  )
}

export default ProjectDetail