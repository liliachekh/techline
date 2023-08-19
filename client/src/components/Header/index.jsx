import { useState, useEffect } from "react";
import MobiNav from "../MobiNav"
import { Logo } from "../icons"
import style from "./header.module.scss"
import { Link } from "react-router-dom"
import HeaderLink from "../HeaderLink";
import { navData } from "./navData";
import PropTypes from 'prop-types';
import { scrollToTop } from "../../utils";


export default function Header({ refList, inViewList }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const currentScrollPos = window.scrollY;
      setScrolled(prevScrollPos < currentScrollPos)
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
              <Link to="/" onClick={scrollToTop}>
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
    </>
  )
}


Header.propTypes = {
  refList: PropTypes.object,
  inViewList: PropTypes.object,
}