import React, { useState } from 'react'
import cl from './MyReportPage.module.css'
import Header from '../../components/Header/Header'
import SearchInput from '../../components/SearchInput/SearchInput'
import YellowBtn from '../../UI/YellowBtn/YellowBtn'
import MyReportComponent from '../../components/MyReportComponent/MyReportComponent'
import WhiteBtn from '../../UI/WhiteBtn/WhiteBtn'
import FilterComponent from '../../components/FilterComponent/FilterComponent'

function MyReportPage() {
    const [reports] = useState([
        {title: 'Анализ нефтегазового рынка', date: '1 день назад'},
        {title: 'Анализ финансового рынка', date: '3 дня назад'},
        {title: 'Анализ рынка ценных бумаг', date: '8 дней назад'},
        {title: 'Анализ рынка труда', date: '23 дня назад'},
        {title: 'Сравнение Apple и Samsung', date: '24 дня назад'},
        {title: 'Анализ конкурентов Северстали', date: '2 месяца назад'},
    ])

    const [isFilters, setIsFilters] = useState(false);
    const [filters, setFilters] = useState([
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
            {id: 1, text: 'ChatGPT'},
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

  return (
    <>
        <Header/>
        <div className={cl.myReportPage}>
            <div className={cl.myReportPage__title}>Мои отчеты</div>
            <div className={cl.myReportPage__content}>
                <div className={cl.content_search}>
                    <SearchInput placeholder="Поиск"/>
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
                        reports 
                        ?
                        <div className={cl.reports}>
                            {
                                reports.map((report, index) => (
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

export default MyReportPage