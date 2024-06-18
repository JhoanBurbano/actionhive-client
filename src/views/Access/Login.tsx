import {useForm} from 'react-hook-form'
import { AccessForm } from '../../components'
import { LoginData } from '../../interfaces/user.interface'
import { useAppDispatch } from '../../hooks/useDispatch.hook'
import { thunkSignInWithEmailAndPassword } from '../../redux/thunks/auth.thunk'

const Login = () => {

    const dispatch = useAppDispatch()

    const {control, handleSubmit} = useForm<LoginData>({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit = async () => {
        const submit = handleSubmit((data: LoginData)=>{
            console.log('data :>> ', data);
            dispatch(thunkSignInWithEmailAndPassword(data))
        })
        submit()
    }

  return (
    <AccessForm
        title="Iniciar Sesion"
        description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi deleniti vel tempore quam cumque nam."
        control={control}
        fields={[
            {label: 'Correo', placeholder: 'Correo', type: 'email'},
            {label: 'Contraseña', placeholder: 'Contraseña', type: 'password'}
        ]}
        isLogin={true}
        onSubmit={onSubmit}
    />
  )
}

export default Login