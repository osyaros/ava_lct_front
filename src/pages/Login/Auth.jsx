import React, { useEffect, useState, useCallback, useContext } from 'react';
import axios from 'axios';
import baseUrl from '../../../config.js';
import { Link, useNavigate } from "react-router-dom";
import cls from './login.module.scss'
import { AuthContext } from '../../hoc/PrivateRoute.jsx';

const Auth = ({ changeMode }) => {
    const [data, setData] = useState(null); // null | string
    const [error, setError] = useState(false);
    const [authError, setAuthError] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { setIsLoggedIn} = useContext(AuthContext);

    const navigate = useNavigate()

    const handleLoginClick = useCallback(() => {
        if (username === '' || password === '') {
            console.log(username, password);
            setError(true)
            console.log('error')
        };

        const data = {
            'username': username,
            'password': password
        }

        const headers = {
            "Content-Type": "application/x-www-form-urlencoded"
        }

        axios.post(baseUrl + "/login", data, {
            headers
        }).then((response) => {
            localStorage.setItem("jwt_authorization", response.data.access_token);
            setIsLoggedIn(true);
            navigate("/createreport");
        }).catch((error) => {
            setAuthError(true)
            console.log(error)
        });
    }, [username, password])
    useEffect(() => {
        if (data) {
            console.log(data)
            login(data)
        }
    }, [data])

    return (
        <div className={cls.mainform}>
            <div className={cls.typeform}>
                <span>Вход</span>
            </div>
            <div className={cls.form_place}>
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
            
            <button className={cls.btn}onClick={handleLoginClick}>Войти</button>
            <div className={cls.descr}>
                <span className={cls.per_consent}>
                    Регистрируясь Вы даете согласие на обработку персональных данных 
                </span>
                <span>
                    Еще нет аккаунта? <u onClick={changeMode}>Создайте его</u>
                </span>
            </div>
        </div>
    );
}

export default Auth;