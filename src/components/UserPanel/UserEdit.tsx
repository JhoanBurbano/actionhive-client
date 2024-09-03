import React, { useEffect, useMemo, useState } from "react";
import * as imageCompression from "browser-image-compression";
import { useDropzone } from "react-dropzone";
import { selectUser } from "../../redux/selectors/auth.selectors";
import "./UserEdit.scss";
import { Controller, useForm } from "react-hook-form";
import { RegisterData } from "../../interfaces/user.interface";
import CheckPassword from "../Organisms/CheckPassword";

interface UserEditProps {
  close?: () => void;
}

const UserEdit: React.FC<UserEditProps> = ({ close }) => {
  const [onConfirm, setOnConfirm] = useState<boolean>(false);
  const [showChangePassword, setShowChangePassword] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const fields = useMemo<
    Array<{ name: keyof RegisterData; label: string; placeholder: string }>
  >(
    () => [
      { name: "firstname", label: "Nombre", placeholder: "ingresa tu Nombre" },
      {
        name: "lastname",
        label: "Apellido",
        placeholder: "ingresa tu Apellido",
      },
      { name: "email", label: "Email", placeholder: "ingresa tu Email" },
      { name: "rol", label: "Rol", placeholder: "ingresa tu Rol" },
      {
        name: "password",
        label: "Contraseña",
        placeholder: "ingresa tu Contraseña",
      },
    ],
    []
  );

  const options = useMemo(() => {
    return [
      { value: "ingeniero", label: "Ingeniero" },
      { value: "financista", label: "Financista" },
      { value: "administrador", label: "Administrador" },
      { value: "emprendedor", label: "Emprendedor" },
      { value: "diseñador", label: "Diseñador" },
      { value: "agricultor", label: "Agricultor" },
    ];
  }, []);

  const user = selectUser();

  const [compressedFile, setCompressedFile] = useState<File>();

  const { control, handleSubmit } = useForm<RegisterData>({
    defaultValues: {
      firstname: user?.profile.firstname,
      lastname: user?.profile.lastname,
      email: user?.profile.email,
      rol: user?.profile.rol,
      password: "",
    },
  });

  const onDrop = async (acceptedFiles: File[]) => {
    const options: imageCompression.Options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 1200,
      useWebWorker: true,
      alwaysKeepResolution: true,
    };

    try {
      const compressedFile = await imageCompression.default(
        acceptedFiles[0],
        options
      );
      const convertedFile = new File(
        [compressedFile as Blob],
        `image_${Date.now()}.jpg`,
        { type: "image/jpeg" }
      );
      setCompressedFile(convertedFile);
      return [convertedFile];
    } catch (error) {
      console.error("Error al comprimir la imagen:", error);
      return [{}] as File[];
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".gif"] },
    multiple: false,
    onDrop,
  });

  const onSubmit = (data: RegisterData) => {
    console.log("onSubmit", data);
  }

  useEffect(() => {
      setCompressedFile(undefined);
      setShowChangePassword(false);
  }, []);


  return (
    <div className="user-edit">
      <form
        action=""
        className="user-edit__container"
        onSubmit={handleSubmit(onSubmit)}
      >
        <button
          className="user-edit__container-close"
          type="button"
          onClick={() => setOnConfirm(true)}
        >
          x
        </button>
        <h2 className="user-edit__container-title">Editar Perfil</h2>
        <figure
          className={`user-edit__container-image ${isDragActive && "active"}`}
          {...getRootProps()}
          title="Cambiar imagen"
        >
          <input {...getInputProps()} />
          {compressedFile || user?.avatar?.url ? (
            <img
              src={
                compressedFile
                  ? URL.createObjectURL(compressedFile)
                  : user?.avatar.url
              }
              alt="avatar"
            />
          ) : (
            <h2>{user?.avatar?.initials}</h2>
          )}
        </figure>
        {fields.map(({ label, name, placeholder }) => (
          <Controller
            name={name}
            control={control}
            rules={!showChangePassword && name === "password" ? { } : { required: "Este campo es requerido" }}
            render={({ field, fieldState: { error } }) => {
              return (
                <span className="user-edit__container-field">
                  {name === "rol" ? (
                    <span className="user-edit__container-field">
                      <label className="user-edit__container-field-label">
                        {label}
                      </label>
                      <select
                        className="user-edit__container-field-input"
                        {...field}
                      >
                        {options.map((opt, index) => (
                          <option key={index} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </span>
                  ) : (
                    <span className="user-edit__container-field">
                      <label className="user-edit__container-field-label">
                        {label}
                      </label>
                      {name === "password" && !showChangePassword ?
                      (
                        <button onClick={() => setShowChangePassword(true)}>
                          Quieres cambiar constraseña
                        </button>
                      ) : (
                        <input
                          type={name === "password" && (showPassword ? "text" : name) || "text"}
                          className="user-edit__container-field-input"
                          placeholder={placeholder}
                          {...field}
                        />
                      ) }
                      {name !== "password" && error && (
                        <p className="user-edit__container-field-error">
                          {error?.message}
                        </p>
                      )}
                      {name === "password" && showChangePassword && (
                        <>
                          {field.value && (
                            <button type="button" onClick={()=>setShowPassword(v => !v)}>Mostrar</button>
                          )}
                          <CheckPassword password={field.value} />
                        </>
                      )}
                    </span>
                  )}
                </span>
              );
            }}
          />
        ))}
        <button className="user-edit__container-button">Guargar cambios</button>
        {
            onConfirm &&
        <ConfirmModal
          close={() => setOnConfirm(false)}
          onConfirm={() => {
            close?.();
            setOnConfirm(false);
          }}
        />
        }
        {/* <input type="text" placeholder="Nombre"></input>
        <input type="text" placeholder="Apellido"></input>
        <input type="text" placeholder="Email"></input>
        <input type="text" placeholder="Rol"></input>
        <input type="text" placeholder="Contraseña"></input>
        <input type="text" placeholder="Confirmar Contraseña"></input> */}
      </form>
    </div>
  );
};

interface ConfirmModalProps {
  close: () => void;
  onConfirm: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  close,
  onConfirm,
}) => {
  return (
    <div className="confirm-modal">
      <div className="confirm-modal__container">
        <h2 className="confirm-modal__container-title">¿Estás seguro?</h2>
        <button className="confirm-modal__container-button" onClick={onConfirm}>
          Descartar cambios
        </button>
        <button className="confirm-modal__container-button" onClick={close}>
          Seguir editando
        </button>
      </div>
    </div>
  );
};

export default UserEdit;
