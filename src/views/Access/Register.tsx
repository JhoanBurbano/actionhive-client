import {useForm} from 'react-hook-form'
import { AccessForm } from '../../components'
import { RegisterData } from '../../interfaces/user.interface'
import { useAppDispatch } from '../../hooks/useDispatch.hook'
import { thunkSignUpWithEmailAndPassword } from '../../redux/thunks/auth.thunk'

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
            console.log('data :>> ', data);
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
            {label: 'Nombre', placeholder: 'Nombre', type: 'firstname'},
            {label: 'Apellido', placeholder: 'Apellido', type: 'lastname'},
            {label: 'Rol', placeholder: 'Rol', type: 'rol'},
            {label: 'Correo', placeholder: 'Correo', type: 'email'},
            {label: 'Contraseña', placeholder: 'Contraseña', type: 'password'},
        ]}
        isLogin={false}
        onSubmit={onSubmit}
    />
  )
}

export default Register