import React, { ReactNode, useEffect } from "react";
import "./CreateForm.style.scss";
import { useForm, Controller } from "react-hook-form";
import { PROJECT_CONTANTS } from "../../constants/project.constants";
import { DropImages, Multiselect, Toggle } from "..";
import { useAppDispatch } from "../../hooks/useDispatch.hook";
import { thunkCreateProject, thunkUpdateProject } from "../../redux/thunks/project.thunk";
import { Project, ProjectData } from "../../interfaces/user.interface";
import Select from "react-select";
import '../Multiselect/Multiselect.style.scss'
import { useNavigate } from "react-router-dom";

interface ProjectFormProps {
  project?: Project;
  isEdit?: boolean;
}

const ProyectoForm: React.FC<ProjectFormProps> = ({
  project,
  isEdit=false,

}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProjectData>({
    defaultValues: isEdit ? {...project as ProjectData} : {
      projectImages: [],
      projectName: "",
      projectObjective: "",
      description: "",
      projectCategory: "",
      fundingCap: 0,
      mechatronicComponents: [],
      controlPlatforms: [],
      designMethodology: "",
      hasAI: false,
      collaborators: [],
      resourceOptimization: [],
      location: "",
      manufacturingTechnology: [],
      developmentStatus: 0,
      riskLevel: "",
      rewardType: [],
      returnPeriod: 0,
      competitiveLandscape: [],
      isActive: false,
    },
  });
  
  const parseDataToUpdate = (data: Record<string, any>) => {
    const projectData: Partial<ProjectData> = {
      projectImages: data.projectImages,
      projectName: data.projectName,
      projectObjective: data.projectObjective,
      description: data.description,
      projectCategory: data.projectCategory,
      fundingCap: data.fundingCap,
      mechatronicComponents: data.mechatronicComponents,
      controlPlatforms: data.controlPlatforms,
      designMethodology: data.designMethodology,
      hasAI: data.hasAI,
      resourceOptimization: data.resourceOptimization,
      location: data.location,
      manufacturingTechnology: data.manufacturingTechnology,
      developmentStatus: data.developmentStatus,
      riskLevel: data.riskLevel,
      rewardType: data.rewardType,
      returnPeriod: data.returnPeriod,
      competitiveLandscape: data.competitiveLandscape,
      isActive: data.isActive,
    };
    return projectData;
  }

  const dispacth = useAppDispatch();

  const navigation = useNavigate();

  const onSubmit = (data: Record<string, any>) => {
    // Aquí puedes realizar la lógica para enviar los datos al servidor o realizar otras acciones.
    console.log("Datos del formulario:", data);
    isEdit ? dispacth(thunkUpdateProject({id: project?.id!, project: parseDataToUpdate(data)})) :
    dispacth(thunkCreateProject(data))
    navigation(isEdit ? '/dashboard/project-detail/' : '/dashboard')
  };

  useEffect(()=>{
    if(isEdit && !project){
      navigation('/dashboard')
    }
    if(isEdit && project){
      
    }
  }, [])

  return (
    <form className="create-form" onSubmit={(e) => e.preventDefault()}>
      <h2 className="create-form__title">Nuevo Proyecto</h2>

      <span className="create-form__field">
        <label>Imágenes:</label>
        <Controller
          name="projectImages"
          control={control}
          render={({ field }) => (
            <>
              <DropImages onSave={(images)=> field.onChange(images)}/>
              <span className="create-form__field-error">
                {errors.projectImages?.message as ReactNode}
              </span>
            </>
          )}
        />
      </span>

      <span className="create-form__field">
        <label>Nombre del Proyecto:</label>
        <Controller
          name="projectName"
          control={control}
          rules={{ required: "Este campo es requerido" }}
          render={({ field }) => (
            <>
              <input
                className="create-form__field-input"
                {...field}
                type="text"
                placeholder="Ingrese el nombre del proyecto"
              />
              <span className="create-form__field-error">
                {errors.projectName?.message as ReactNode}
              </span>
            </>
          )}
        />
      </span>

      <span className="create-form__field">
        <label>Objetivo del Proyecto:</label>
        <Controller
          name="projectObjective"
          control={control}
          rules={{ required: "Este campo es requerido" }}
          render={({ field }) => (
            <>
              <input
                className="create-form__field-input"
                {...field}
                placeholder="Ingrese el objetivo principal del proyecto"
                type="text"
              />
              <span className="create-form__field-error">
                {errors.projectObjective?.message as ReactNode}
              </span>
            </>
          )}
        />
      </span>

      <span className="create-form__field">
        <label>Descripción:</label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <>
              <textarea
                className="create-form__field-input"
                {...field}
                placeholder="Ingrese la descripcion general del proyecto"
              />
              <span className="create-form__field-error">
                {errors.description?.message as ReactNode}
              </span>
            </>
          )}
        />
      </span>

      <span className="create-form__field">
        <label>Categorías del Proyecto:</label>
        <Controller
          name="projectCategory"
          control={control}
          rules={{ required: "Este campo es requerido" }}
          render={({ field }) => (
            <>
              <Select
                options={PROJECT_CONTANTS.category.map((c) => ({
                  value: c,
                  label: c,
                }))}
                defaultValue={PROJECT_CONTANTS.category.map((c) => ({
                  value: c,
                  label: c,
                })).find((c) => c.value === project?.projectCategory)}
                onChange={(data)=>field.onChange(data?.value)}
                isMulti={false}
                placeholder="Seleccione la categoria del proyecto"
                className="multiselect-custom"
              />
              <span className="create-form__field-error">
                {errors.projectCategory?.message as ReactNode}
              </span>
            </>
          )}
        />
      </span>

      <span className="create-form__field">
        <label>Tope de Financiación:</label>
        <Controller
          name="fundingCap"
          control={control}
          rules={{
            required: "Este campo es requerido",
            min: { value: 5000000, message: "El valor mínimo es 5000000" },
            max: { value: 90000000, message: "El valor máximo es 90000000" },
          }}
          render={({ field }) => (
            <>
              <input
                className="create-form__field-input"
                {...field}
                type="number"
                placeholder="Ingrese el tope de financiacion"
              />
              <span className="create-form__field-error">
                {errors.fundingCap?.message as ReactNode}
              </span>
            </>
          )}
        />
      </span>

      <span className="create-form__field">
        <label>Componentes Mecatrónicos:</label>
        <Controller
          name="mechatronicComponents"
          control={control}
          rules={{ required: "Este campo es requerido" }}
          render={({ field }) => (
            <>
              <Multiselect
                options={PROJECT_CONTANTS.components.map((c) => ({
                  value: c,
                  label: c,
                }))}
                initialValue={project?.mechatronicComponents}
                onChange={field.onChange}
                placeholder="Seleccione los componentes mecatronicos"
              />
              <span className="create-form__field-error">
                {errors.mechatronicComponents?.message as ReactNode}
              </span>
            </>
          )}
        />
      </span>

      <span className="create-form__field">
        <label>Plataformas de Control:</label>
        <Controller
          name="controlPlatforms"
          control={control}
          rules={{ required: "Este campo es requerido" }}
          render={({ field }) => (
            <>
              <Multiselect
                options={PROJECT_CONTANTS.platform.map((c) => ({
                  value: c,
                  label: c,
                }))}
                initialValue={project?.controlPlatforms}
                onChange={field.onChange}
                placeholder="Seleccione la plataforma de control"
              />
              <span className="create-form__field-error">
                {errors.controlPlatforms?.message as ReactNode}
              </span>
            </>
          )}
        />
      </span>

      <span className="create-form__field">
        <label>Metodología de Diseño:</label>
        <Controller
          name="designMethodology"
          control={control}
          rules={{ required: "Este campo es requerido" }}
          render={({ field }) => (
            <>
              <select
                className="create-form__field-input"
                {...field}
                defaultValue={""}
              >
                <option value="" disabled>
                  Seleccione la Metodologia de diseño
                </option>
                {PROJECT_CONTANTS.methodDesign.map((c, i) => (
                  <option value={c} key={i}>
                    {c}
                  </option>
                ))}
              </select>
              <span className="create-form__field-error">
                {errors.designMethodology?.message as ReactNode}
              </span>
            </>
          )}
        />
      </span>

      <span className="create-form__field">
        <label>Integración AI:</label>
        <Controller
          name="hasAI"
          control={control}
          render={({ field }) => (
            <>
              <Toggle
                onValue={(value) => field.onChange(value)}
                defaultValue={!!field.value}
              />
              <span className="create-form__field-error">
                {errors.hasAI?.message as ReactNode}
              </span>
            </>
          )}
        />
      </span>

      <span className="create-form__field">
        <label>Colaboradores:</label>
        <Controller
          name="collaborators"
          control={control}
          rules={{ required: "Este campo es requerido" }}
          render={({ field }) => (
            <>
              <Multiselect
                options={PROJECT_CONTANTS.partners.map((c) => ({
                  value: c,
                  label: c,
                }))}
                initialValue={project?.collaborators}
                onChange={field.onChange}
                placeholder="Seleccione el tipo de colaboradores"
              />
              <span className="create-form__field-error">
                {errors.collaborators?.message as ReactNode}
              </span>
            </>
          )}
        />
      </span>

      <span className="create-form__field">
        <label>Optimización de Recursos:</label>
        <Controller
          name="resourceOptimization"
          control={control}
          rules={{ required: "Este campo es requerido" }}
          render={({ field }) => (
            <>
              <Multiselect
                options={PROJECT_CONTANTS.resourcesOptimization.map((c) => ({
                  value: c,
                  label: c,
                }))}
                initialValue={project?.resourceOptimization}
                onChange={field.onChange}
                placeholder="Seleccione la optimizacion de recursos"
              />
              <span className="create-form__field-error">
                {errors.resourceOptimization?.message as ReactNode}
              </span>
            </>
          )}
        />
      </span>

      <span className="create-form__field">
        <label>Ubicación:</label>
        <Controller
          name="location"
          control={control}
          rules={{ required: "Este campo es requerido" }}
          render={({ field }) => (
            <>
              <input
                className="create-form__field-input"
                {...field}
                type="text"
                placeholder="Ingrese la locacion donde se desarrollará el proyecto"
              />
              <span className="create-form__field-error">
                {errors.location?.message as ReactNode}
              </span>
            </>
          )}
        />
      </span>

      <span className="create-form__field">
        <label>Tecnología de Fabricación:</label>
        <Controller
          name="manufacturingTechnology"
          control={control}
          rules={{ required: "Este campo es requerido" }}
          render={({ field }) => (
            <>
              <Multiselect
                options={PROJECT_CONTANTS.technology.map((c) => ({
                  value: c,
                  label: c,
                }))}
                initialValue={project?.manufacturingTechnology}
                onChange={field.onChange}
                placeholder="Seleccione las tecnologias que empleo en la fabricacion"
              />
              <span className="create-form__field-error">
                {errors.manufacturingTechnology?.message as ReactNode}
              </span>
            </>
          )}
        />
      </span>

      <span className="create-form__field">
        <label>Estado de Desarrollo:</label>
        <Controller
          name="developmentStatus"
          control={control}
          rules={{ required: "Este campo es requerido" }}
          render={({ field }) => {
            const percentage = Math.floor(field.value! * 100);
            const status = 
              percentage < 25 ? "Etapa Inicial" :
              percentage < 50 ? "Etapa Media" :
              percentage < 75 ? "Etapa Avanzada" : "Etapa de Conclusión";
          return (
            <>
              <span className="create-form__field-range">
                <p className="create-form__field-range-text">Seleccione el estado de desarrollo en el que se encuentra el
                proyecto:</p>
                <span className="create-form__field-range-card">
                <p className="create-form__field-range-card-text">{`${percentage}%`} - <b className="create-form__field-range-card-text-bold">{status}</b></p>
                <input style={{padding: 0}} type="range" min={0} max={1} step={0.05} {...field}  className="create-form__field-range-card-input"/>
                </span>
              </span>
              <span className="create-form__field-error">
                {errors.developmentStatus?.message as ReactNode}
              </span>
            </>
          )
          }}
        />
      </span>

      <span className="create-form__field">
        <label>Nivel de Riesgo:</label>
        <Controller
          name="riskLevel"
          control={control}
          rules={{ required: "Este campo es requerido" }}
          render={({ field }) => (
            <>
              <select
                className="create-form__field-input"
                {...field}
                defaultValue={""}
              >
                <option value="" disabled>
                  Seleccione el nivel de riesgo del proyecto
                </option>
                {PROJECT_CONTANTS.risk.map((c, i) => (
                  <option value={c} key={i}>
                    {c}
                  </option>
                ))}
              </select>
              <span className="create-form__field-error">
                {errors.riskLevel?.message as ReactNode}
              </span>
            </>
          )}
        />
      </span>

      <span className="create-form__field">
        <label>Tipo de Recompensa:</label>
        <Controller
          name="rewardType"
          control={control}
          rules={{ required: "Este campo es requerido" }}
          render={({ field }) => (
            <>
              <Multiselect
                options={PROJECT_CONTANTS.reward.map((c) => ({
                  value: c,
                  label: c,
                }))}
                initialValue={project?.rewardType}
                onChange={field.onChange}
                placeholder="Seleccione los beneficios o recompensas del proyecto"
              />
              <span className="create-form__field-error">
                {errors.rewardType?.message as ReactNode}
              </span>
            </>
          )}
        />
      </span>

      <span className="create-form__field">
        <label>Periodo de Retorno:</label>
        <Controller
          name="returnPeriod"
          control={control}
          rules={{
            required: "Este campo es requerido",
            min: { value: 1, message: "El valor mínimo es 1" },
          }}
          render={({ field }) => (
            <>
              <input
                className="create-form__field-input"
                {...field}
                type="number"
                placeholder="Ingrese el tiempo en el que la inversion retorna"
              />
              <span className="create-form__field-error">
                {errors.returnPeriod?.message as ReactNode}
              </span>
            </>
          )}
        />
      </span>

      <span className="create-form__field">
        <label>Panorama Competitivo:</label>
        <Controller
          name="competitiveLandscape"
          control={control}
          rules={{ required: "Este campo es requerido" }}
          render={({ field }) => (
            <>
              <Multiselect
                options={PROJECT_CONTANTS.competence.map((c) => ({
                  value: c,
                  label: c,
                }))}
                initialValue={project?.competitiveLandscape}
                onChange={field.onChange}
                placeholder="Seleccione la competencia del proyecto"
              />
              <span className="create-form__field-error">
                {errors.competitiveLandscape?.message as ReactNode}
              </span>
            </>
          )}
        />
      </span>

      <span className="create-form__field">
        <label>Activo:</label>
        <Controller
          name="isActive"
          control={control}
          render={({ field }) => (
            <>
              <Toggle
                onValue={(value) => field.onChange(value)}
                defaultValue={!!field.value}
              />
              <span className="create-form__field-error">
                {errors.isActive?.message as ReactNode}
              </span>
            </>
          )}
        />
      </span>
      <button
        className="create-form__button"
        type="submit"
        onClick={handleSubmit(onSubmit)}
      >
        Enviar
      </button>
    </form>
  );
};

export default ProyectoForm;
