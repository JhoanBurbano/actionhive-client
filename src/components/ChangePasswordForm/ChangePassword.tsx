import { Controller, useForm } from "react-hook-form";
import "./ChangePassword.style.scss";
import { PASSWORD_REGEX } from "../../constants/regex.constants";
import { changePassword } from "../../services/auth.service";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import CheckPassword from "../Organisms/CheckPassword";

interface ChangePasswordProps {
  token: string;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({
    token,
}) => {
  const { control, handleSubmit } = useForm<{ password: string }>({
    mode: "onTouched",
    defaultValues: { password: "" },
  });

  const navigate = useNavigate();

  const onSubmit = async (data: { password: string }) => {
    try {
      await changePassword(data.password, token);
      navigate("/login");
      toast('✅ Contraseña cambiada con éxito', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
    } catch (error: any) {
        console.log("error :>> ", error?.message?.message || "Hubo un error al cambiar la contraseña" );
        toast('✅ Contraseña cambiada con éxito', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
    }
  };

  return (
    <form className="change-password" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="change-password__title">Cambia tu contraseña</h2>
      <p className="change-password__description">
        Ingresa tu contraseña nueva.
      </p>
      <Controller
        name="password"
        control={control}
        rules={{
          required: "Debes ingresar tu nueva contraseña",
          pattern: {
            value: PASSWORD_REGEX,
            message: "Ingresa una contraseña válida",
          },
        }}
        render={({ field }) => (
          <span className="change-password__field">
            <label className="change-password__field-label" htmlFor="email">
              Contraseña
            </label>
            <input
              className="change-password__field-input"
              id="contraseña"
              placeholder="Ingresa tu contraseña nueva"
              type="password"
              {...field}
            />
            <CheckPassword password={field.value} />
          </span>
        )}
      />
      <button className="change-password__button" type="submit">
        Cambiar Contraseña
      </button>
    </form>
  );
};

export default ChangePassword;
