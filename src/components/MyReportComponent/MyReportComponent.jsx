import React, { useState } from 'react'
import cl from './MyReportComponent.module.css'
import dot from '../../assets/images/dot.svg'
import reload from '../../assets/images/reload.svg'
import edit from '../../assets/images/edit.svg'
import trash from '../../assets/images/trash.svg'

function MyReportComponent({title, date}) {

  const [isMenu, setIsMenu] = useState(false);

  return (
    <div className={cl.myReportComponent}>
        <div className={cl.myReportComponent__info}>
            <div className={cl.info__title}>{title}</div>
            <div className={cl.info__date}>{date}</div>
        </div>
        <div className={cl.myReportComponent__btn}>
          <div className={cl.btn} onClick={() => setIsMenu(prevState => !prevState)}>
              <img src={dot} alt="dot" />
          </div>
          {
            isMenu && (
              <div className={cl.btn__menu}>
                <div className={cl.btnMenu__item}>
                  <img src={edit} alt="edit" className={cl.item__image}/>
                  <span className={cl.item__text}>Редактировать</span>
                </div>
                <div className={cl.btnMenu__item}>
                  <img src={reload} alt="reload" className={cl.item__image}/>
                  <span className={cl.item__text}>Перегенерировать</span>
                </div>
                <div className={cl.btnMenu__item}>
                  <img src={trash} alt="trash" className={cl.item__image}/>
                  <span className={cl.item__text}>Удалить</span>
                </div>
              </div>
            )
          }
        </div>
    </div>
  )
}

export default MyReportComponent