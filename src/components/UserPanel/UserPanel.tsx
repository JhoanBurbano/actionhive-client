import { useState } from "react";
import "./UserPanel.style.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useAppDispatch } from "../../hooks/useDispatch.hook";
import { thunkSignOut } from "../../redux/thunks/auth.thunk";

const UserPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isMobile = useSelector((state: RootState)=>state.ui.isMobile)
  const dispatch = useAppDispatch()

  function handleClick() {
    setIsOpen(v => !v)
  }

  const logout = () => {
    dispatch(thunkSignOut())
  }

  return (
    <>
    {
            isMobile &&
            <span className="user-action" onClick={handleClick}>
              <button className="user-action-button">Open</button>
            </span>
    }
      <aside className={`user-panel ${isMobile && 'custom-modal'} ${isOpen && 'active'}`}>
        {
          isMobile && <button className="user-panel-button" onClick={handleClick}>close</button>
        }
      <span className="user-panel__perfil">
        <h3>Informacion de Perfil</h3>
        <img
          src="https://randomuser.me/api/portraits/men/4.jpg"
          alt="avatar"
          className="user-panel__perfil-image"
        />
        <h3 className="user-panel__perfil-name">John Smith</h3>
        <p className="user-panel__perfil-email">john@mail.com</p>
        <i className="user-panel__perfil-rol">Postulante</i>
        <button className="user-panel__perfil-button">Editar Perfil</button>
      </span>
      <span className="user-panel__notificaciones">
        <h3 className="user-panel__notificaciones-title">Notificaciones</h3>
        <ul className="user-panel__notificaciones-list">
          <li className="user-panel__notificaciones-list__item">
            <figure className="user-panel__notificaciones-list__item-avatar"></figure>
            <span className="user-panel__notificaciones-list__item-content">
              <h3 className="user-panel__notificaciones-list__item-content-title">
                Title
              </h3>
              <p className="user-panel__notificaciones-list__item-content-text">
                Content
              </p>
            </span>
            <p className="user-panel__notificaciones-list__item-time">
              23 hours
            </p>
            <button className="user-panel__notificaciones-list__item-delete outline">
              X
            </button>
          </li>
          <li className="user-panel__notificaciones-list__item">
            <figure className="user-panel__notificaciones-list__item-avatar"></figure>
            <span className="user-panel__notificaciones-list__item-content">
              <h3 className="user-panel__notificaciones-list__item-content-title">
                Title
              </h3>
              <p className="user-panel__notificaciones-list__item-content-text">
                Content
              </p>
            </span>
            <p className="user-panel__notificaciones-list__item-time">
              23 hours
            </p>
            <button className="user-panel__notificaciones-list__item-delete outline">
              X
            </button>
          </li>
          <li className="user-panel__notificaciones-list__item">
            <figure className="user-panel__notificaciones-list__item-avatar"></figure>
            <span className="user-panel__notificaciones-list__item-content">
              <h3 className="user-panel__notificaciones-list__item-content-title">
                Title
              </h3>
              <p className="user-panel__notificaciones-list__item-content-text">
                Content
              </p>
            </span>
            <p className="user-panel__notificaciones-list__item-time">
              23 hours
            </p>
            <button className="user-panel__notificaciones-list__item-delete outline">
              X
            </button>
          </li>
        </ul>
      </span>
      <button className="user-panel__logout" onClick={logout}>Cerrar Sesion</button>
    </aside>
    </>
  );
};

export default UserPanel;
