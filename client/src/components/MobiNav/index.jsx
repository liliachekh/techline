import { navData } from "../Header/navData"
import HeaderLink from "../HeaderLink"
import LanguageSelector from "../LanguageSelector";
import style from "./mobiNav.module.scss"
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { animateMobileMenu } from "../../animation";
import { useRef, useEffect } from "react";

export default function MobiNav({ isOpen, toggleBurgerMenu, inViewList, refList, setBtnRef }) {
  const { t } = useTranslation();
  const btnRef = useRef();
  useEffect(() => {
    setBtnRef(btnRef);
  }, [setBtnRef]);
  return (
    <div className={style.mobilNav}>
      <button ref={btnRef} type="button" className={`${style.burgerBtn} ${isOpen ? style.active : ''}`} onClick={toggleBurgerMenu}>
        <span className={`${style.burgerBtn__lines} ${isOpen ? style.active : ''}`}></span>
      </button>
      <AnimatePresence>
        {isOpen &&
          <motion.div
            className={`${style.wrapper}`}
            onClick={(e) => e.stopPropagation()}
            {...animateMobileMenu}>
            <ul className={style.list}>
              {navData.map(({ refName, text }) => (
                <HeaderLink
                  className={`${style.listItem} ${inViewList[refName] ? style.listItem_active : ''}`}
                  key={refName}
                  refTarget={refList[refName]}
                  toggleBurgerMenu={toggleBurgerMenu}
                  text={t(`headerLink.${text}`)} />
              ))}
              <LanguageSelector />
            </ul>
          </motion.div>}
      </AnimatePresence>
    </div>
  )
}

MobiNav.propTypes = {
  isOpen: PropTypes.bool,
  toggleBurgerMenu: PropTypes.func,
  inViewList: PropTypes.object,
  refList: PropTypes.object,
  setBtnRef: PropTypes.func
}