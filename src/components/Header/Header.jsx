import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';

import cls from './Header.module.scss'
import prof from '../../assets/images/profile.svg'
const Header=()=>{
    const navigate = useNavigate();
    const location = useLocation();
  return (
    <div className={cls.header}>
        <div className={cls.logo}>
            <h2>AVVA</h2>
        </div>
        <nav>
            <ul>
                <Link to="/createreport"><li className={location.pathname === "/createreport" ? cls.active : ''}>Создать отчет</li></Link>
                <Link to="/myreports"><li className={location.pathname === "/myreports" ? cls.active : ''}>Мои отчеты</li></Link>
                <Link to="/templates"><li className={location.pathname === "/templates" ? cls.active : ''}>Шаблоны</li></Link>
                <Link to="/faq"><li className={location.pathname === "/faq" ? cls.active : ''}>F.A.Q</li></Link>
                
            </ul>
        </nav>
        <div className={cls.profile} onClick={()=>navigate('/profile')}>
            <img src={prof}/>
        </div>
    </div>
  )
};
export default Header;
