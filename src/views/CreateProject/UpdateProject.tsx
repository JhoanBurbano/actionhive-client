import CreateForm from "../../components/CreateForm/CreateForm"
import { selectProjectView } from "../../redux/selectors/project.selector"

const UpdateProject = () => {
  const project = selectProjectView();
  return (
    <>
    <CreateForm isEdit project={project!}/>
    </>
  )
}

export default UpdateProject