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
        {name: "Иван", login: 'ivan1998', password: "123456789"}
    )

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

    const getUserInfo = async () => {
        const responseUser = await SendServer.getUser();
        console.log(responseUser);
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
                        <ProfileField title="Имя" text={user.name} onChange={(changed) => handleFieldChange('name', changed)}/>
                        <ProfileField title="Логин" text={user.login} onChange={(changed) => handleFieldChange('login', changed)}/>
                        <ProfileField title="Пароль" text={user.password} onChange={(changed) => handleFieldChange('password', changed)}/>
                        {
                            isChanged && <YellowBtn width="100%">Подтвердить</YellowBtn>
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