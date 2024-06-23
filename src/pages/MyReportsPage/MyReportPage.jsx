import React, { useState } from 'react'
import cl from './MyReportPage.module.css'
import Header from '../../components/Header/Header'
import SearchInput from '../../components/SearchInput/SearchInput'
import YellowBtn from '../../UI/YellowBtn/YellowBtn'
import MyReportComponent from '../../components/MyReportComponent/MyReportComponent'

function MyReportPage() {
    const [reports] = useState([
        {title: 'Анализ нефтегазового рынка', date: '1 день назад'},
        {title: 'Анализ финансового рынка', date: '3 дня назад'},
        {title: 'Анализ рынка ценных бумаг', date: '8 дней назад'},
        {title: 'Анализ рынка труда', date: '23 дня назад'},
        {title: 'Сравнение Apple и Samsung', date: '24 дня назад'},
        {title: 'Анализ конкурентов Северстали', date: '2 месяца назад'},
    ])
  return (
    <>
        <Header/>
        <div className={cl.myReportPage}>
            <div className={cl.myReportPage__title}>Мои отчеты</div>
            <div className={cl.myReportPage__content}>
                <div className={cl.content_search}>
                    <SearchInput placeholder="Поиск"/>
                    <YellowBtn>Фильтр</YellowBtn>
                </div>
                <div className={cl.content_reports}>
                    {
                        reports 
                        ?
                        <div className={cl.reports}>
                            {
                                reports.map((report) => (
                                    <MyReportComponent title={report.title} date={report.date}/>
                                ))
                            }
                        </div>
                        :
                        <div>Нет документов</div>
                    }
                
                </div>
            </div>
        </div>
    </>
  )
}

export default MyReportPage