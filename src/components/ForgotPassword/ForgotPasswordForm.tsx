import { Controller, useForm } from "react-hook-form";
import { EMAIL_REGEX } from "../../constants/regex.constants";
import { useState } from "react";
import { forgotPassword } from "../../services/auth.service";
import "./ForgotPasswordForm.style.scss";
import { Link } from "react-router-dom";

interface ForgotPasswordFormProps {}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = () => {
  const [tokenSent, setTokenSent] = useState<boolean>(false);

  const { control, handleSubmit } = useForm<{ email: string }>({
    mode: "onTouched",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: { email: string }) => {
    try {
      await forgotPassword(data.email);
      setTokenSent(true);
    } catch (error) {}
  };

  return (
    <form className="forgot-password" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="forgot-password__title">Recuperacion de Contraseña</h2>
      {tokenSent ? (
        <span className="forgot-password__token-sent">
            <img src="https://cdn-icons-png.flaticon.com/256/2585/2585167.png" alt="sent" height={100}/>
          <h2>Link Enviado</h2>
          <p>Hemos enviado un link a tu email para recuperar tu contraseña.</p>
          <Link to={'/login'}>
          <button className="forgot-password__button">
            Volver
          </button>
          </Link>
        </span>
      ) : (
        <>
          <p className="forgot-password__description">
            Ingresa tu email y nosótros te enviaremos un link para recuperar tu
            contraseña.
          </p>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Debes ingresar tu email",
              pattern: {
                value: EMAIL_REGEX,
                message: "Ingresa un email válido",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <span className="forgot-password__field">
                <label className="forgot-password__field-label" htmlFor="email">
                  Email
                </label>
                <input
                  className="forgot-password__field-input"
                  id="email"
                  placeholder="Ingresa tu email"
                  {...field}
                />
                <span className="forgot-password__field-error">
                  {error?.message}
                </span>
              </span>
            )}
          />
          <button className="forgot-password__button" type="submit">
            Send
          </button>
        </>
      )}
    </form>
  );
};

export default ForgotPasswordForm;
