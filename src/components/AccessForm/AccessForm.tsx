import { Link } from 'react-router-dom'
import { Field, Option } from '../../interfaces/forms.interfaces'
import Select from 'react-select'
import './AccessForm.style.scss'
import { useState } from 'react'

interface AccessFormProps {
    title: string,
    description: string,
    fields: Array<Field>,
    isLogin: boolean
}

const AccessFrom: React.FC<AccessFormProps> = ({title ,description, fields, isLogin}) => {
  const options = [
    { value: 'user', label: 'Usuario' },
    { value: 'investor', label: 'Inversionista' }
  ]
  const [selectedOption, setSelectedOption] = useState<Option>();
  return (
    <form className='access-form'>
        <h3 className='access-form__title'>{title}</h3>
        <p className='access-form__description'>{description}</p>
        {
          <>
{          fields.map(({label, placeholder, type}, index)=>(
            <span className='access-form__field' key={index}>
            <label className='access-form__field-label'>{label}</label>
            <input type={type} placeholder={placeholder} className='access-form__field-input'/>
        </span>
          ))}
          {!isLogin && (
            <span className='access-form__field' key={fields.length}>
            <label className='access-form__field-label'>Seleccione su rol</label>
            <Select
          defaultValue={selectedOption}
          onChange={(value)=>{setSelectedOption(value as Option)}}
          options={options}
          isMulti={false}
          className='multiselect-custom'
          placeholder="Registrate como"
          />
            </span>
          )}
          </>
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