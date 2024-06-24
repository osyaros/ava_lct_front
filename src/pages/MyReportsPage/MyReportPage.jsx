import React, { useEffect, useState } from 'react'
import cl from './MyReportPage.module.css'
import Header from '../../components/Header/Header'
import SearchInput from '../../components/SearchInput/SearchInput'
import YellowBtn from '../../UI/YellowBtn/YellowBtn'
import MyReportComponent from '../../components/MyReportComponent/MyReportComponent'
import WhiteBtn from '../../UI/WhiteBtn/WhiteBtn'
import FilterComponent from '../../components/FilterComponent/FilterComponent'
import { formatDistanceToNow, parseISO } from 'date-fns';
import { ru, se } from 'date-fns/locale';
import SendServer from '../../api/Service'
import Footer from '../../components/Footer/Footer'

function MyReportPage() {
    const [reports, setReports] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isFilters, setIsFilters] = useState(false);
    const [filters] = useState([
        {title: 'Период', options: [
            {id: 0, text: 'Последний час'},
            {id: 1, text: 'Последние 12 часов'},
            {id: 2, text: 'Последние сутки'},
            {id: 3, text: 'Последние 3 дня'},
            {id: 4, text: 'Последняя неделя'},
            {id: 5, text: 'Последний месяц'},
            {id: 6, text: 'Последний год'},
        ]},
        {title: 'LLM модель', options: [
            {id: 0, text: 'ChatGPT'},
            {id: 1, text: 'saiga'},
        ]},
        {title: 'Тематика отчета', options: [
            {id: 0, text: 'Рыночные анализы'},
            {id: 1, text: 'Финансовый анализ'},
            {id: 2, text: 'Сравнение продуктов'},
            {id: 3, text: 'Сравнение технологий'},
            {id: 4, text: 'Анализ конкурентов'},
        ]}
    ])

    const initializeSelectedFilters = () => {
        const initialFilters = {};
        filters.forEach(filter => {
            initialFilters[filter.title] = [];
        });
        return initialFilters;
    };
    
    const [selectedFilters, setSelectedFilters] = useState(initializeSelectedFilters());

    const getAllReports = async () => {
        try{
            const responseReports = await SendServer.getAllReports();
            setReports(responseReports);
        } catch (error){
            console.error(error);
        }
    }

    const closeFilters = () => {
        setIsFilters(false);
    }

    const openFilters = () => {
        setIsFilters(true);
    }

    const handleFilterChange = (filterTitle, optionText) => {
        setSelectedFilters(prevState => {
            const filterOptions = prevState[filterTitle] || [];
            const isSelected = filterOptions.includes(optionText);
    
            return {
                ...prevState,
                [filterTitle]: isSelected
                    ? filterOptions.filter(option => option !== optionText)
                    : [...filterOptions, optionText]
            };
        });
    };

    const formatDate = (isoString) => {
        return formatDistanceToNow(parseISO(isoString), { addSuffix: true, locale: ru});
    };

    const filteredReports = () => {
        let filtered = reports;

        //Фильтр по поисковому запросу
        if(searchQuery) {
            filtered = filtered.filter(report => report.name.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        //Фильтр по LLM модели
        filters.forEach(filter => {
            const selectedOptions = selectedFilters[filter.title];
            if(selectedOptions.length > 0 && filter.title === 'LLM модель'){
                filtered = filtered.filter(report => selectedOptions.includes(report.report_settings.llm_model));
            }
        });        

        // Фильтр по тематике
        filters.forEach(filter => {
            const selectedOptions = selectedFilters[filter.title];
            if(selectedOptions.length > 0 && filter.title === 'Тематика отчета'){
                filtered = filtered.filter(report => selectedOptions.includes(report.report_settings.theme));
            }
        })

        //Фильтр по дате создания отчета
        filters.forEach(filter => {
            const selectedOptions = selectedFilters[filter.title];
            if(selectedOptions.length > 0 && filter.title === 'Период'){
                const currentDate = new Date();
                let fromDate;

                switch(selectedOptions[0]){
                    case 'Последний час':
                        fromDate = new Date(currentDate.getTime() - 60 * 60 * 1000);
                        break;
                    case 'Последние 12 часов':
                        fromDate = new Date(currentDate.getTime() - 12 * 60 * 60 * 1000);
                        break;
                    case 'Последние сутки':
                        fromDate = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);
                        break;
                    case 'Последние 3 дня':
                        fromDate = new Date(currentDate.getTime() - 3 * 24 * 60 * 60 * 1000);
                        break;
                    case 'Последняя неделя':
                        fromDate = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
                        break;
                    case 'Последний месяц':
                        fromDate = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000);
                        break;
                    case 'Последний год':
                        fromDate = new Date(currentDate.getTime() - 365 * 24 * 60 * 60 * 1000);
                        break;
                    default:
                        fromDate = null;
                };
                if(fromDate){
                    filtered = filtered.filter(report => {
                        const reportDate = parseISO(report.create_date);
                        return reportDate >= fromDate;
                    });
                }
            }
        })  

        return filtered;
    }

    useEffect(() => {
        getAllReports();
    }, [])

    const filteredData = filteredReports();

  return (
    <>
        <Header/>
        <div className={cl.myReportPage}>
            <div className={cl.myReportPage__title}>Мои отчеты</div>
            <div className={cl.myReportPage__content}>
                <div className={cl.content_search}>
                    <SearchInput placeholder="Поиск" setSearchQuery={setSearchQuery} searchQuery={searchQuery}/>
                    {
                        isFilters 
                        ?
                        <WhiteBtn onClick={closeFilters}>Скрыть</WhiteBtn>
                        :
                        <YellowBtn onClick={openFilters}>Фильтр</YellowBtn>
                    }
                </div>
                {
                    isFilters && (
                        <div className={cl.content__filters}>
                            {
                                filters && filters.map((filter, index) => (
                                    <FilterComponent 
                                        key={index}
                                        title={filter.title} 
                                        options={filter.options}
                                        selectedOptions={selectedFilters[filter.title]}
                                        onFilterChange={handleFilterChange}
                                    />
                                ))
                            }
                        </div>
                    )
                }
                
                <div className={cl.content_reports}>
                    {
                        filteredData.length > 0
                        ?
                        <div className={cl.reports}>
                            {
                                filteredData.map((report, index) => (
                                    <MyReportComponent key={index} title={report.name} date={formatDate(report.create_date)}/>
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

export default MyReportPage