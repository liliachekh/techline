import * as Yup from 'yup';

export const validationSchemaLogin = Yup.object({
    loginOrEmail: Yup.string()
      .required("Required Field!"),
    password: Yup.string()
      .min(7, 'Must contain at least 7 letters')
      .max(30, 'Can be no more than 30 characters')
      .required("Required Field!"),
  });