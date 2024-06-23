import React from "react";
import { useState } from "react";
import Auth from "./Auth";
import Register from "./Register";
import cls from './login.module.scss'
const LoginPage = () => {
  const [isReg, setIsReg] = useState(true);
  const changeMode = () => {
    setIsReg(!isReg);
};
  return (
    <main>
      <div className={cls.content}>
        <h2 className={cls.head}>AVVA</h2>
          {isReg ? <Auth changeMode={changeMode} /> : <Register changeMode={changeMode} />}   
      </div>
    </main>
  );
};

export default LoginPage;
