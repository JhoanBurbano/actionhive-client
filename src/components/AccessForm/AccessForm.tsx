import { Link, useNavigate } from "react-router-dom";
import { Field, Option } from "../../interfaces/forms.interfaces";
import Select from "react-select";
import "./AccessForm.style.scss";
import { useEffect, useState } from "react";
import { Control, Controller } from "react-hook-form";
import { selectUser } from "../../redux/slices/auth.slice";
import { useSelector } from "react-redux";

interface AccessFormProps {
  title: string;
  description: string;
  fields: Array<Field>;
  isLogin: boolean;
  control: Control<any>;
  onSubmit?: () => void;
}

const AccessFrom: React.FC<AccessFormProps> = ({
  title,
  description,
  fields,
  isLogin,
  control,
  onSubmit,
}) => {

  const user = useSelector(selectUser);

  const navigation = useNavigate();

  useEffect(() => {
    if (user !== null) {
      navigation("/dashboard");
    }
  }, [user]);

  const options = [
    { value: "ingeniero", label: "Ingeniero" },
    { value: "financista", label: "Financista" },
    { value: "administrador", label: "Administrador" },
    { value: "emprendedor", label: "Emprendedor" },
    { value: "diseñador", label: "Diseñador" },
    { value: "agricultor", label: "Agricultor" },
  ];
  const [selectedOption, setSelectedOption] = useState<Option>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.();
  };

  return (
    <form className="access-form" onSubmit={handleSubmit}>
      <h3 className="access-form__title">{title}</h3>
      <p className="access-form__description">{description}</p>
      {
        <>
          {fields.map(({ label, placeholder, type }, index) => (
            <Controller
              key={index}
              name={type}
              control={control}
              rules={{ required: "Este campo es requerido" }}
              render={({ field, fieldState: { invalid, error } }) => (
                <>
                  {type === "rol" ? (
                    <>
                    <label className="access-form__field-label">
                      {label}
                    </label>
                    <Select
                      defaultValue={selectedOption}
                      onChange={(value) => {
                        setSelectedOption(value as Option);
                      }}
                      options={options}
                      isMulti={false}
                      className="multiselect-custom"
                      placeholder="Registrate como"
                    />
                    </>
                  ) : (
                    <span className="access-form__field">
                      <label className="access-form__field-label">
                        {label}
                      </label>
                      <input
                        type={type}
                        placeholder={placeholder}
                        className="access-form__field-input"
                        {...field}
                      />
                      <span>{invalid && error?.message}</span>
                      {type === "password" && isLogin && (
                        <Link
                          to={"/forgot-password"}
                          className="access-form__field-link"
                        >
                          ¿Olvidaste tu contraseña?
                        </Link>
                      )}
                    </span>
                  )}
                </>
              )}
            />
          ))}
        </>
      }
      <button className="access-form__button">Enviar</button>
      {isLogin ? (
        <span className="access-form__redirect">
          <p className="access-form__redirect-text">¿No tienes cuenta?</p>
          <Link to={"/register"}>
            <p className="access-form__redirect-link">Registrate</p>
          </Link>
        </span>
      ) : (
        <span className="access-form__redirect">
          <p className="access-form__redirect-text">¿Tienes cuenta?</p>
          <Link to={"/login"}>
            <p className="access-form__redirect-link">Ingresa</p>
          </Link>
        </span>
      )}
    </form>
  );
};

export default AccessFrom;
