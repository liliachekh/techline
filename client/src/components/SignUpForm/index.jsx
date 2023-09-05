import { signInFormFields } from "./signInFormFields";
import style from "./signUp.module.scss";
import FormikForm from "../FormikForm";
import { AnimatePresence, motion } from "framer-motion";
import { animateFromLeft } from "../../animation";
import { useTranslation } from "react-i18next";
import { validationSchemaUser } from "../../validation";
import { useState, useEffect, useRef } from "react";

export default function SignUpForm({ refName }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { t } = useTranslation();
  const formikRef = useRef(null);

  const handleResetForm = () => {
    if (formikRef.current) {
      formikRef.current.resetForm();
    }
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  async function onSubmitHandler(values) {
    const newValues = {
      ...values,
      firstName: values.companyName,
      lastName: values.companyName,
      login: values.email.split("@")[0].split(".").join(""),
    };
    try {
      const response = await fetch("https://storage.techlines.es/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newValues),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
        setSuccessMessage("");
      } else {
        setErrorMessage("");
        setSuccessMessage("Registration successfully completed! Check your mail");
        handleResetForm()
      }
    } catch (error) {
      setErrorMessage("An error occurred while sending the request.");
      setSuccessMessage("");
    }
  }

  return (
    <section
      ref={refName}
      className={style.signUp}>
      <div className={style.signUp__wrapper}>
        <AnimatePresence>
          <div className={style.signUp__container}>
            <motion.h1
              {...animateFromLeft(0)}
              className={style.signUp__title}>
              {t("signup.title")}
            </motion.h1>
            <motion.div {...animateFromLeft(0, 0.2)}>
              <FormikForm
                initialValues={{
                  companyName: "",
                  countryName: "",
                  vatNr: "",
                  contactPerson: "",
                  email: "",
                  password: "",
                  telephone: "",
                  companyWebsite: "",
                  interestProducts: "",
                  brands: "",
                  comment: "",
                }}
                validationSchema={validationSchemaUser}
                fields={signInFormFields.map((field) => ({
                  ...field,
                  label: t(`signup.${field.label}`),
                  placeholder: field.placeholder
                    ? t(`signup.${field.placeholder}`)
                    : "",
                }))}
                callback={onSubmitHandler}
                submitBtn={t("signup.submitButton")}
                formikRef={formikRef}
                currentValues={formikRef.current ? formikRef.current.values : null}
              />
            </motion.div>
            {errorMessage && (
              <div className={style.signUp__errorMessage}>{errorMessage}</div>
            )}
            {successMessage && (
              <div className={style.signUp__successMessage}>
                {successMessage}
              </div>
            )}
          </div>
        </AnimatePresence>
      </div>
    </section>
  );
}
