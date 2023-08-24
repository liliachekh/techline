import { signInFormFields } from './signInFormFields';
import style from './signUp.module.scss';
import FormikForm from '../FormikForm';
import { AnimatePresence, motion } from "framer-motion";
import { animateFromLeft } from '../../animation';
import { useTranslation } from "react-i18next";
import { validationSchemaUser } from '../../validation';
// import { fetchData } from '../../utils';
// import { useDispatch } from 'react-redux';
// import { setModalType } from '../../redux/actions/modalActions';
// import { setErrorAction } from '../../redux/actions/errorActions';
// import { baseUrl } from '../../utils/vars';
// import { reqPost } from '../../utils/requestBody';

export default function SignUpForm({ callback, refName }) {
  const { t } = useTranslation();
  // const dispatch = useDispatch();

  // async function onSubmitHandler(values) {
  //   try {
  //     await fetchData(`${baseUrl}customers`, reqPost(JSON.stringify(values)))
  //     callback(true)
  //     dispatch(setModalType('registred'))
  //   } catch (error) {
  //     dispatch(setErrorAction(error.message));
  //     dispatch(setModalType('error'))
  //   }
  // }
  function onSubmitHandler(values) {
    alert('Success!')
    console.log(values);
  }

  return (
    <section ref={refName} className={style.signUp}>
      <div className={style.signUp__wrapper}>
        <AnimatePresence>
        <div className={style.signUp__container}>
          <motion.h1 {...animateFromLeft(0)} className={style.signUp__title}>{t('signup.title')}</motion.h1>
            <motion.div {...animateFromLeft(0)} >
            <FormikForm
              initialValues={{
                companyName: '',
                countryName: '',
                vatNr: '',
                contactPerson: '',
                email: '',
                password: '',
                telephone: '',
                companyWebsite: '',
                interestProducts: '',
                brands: '',
                comment: '',
              }}
              validationSchema={validationSchemaUser}
              fields={signInFormFields.map(field => ({
                ...field,
                label: t(`signup.${field.label}`),
                placeholder: field.placeholder ? t(`signup.${field.placeholder}`) : '',
              }))}
              callback={onSubmitHandler}
              submitBtn={t('signup.submitButton')} />
              </motion.div>
        </div>
        </AnimatePresence>
      </div>
    </section>
  )
}