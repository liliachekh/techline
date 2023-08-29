import style from "./forgotPassword.module.scss";
import { Formik, Form } from 'formik';
import Input from "../Input";
import { forgotPasswordFormField } from "./forgotPasswordFormField";
import { validationSchemaRegisteredEmail } from "../../validation";
import { PasswordReset } from "../icons/passwordReset.jsx";

export default function ForgotPassword({ callback }) {

  return (
    <Formik
    initialValues={{
      registeredEmail: '',
    }}
    validationSchema={validationSchemaRegisteredEmail}
    onSubmit={async (values, { setSubmitting }) => {
      callback(values);
      setSubmitting(false);
    }} >
      <Form className={style.form}>
          <div className={style.form__information}>
          <div className={style.form__logo}>
            <PasswordReset/>
          </div>
          <h2 className={style.form__title}>Password recovery</h2>
          <p className={style.form__description}>
          Enter your registered email address to receive link for the password recovery process.
          </p>
          </div>
          {forgotPasswordFormField.map(field => {
              return <Input
              key={field.name}
              {...field}
              labelClass={style.form__label}
              inputClass={style.form__input}
              errorClass={style.form__error} />
          })}
        <button className={style.form__submit} type='submit'>Get link</button>
      </Form>
  </Formik>
  )
}