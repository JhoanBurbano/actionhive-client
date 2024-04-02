import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./Dashboard.style.scss";
import { UserPanel } from "../";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import Graphs from "../Graphs/Graphs";

const DashboardUser = () => {
  const isMobile = useSelector((state: RootState)=>state.ui.isMobile)
  const [itemsPerView, setItemsPerView] = useState<number>(3)
  useEffect(()=>{
    setItemsPerView(window.innerWidth < 600 ? 1 : window.innerWidth <= 1200 ? 2 : 3)
    console.log(window.innerWidth)
  }, [isMobile])
  return (
    <div className="dashboard">
      <section className="dashboard__panel">
        <h2>Dashboard de usuario</h2>
        <section className="dashboard__panel-cards">
          <span className="dashboard__panel-cards__item">
            <h3 className="dashboard__panel-cards__item-cantidad">12</h3>
            <p className="dashboard__panel-cards__item-label">
              Proyectos Postulados
            </p>
          </span>
          <span className="dashboard__panel-cards__item">
            <h3 className="dashboard__panel-cards__item-cantidad">2</h3>
            <p className="dashboard__panel-cards__item-label">
              Proyectos Financiados
            </p>
          </span>
          <span className="dashboard__panel-cards__item">
            <h3 className="dashboard__panel-cards__item-cantidad">10</h3>
            <p className="dashboard__panel-cards__item-label">
              Proyectos Pendientes
            </p>
          </span>
        </section>
        <h2>Crear un nuevo proyecto</h2>
        <section className="dashboard__panel-create">
            <Link to={'/create-project'}>
            <button className="dashboard__panel-create-button">+ Nuevo Proyecto</button>
            </Link>
        </section>
        <h2>Graficas</h2>
        <section>
          <Graphs/>
        </section>
        <h2>Lista de proyectos</h2>
        <section className="dashboard__panel-tools">
          <span className="dashboard__panel-tools-search">
            <input
              type="text"
              placeholder="Buscar por nombre de proyecto"
              className="dashboard__panel-tools-search-input"
            />
          </span>
          <span className="dashboard__panel-tools-order">
            <select
              className="dashboard__panel-tools-order-salect"
              defaultValue={""}
            >
              <option value="" disabled>
                Ordenar por
              </option>
              <option value="A-Z">Orden alfabetico Ascendente</option>
              <option value="Z-A">Orden alfabetico Descendente</option>
            </select>
          </span>
          <span className="dashboard__panel-tools-filters">
            <select
              className="dashboard__panel-tools-filters-salect"
              defaultValue={""}
            >
              <option value="" disabled>
                Filtrar por estado de proyecto
              </option>
              <option value="A-Z">Proyectos Postulados</option>
              <option value="Z-A">Proyectos Financiados</option>
              <option value="Z-A">Proyectos Pendientes</option>
            </select>
          </span>
          <button className="dashboard__panel-tools-clear">
            Limpiar Filtros
          </button>
        </section>
        {true ? (
          <Swiper
            slidesPerView={itemsPerView}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            className="dashboard__panel-swiper"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => (
              <SwiperSlide key={n}>
                <article className="dashboard__panel-swiper__item">
                  <h3 className="dashboard__panel-swiper__item-title">
                    Sistema de gestion de riego
                  </h3>
                  <img
                    src="https://gerens.pe/blog/wp-content/uploads/2016/08/gestion-riesgo-e1631895272455.jpg"
                    alt=""
                    className="dashboard__panel-swiper__item-images"
                  />
                  <p className="dashboard__panel-swiper__item-description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Ratione inventore sit, esse iure optio eius dolorem enim
                    laudantium dolor minima natus omnis non mollitia voluptas.
                    Earum dolores beatae consectetur facilis! Aliquid porro ut
                    eius rerum labore consectetur minima aspernatur molestiae
                    eligendi similique deleniti quibusdam nulla itaque dicta
                    delectus unde quaerat nisi, neque iure fugiat. Quam
                    similique ratione temporibus iste earum.
                  </p>
                  <section className="dashboard__panel-swiper__item-people">
                    <span className="dashboard__panel-swiper__item-people-item">
                      <h3>Representante</h3>
                      <p>Jhoan Burbano</p>
                    </span>
                    <span className="dashboard__panel-swiper__item-people-item">
                      <h3>Inversionistas</h3>
                      <p>2 Interesados</p>
                    </span>
                  </section>
                  <span className="dashboard__panel-swiper__item-progress">
                    <p className="dashboard__panel-swiper__item-progress-title">
                      Progreso
                    </p>
                    <span className="progress">
                      <span
                        className="progress-bar"
                        style={{ width: (n > 9 ? "100" : n * 10) + "%" }}
                      ></span>
                    </span>
                  </span>
                  <span className="dashboard__panel-swiper__item-objetivo">
                    <h3>Objetivo financiero</h3>
                    <p>COP $35'000.000</p>
                  </span>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <section className="dashboard__panel-text">
            No tienes proyectos
          </section>
        )}
      </section>
      <UserPanel/>
    </div>
  );
};

export default DashboardUser;
