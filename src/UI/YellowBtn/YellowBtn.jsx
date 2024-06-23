import React from 'react'
import cl from './YellowBtn.module.css'

function YellowBtn({onClick, children}) {
  return (
    <div className={cl.yellowBtn_wrapper}>
        <button className={cl.yellowBtn}>{children}</button>
    </div>
  )
}

export default YellowBtn