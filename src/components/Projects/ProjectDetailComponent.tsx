import React from "react";
import { Project } from "../../interfaces/user.interface";
import "./ProjectDetailComponent.style.scss";
import { parseName, parseProjectProps } from "../../utils/parsers";
import { CURRENCY_REGEX } from "../../constants/regex.constants";

interface ProjectDetailComponentProps {
  project: Project;
  actions?: React.ReactNode;
}

const ProjectDetailComponent: React.FC<ProjectDetailComponentProps> = ({
  project: {
    projectName,
    description,
    projectObjective,
    representant,
    team,
    collaborators,
    projectImages,
    ...others
    // fundingCap,
    // developmentStatus,
    // competitiveLandscape,
    // controlPlatforms,
    // designMethodology,
    // hasAI,
    // riskLevel,
    // rewardType,
    // returnPeriod,
    // resourceOptimization,
    // projectCategory,
    // mechatronicComponents,
    // manufacturingTechnology,
    // location,
  },
  actions,
}) => {
  return (
    <article className="project-detail">
      <div className="project-detail__header">
        <h1 className="project-detail__header-title">{projectName}</h1>
        <figure className="project-detail__header-image">
          <img
            src="https://gerens.pe/blog/wp-content/uploads/2016/08/gestion-riesgo-e1631895272455.jpg"
            alt=""
          />
        </figure>
      </div>
      <div className="project-detail__body">
        <main className="project-detail__body-main">
          <h3>Descripcion</h3>
          <p className="project-detail__body-main-text">{description}</p>
          <h3>Objetivo del proyecto</h3>
          <p className="project-detail__body-main-text">{projectObjective}</p>

          <section className="project-detail__body-main-info">
            <h3 className="project-detail__body-main-info-title">
              Información del proyecto
            </h3>
            <table className="project-detail__body-main-info-table">
                <tbody>
                    {
                        Object.keys(others).sort().map((key, i) => {
                            if (["_id", "id", "__v", "riskLevel"].includes(key)) return null;
                            let value = (others as Record<string, any>)[key];
                            if (typeof value === "boolean") {
                                value = value ? "Si" : "No";
                            } else if (typeof value === "number") {
                              if (key !== "cluster" ) {

                                value =  value < 1 ? (((value) * 100).toFixed(1) + "%" ) : (value > 100000 ? `$ ${value.toString().replace(CURRENCY_REGEX, '.')} COP` : value);
                              }
                                // value = typeof value === "string" && value.includes("%") ? `${value} de 100` : value
                            } else if (Array.isArray(value)) {
                                value = value.join(", ");
                            }

                            if(key === "returnPeriod") {
                                value = `${value} meses`
                            }

                            return (
                                <tr key={i}>
                                    <th>{parseProjectProps(key)}</th>
                                    <td>{value}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
            </table>
          </section>
        </main>
        <aside className="project-detail__body-aside">
          <h3 className="project-detail__body-aside-title">
            Informacion Adicional
          </h3>
          <section className="project-detail__body-aside-section">
            <h3 className="project-detail__body-aside-section-title">
              Representante
            </h3>
            <span className="project-detail__body-aside-card">
              <h3 className="project-detail__body-aside-card-title">
                {parseName(representant)}
              </h3>
              <span className="project-detail__body-aside-card-item">
                {representant?.email}
              </span>
            </span>
          </section>
          <section className="project-detail__body-aside-section">
            <h3 className="project-detail__body-aside-card-title">
              {`Integrantes del Equipo (${team?.length})`}
            </h3>
            <span className="project-detail__body-aside-card-item">
              {team?.map((member, i) => (
                <section className="project-detail__body-aside-card" key={i}>
                  <h3 className="project-detail__body-aside-card-title">
                    {parseName(member)}
                  </h3>
                </section>
              ))}
            </span>
          </section>
          <section className="project-detail__body-aside-section">
            <h3 className="project-detail__body-aside-section-title">
              Prefil de los colaboradores
            </h3>
            <span className="project-detail__body-aside-card">
              {collaborators?.map((collaborator, i) => (
                <section className="project-detail__body-aside-card-item" key={i}>
                  <h3 className="project-detail__body-aside-card-title">
                    {collaborator}
                  </h3>
                </section>
              ))}
            </span>
          </section>
          <section className="project-detail__body-aside-section">
            <h3 className="project-detail__body-aside-section-title">
              Acciones
            </h3>
            {
            actions && actions
            }
          </section>
        </aside>
      </div>
    </article>
  );
};

export default ProjectDetailComponent;
