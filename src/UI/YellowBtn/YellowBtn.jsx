import React from 'react'
import cl from './YellowBtn.module.css'

function YellowBtn({onClick, children, width}) {
  return (
    <div className={cl.yellowBtn_wrapper} onClick={() => onClick()}>
        <button className={cl.yellowBtn} style={{ maxWidth: width}}>{children}</button>
    </div>
  )
}

export default YellowBtn