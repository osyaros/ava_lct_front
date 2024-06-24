import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DragCard from '../../components/DragCard/DragCard';
import DropZone from '../../components/DropZone/DropZone';
import cls from './styles.module.scss';

import aDD from '../../assets/images/add.svg'
import dEL from '../../assets/images/close.svg'

const CreateReportPage = () => {
  const [selectedRadio, setSelectedRadio] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [textInput, setTextInput] = useState('');
  const [finalSelection, setFinalSelection] = useState('');
  const [inputFields, setInputFields] = useState(['']); 
  const [dateto,setDateTo] = useState('');
  const [datefrom,setDateFrom] = useState('');
  const handleRadioChange = (e) => {
    const value = e.target.value;
    setSelectedRadio(value);
    setTextInput('');
    setFinalSelection(e.target.alt);
  };
  const handleModelRadio = (e) => {
    const value = e.target.value;
    setSelectedModel(e.target.alt);
    
  };

  const handleTextInputChange = (e) => {
    const value = e.target.value;
    setTextInput(value);
    setSelectedRadio('');
    setFinalSelection(value);
  };

  const handleInputFieldChange = (index, event) => {
    const values = [...inputFields];
    values[index] = event.target.value;
    setInputFields(values);
  };

  const addInputField = () => {
    setInputFields([...inputFields, '']);
  };
  const removeInputField = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
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
              {inputFields.map((input, index) => (
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
          {finalSelection && (
            <div className={cls.finalSelection}>
              <span>Выбранная тематика: {finalSelection}</span>
            </div>
          )}
        </div>
        <div className={cls.content}>
          <div className={cls.searchbar}>
            <input className={cls.searchfield} placeholder='Напишите ваш запрос'/>
            <button className={cls.btn_savetemp}>Сохранить шаблон</button>
            <button className={cls.btn_generate}>Сгенерировать</button>
          </div>
          <DndProvider backend={HTML5Backend}>
            <div className={cls.dragcontent}>
              <div className={cls.dragbar}>
              
                <DragCard text={"Столбчатая диаграмма"} imgname={"chart_vertical"} />
                <DragCard text={"Линейная диаграмма"} imgname={"chart_line"} />
                <DragCard text={"Круговая диаграмма"} imgname={"chart_pie"} />
                <DragCard text={"Текстовый блок"} imgname={"text_block"} />
                <DragCard text={"Таблица"} imgname={"table"} />
              </div>
              <div className={cls.dragfield}>
                <DropZone/>
              </div>
            </div>
          </DndProvider>
        </div>
      </div>
    </>
  );
};

export default CreateReportPage;
