import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import SearchInput from '../../components/SearchInput/SearchInput'
import MyReportComponent from '../../components/MyReportComponent/MyReportComponent'
import cl from './MyTemplatePage.module.css'

function MyTemplatePage() {
    const [templates] = useState([
        {title: 'Шаблон для анализа рынка труда', date: '1 день назад'},
        {title: 'Шаблон 3', date: '3 дня назад'},
        {title: 'Шаблон для анализа рынка ценных бумаг', date: '8 дней назад'},
        {title: 'Шаблон 2', date: '23 дня назад'},
        {title: 'Шаблон для анализа компаний', date: '24 дня назад'},
        {title: 'Шаблон 1', date: '2 месяца назад'},
    ])
  return (
    <>
        <Header/>
        <div className={cl.myTemplatePage}>
            <div className={cl.myTemplatePage__title}>Мои шаблоны</div>
            <div className={cl.myTemplatePage__content}>
                <div className={cl.contentTemplate_search}>
                    <SearchInput placeholder="Поиск"/>
                </div>
                <div className={cl.content_templates}>
                    {
                        templates 
                        ?
                        <div className={cl.templates}>
                            {
                                templates.map((report, index) => (
                                    <MyReportComponent key={index} title={report.title} date={report.date}/>
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

export default MyTemplatePage