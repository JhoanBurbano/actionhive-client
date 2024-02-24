import { ReactNode } from "react";
import "./CreateForm.style.scss";
import { useForm, Controller } from "react-hook-form";
import { PROJECT_CONTANTS } from "../../constants/project.constants";
import { DropImages, Multiselect, Toggle } from "..";

const ProyectoForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: Record<string, any>) => {
    // Aquí puedes realizar la lógica para enviar los datos al servidor o realizar otras acciones.
    console.log("Datos del formulario:", data);
  };

  return (
    <form className="create-form" onSubmit={(e) => e.preventDefault()}>
      <h2 className="create-form__title">Nuevo Proyecto</h2>

      <span className="create-form__field">
        <label>Imágenes:</label>
        <Controller
          name="images"
          control={control}
          render={({ field }) => (
            <>
              {/* <input
                className="create-form__field-input"
                {...field}
                type="text"
              /> */}
              <DropImages onSave={(images)=> field.onChange(images)}/>
              <span className="create-form__field-error">
                {errors.images?.message as ReactNode}
              </span>
            </>
          )}
        />
      </span>

      <span className="create-form__field">
        <label>Nombre del Proyecto:</label>
        <Controller
          name="nombre_proyecto"
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
                {errors.nombre_proyecto?.message as ReactNode}
              </span>
            </>
          )}
        />
      </span>

      <span className="create-form__field">
        <label>Objetivo del Proyecto:</label>
        <Controller
          name="objetivo_proyecto"
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
                {errors.objetivo_proyecto?.message as ReactNode}
              </span>
            </>
          )}
        />
      </span>

      <span className="create-form__field">
        <label>Descripción:</label>
        <Controller
          name="descripcion"
          control={control}
          render={({ field }) => (
            <>
              <textarea
                className="create-form__field-input"
                {...field}
                placeholder="Ingrese la descripcion general del proyecto"
              />
              <span className="create-form__field-error">
                {errors.descripcion?.message as ReactNode}
              </span>
            </>
          )}
        />
      </span>

      <span className="create-form__field">
        <label>Categorías del Proyecto:</label>
        <Controller
          name="categorias_proyecto"
          control={control}
          rules={{ required: "Este campo es requerido" }}
          render={({ field }) => (
            <>
              <Multiselect
                options={PROJECT_CONTANTS.category.map((c) => ({
                  value: c,
                  label: c,
                }))}
                onChange={(value) => field.onChange(value)}
                placeholder="Seleccione la categoria del proyecto"
              />
              <span className="create-form__field-error">
                {errors.categorias_proyecto?.message as ReactNode}
              </span>
            </>
          )}
        />
      </span>

      <span className="create-form__field">
        <label>Tope de Financiación:</label>
        <Controller
          name="tope_financiacion"
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
                {errors.tope_financiacion?.message as ReactNode}
              </span>
            </>
          )}
        />
      </span>

      <span className="create-form__field">
        <label>Componentes Mecatrónicos:</label>
        <Controller
          name="componentes_mecatronicos"
          control={control}
          rules={{ required: "Este campo es requerido" }}
          render={({ field }) => (
            <>
              <Multiselect
                options={PROJECT_CONTANTS.components.map((c) => ({
                  value: c,
                  label: c,
                }))}
                onChange={(value) => field.onChange(value)}
                placeholder="Seleccione los componentes mecatronicos"
              />
              <span className="create-form__field-error">
                {errors.categorias_proyecto?.message as ReactNode}
              </span>
            </>
          )}
        />
      </span>

      <span className="create-form__field">
        <label>Plataformas de Control:</label>
        <Controller
          name="plataformas_control"
          control={control}
          rules={{ required: "Este campo es requerido" }}
          render={({ field }) => (
            <>
              <Multiselect
                options={PROJECT_CONTANTS.platform.map((c) => ({
                  value: c,
                  label: c,
                }))}
                onChange={(value) => field.onChange(value)}
                placeholder="Seleccione la plataforma de control"
              />
              <span className="create-form__field-error">
                {errors.categorias_proyecto?.message as ReactNode}
              </span>
            </>
          )}
        />
      </span>

      <span className="create-form__field">
        <label>Metodología de Diseño:</label>
        <Controller
          name="metodologia_diseno"
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
                {errors.categorias_proyecto?.message as ReactNode}
              </span>
            </>
          )}
        />
      </span>

      <span className="create-form__field">
        <label>Integración AI:</label>
        <Controller
          name="integracion_ai"
          control={control}
          render={({ field }) => (
            <>
              <Toggle
                onValue={(value) => field.onChange(value)}
                defaultValue={field.value}
              />
              <span className="create-form__field-error">
                {errors.integracion_ai?.message as ReactNode}
              </span>
            </>
          )}
        />
      </span>

      <span className="create-form__field">
        <label>Colaboradores:</label>
        <Controller
          name="colaboradores"
          control={control}
          rules={{ required: "Este campo es requerido" }}
          render={({ field }) => (
            <>
              <Multiselect
                options={PROJECT_CONTANTS.partners.map((c) => ({
                  value: c,
                  label: c,
                }))}
                onChange={(value) => field.onChange(value)}
                placeholder="Seleccione el tipo de colaboradores"
              />
              <span className="create-form__field-error">
                {errors.categorias_proyecto?.message as ReactNode}
              </span>
            </>
          )}
        />
      </span>

      <span className="create-form__field">
        <label>Optimización de Recursos:</label>
        <Controller
          name="optimizacion_recursos"
          control={control}
          rules={{ required: "Este campo es requerido" }}
          render={({ field }) => (
            <>
              <Multiselect
                options={PROJECT_CONTANTS.resourcesOptimization.map((c) => ({
                  value: c,
                  label: c,
                }))}
                onChange={(value) => field.onChange(value)}
                placeholder="Seleccione la optimizacion de recursos"
              />
              <span className="create-form__field-error">
                {errors.categorias_proyecto?.message as ReactNode}
              </span>
            </>
          )}
        />
      </span>

      <span className="create-form__field">
        <label>Ubicación:</label>
        <Controller
          name="ubicacion"
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
                {errors.ubicacion?.message as ReactNode}
              </span>
            </>
          )}
        />
      </span>

      <span className="create-form__field">
        <label>Tecnología de Fabricación:</label>
        <Controller
          name="tecnologia_fabricacion"
          control={control}
          rules={{ required: "Este campo es requerido" }}
          render={({ field }) => (
            <>
              <Multiselect
                options={PROJECT_CONTANTS.technology.map((c) => ({
                  value: c,
                  label: c,
                }))}
                onChange={(value) => field.onChange(value)}
                placeholder="Seleccione las tecnologias que empleo en la fabricacion"
              />
              <span className="create-form__field-error">
                {errors.categorias_proyecto?.message as ReactNode}
              </span>
            </>
          )}
        />
      </span>

      <span className="create-form__field">
        <label>Estado de Desarrollo:</label>
        <Controller
          name="estado_desarrollo"
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
                  Seleccione el estado de desarrollo en el que se encuentra el
                  proyecto
                </option>
                {PROJECT_CONTANTS.percentage.map((c, i) => (
                  <option value={c} key={i}>
                    {c}
                  </option>
                ))}
              </select>
              <span className="create-form__field-error">
                {errors.categorias_proyecto?.message as ReactNode}
              </span>
            </>
          )}
        />
      </span>

      <span className="create-form__field">
        <label>Nivel de Riesgo:</label>
        <Controller
          name="nivel_riesgo"
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
                {errors.categorias_proyecto?.message as ReactNode}
              </span>
            </>
          )}
        />
      </span>

      <span className="create-form__field">
        <label>Tipo de Recompensa:</label>
        <Controller
          name="tipo_recompensa"
          control={control}
          rules={{ required: "Este campo es requerido" }}
          render={({ field }) => (
            <>
              <Multiselect
                options={PROJECT_CONTANTS.reward.map((c) => ({
                  value: c,
                  label: c,
                }))}
                onChange={(value) => field.onChange(value)}
                placeholder="Seleccione los beneficios o recompensas del proyecto"
              />
              <span className="create-form__field-error">
                {errors.categorias_proyecto?.message as ReactNode}
              </span>
            </>
          )}
        />
      </span>

      <span className="create-form__field">
        <label>Periodo de Retorno:</label>
        <Controller
          name="periodo_retorno"
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
                {errors.periodo_retorno?.message as ReactNode}
              </span>
            </>
          )}
        />
      </span>

      <span className="create-form__field">
        <label>Panorama Competitivo:</label>
        <Controller
          name="panorama_competitivo"
          control={control}
          rules={{ required: "Este campo es requerido" }}
          render={({ field }) => (
            <>
              <Multiselect
                options={PROJECT_CONTANTS.competence.map((c) => ({
                  value: c,
                  label: c,
                }))}
                onChange={(value) => field.onChange(value)}
                placeholder="Seleccione la competencia del proyecto"
              />
              <span className="create-form__field-error">
                {errors.categorias_proyecto?.message as ReactNode}
              </span>
            </>
          )}
        />
      </span>

      <span className="create-form__field">
        <label>Activo:</label>
        <Controller
          name="active"
          control={control}
          render={({ field }) => (
            <>
              <Toggle
                onValue={(value) => field.onChange(value)}
                defaultValue={field.value}
              />
              <span className="create-form__field-error">
                {errors.active?.message as ReactNode}
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
