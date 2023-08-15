import { useState, useEffect } from 'react';
import { BackToTopIcon } from '../icons';
import style from "./backToTop.module.scss"

export default function BackToTop ({ scrollToTop }) {
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
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    isVisible && (
    <div className={style.btn} onClick={handleScrollToTop}>
      <BackToTopIcon />
    </div>)
  );
};


