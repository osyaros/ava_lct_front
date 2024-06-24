import React from 'react';
import { useDrag } from 'react-dnd';
import cls from './DragCard.module.scss'
const DragCard = ({ id, text, imgname }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'CARD',
    item: { id, imgname },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, }} className={cls.card}>
      <img src={`src/assets/images/${imgname}.svg`}/>{text}
    </div>
  );
};

export default DragCard;
