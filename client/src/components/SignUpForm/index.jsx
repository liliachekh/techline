import { signInFormFields } from './signUpFormFields';
import style from './signUp.module.scss';
// import { validationSchemaUser } from '../../validation';
import FormikForm from '../FormikForm';
// import { validationSchemaUser } from '../../validation';
// import { fetchData } from '../../utils';
// import { useDispatch } from 'react-redux';
// import { setModalType } from '../../redux/actions/modalActions';
// import { setErrorAction } from '../../redux/actions/errorActions';
// import { baseUrl } from '../../utils/vars';
// import { reqPost } from '../../utils/requestBody';

export default function SignUpForm({ callback, refName }) {
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
        <div className={style.signUp__container}>
          <h1 className={style.signUp__title}>Become a partner</h1>
            <FormikForm
              initialValues={{
                companyName: '',
                country: '',
                vatNr: '',
                contactPerson: '',
                email: '',
                telephone: '',
                companyWebsite: '',
                interestProducts: '',
                brands: '',
                comment: '',
              }}
              useSignUpStyles={true}
              // validationSchema={validationSchemaUser}
              fields={signInFormFields}
              callback={onSubmitHandler}
              submitBtn='Sign up' />
        </div>
      </div>
    </section>
  )
}