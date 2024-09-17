import { useAppDispatch } from "../../hooks/useDispatch.hook";
import { thunkGetUserProjects } from "../../redux/thunks/project.thunk";
import "./FilterList.style.scss";

const FilterList = ({
  setSearch,
  search,  
}: Readonly<{
  setSearch: (value: string) => void;
  search: string;
}>) => {
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
            onChange={(e) => setSearch(e.currentTarget.value)}
            value={search}
          />
        </span>
        <button className="filters-clear" onClick={()=>setSearch("")}>Limpiar</button>
      </section>
    </>
  );
};

export default FilterList;
