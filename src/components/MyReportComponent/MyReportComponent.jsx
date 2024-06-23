import React from 'react'
import cl from './MyReportComponent.module.css'
import dot from '../../assets/images/dot.svg'

function MyReportComponent({title, date}) {
  return (
    <div className={cl.myReportComponent}>
        <div className={cl.myReportComponent__info}>
            <div className={cl.info__title}>{title}</div>
            <div className={cl.info__date}>{date}</div>
        </div>
        <div className={cl.myReportComponent__btn}>
            <img src={dot} alt="dot" />
        </div>
    </div>
  )
}

export default MyReportComponent