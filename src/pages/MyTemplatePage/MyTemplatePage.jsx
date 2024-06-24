import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import SearchInput from '../../components/SearchInput/SearchInput'
import MyReportComponent from '../../components/MyReportComponent/MyReportComponent'
import cl from './MyTemplatePage.module.css'
import SendServer from '../../api/Service'
import { formatDistanceToNow, parseISO } from 'date-fns';
import { ru, se, te } from 'date-fns/locale';
import Footer from '../../components/Footer/Footer'

function MyTemplatePage() {
    const [templates, setTemplates] = useState()
    const [searchQuery, setSearchQuery] = useState('');
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

    const filteredTemplates = searchQuery 
    ? templates.filter(template => template.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : templates;

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
                    <SearchInput placeholder="Поиск" setSearchQuery={setSearchQuery} searchQuery={searchQuery}/>
                </div>
                <div className={cl.content_templates}>
                    {
                        filteredTemplates 
                        ?
                        <div className={cl.templates}>
                            {
                                filteredTemplates.map((template) => (
                                    <MyReportComponent key={template.id} title={template.name} date={formatDate(template.create_date)}/>
                                ))
                            }
                        </div>
                        :
                        <div>Нет документов</div>
                    }
                
                </div>
            </div>
        </div>
        <Footer/>
    </>
  )
}

export default MyTemplatePage