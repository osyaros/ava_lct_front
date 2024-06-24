import React, { useMemo, useState } from 'react';
import Header from '../../components/Header/Header';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DragCard from '../../components/DragCard/DragCard';
import DropZone from '../../components/DropZone/DropZone';
import Footer from '../../components/Footer/Footer'
import baseUrl from '../../../config.js'

import axios from 'axios';

import cls from './styles.module.scss';

import aDD from '../../assets/images/add.svg'
import dEL from '../../assets/images/close.svg'


const CreateReportPage = () => {
  const [selectedRadio, setSelectedRadio] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [textInput, setTextInput] = useState('');
  const [theme, setTheme] = useState('');
  const [fulltheme,setMaintheme] = useState('');
  const [links, setLinks] = useState([]); 
  const [dateto, setDateTo] = useState('');
  const [datefrom, setDateFrom] = useState('');
  const [settings, setSetting] = useState({})
  const [chartParams, setChartParams] = useState([]);
  const [result, setResult] = useState();
  const [error, setError] = useState('');
  const [openModal, setOpen] = useState(false);
  const [tempName,setTempname] = useState('');
  const [reportID,setReportID] = useState('');
  const [dataCharts, setData]=useState('');
  const handleRadioChange = (e) => {
    const value = e.target.value;
    setSelectedRadio(value);
    setTextInput('');
    setTheme(e.target.alt);
  };
  const handleModelRadio = (e) => {
    
    setSelectedModel(e.target.alt);
    
  };
  

  const handleTextInputChange = (e) => {
    const value = e.target.value;
    setTextInput(value);
    setSelectedRadio('');
    setTheme(value);
  };

  const handleInputFieldChange = (index, event) => {
    const values = [...links];
    values[index] = event.target.value;
    setLinks(values);
  };
  const handleUpdateChartParams = (updatedParams) => {
    setChartParams(updatedParams);
  };
  const handleOpenTempModal = ()=> {
    setOpen(true);
  }
  const handleCloseTempModal= ()=> {
    setOpen(false);
  }
  const handleSaveTemp= async() => {
    const date =new Date();
    const now = date.toISOString()
    console.log(now);
    setSetting({
      "theme": theme,
      "full_theme": fulltheme+"T07:52:33.090Z",
      "start_date": datefrom+"T07:52:33.090Z",
      "end_date": dateto,
      "llm_model": selectedModel}
      );
      console.log(settings);
      const token = localStorage.getItem('jwt_authorization');
      if (!token) {
        setError('Токен не найден');
        return;
      }
    try {
      const response = await axios.post(
        `${baseUrl}/general/report`,
        {
        name:tempName,
        report_type: "template",
        create_date: now,
        blocks:chartParams,
        links:links,
        report_settings: settings},{
          
          headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            
          },
        }
      );
      setResult(response)
      setReportID(response?.data?.id)
      console.log(reportID)
    }catch(error){
      setError(error.response?.data?.message || error.message)
    }
    handleCloseTempModal();
  };
  const handleGenerate= async() => {
      console.log(reportID);
      const token = localStorage.getItem('jwt_authorization');
      if (!token) {
        setError('Токен не найден');
        return;
      }
    try {
      const response = await axios.get(
        `${baseUrl}/general/report/${reportID}/generate`,
        {
          
          headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            
          },
        }
      );
      console.log(response);
      setDataCharts(response?.data?.blocks)
    }catch(error){
      setError(error.response?.data?.message || error.message)
    }
  }

  const addInputField = () => {
    setLinks([...links, '']);
  };
  const removeInputField = (index) => {
    const values = [...links];
    values.splice(index, 1);
    setLinks(values);
  };
  return (
    <>
      <Header />
      <div className={cls.main}>
        <div className={cls.config}>
          <span className={cls.title}>
            Создание нового отчета
          </span>
          <div className={cls.config_table}>
            <div className={cls.category}>
              <div className={cls.category_name}>
                <span>
                  Тематика
                </span>
              </div>
              <form>
                <div className={cls.radio_input}>
                  <input
                    type="radio"
                    name="foo"
                    value="market"
                    checked={selectedRadio === 'market'}
                    onChange={handleRadioChange}
                    alt='Рыночные анализы'
                  />
                  <label>Рыночные анализы</label>
                </div>
                <div className={cls.radio_input}>
                  <input
                    type="radio"
                    name="foo"
                    value="finans"
                    checked={selectedRadio === 'finans'}
                    onChange={handleRadioChange}
                    alt='Финансовый анализ'
                  />
                  <label>Финансовый анализ</label>
                </div>
                <div className={cls.radio_input}>
                  <input
                    type="radio"
                    name="foo"
                    value="products"
                    checked={selectedRadio === 'products'}
                    onChange={handleRadioChange}
                    alt='Сравнение продуктов'
                  />
                  <label>Сравнение продуктов</label>
                </div>
                <div className={cls.radio_input}>
                  <input
                    type="radio"
                    name="foo"
                    value="tech"
                    checked={selectedRadio === 'tech'}
                    onChange={handleRadioChange}
                    alt='Сравнение технологий'
                  />
                  <label>Сравнение технологий</label>
                </div>
                <div className={cls.radio_input}>
                  <input
                    type="radio"
                    name="foo"
                    value="competitor"
                    checked={selectedRadio === 'competitor'}
                    onChange={handleRadioChange}
                    alt='Анализ конкурентов'
                  />
                  <label>Анализ конкурентов</label>
                </div>
                <input className={cls.addvar}
                  placeholder='Добавить вариант'
                  value={textInput}
                  onChange={handleTextInputChange}
                />
              </form>
            </div>
            <div className={cls.category}>
              <div className={cls.category_name}>
                <span>
                  Источники
                </span>
              </div>
              <div className={cls.inputFields}>
              {links.map((input, index) => (
                <div key={index} className={cls.inputFieldWrapper}>
                <input
                  type="text"
                  value={input}
                  onChange={(event) => handleInputFieldChange(index, event)}
                  className={cls.inputField}
                />
                <button onClick={() => removeInputField(index)} className={cls.removeButton}><img src={dEL}/></button>
              </div>
              ))}
              </div>
              <button onClick={addInputField}><img src={aDD}/></button>
            </div>
            <div className={cls.category}>
              <div className={cls.category_name}>
                <span>
                  Временные рамки
                </span>
                <div className={cls.dates}>
                  <input className={cls.date} placeholder='От' onChange={(e)=>setDateFrom(e.target.value)}/>
                  <input className={cls.date} placeholder='До' onChange={(e)=>setDateTo(e.target.value)}/>
                </div>
               
              </div>
            </div>
            <div className={cls.category}>
              <div className={cls.category_name}>
                <span>
                  LLM модель
                </span>
                <div className={cls.models}>
                  <div className={cls.radio_input}>
                    <input
                      type="radio"
                      name="foo"
                      value="saiga"
                      checked={selectedModel=== 'saiga'}
                      onChange={handleModelRadio}
                      alt='saiga'
                    />
                    <label>Saiga</label>
                  </div>
                  <div className={cls.radio_input}>
                    <input
                      type="radio"
                      name="foo"
                      value="yagpt_neuro"
                      checked={selectedModel === 'yagpt_neuro'}
                      onChange={handleModelRadio}
                      alt='yagpt_neuro'
                    />
                    <label>YaGPT_Neuro</label>
                  </div>
                  <div className={cls.radio_input}>
                    <input
                      type="radio"
                      name="foo"
                      value="yagpt"
                      checked={selectedModel === 'yagpt'}
                      onChange={handleModelRadio}
                      alt='yagpt'
                    />
                    <label>YaGPT</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
        <div className={cls.content}>
          <div className={cls.searchbar}>
            <input className={cls.searchfield} placeholder='Напишите ваш запрос' onChange={(e)=>setMaintheme(e.target.value)}/>
            <button className={cls.btn_savetemp}onClick={()=>handleOpenTempModal()} >Сохранить шаблон</button>
            <button className={cls.btn_generate} onClick={()=>{handleGenerate()}}>Сгенерировать</button>
          </div>
          <DndProvider backend={HTML5Backend}>
            <div className={cls.dragcontent}>
              <div className={cls.dragbar}>
              
                <DragCard text={"Столбчатая диаграмма"} imgname={"bar_chart"} />
                <DragCard text={"Линейная диаграмма"} imgname={"curve_chart"} />
                <DragCard text={"Круговая диаграмма"} imgname={"pie_chart"} />
                <DragCard text={"Текстовый блок"} imgname={"text"} />
                <DragCard text={"Таблица"} imgname={"grid"} />
              </div>
              <div className={cls.dragfield}>
                <DropZone updateChartParams={handleUpdateChartParams}/>
              </div>
            </div>
          </DndProvider>
        </div>
      {openModal && (
        <div className={cls.modal}>
          <div className={cls.modalcontent}>
            <span className={cls.modtit}>Сохранение шаблона</span>
            <input className={cls.modi}placeholder='Название шаблона' onChange={(e)=>setTempname(e.target.value)}/>
            <div style={{display:"flex", flexDirection:"row",justifyContent:"space-between"}}>
              <button className={cls.otmena} onClick={()=>handleCloseTempModal()}>Отмена</button>
              <button className={cls.save} onClick={()=>handleSaveTemp()}>Сохранить</button>
            </div>
            
          </div>
         
        </div>
      )}
      </div>
      <Footer/>
    </>
  );
};

export default CreateReportPage;
