import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import cl from './ProfilePage.module.css'
import exit from '../../assets/images/exit.svg'
import ProfileField from '../../components/ProfileField/ProfileField'
import YellowBtn from '../../UI/YellowBtn/YellowBtn'
import profile from '../../assets/images/profile.svg'
import { Link } from 'react-router-dom';
import SendServer from '../../api/Service'
import Footer from '../../components/Footer/Footer'

function ProfilePage() {
    const [user, setUser] = useState(
        {first_name: "", last_name: "", login: "", password: ""}
    )

    const [fieldsChanged, setFieldsChanged] = useState({
      first_name: false,
      last_name: false,
      login: false,
      password: false,
    });

    const handleFieldChange = (field, changed) => {
        setFieldsChanged((prevFields) => ({
            ...prevFields,
            [field]: changed,
        }));
    };

    const handleInputChange = (field, value) => {
        setUser((prevUser) => ({
            ...prevUser,
            [field]: value,
        }));
    };

    const getUserInfo = async () => {
        const responseUser = await SendServer.getUser();
        setUser(responseUser);
    }

    const updateUserInfo = async (first_name, last_name, login, password) => {
        const response = await SendServer.updateUser(first_name, last_name, login, password);
        console.log(response);
    }


    useEffect(() => {
        getUserInfo();
    }, [])

    const isChanged = Object.values(fieldsChanged).some((changed) => changed);
 
  return (
    <>
        <Header />
        <div className={cl.profilePage}>
            <div className={cl.profilePage__header}>
                <div className={cl.header_title}>Мой профиль</div>
                <Link to="/login">
                    <div className={cl.header_exit}>
                        <img src={exit} alt="exit" />
                        Выйти
                    </div>
                </Link>
            </div>
            <div className={cl.profilePage__content}>
                <div className={cl.content__profile}>
                    <div className={cl.profile_view}>
                        <div className={cl.view_image}>
                            <img src={profile} alt="profile"/>
                        </div>
                        <div className={cl.view_btn}>
                            <YellowBtn>Изменить фото</YellowBtn>
                        </div>
                    </div>
                    <div className={cl.profile_fields}>
                        <ProfileField 
                            title="Имя" 
                            text={user.first_name ? user.first_name : ''} 
                            onChange={(changed) => handleFieldChange('first_name', changed)}
                            onInputChange={(value) => handleInputChange('first_name', value)}
                        />
                        <ProfileField 
                            title="Фамилия" 
                            text={user.last_name ? user.last_name : ''} 
                            onChange={(changed) => handleFieldChange('last_name', changed)}
                            onInputChange={(value) => handleInputChange('last_name', value)}
                        />
                        <ProfileField 
                            title="Логин" 
                            text={user.login ? user.login : ''} 
                            onChange={(changed) => handleFieldChange('login', changed)}
                            onInputChange={(value) => handleInputChange('login', value)}
                        />
                        {
                            isChanged && <YellowBtn width="100%" onClick={() => updateUserInfo(user.first_name, user.last_name, user.login, user.password)}>Подтвердить</YellowBtn>
                        }
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </>
  )
}

export default ProfilePage