import { Link } from "react-router-dom";
import "./TopBar.scss";

const TopBar = () => {
  return (
    <nav className="top-bar">
      <Link to={"/"}>
        <p className="top-bar__logo">
          <b>Action</b> Hive
        </p>
      </Link>
      <ul className="top-bar__tools">
        <li className="top-bar__tools-item">¿Como Funciona?</li>
        <li className="top-bar__tools-item">Contacto</li>
        <li className="top-bar__tools-item">F.A.Q</li>
        <li className="top-bar__tools-item">Negocio</li>
      </ul>
      <span className="top-bar__access">
        <Link to={"/login"}>
            <button className="top-bar__access-button outline">Login</button>
        </Link>
        <Link to={"/register"}>
            <button className="top-bar__access-button outline">Register</button>
        </Link>
      </span>
    </nav>
  );
};

export default TopBar;
