import React, { useEffect, useRef, useState } from 'react'
import cl from './ProfileField.module.css'

function ProfileField({title, text, onChange}) {
  const inputRef = useRef(null);
  const [isEdit, setIsEdit] = useState(false);
  const [inputValue, setInputValue] = useState(text);

  const editField = () => {
    setIsEdit(!isEdit);
    if(!isEdit){
      inputRef.current.focus();
    }    
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    onChange(inputValue !== text);
  }, [inputValue, text, onChange])

  return (
    <div className={cl.profileField}>
        <div className={cl.profileField__title}>
            <span>{title}</span> | <button onClick={editField}>Изменить</button>
        </div>
        <input 
          ref={inputRef} 
          type="text" 
          value={inputValue}
          placeholder={text}
          onChange={handleInputChange} 
          className={cl.profileField__input}
          readOnly={!isEdit}
        />
    </div>
  )
}

export default ProfileField