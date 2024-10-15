import { SwiperSlide, Swiper } from "swiper/react";
import { Project } from "../../interfaces/user.interface";
import { CURRENCY_REGEX } from "../../constants/regex.constants";

import "./ProjectsViewer.style.scss";
import { useAppDispatch } from "../../hooks/useDispatch.hook";
import { thunkGetProject } from "../../redux/thunks/project.thunk";
import { parseName } from "../../utils/parsers";
import { useNavigate } from "react-router-dom";
import FilterList from "./FilterList";
import { useMemo, useState } from "react";

interface ProjectsViewerProps {
  projects: Project[];
  userEdit?: boolean;
}
const ProjectsViewer: React.FC<ProjectsViewerProps> = ({ projects }) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const [search, setSearch] = useState("");
  const breakpoints = {
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    850: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
  };
  const [showList, setShowList] = useState(false);

  const goToDetails = (id: string) => {
    dispatch(thunkGetProject(id));
    navigation(`project-detail/`);
  };

  const searchedProjects = useMemo(()=>{
    if(!search) return projects;
    return projects.filter(({projectName}) => projectName?.toLowerCase().includes(search.toLowerCase()))
  }, [search, projects])
  return (
    <>
      {projects.length ? (
        <>
          <FilterList setSearch={setSearch} search={search}/>
          <button onClick={() => setShowList(true)} className="w-20 h-10 text-xs bg-green-600 rounded-md hover:bg-green-900 text-white ">Mostrar lista</button>
          <Swiper
            breakpoints={breakpoints}
            pagination={{
              clickable: true,
            }}
            className="project-viewer"
          >
            {searchedProjects.map(
              (
                {
                  id,
                  projectName,
                  description,
                  developmentStatus,
                  fundingCap,
                  representant,
                },
                i
              ) => (
                <SwiperSlide key={i}>
                  <article
                    className="project-viewer__item"
                    onClick={() => goToDetails(id)}
                  >
                    <img
                      src="https://gerens.pe/blog/wp-content/uploads/2016/08/gestion-riesgo-e1631895272455.jpg"
                      alt=""
                      className="project-viewer__item-images"
                    />
                    <section className="project-viewer__item-body">
                      <h3 className="project-viewer__item-body-title">
                        {projectName}
                      </h3>
                      <p className="project-viewer__item-body-description">
                        {description}
                      </p>
                      <section className="project-viewer__item-body-people">
                        <span className="project-viewer__item-body-people-item">
                          <h3>Representante</h3>
                          <p>{parseName(representant)}</p>
                        </span>
                        <span className="project-viewer__item-body-people-item">
                          <h3>Inversionistas</h3>
                          <p>2 Interesados</p>
                        </span>
                      </section>
                      <span className="project-viewer__item-body-progress">
                        <p className="project-viewer__item-body-progress-title">
                          Estado de desarrollo
                        </p>
                        <span className="progress">
                          <span
                            className="progress-bar"
                            style={{ width: developmentStatus! * 100 + "%" }}
                          ></span>
                        </span>
                      </span>
                      <span className="project-viewer__item-body-objetivo">
                        <h3>Objetivo financiero</h3>
                        <p>
                          COP{" "}
                          {fundingCap!.toString().replace(CURRENCY_REGEX, ".")}
                        </p>
                      </span>
                    </section>
                  </article>
                </SwiperSlide>
              )
            )}
          </Swiper>
        </>
      ) : (
        <section className="dashboard__panel-text">No tienes proyectos</section>
      )}
      {
        (projects.length && showList) && (
          <div className="fixed top-0 left-0 z-[10000000] overflow-y-auto bg-[#000a] w-full p-10 h-full">
            <main className="bg-white p-4 rounded-lg flex flex-col">
            <button onClick={() => setShowList(false)} className="w-20 h-10 text-xs bg-red-600 rounded-md hover:bg-red-900 text-white ">Ocultar lista</button>
            <FilterList setSearch={setSearch} search={search}/>
            <section className="">
              <ul>
                {searchedProjects.map(
                  (
                    {
                      id,
                      projectName,
                      description,
                      developmentStatus,
                      fundingCap,
                    },
                    i
                  ) => (
                    <>
                    <li key={i} className="flex items-center">
                      <p className="font-bold">{i+1}.</p>
                      <article
                        className="bg-white p-4 flex flex-col gap-4 cursor-pointer hover:bg-green-100 transition-colors"
                        onClick={() => goToDetails(id)}
                      >
                        <h3 className="font-bold underline">
                            {projectName}
                          </h3>
                          <p className="italic text-zinc-400" >
                            {description}
                          </p>
                          <span>
                          <p className="text-xs">Progreso</p>
                          <span className="progress h-2">
                              <span
                                className="progress-bar"
                                style={{ width: developmentStatus! * 100 + "%" }}
                              ></span>
                            </span>
                          </span>
                          <span className="">
                            <h3 className="text-xs">Objetivo financiero</h3>
                            <p className="text-xs">
                              COP{" "}
                              <b className="text-sm">{fundingCap!.toString().replace(CURRENCY_REGEX, ".")}</b>
                            </p>
                          </span>
                      </article>
                    </li>
                    </>
                  )
                )}
              </ul>
            </section>
            </main>
          </div>
        )
      }
    </>
  );
};

export default ProjectsViewer;
