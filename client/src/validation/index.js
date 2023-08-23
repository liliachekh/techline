import * as Yup from 'yup';

export const validationSchemaUser = Yup.object({
  companyName: Yup.string()
    .min(2, 'Must contain at least 2 letters')
    .max(25, 'Can be no more than 25 characters')
    .matches(/^[a-zA-Zа-яА-Я]+$/, 'Must be a-z A-Z а-я А-Я')
    .trim()
    .required("Required Field!"),
  countryName: Yup.string()
    .min(2, 'Must contain at least 2 letters')
    .max(25, 'Can be no more than 25 characters')
    .matches(/^[a-zA-Zа-яА-Я]+$/, 'Must be a-z A-Z а-я А-Я')
    .trim()
    .required("Required Field!"),
  vatNr: Yup.string()
    .matches(/^\d{13}$/, 'Must contain exactly 13 digits')
    .required("Required Field!"),
  contactPerson: Yup.string()
    .min(2, 'Must contain at least 2 letters')
    .max(25, 'Can be no more than 25 characters')
    .matches(/^[a-zA-Zа-яА-Я]+( [a-zA-Zа-яА-Я]+)*$/, 'Must be a-z A-Z а-я А-Я with optional space between words')
    .trim()
    .required("Required Field!"),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(7, 'Must contain at least 7 letters')
    .max(30, 'Can be no more than 30 characters')
    .matches(/^[a-zA-Z0-9]+$/, 'Must be a-z A-Z 0-9')
    .trim()
    .required("Required Field!"),
  telephone: Yup.string()
    .matches(/^\+\d{2} \d{10}$/, "Invalid phone number format")
    .required("Required Field!"),
})

export const validationSchemaLogin = Yup.object({
  loginOrEmail: Yup.string()
    .required("Required Field!"),
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
    .matches(/^\+380\d{3}\d{2}\d{2}\d{2}$/)
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
