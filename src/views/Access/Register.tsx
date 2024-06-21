import {useForm} from 'react-hook-form'
import { AccessForm } from '../../components'
import { RegisterData } from '../../interfaces/user.interface'
import { useAppDispatch } from '../../hooks/useDispatch.hook'
import { thunkSignUpWithEmailAndPassword } from '../../redux/thunks/auth.thunk'
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../constants/regex.constants'

const Register = () => {

    const dispatch = useAppDispatch()

    const {control, handleSubmit} = useForm<RegisterData>({
        defaultValues: {
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            rol: ''
        }
    })

    const onSubmit = async () => {
        console.log('onSubmit')
        const submit = handleSubmit((data: RegisterData)=>{
            dispatch(thunkSignUpWithEmailAndPassword(data))
        })
        submit()
    }

  return (
    <AccessForm
        title="Regístrate"
        description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi deleniti vel tempore quam cumque nam."
        control={control}
        fields={[
            {label: 'Nombre', placeholder: 'Nombre', type: 'firstname', rules: {minLength: {value: 3, message: 'El nombre debe tener al menos 3 caracteres'}}},
            {label: 'Apellido', placeholder: 'Apellido', type: 'lastname', rules: {minLength: {value: 3, message: 'El nombre debe tener al menos 3 caracteres'}}},
            {label: 'Rol', placeholder: 'Rol', type: 'rol'},
            {label: 'Correo', placeholder: 'Correo', type: 'email',  rules: {pattern: {value: EMAIL_REGEX, message: 'Email no válido'}}},
            {label: 'Contraseña', placeholder: 'Contraseña', type: 'password', rules: {pattern: {value: PASSWORD_REGEX, message: 'Contraseña no válida'}}},
        ]}
        isLogin={false}
        onSubmit={onSubmit}
    />
  )
}

export default Register