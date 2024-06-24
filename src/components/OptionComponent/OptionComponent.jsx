import React from 'react'
import cl from './OptionComponent.module.css'

function OptionComponent({text, isChecked, onChange}) {
  return (
    <div className={cl.optionComponent}>
        <input 
            type='checkbox' 
            id={text} 
            name={text} 
            className={cl.optionComponent__checkbox}
            checked={isChecked}
            onChange={onChange}
        />
        <label htmlFor={text} className={cl.optionComponent__label}>{text}</label>
    </div>
  )
}

export default OptionComponent