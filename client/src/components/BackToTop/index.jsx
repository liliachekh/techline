import { useState, useEffect } from "react";
import { BackToTopIcon } from "../icons";
import style from "./backToTop.module.scss";
import PropTypes from 'prop-types';


export default function BackToTop({ scrollToTop, isMobile }) {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > window.innerHeight) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const handleScrollToTop = () => {
    scrollToTop();
    setIsVisible(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    let timeoutId;

    if (isVisible) {
      timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isVisible]);

  return (
    isVisible && isMobile ?(
      <div
        className={`${style.btn} ${isVisible ? style.visible : ''}`}
        onClick={handleScrollToTop}>
        <BackToTopIcon />
      </div> 
    ) : null
  );
}

BackToTop.propTypes = {
  scrollToTop: PropTypes.func,
  isMobile: PropTypes.bool
}