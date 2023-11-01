import { signInFormFields } from "./signInFormFields";
import style from "./signUp.module.scss";
import FormikForm from "../FormikForm";
import { AnimatePresence, motion } from "framer-motion";
import { animateFromLeft } from "../../animation";
import { useTranslation } from "react-i18next";
import { validationSchemaUser } from "../../validation";
import { useState, useRef } from "react";
import { Modal } from "../Modal";

export default function SignUpForm({ refName }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [modalData, setModalData] = useState({});
  const { t } = useTranslation();
  const formikRef = useRef(null);

  const handleResetForm = () => {
    if (formikRef.current) {
      formikRef.current.resetForm();
    }
  };

  async function onSubmitHandler(values) {
    const newValues = {
      ...values,
      firstName: values.contactPerson.split(" ")[0],
      lastName: values.contactPerson.split(" ")[1] || values.contactPerson.split(" ")[0],
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
      } else {
        setErrorMessage("");
        openModal();
        handleResetForm();
      }
    } catch (error) {
      setErrorMessage("An error occurred while sending the request.");
    }
  }

  function openModal() {
    setIsModalOpened(true);
    setModalData({header: t("signupModal.header"), text: t("signupModal.text"), buttonClose: 'OK'});
  }

  function closeModal() {
    setIsModalOpened(false);
    setModalData({});
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
            <motion.div {...animateFromLeft(0, 0.1)} className={style.signUp__form}>
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
          </div>
        </AnimatePresence>
      </div>
      <Modal
        show={isModalOpened}
        header={modalData.header}
        text={modalData.text}
        buttonClose={modalData.buttonClose}
        onCloseModal={() => closeModal()} 
        />
    </section>
  );
}
