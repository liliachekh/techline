import style from "./form.module.scss";
import { Form, Formik } from "formik";
import Input from "../Input";
import InputMasked from "../InputMasked";

export default function FormikForm({
  initialValues,
  validationSchema,
  fields,
  callback,
  submitBtn,
  useLoginFormStyles,
  formikRef,
  currentValues,
}) {
  return (
    <Formik
      initialValues={currentValues || initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting}) => {
        callback(values);
        setSubmitting(false);

        if (!currentValues) {
          formikRef.current.resetForm();
        }
      }}
      innerRef={formikRef}>
      <Form className={style.form}>
        {useLoginFormStyles && (
          <h2 className={style.loginForm__title}>Log In</h2>
        )}
        {fields?.map((field) => {
          if (field.tagType === "masked") {
            return (
              <InputMasked
                key={field.name}
                {...field}
                labelClass={style.form__label}
                inputClass={style.form__input}
                errorClass={style.form__error}
              />
            );
          }
          return (
            <Input
              key={field.name}
              {...field}
              labelClass={style.form__label}
              inputClass={style.form__input}
              errorClass={style.form__error}
            />
          );
        })}
        {useLoginFormStyles && (
          <div className={style.loginForm__help}>
            <div className={style.loginForm__switch}>
              <input
                type="checkbox"
                id="rememberLogin"
                name="rememberLogin"
                className={style.loginForm__switchInput}
              />
              <label
                htmlFor="rememberLogin"
                className={style.loginForm__switchLabel}>
                Remember me
              </label>
            </div>
            <a
              className={style.loginForm__forgotLink}
              href="/password-reset">
              Forgot password
            </a>
          </div>
        )}
        <button
          text="Checkout"
          className={style.form__submit}
          type="submit">
          {submitBtn}
        </button>
      </Form>
    </Formik>
  );
}
