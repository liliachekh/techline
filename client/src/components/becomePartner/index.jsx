import { motion } from "framer-motion";
import style from "./becomePartner.module.scss";
import { animateFromBottom, animateFromLeft, animateFromRight } from "../../animation";

export default function BecomePartner({ refName }) {
  return (
    <section ref={refName} className={style.becomePartner}>
      <div className={style.becomePartner__wrapper}>
        <motion.h1 {...animateFromBottom(0)} className={style.title}>Unlock your business potential with our wholesale B2B platform</motion.h1>
        <ul className={style.list}>
          <li className={style.listItem} >
            <motion.div {...animateFromLeft(0)} className={style.listItem__container}>
              <figure>
                <img className={style.listItem__img} src="./images/check_edited.webp" alt="checked" />
              </figure>
              <span className={style.listItem__text}>Get exclusive access to top-brand electronics at competitive prices
              </span>
            </motion.div>
          </li>
          <li className={style.listItem}>
            <motion.div {...animateFromLeft(1)} className={style.listItem__container}>
              <figure>
                <img className={style.listItem__img} src="./images/check_edited.webp" alt="checked" />
              </figure>
              <span className={style.listItem__text}>Simplify your supply chain with our B2B platform
              </span>
            </motion.div>
          </li>
        </ul>
        <motion.div {...animateFromRight()} className={style.btn__container}>
          <button className={style.btn} >Become a partner</button>
        </motion.div>
      </div>
    </section>
  )
}