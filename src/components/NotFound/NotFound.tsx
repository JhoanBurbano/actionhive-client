import './NotFound.style.scss'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigation = useNavigate()

    const goToHome = () => {
        navigation('/')
    }

  return (
        <section className='not-found__container'>
            <h1 className='not-found__container-title'>404</h1>
            <p className='not-found__container-description'>Parece que te has perdido</p>
            <button className='not-found__container-button' onClick={goToHome}>Volver al inicio</button>
        </section>
  )
}

export default NotFound