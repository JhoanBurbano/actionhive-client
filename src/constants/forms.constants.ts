import { Field } from "../interfaces/forms.interfaces";

export const Login: Array<Field> = [
    {
        type: 'text',
        placeholder: 'Ingrese su email',
        label: 'Email',
    },
    {
        type: 'password',
        placeholder: 'Ingrese su contraseña',
        label: 'Password',
    }
]



export const Register: Array<Field> = [
    {
        type: 'text',
        placeholder: 'Ingrese su nombre',
        label: 'Nombre',
    },
    {
        type: 'text',
        placeholder: 'Ingrese su apellido',
        label: 'Apellido',
    },
    {
        type: 'text',
        placeholder: 'Ingrese su email',
        label: 'Email',
    },
    {
        type: 'password',
        placeholder: 'Ingrese su contraseña',
        label: 'Password',
    }
]