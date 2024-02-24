import { Link } from 'react-router-dom'
import { Field } from '../../interfaces/forms.interfaces'
import './AccessForm.style.scss'

interface AccessFormProps {
    title: string,
    description: string,
    fields: Array<Field>,
    isLogin: boolean
}

const AccessFrom: React.FC<AccessFormProps> = ({title ,description, fields, isLogin}) => {
  return (
    <form className='access-form'>
        <h3 className='access-form__title'>{title}</h3>
        <p className='access-form__description'>{description}</p>
        {
          fields.map(({label, placeholder, type}, index)=>(
            <span className='access-form__field' key={index}>
            <label className='access-form__field-label'>{label}</label>
            <input type={type} placeholder={placeholder} className='access-form__field-input'/>
        </span>
          ))
        }
        <button className='access-form__button'>Enviar</button>
        {
          isLogin ?
          <span className='access-form__redirect'>
            <p className='access-form__redirect-text'>¿No tienes cuenta?</p>
            <Link to={'/register'}><p className='access-form__redirect-link'>Registrate</p></Link>
          </span> 
          :
          <span className='access-form__redirect'>
            <p className='access-form__redirect-text'>¿Tienes cuenta?</p>
            <Link to={'/login'}><p className='access-form__redirect-link'>Ingresa</p></Link>
          </span> 
        }
    </form>
  )
}

export default AccessFrom