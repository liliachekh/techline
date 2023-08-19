import style from './form.module.scss';
import { Formik, Form } from 'formik';
import Input from '../Input';
import InputMasked from '../InputMasked';
import { useState } from 'react';

export default function FormikForm({ initialValues, validationSchema, fields, callback, submitBtn, useSignUpStyles }) {
  const [selectedCountry, setSelectedCountry] = useState('United States');

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={callback}
    //   onSubmit={async (values, { setSubmitting }) => {
    //     callback(values);
    //     setSubmitting(false);
    //   }} 
    >
      <Form className={useSignUpStyles ? style.formSignUp : style.form}>
        {fields?.map(field => {
          if (field.tagType === 'custom') { 
            const CountrySelect = field.country;
              return (
                <div key={field.name}>
                  <label className={style.formSignUp__labelSignUp} htmlFor={field.id}>
                    {field.label}
                  </label>
                  <CountrySelect
                    className={style.formSignUp__inputSignUp}
                    id={field.id}
                    name={field.name}
                    value={selectedCountry} 
                    onChange={val => setSelectedCountry(val)}
                  />
                </div>
              );
          } else if (field.tagType === 'masked') {
            return <InputMasked
              key={field.name}
              {...field}
              labelClass={useSignUpStyles ? style.formSignUp__labelSignUp : style.form__label}
              inputClass={useSignUpStyles ? style.formSignUp__inputSignUp : style.form__input}
              errorClass={useSignUpStyles ? style.formSignUp__errorSignUp : style.form__error} />
          }
          return <Input
            key={field.name}
            {...field}
            labelClass={useSignUpStyles ? style.formSignUp__labelSignUp : style.form__label}
            inputClass={useSignUpStyles ? style.formSignUp__inputSignUp : style.form__input}
            errorClass={useSignUpStyles ? style.formSignUp__errorSignUp : style.form__error} />
        })}
        <button text='Checkout' className={style.form__submit} type='submit'>{submitBtn}</button>
      </Form>
    </Formik>
  )
}