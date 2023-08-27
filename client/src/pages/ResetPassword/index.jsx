import style from "./ResetPassword.module.scss";
import ForgotPassword from "../../components/ForgotPassword";

export function ResetPassword() {

    return (
        <div className={style.loginForm}>
            <div className={style.loginForm__container}>
                <main className={style.loginForm__main}>
                    <div className={style.loginForm__logo}>
                        <img src="/images/tech.png" alt="techlines logo" />
                    </div>
                    <div className={style.loginForm__wrapper}>
                        <ForgotPassword
                        //   callback={onSubmitHandler} 
                        />
                    </div>
                </main>
                <footer className={style.loginForm__footer}>
                    <p>2023 © Techline Distribution. All rights reserved.</p>
                </footer>
            </div>
        </div>
    )
}