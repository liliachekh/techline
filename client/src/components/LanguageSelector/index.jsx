import { useState } from "react";
import i18n from "../../i18n";
import { AnimatePresence, motion } from "framer-motion";
import langProps from "./langProps";
import styles from "./languageSelector.module.scss";
import { animateLangSelect } from "../../animation";

const LanguageSelector = () => {
  const [IsOpen, setIsOpen] = useState(false)

  const chooseLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setIsOpen(false)
  }

  return (
    <div className={styles.selector}>
      <button
        onClick={() => setIsOpen(!IsOpen)}
        className={styles.selector__btn}
        type={'button'}>
        {langProps[localStorage.getItem('i18nextLng')] || 'English'}
      </button>
      <AnimatePresence>
        {IsOpen && (
          <motion.div className={styles.selector__list} {...animateLangSelect}>
            {Object.entries(langProps).map(([key, value]) => (
              <button
                key={key}
                type='button'
                className={styles.selector__item}
                onClick={() => chooseLanguage(key)}>
                {value}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;