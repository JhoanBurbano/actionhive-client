import { useNavigate } from "react-router-dom";
import ProjectDetailComponent from "../../components/Projects/ProjectDetailComponent";
import { useAppDispatch } from "../../hooks/useDispatch.hook";
import { selectProjectView } from "../../redux/selectors/project.selector"
import { thunkDeleteProject } from "../../redux/thunks/project.thunk";
import { selectUser } from "../../redux/selectors/auth.selectors";


const ProjectDetail = () => {
    const selectProjectDetail = selectProjectView();
    const dispatch = useAppDispatch();
    const navigation = useNavigate();
    const {isInvestor} = selectUser()!;
    if (!selectProjectDetail) return null;
    const handleEdit = () => {
        console.log("Editando");
        navigation("/dashboard/update-project");
    }
    const handleDelete = async () => {
        console.log("Eliminando");
        await dispatch(thunkDeleteProject(selectProjectDetail.id));
        navigation("/dashboard");
    }
  return (
    <ProjectDetailComponent project={selectProjectDetail} actions={
        isInvestor ? (
          <>
          <button className="project-detail__body-aside-card">Invertir</button>
          <button className="project-detail__body-aside-card">Contactar</button>
          </>
        ) : selectProjectDetail.representant?.email === selectUser()?.profile?.email ? 
          (
            <>
            <button className="project-detail__body-aside-card" onClick={handleEdit}>Editar</button>
            <button className="project-detail__body-aside-card" onClick={handleDelete}>Eliminar</button>
            </>  
        )
        :
        (
          <>
          <button className="project-detail__body-aside-card" >Unirse al equipo</button>
          <button className="project-detail__body-aside-card" >Contactar</button>
          </>  
        )
        
    }/>
  )
}

export default ProjectDetail