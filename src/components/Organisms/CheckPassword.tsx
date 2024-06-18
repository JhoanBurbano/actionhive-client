import React from "react"
import './CheckPassword.style.scss'

interface CheckPasswordProps {
    password: string
}

const CheckPassword: React.FC<CheckPasswordProps> = ({password}) => {

    const hasMoreThan8Characters = () => password.length >= 8
    const hasUppercase = () => /[A-Z]/.test(password)
    const hasLowercase = () => /[a-z]/.test(password)
    const hasNumber = () => /\d/.test(password)

    const sentences = [{
        condition: hasMoreThan8Characters,
        text: '8 caracteres'
    }, {
        condition: hasUppercase,
        text: 'Una mayúscula'
    }, {
        condition: hasLowercase,
        text: 'Una minúscula'
    }, {
        condition: hasNumber,
        text: 'Un número'
    
    }]
    
  return (
    <div className="check">
        {
            sentences.map(({condition, text}) => (
                <span className="check__item">
                    <h2 className="check__item-icon">{!condition() ? '✖️' : '👍'}</h2>
                    <p className="check__item-text">{text}</p>
                </span>
            ))
        }
    </div>
  )
}

export default CheckPassword