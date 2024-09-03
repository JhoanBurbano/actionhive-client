import { Link } from "react-router-dom";
import "./TopBar.scss";
import { selectUser } from "../../redux/selectors/auth.selectors";

const TopBar = () => {
  const user = selectUser();

  return (
    <nav className="top-bar">
      <Link to={!user ? "/" : "/dashboard"}>
        <img src="https://burbanostudio-assets.s3.us-east-2.amazonaws.com/projects/ActionHive/assets/action-hive_horizontal.png" loading="lazy" alt="logo" className="top-bar__logo" />
      </Link>
      {user===null&&<ul className="top-bar__tools">
        <li className="top-bar__tools-item">¿Como Funciona?</li>
        <li className="top-bar__tools-item">Contacto</li>
        <li className="top-bar__tools-item">F.A.Q</li>
        <li className="top-bar__tools-item">Negocio</li>
      </ul>}
          <span className="top-bar__access">
      {
        user === null ? (
          <>
          <Link to={"/login"}>
              <button className="top-bar__access-button outline">Login</button>
          </Link>
          <Link to={"/register"}>
              <button className="top-bar__access-button outline">Register</button>
          </Link>
          </>
        ) : (
          <Link to={"/dashboard"}>
              <button className="top-bar__access-button outline">Dashboard</button>
          </Link>
        )
      }
        </span>
    </nav>
  );
};

export default TopBar;
