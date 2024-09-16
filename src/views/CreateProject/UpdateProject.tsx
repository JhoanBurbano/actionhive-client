import CreateForm from "../../components/CreateForm/CreateForm"
import { selectProjectView } from "../../redux/selectors/project.selector"
import { ProjectAny } from "../../interfaces/project.interface"

const UpdateProject = () => {
  const project = selectProjectView();
  return (
    <>
    <CreateForm isEdit project={project as unknown as ProjectAny}/>
    </>
  )
}

export default UpdateProject