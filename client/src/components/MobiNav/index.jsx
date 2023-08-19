import { navData } from "../Header/navData"
import HeaderLink from "../HeaderLink"
import style from "./mobiNav.module.scss"
import PropTypes from 'prop-types';


export default function MobiNav({ isOpen, toggleBurgerMenu, inViewList, refList }) {
  return (
    <div className={style.mobilNav}>
      <div className={`${style.wrapper} ${isOpen ? style.active : ''}`}>
        <ul className={style.list}>
          {navData.map(({ refName, text }) => (
            <HeaderLink
              className={`${style.listItem} ${inViewList[refName] ? style.listItem_active : ''}`}
              key={refName}
              refTarget={refList[refName]}
              text={text} />
          ))}
        </ul>
      </div>
      <button type="button" className={`${style.burgerBtn} ${isOpen ? style.active : ''}`} onClick={toggleBurgerMenu}>
        <span className={`${style.burgerBtn__lines} ${isOpen ? style.active : ''}`}></span> </button>
    </div>
  )
}

MobiNav.propTypes = {
  isOpen: PropTypes.bool,
  toggleBurgerMenu: PropTypes.func,
  inViewList: PropTypes.object,
  refList: PropTypes.object,
}