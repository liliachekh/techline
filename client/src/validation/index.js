import * as Yup from 'yup';
export const validationSchemaUser = Yup.object({
  companyName: Yup.string()
    .min(2, 'Must contain at least 2 letters')
    .max(25, 'Can be no more than 25 characters')
    .matches(/^[A-Za-z\s\-']+$/, 'Must be a-z A-Z')
    .trim()
    .required("Required Field!"),
  countryName: Yup.string()
    .min(2, 'Must contain at least 2 letters')
    .max(25, 'Can be no more than 25 characters')
    .matches(/^[A-Za-z\s\-']+$/, 'Must be a-z A-Z')
    .trim()
    .required("Required Field!"),
    index: Yup.string()
    .matches(/^\d+$/, 'Must contain only digits')
    .required("Required Field!"),
  region: Yup.string()
    .min(2, 'Must contain at least 2 letters')
    .max(30, 'Can be no more than 30 characters')
    .matches(/^[A-Za-z\s\-']+$/, 'Must be a-z A-Z')
    .required("Required Field!"),
  city: Yup.string()
    .min(2, 'Must contain at least 2 letters')
    .max(25, 'Can be no more than 25 characters')
    .matches(/^[A-Za-z\s\-']+$/, 'Must be a-z A-Z')
    .trim()
    .required("Required Field!"),
  street: Yup.string()
    .min(2, 'Must contain at least 2 letters')
    .max(30, 'Can be no more than 30 characters')
    .required("Required Field!"),
  house: Yup.string()
    .min(1, 'Must contain at least 1 letters')
    .max(10, 'Can be no more than 10 characters')
    .trim()
    .required("Required Field!"),
  apartment: Yup.string()
    .min(1, 'Must contain at least 1 letters')
    .max(10, 'Can be no more than 10 characters')
    .required("Required Field!"),
  vatNr: Yup.string()
    .min(7, 'Must contain at least 7 characters')
    .matches(/^[a-zA-Z0-9]+$/, 'Must be a-z A-Z 0-9')
    .required("Required Field!"),
  contactPerson: Yup.string()
    .min(2, 'Must contain at least 2 letters')
    .max(25, 'Can be no more than 25 characters')
    .matches(/^[A-Za-z\s\-']+$/, 'Must be a-z A-Z')
    .trim()
    .required("Required Field!"),
  email: Yup.string()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email format')
    .required('Required'),
  password: Yup.string()
    .min(7, 'Must contain at least 7 letters')
    .max(30, 'Can be no more than 30 characters')
    .matches(/^[a-zA-Z0-9]+$/, 'Must be a-z A-Z 0-9')
    .trim()
    .required("Required Field!"),
  telephone: Yup.string()
    .matches(/^\+\d{11,12}$/, "Invalid phone number format")
    .required("Required Field!"),
})

export const validationSchemaLogin = Yup.object({
  loginOrEmail: Yup.string()
    .required("Required Field!")
    .min(4, 'Must contain at least 4 characters')
    .matches(/@/, 'Email must contain "@" symbol'),
  password: Yup.string()
    .min(7, 'Must contain at least 7 letters')
    .max(30, 'Can be no more than 30 characters')
    .required("Required Field!"),
});

export const validationSchemaOrder = Yup.object({
  name: Yup.string()
    .min(2, 'Must contain at least 2 letters')
    .max(25, 'Can be no more than 25 characters')
    .matches(/^[a-zA-Zа-яА-Я]+$/, 'Must be a-z A-Z а-я А-Я')
    .trim()
    .required("Required Field!"),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  telephone: Yup.string()
    .matches(/^\+\d{11,12}$/)
    .required("Required Field!"),
  wallet: Yup.string()
    .min(40, 'Must contain at least 40 characters')
    .max(42, 'Can be no more than 42 characters')
    .matches(/^(0x)?[0-9a-fA-F]{40}$/, 'Must be 0-9 a-f A-F')
    .required("Required Field!"),
});

export const validationSchemaProduct = Yup.object().shape({
  enabled: Yup.boolean(),
  imageUrls: Yup.array().required("Required Field!"),
  quantity: Yup.number().integer().positive().required("Required Field!"),
  _id: Yup.string(),
  name: Yup.string().required("Required Field!"),
  author: Yup.string().required("Required Field!"),
  categories: Yup.string().required("Required Field!"),
  theme: Yup.array().of(Yup.string()).required("Required Field!"),
  currentPrice: Yup.number().positive().required("Required Field!"),
  details: Yup.string(),
  itemNo: Yup.string(),
});

export const validationSchemaRegisteredEmail = Yup.object({
  registeredEmail: Yup.string()
    .required("Required Field!")
    .email('Invalid email'),
});
