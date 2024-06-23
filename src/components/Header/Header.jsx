import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

import cls from './Header.module.scss'
import prof from '../../assets/images/profile.svg'
const Header=()=>{
    const navigate = useNavigate();
  return (
    <div className={cls.header}>
        <div className={cls.logo}>
            <h2>AVVA</h2>
        </div>
        <nav>
            <ul>
                <Link to="/createreport"><li>Создать отчет</li></Link>
                <Link to="/myreports"><li>Мои отчеты</li></Link>
                <Link to="/templates"><li>Шаблоны</li></Link>
                <Link to="/faq"><li>F.A.Q</li></Link>
                
            </ul>
        </nav>
        <div className={cls.profile} onClick={()=>navigate('/profile')}>
            <img src={prof}/>
        </div>
    </div>
  )
};
export default Header;
