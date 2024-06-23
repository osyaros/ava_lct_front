import React, { useEffect, useState, useCallback, } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from "react-router-dom";
import baseUrl from '../../../config.js';

import cls from './login.module.scss'
const Register = ({ changeMode }) => {
    const [data, setData] = useState({});
    const [error, setError] = useState(false);
    const [authError, setAuthError] = useState(false);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleLoginClick = useCallback(() => {
        if (login === '' || password === '') {
            console.log(login, password);
            setError(true)
            console.log('error')
        };

        const credentials = {
            login,
            password
        }

        axios.post(baseUrl + '/registration', {
                login: login,
                password: password
            }
        ).then((response) => {
            setData(response.data?.login);
            navigate("/createreport");
            console.log(response.data?.login);
        }).catch(() => {
            setAuthError(true)
            console.log('authError')
        })
    }, [login, password])

    useEffect(() => {
        console.log(data)
    }, [data])

    return (
        <div className={cls.mainform}>
            <div className={cls.typeform}>
                <span>Вход</span>
            </div>
            <div className={cls.form_place}>
                <div className={cls.form_field}>
                    <span>Имя</span>
                    <div className={cls.form_input}>
                        <input placeholder='Введите логин' onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                </div>
                <div className={cls.form_field}>
                    <span>Логин</span>
                    <div className={cls.form_input}>
                        <input placeholder='Введите логин' onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                </div>
                <div className={cls.form_field}>
                    <span>Пароль</span>
                    <div className={cls.form_input}>
                        <input placeholder='Введите пароль' type="password" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                </div>
            </div>
            
            <button className={cls.btn}onClick={handleLoginClick}>Зарегестрироваться</button>
            <div className={cls.descr}>
                <span className={cls.per_consent}>
                    Регистрируясь Вы даете согласие на обработку персональных данных 
                </span>
                <span>
                    Уже зарегестрированы? <u onClick={changeMode}> Войдите в аккаунт</u>
                </span>
            </div>
        </div>
    );
};

export default Register;
