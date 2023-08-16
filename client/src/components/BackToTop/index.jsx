import { useState, useEffect } from "react";
import { BackToTopIcon } from "../icons";
import style from "./backToTop.module.scss";

export default function BackToTop({ scrollToTop }) {
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
    isVisible && (
      <div
        className={`${style.btn} ${isVisible ? style.visible : ''}`}
        onClick={handleScrollToTop}>
        <BackToTopIcon />
      </div>
    )
  );
}
