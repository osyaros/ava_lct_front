import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import SearchInput from '../../components/SearchInput/SearchInput'
import MyReportComponent from '../../components/MyReportComponent/MyReportComponent'
import cl from './MyTemplatePage.module.css'
import SendServer from '../../api/Service'
import { formatDistanceToNow, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';

function MyTemplatePage() {
    const [templates, setTemplates] = useState()

    const getAllTemplates = async () => {
        try {
            const responseTemplates = await SendServer.getAllTemplates();
            setTemplates(responseTemplates);
        } catch (error) {
            console.error(error);
        }       
    }

    const formatDate = (isoString) => {
        return formatDistanceToNow(parseISO(isoString), { addSuffix: true, locale: ru});
    };

    useEffect(() => {
        getAllTemplates();
    }, [])

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
                                templates.map((report) => (
                                    <MyReportComponent key={report.id} title={report.name} date={formatDate(report.create_date)}/>
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