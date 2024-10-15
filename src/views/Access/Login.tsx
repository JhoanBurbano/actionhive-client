import {useForm} from 'react-hook-form'
import { AccessForm } from '../../components'
import { LoginData } from '../../interfaces/user.interface'
import { useAppDispatch } from '../../hooks/useDispatch.hook'
import { thunkSignInWithEmailAndPassword } from '../../redux/thunks/auth.thunk'

const Login = () => {

    const dispatch = useAppDispatch()

    const {control, handleSubmit, setValue} = useForm<LoginData>({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit = async (isInvestor: boolean) => {
        const submit = handleSubmit((data: LoginData)=>{
            dispatch(thunkSignInWithEmailAndPassword({...data, isInvestor}))
            setValue('password', '')
        })
        submit()
    }

  return (
    <AccessForm
        title="Iniciar Sesion"
        description="Ingresa tus datos para iniciar sesion"
        control={control}
        fields={[
            {label: 'Correo', placeholder: 'Correo', type: 'email'},
            {label: 'Contraseña', placeholder: 'Contraseña', type: 'password', rules: {minLength: {value: 8, message: 'La contraseña debe tener al menos 6 caracteres'}}},
        ]}
        isLogin={true}
        onSubmit={onSubmit}
    />
  )
}

export default Login