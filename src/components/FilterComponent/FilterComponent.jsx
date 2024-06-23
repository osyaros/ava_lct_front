import React from 'react'
import cl from './FilterComponent.module.css'
import OptionComponent from '../OptionComponent/OptionComponent'

function FilterComponent({title, options, selectedOptions, onFilterChange}) {
  return (
    <div className={cl.filterComponent}>
        <div className={cl.filterComponent__title}>
            {title}
        </div>
        <div className={cl.filterComponent__options}>
            {
                options && options.map((option, index) => (
                    <OptionComponent 
                        key={index} 
                        text={option.text}
                        isChecked={selectedOptions.includes(option.text)}
                        onChange={() => onFilterChange(title, option.text)}
                    />
                ))
            }
        </div>
    </div>
  )
}

export default FilterComponent