import React from 'react'
import cl from './WhiteBtn.module.css'

function WhiteBtn({onClick, children}   ) {
  return (
    <div className={cl.whiteBtn_wrapper} onClick={() => onClick()}>
        <button className={cl.whiteBtn}>{children}</button>
    </div>
  )
}

export default WhiteBtn