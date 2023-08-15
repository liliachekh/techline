import { motion } from "framer-motion";
import style from "./becomePartner.module.scss";
import { fromBottom, fromLeft, fromRight } from "../../animation";



export default function BecomePartner({ refName }) {
  return (
    <motion.section
      ref={refName}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={style.becomePartner}>
      <div className={style.becomePartner__wrapper}>
        <motion.h1 variants={fromBottom} className={style.title}>Unlock your business potential with our wholesale B2B platform</motion.h1>
        <ul className={style.list}>
          <li className={style.listItem} >
            <motion.div custom={0} variants={fromLeft} className={style.listItem__container}>
              <figure>
                <img className={style.listItem__img} src="./images/check_edited.webp" alt="checked" />
              </figure>
              <span className={style.listItem__text}>Get exclusive access to top-brand electronics at competitive prices
              </span>
            </motion.div>
          </li>
          <li className={style.listItem}>
            <motion.div custom={1} variants={fromLeft} className={style.listItem__container}>
              <figure>
                <img className={style.listItem__img} src="./images/check_edited.webp" alt="checked" />
              </figure>
              <span className={style.listItem__text}>Simplify your supply chain with our B2B platform
              </span>
            </motion.div>
          </li>
        </ul>
        <motion.div className={style.btn__container} variants={fromRight}>
          <button className={style.btn} >Become a partner</button>
        </motion.div>
      </div>
    </motion.section>
  )
}