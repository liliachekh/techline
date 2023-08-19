import { useEffect, useState } from "react";
import { BackToTopIcon } from "../icons";
import style from "./backToTop.module.scss";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { animateBackToTop } from "../../animation";
import { scrollToTop } from "../../utils";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsVisible(latest > window.innerHeight);
  });
  
  useEffect(() => {
    let timeoutId;

    if (isVisible) {
      timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, 4000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible &&
        <motion.div
          {...animateBackToTop}
          className={style.btn}
          onClick={scrollToTop}>
          <BackToTopIcon />
        </motion.div>}
    </AnimatePresence>
  );
}