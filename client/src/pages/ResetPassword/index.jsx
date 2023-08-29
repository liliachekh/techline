import style from "./ResetPassword.module.scss";
import ForgotPassword from "../../components/ForgotPassword";

export function ResetPassword() {

    return (
        <div className={style.resetForm}>
            <div className={style.resetForm__container}>
                <main className={style.resetForm__main}>
                    <div className={style.resetForm__logo}>
                        <img src="/images/tech.png" alt="techlines logo" />
                    </div>
                    <div className={style.resetForm__wrapper}>
                        <ForgotPassword
                        //   callback={onSubmitHandler} 
                        />
                    </div>
                </main>
                <footer className={style.resetForm__footer}>
                    <p>2023 © Techline Distribution. All rights reserved.</p>
                </footer>
            </div>
        </div>
    )
}