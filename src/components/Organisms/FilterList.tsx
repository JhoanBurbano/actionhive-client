import { useAppDispatch } from "../../hooks/useDispatch.hook";
import { thunkGetUserProjects } from "../../redux/thunks/project.thunk";
import "./FilterList.style.scss";

const FilterList = () => {
  const dispatch = useAppDispatch();
  const reloadProjects = () => {
    dispatch(thunkGetUserProjects());
  };
  return (
    <>
      <span className="filters-title">
        <h2>Lista de proyectos</h2>
        <button
          className="filters-title-reload"
          onClick={reloadProjects}
        >
          ♻️
        </button>
      </span>
      <section className="filters">
        <span className="filters-search">
          <input
            type="text"
            placeholder="Buscar por nombre de proyecto"
            className="filters-search-input"
          />
        </span>
        <span className="filters-order">
          <select
            className="filters-order-select"
            defaultValue={""}
          >
            <option value="" disabled>
              Ordenar por
            </option>
            <option value="A-Z">Orden alfabetico Ascendente</option>
            <option value="Z-A">Orden alfabetico Descendente</option>
          </select>
        </span>
        <span className="filters-filters">
          <select
            className="filters-filters-select"
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
        <button className="filters-clear">Limpiar Filtros</button>
      </section>
    </>
  );
};

export default FilterList;
