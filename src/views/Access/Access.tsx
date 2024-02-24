import { AccessForm } from "../../components"
import { Login, Register } from "../../constants/forms.constants"
interface AccessProps {
    isLogin: boolean
}

const Access: React.FC<AccessProps> = ({isLogin}) => {
  return (
    <>
        {
            isLogin ? <AccessForm title="Iniciar Sesion" description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi deleniti vel tempore quam cumque nam." fields={Login} isLogin={isLogin}></AccessForm> : <AccessForm title="Registrarse" description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi deleniti vel tempore quam cumque nam." fields={Register} isLogin={isLogin}></AccessForm>
        }
    </>
  )
}

export default Access