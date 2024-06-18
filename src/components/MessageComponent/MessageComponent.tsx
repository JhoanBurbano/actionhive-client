import React from 'react'
import { Link } from 'react-router-dom'
import './MessageComponent.style.scss'

interface MessageComponentProps {
    title: string,
    description: string,
    type?: 'success' | 'error' | 'warning' | 'sent'
}

const MessageComponent: React.FC<MessageComponentProps> = ({
    title,
    description,
    type = 'success'
}) => {

    const renderIcon = () => {
        switch (type) {
        case 'error':
            return 'https://cdn-icons-png.flaticon.com/256/7699/7699001.png'
        case 'warning':
            return 'https://cdn-icons-png.flaticon.com/512/3756/3756712.png'
        case 'sent':
            return 'https://cdn-icons-png.flaticon.com/256/2585/2585167.png'
        default:
            return 'https://cdn-icons-png.flaticon.com/512/148/148767.png'
        }
    }

  return (
    <div className="message">
    <h2 className="message__title">Cambia tu contraseña</h2>
    <p className="message__description">
      Ingresa tu contraseña nueva.
    </p>

    <span className="forgot-password__token-sent">
            <img src={renderIcon()} alt="sent" height={100}/>
          <h2>{title}</h2>
          <p>{description}</p>
          <Link to={'/login'}>
          <button className="forgot-password__button">
            Volver
          </button>
          </Link>
        </span>
  </div>
  )
}

export default MessageComponent