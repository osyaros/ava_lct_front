import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import cl from './ProfilePage.module.css'
import exit from '../../assets/images/exit.svg'
import ProfileField from '../../components/ProfileField/ProfileField'
import YellowBtn from '../../UI/YellowBtn/YellowBtn'
import profile from '../../assets/images/profile.svg'
import { Link } from 'react-router-dom';

function ProfilePage() {
    const [fieldsChanged, setFieldsChanged] = useState({
      name: false,
      login: false,
      password: false,
    });

    const handleFieldChange = (field, changed) => {
      setFieldsChanged((prevFields) => ({
        ...prevFields,
        [field]: changed,
      }));
    };

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
                        <ProfileField title="Имя" text="Иван" onChange={(changed) => handleFieldChange('name', changed)}/>
                        <ProfileField title="Логин" text="ivan1998" onChange={(changed) => handleFieldChange('login', changed)}/>
                        <ProfileField title="Пароль" text="**********" onChange={(changed) => handleFieldChange('password', changed)}/>
                        {
                            isChanged && <YellowBtn width="100%">Подтвердить</YellowBtn>
                        }
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ProfilePage