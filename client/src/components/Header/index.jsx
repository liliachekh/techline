import { useState, useEffect } from "react";
import MobiNav from "../MobiNav";
import style from "./header.module.scss";
import { Link } from "react-router-dom";
import HeaderLink from "../HeaderLink";
import { navData } from "./navData";
import PropTypes from "prop-types";
import { scrollToTop } from "../../utils";
import LanguageSelector from "../LanguageSelector";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";

export default function Header({ refList, inViewList }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const { t } = useTranslation();
  const [btnRef, setBtnRef] = useState(null);

  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  useEffect(() => {
    function handleScroll() {
      const currentScrollPos = window.scrollY;
      setScrolled(prevScrollPos < currentScrollPos);
      setPrevScrollPos(currentScrollPos);
    }

    !isOpen && window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos, scrolled, isOpen]);

  function toggleBurgerMenu() {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    function closeMobiNav(e) {
      const clickedElement = e.path ? e.path[0] : e.target;
      if (clickedElement !== btnRef.current) {
        setIsOpen(false);
      }
    }
    document.body.addEventListener("click", closeMobiNav);
    return () => {
      document.body.removeEventListener("click", closeMobiNav);
    };
  }, [btnRef]);

  return (
    <header
      className={`${style.header} ${scrolled && isMobile && style.scrolled}`}>
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.section}>
            <Link
              to="/"
              onClick={scrollToTop}>
              <div className={style.logo}>
                <img
                  src="./images/Tech.png"
                  alt="techlines logo"
                />
              </div>
            </Link>
          </div>
          <div className={style.nav__container}>
            <nav className={style.nav}>
              <ul className={style.list}>
                {navData.map(({ refName, text }) => (
                  <HeaderLink
                    className={`${style.listItem} ${
                      inViewList[refName] ? style.listItem_active : ""
                    }`}
                    key={refName}
                    refTarget={refList[refName]}
                    text={t(`headerLink.${text}`)}
                  />
                ))}
              </ul>
              <LanguageSelector />
            </nav>
            <Link to="https://b2b.techlines.es/login">
              <span className={style.nav_login}>{t("headerLink.LogIn")}</span>
            </Link>
          </div>
          <MobiNav
            isOpen={isOpen}
            toggleBurgerMenu={toggleBurgerMenu}
            refList={refList}
            inViewList={inViewList}
            setBtnRef={setBtnRef}
          />
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  refList: PropTypes.object,
  inViewList: PropTypes.object,
};
