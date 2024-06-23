import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import cls from './styles.module.scss';

import aDD from '../../assets/images/add.svg'
import dEL from '../../assets/images/close.svg'
const CreateReportPage = () => {
  const [selectedRadio, setSelectedRadio] = useState('');
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
                  <input className={cls.datefrom} placeholder='От' onChange={(e)=>setDateFrom(e.target.value)}/>
                  <input className={cls.dateto} placeholder='До' onChange={(e)=>setDateTo(e.target.value)}/>
                </div>
               
              </div>
            </div>
            <div className={cls.category}>
              <div className={cls.category_name}>
                <span>
                  LLM модель
                </span>
              </div>
            </div>
          </div>
          {finalSelection && (
            <div className={cls.finalSelection}>
              <span>Выбранная тематика: {finalSelection}</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateReportPage;
