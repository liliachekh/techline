import FormikForm from "../../components/FormikForm";
import { logInFormFields } from "./logInFormFields";
import { validationSchemaLogin } from "../../validation";
import style from "./LoginForm.module.scss";

export function LoginForm() {

    // const dispatch = useDispatch();
    // const navigate = useNavigate();

    // async function onSubmitHandler(values) {
    //     try {
    //     const response = await fetchData(`${baseUrl}customers/login`, reqPost(JSON.stringify(values)))
    //     const token = response.token;
    //     localStorage.setItem('token', token);
    //     dispatch(setTokenAction(token));
    //     navigate(redirectUrl)
    //     } catch (error) {
    //     dispatch(setErrorAction(error.message));
    //     dispatch(setModalType('error'))
    //     }
    // }

    return (
        <div className={style.loginForm}>
            <div className={style.loginForm__container}>
                <main className={style.loginForm__main}>
                    <div className={style.loginForm__logo}>
                        <img src="/images/tech.png" alt="techlines logo" />
                    </div>
                    <div className={style.loginForm__wrapper}>
                        <FormikForm
                            initialValues={{
                            loginOrEmail: '',
                            password: '',
                            }}
                            useLoginFormStyles={true}
                            validationSchema={validationSchemaLogin}
                            fields={logInFormFields}
                        //   callback={onSubmitHandler}
                            submitBtn='Login' />
                    </div>
                </main>
                <footer className={style.loginForm__footer}>
                    <p>2023 © Techline Distribution. All rights reserved.</p>
                </footer>
            </div>
        </div>
      )
}