import { useEffect, useState } from "react";
import MobiNav from "../MobiNav";
import { Logo } from "../icons";
import style from "./header.module.scss";
import { Link } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const currentScrollPos = window.pageYOffset;
      if (prevScrollPos < currentScrollPos && !scrolled) {
        setScrolled(true);
      }

      if (prevScrollPos > currentScrollPos && scrolled) {
        setScrolled(false);
      }
      setPrevScrollPos(currentScrollPos);
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos, scrolled]);
  function toggleBurgerMenu() {
    setIsOpen(!isOpen);
  }
  return (
    <>
      <header className={`${style.header} ${scrolled && style.scrolled}`}>
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
              toggleBurgerMenu={() => toggleBurgerMenu()}
            />
          </div>
        </div>
      </header>
    </>
  );
}
