import { useState } from "react";
import MobiNav from "../MobiNav"
import { Logo } from "../icons"
import style from "./header.module.scss"
import { Link } from "react-router-dom"
import HeaderLink from "../HeaderLink";
import { navData } from "./navData";

export default function Header({ refList, inViewList }) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleBurgerMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <header className={style.header}>
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.section}>
            <Link to="/">
              <div className={style.logo}>
                <Logo />
                <span className={style.title}>TECHLINES</span>
              </div>
            </Link>
          </div>
          <div className={style.nav__container}>
            <nav className={style.nav}>
              <ul className={style.list}>
                {navData.map(({ refName, text }) => (
                  <HeaderLink
                    className={`${style.listItem} ${inViewList[refName] ? style.listItem_active : ''}`}
                    key={refName}
                    refTarget={refList[refName]}
                    text={text} />
                ))}
              </ul>
            </nav>
            <Link to="/b2b/login">
              <span className={style.nav_login}>Log in</span>
            </Link>
          </div>
          <MobiNav
            isOpen={isOpen}
            toggleBurgerMenu={toggleBurgerMenu}
            refList={refList}
            inViewList={inViewList} />
        </div>
      </div>
    </header>
  )
}