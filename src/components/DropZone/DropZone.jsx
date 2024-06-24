import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { Paper, Box, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';
import {
  LineChart,
  BarChart,
  PieChart,
  pieArcLabelClasses 
} from '@mui/x-charts';

import cls from './styles.module.scss'

import trash from '../../assets/images/trash.svg'
import arrow_r from '../../assets/images/arrow_right.svg'
import arrow_up from '../../assets/images/arrow_up.svg'
const data = [
  { name: 'January', value: 65 },
  { name: 'February', value: 59 },
  { name: 'March', value: 80 },
  { name: 'April', value: 81 },
  { name: 'May', value: 56 },
  { name: 'June', value: 55 },
  { name: 'July', value: 40 },
];

const Chart = ({ chart }) => {
  switch (chart.type) {
    case 'chart_line':
      return (
        <div className={cls.chartblock}>
          <input placeholder='Заголовок' className={cls.chart_title}/>
          <LineChart key={chart.id}
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
              {  curve: "linear",
                data: [2, 5.5, 2, 8.5, 1.5, 5],
                color: 'rgba(183, 75, 14, 0.6)',
                area: true,
          
              },
            ]}
            width={500}
            height={300}
          />
          <div className={cls.params}>
              <span className={cls.title}>Параметры</span>
              <div className={cls.param}>
                <div className={cls.param_name}>
                  <img src={arrow_r} /><span>X</span>
                </div>
                <input placeholder='Название оси' className={cls.param_i}/>
                <div className={cls.param_checkbox}>
                  <input type='checkbox'/>
                  <label>Автоматически</label>
                </div>
              </div>
              <div className={cls.param}>
                <div className={cls.param_name}>
                  <img src={arrow_up} /><span>Y</span>
                </div>
                <input placeholder='Название оси' className={cls.param_i}/>
                <div className={cls.param_checkbox}>
                  <input type='checkbox'/>
                  <label>Автоматически</label>
                </div>
              </div>
            </div>
            <div className={cls.noteadd}>
              <span>Примечание</span>
              <input className={cls.note} placeholder='Введите ваши дополнения к запросу'/>
            </div>
            
        </div>
        
      );
    case 'chart_vertical':
      return (
        <div className={cls.chartblock}>
            <input placeholder='Заголовок' className={cls.chart_title}/>
            <BarChart key={chart.id}
            xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
            series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
            width={500}
            height={300}
            />
            <div className={cls.params}>
              <span className={cls.title}>Параметры</span>
              <div className={cls.param}>
                <div className={cls.param_name}>
                  <img src={arrow_r} /><span>X</span>
                </div>
                <input placeholder='Название оси' className={cls.param_i}/>
                <div className={cls.param_checkbox}>
                  <input type='checkbox'/>
                  <label>Автоматически</label>
                </div>
              </div>
              <div className={cls.param}>
                <div className={cls.param_name}>
                  <img src={arrow_up} /><span>Y</span>
                </div>
                <input placeholder='Название оси' className={cls.param_i}/>
                <div className={cls.param_checkbox}>
                  <input type='checkbox'/>
                  <label>Автоматически</label>
                </div>
              </div>
            </div>
            <div className={cls.noteadd}>
              <span>Примечание</span>
              <input className={cls.note} placeholder='Введите ваши дополнения к запросу'/>
            </div>
        </div>
       
      );
    case 'chart_pie':
      return (
        <div className={cls.chartblock}>
          <input placeholder='Заголовок' className={cls.chart_title}/>
          <PieChart
            series={[
              {
                arcLabel: (item) => `${item.label} (${item.value})`,
                arcLabelMinAngle: 45,
                data: [
                { value: 5, label: 'A' },
                { value: 10, label: 'B' },
                { value: 15, label: 'C' },
                { value: 20, label: 'D' },]
              },
            ]}
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fill: 'white',
                fontWeight: 'regular',
              },
            }}
            width={400}
            height={200}
    />
            
    </div>
      );
    default:
      return null;
  }
};

const DropZone = () => {
  const [droppedCharts, setDroppedCharts] = useState([]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'CARD',
    drop: (item) => {
      const id = uuidv4();
      setDroppedCharts((preCharts)=>[...preCharts, { id, type: item.imgname }])},
      collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  const handleRemoveChart = (idToRemove) => {
    console.log(droppedCharts);
    // Filter out the chart with the matching id
    const updatedCharts = droppedCharts.filter((chart) => chart.id !== idToRemove);
    setDroppedCharts(updatedCharts);
  };

  return (
    <div ref={drop} className={cls.dropzone}>
      {isOver && <div className={cls.drop} />}
      {droppedCharts.map((chart, index) => (
        <div key={chart.id} style={{ marginBottom: '8px', position: 'relative' }}>
          <div onClick={() => handleRemoveChart(chart.id)} style={{ position: 'absolute', top: 45, right: 10, cursor: 'pointer' }}>
            <img src={trash} alt="Delete" />
          </div>
          <Chart chart={chart} />
        </div>
      ))}
    </div>
  );
};

export default DropZone;
