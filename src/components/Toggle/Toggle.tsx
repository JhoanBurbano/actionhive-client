import { useState } from "react"
import './Toggle.styles.scss'

interface ToggleProps {
    onValue: (v: boolean)=>void,
    defaultValue: boolean,
}
const Toggle: React.FC<ToggleProps> = ({onValue, defaultValue}) => {
    const [value, setValue] = useState<boolean>(!!defaultValue)
    function toggleValue(v: boolean) {
        setValue(v)
        onValue(v)
    }
  return (
    <div className="toggle">
        <button onClick={()=>toggleValue(true)} className={(value ? 'active ' : '') + 'toggle__button'}>SI</button>
        <button onClick={()=>toggleValue(false) } className={(!value ? 'active ' : '') + 'toggle__button'}>NO</button>
    </div>
  )
}

export default Toggle