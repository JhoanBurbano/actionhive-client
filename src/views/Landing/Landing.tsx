import React, { useEffect } from "react";
import "./landing.style.scss";
import { useDispatch } from "react-redux";
import {
  setFullTemplate,
  setLoader,
  setOverflow,
  setWhiteBackground,
} from "../../redux/slices/ui.slice";
import { Link, useNavigate } from "react-router-dom";
import { selectToken } from "../../redux/selectors/auth.selectors";

const Landing: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()


  const token = selectToken();

  function handleOnLoad() {
    dispatch(setLoader(false))
  }

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
    dispatch(setFullTemplate(true));
    dispatch(setOverflow(true));
    dispatch(setWhiteBackground(true));
    // dispatch(setLoader(true));
    return () => {
      dispatch(setFullTemplate(false));
      dispatch(setOverflow(false));
      dispatch(setWhiteBackground(false));
    };
  }, []);
  return (
    <section className="landing-view">
      <main className="landing-view__banner">
        <div className="landing-view__banner-bottom">
          <img src="https://burbanostudio-assets.s3.us-east-2.amazonaws.com/projects/ActionHive/assets/separator.svg" alt="separator" loading="lazy" onLoadedData={handleOnLoad}/>
        </div>
        <div className="landing-view__banner-content">
          <span className="landing-view__banner-content-text">
            <h3 className="landing-view__banner-content-text-title">
              Publica tu proyecto y encuentra a tus mejores aliados.
            </h3>
            <p className="landing-view__banner-content-text-paragraph">
              ¡Sé parte de esta comunidad dinámica y haz realidad tus sueños con
              el apoyo de nuestra vibrante red!
            </p>
            <Link to={"/register"}>
              <button className="landing-view__banner-content-text-button">
                Crea tu cuenta
              </button>
            </Link>
          </span>
          <span className="landing-view__banner-content-media">
            <img
              src="https://burbanostudio-assets.s3.us-east-2.amazonaws.com/projects/ActionHive/assets/phone-login.png"
              alt=""
              className="landing-view__banner-content-media-image"
            />
          </span>
        </div>
      </main>
      <div className="landing-view__features">
        <section className="landing-view__features-top">
        <span className="landing-view__features-top-subtitle">
          <h2>Las cosas buenas se logran en conjunto</h2>
        </span>
          <ul className="landing-view__features-top-list">
            <li className="landing-view__features-top-list-item">
              <img
                src="https://strapi-cheafweb.s3.us-west-2.amazonaws.com/1_icono1_e467ef4135.png"
                alt=""
                className="landing-view__features-top-list-item-icon"
              />
              <h3 className="landing-view__features-top-list-item-title">
                COMUNIDAD ACTIVA
              </h3>
              <p className="landing-view__features-top-list-item-text">
                Cuentas con el apoyo de todos los usuarios de nuestra red
              </p>
            </li>
            <li className="landing-view__features-top-list-item">
              <img
                src="https://strapi-cheafweb.s3.us-west-2.amazonaws.com/1_icono1_e467ef4135.png"
                alt=""
                className="landing-view__features-top-list-item-icon"
              />
              <h3 className="landing-view__features-top-list-item-title">
                IMPACTO COLABORATIVO
              </h3>
              <p className="landing-view__features-top-list-item-text">
                Logra un impacto positivo al colaborar con la comunidad en
                proyectos de crowdfunding y crowdsourcing.
              </p>
            </li>

            <li className="landing-view__features-top-list-item">
              <img
                src="https://strapi-cheafweb.s3.us-west-2.amazonaws.com/1_icono1_e467ef4135.png"
                alt=""
                className="landing-view__features-top-list-item-icon"
              />
              <h3 className="landing-view__features-top-list-item-title">
                IDEAS QUE CAMBIAN EL JUEGO
              </h3>
              <p className="landing-view__features-top-list-item-text">
                Aporta y descubre ideas innovadoras que pueden cambiar el juego
                en nuestra plataforma de crowdsourcing.
              </p>
            </li>
          </ul>
        </section>
        <section className="landing-view__features-bottom">
          <span className="landing-view__features-bottom-words">
            <p className="landing-view__features-bottom-words-text">
            Con la fuerza de la unión, convertimos sueños en realidades. Tu aporte es la clave del cambio.
            </p>
          </span>
        </section>
      </div>
      <footer className="landing-view__footer">
        <ul className="landing-view__footer-list">
          <li className="landing-view__footer-list-item">
            <h4 className="landing-view__footer-list-item-subtitle">ActionHive busca relizar el croudfunding y croudsourcing de una manera en la que todos podamos ayudar</h4>
          </li>
          <li className="landing-view__footer-list-item">
            <h3>Contactanos</h3>
            <p>Envianos un Email</p>
            <p>Foro de la comunidad</p>
          </li>
          
          <li className="landing-view__footer-list-item">
            <h3>Legal</h3>
            <p>Aviso de privacidad</p>
            <p>Política de Cookies</p>
            <p>T&C</p>
          </li>

          
          <li className="landing-view__footer-list-item">
            <h3>Soporte</h3>
            <p>F.A.Q.</p>
          </li>

          <li className="landing-view__footer-list-item">
            <h3>Unete</h3>
            <p>Registrate como cliente</p>
            <p>Registrate como inversor</p>
          </li>
        </ul>
        <img src="https://burbanostudio-assets.s3.us-east-2.amazonaws.com/projects/ActionHive/assets/action-hive_horizontal_ligth.png" className="landing-view__footer-logo"/>
        <p className="landing-view__footer-copy">© 2020 - 2024 ActionHive. Todos los derechos reservados</p>
      </footer>
    </section>
  );
};

export default Landing;
