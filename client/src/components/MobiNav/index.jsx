import { navData } from "../Header/navData"
import HeaderLink from "../HeaderLink"
import LanguageSelector from "../LanguageSelector";
import style from "./mobiNav.module.scss"
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { animateMobileMenu } from "../../animation";

export default function MobiNav({ isOpen, toggleBurgerMenu, inViewList, refList }) {
  const { t } = useTranslation();

  return (
    <div className={style.mobilNav}>
      <button type="button" className={`${style.burgerBtn} ${isOpen ? style.active : ''}`} onClick={toggleBurgerMenu}>
        <span className={`${style.burgerBtn__lines} ${isOpen ? style.active : ''}`}></span>
      </button>
      <AnimatePresence>
        {isOpen &&
          <motion.div
            className={`${style.wrapper}`}
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
}