import React from 'react'
import cl from './MyReportComponent.module.css'
import { useNavigate } from 'react-router'

function MyReportComponent({id, title, date, type}) {
  const navigate = useNavigate();

  const showReport = () => {
    if(type === 'report'){
      navigate(`/report/${id}`)
    } else if(type === 'template'){
      navigate(`/template/${id}`)
    }
  }

  return (
    <div className={cl.myReportComponent} onClick={() => showReport()}>
        <div className={cl.myReportComponent__info}>
            <div className={cl.info__title}>{title}</div>
            <div className={cl.info__date}>{date}</div>
        </div>
    </div>
  )
}

export default MyReportComponent