import { useNavigate } from "react-router-dom";
import ProjectDetailComponent from "../../components/Projects/ProjectDetailComponent";
import { useAppDispatch } from "../../hooks/useDispatch.hook";
import { selectProjectView } from "../../redux/selectors/project.selector";
import { thunkDeleteProject } from "../../redux/thunks/project.thunk";
import { selectUser } from "../../redux/selectors/auth.selectors";
import { useState } from "react";

const ProjectDetail = () => {
  const selectProjectDetail = selectProjectView();
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const { isInvestor, profile: { email } } = selectUser()!;
  const [showModal, setShowModal] = useState(false);
  const [typeModal, setTypeModal] = useState("delete");

  const handleShowModal = (type: string) => {
    setShowModal(true);
    setTypeModal(type);
  };

  if (!selectProjectDetail) return null;

  const handleEdit = () => {
    console.log("Editando");
    navigation("/dashboard/update-project");
  };

  const handleDelete = async () => {
    console.log("Eliminando");
    await dispatch(thunkDeleteProject(selectProjectDetail.id));
    navigation("/dashboard");
  };

  return (
    <>
      <ProjectDetailComponent 
        project={selectProjectDetail} 
        actions={
          isInvestor ? (
            <>
              <button className="project-detail__body-aside-card" onClick={() => handleShowModal("invest")}>Invertir</button>
              <button className="project-detail__body-aside-card" onClick={() => handleShowModal("contact")} style={{ backgroundColor: "#ffaa55" }}>Contactar</button>
            </>
          ) : selectProjectDetail.representant?.email === email ? (
            <>
              <button className="project-detail__body-aside-card" onClick={handleEdit}>Editar</button>
              <button className="project-detail__body-aside-card" onClick={() => handleShowModal("delete")} style={{ backgroundColor: "#ff5555" }}>Eliminar</button>
            </>
          ) : (
            <>
              <button className="project-detail__body-aside-card" onClick={() => handleShowModal("join")}>Unirse al equipo</button>
              <button className="project-detail__body-aside-card" onClick={() => handleShowModal("contact")} style={{ backgroundColor: "#ffaa55" }}>Contactar</button>
            </>
          )
        }
      />
      
      {/* Modal */}
      {showModal && (
        <div className="modal" style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
          <div style={{
            backgroundColor: "white",
            padding: "1.5rem",
            borderRadius: "0.5rem",
            boxShadow: "0 0 1rem rgba(0,0,0,0.5)",
            minHeight: "250px",
            display: "flex",
            flexDirection: "column",
          }}>
            {typeModal === "delete" && (
              <>
                <h2>¿Estás seguro de eliminar el proyecto?</h2>
                <img src="https://i.pinimg.com/originals/ff/fa/9b/fffa9b880767231e0d965f4fc8651dc2.gif" />
                <button onClick={handleDelete}>Eliminar</button>
              </>
            )}
            {typeModal === "contact" && (
              <>
                <h2>¿Estás seguro de contactar al representante?</h2>
                <article>
                  <h3>Representante</h3>
                  <p>Estos son los datos de contacto del representante</p>
                  <table>
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{`${selectProjectDetail.representant?.firstname} ${selectProjectDetail.representant?.lastname}`}</td>
                        <td>{selectProjectDetail.representant?.email}</td>
                      </tr>
                    </tbody>
                  </table>
                </article>
               <a 
  href={`https://mailto:${selectProjectDetail.representant?.email}`}
  target="_blank"
>
  Contactar
</a>

              </>
            )}
            {typeModal === "join" && (
              <>
                <h2>¿Estás seguro de unirte al equipo?</h2>
                <img src="https://media3.giphy.com/media/3V52SV0C5mnDKGVZmU/giphy.gif?cid=6c09b952vqfvxregqrg5ki7la3fxbnny2ehqh5nbokg4lft6&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s" />
                <button>Unirme</button>
              </>
            )}
            {typeModal === "invest" && (
              <>
                <h2>Serás dirigido a la plataforma de pago en unos momentos</h2>
                <img src="https://cdn.dribbble.com/users/1303437/screenshots/3202506/multiple-cards-800x600_2.gif" />
                <button>Invertir</button>
              </>
            )}
            <button className="red" onClick={() => setShowModal(false)}>X</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectDetail;
