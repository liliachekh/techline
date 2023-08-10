import { useState } from "react";
import MobiNav from "../MobiNav"
import { Logo } from "../icons"
import style from "./header.module.scss"
import { Link } from "react-router-dom"

export default function Header () {
  const [isOpen, setIsOpen] = useState(false);

  function toggleBurgerMenu() {
    setIsOpen(!isOpen);
  }
    return (
       <>
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
                    <li className={style.listItem}>Home</li>
                    <li className={style.listItem}>About us</li>
                    <li className={style.listItem}>B2B</li>
                    <li className={style.listItem}>Contacts</li>
                    <li className={style.listItem}>Sign up</li>
                </ul>
              </nav>
              <Link to="/b2b/login">
                    <span className={style.nav_login}>Log in</span>
                </Link>
                </div>
              <MobiNav 
              isOpen={isOpen}
              toggleBurgerMenu={() => toggleBurgerMenu()}/>
    </div>
</div>
        </header>
        </>
    )
}