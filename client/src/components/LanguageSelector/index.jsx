import { useState } from "react";
import i18n from "../../i18n";
import { AnimatePresence, motion } from "framer-motion";
import langProps from "./langProps";
import styles from "./languageSelector.module.scss";
import { animateLangSelect } from "../../animation";
import { FlagEn, FlagEs, FlagRu, FlagUa } from "../icons";

const FlagIcon = ({ type }) => {
  switch (type) {
    case 'English':
      return <FlagEn className={styles.selector__flag} />
    case 'Español':
      return <FlagEs className={styles.selector__flag} />
    case 'Русский':
      return <FlagRu className={styles.selector__flag} />
    case 'Українська':
      return <FlagUa className={styles.selector__flag} />
    default:
      return
  }
}

const LanguageSelector = () => {
  const [IsOpen, setIsOpen] = useState(false)

  const chooseLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setIsOpen(false)
  }

  return (
    <div className={styles.selector}>
      <FlagIcon type={langProps[localStorage.getItem('i18nextLng')]} />
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
              <div className={styles.selector__item} key={key}>
                <FlagIcon type={value} />
                <button
                  key={key}
                  type='button'
                  className={styles.selector__country}
                  onClick={() => chooseLanguage(key)}>
                  {value}
                </button>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;