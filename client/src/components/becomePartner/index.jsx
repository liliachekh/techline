import { motion } from "framer-motion"
import style from "./becomePartner.module.scss"

const fromLeft = {
  hidden: {
    x: -100,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
  }
}

const fromRight = {
  hidden: {
    x: 100,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
  }
}

const fromBottom = {
  hidden: {
    y: 100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
  }
}

export default function BecomePartner({ refName }) {
  return (
    <motion.section
      ref={refName}
      initial="hidden"
      whileInView="visible"
      className={style.becomePartner}>
      <div className={style.becomePartner__wrapper}>
        <motion.h1 variants={fromBottom} className={style.title}>Unlock your business potential with our wholesale B2B platform</motion.h1>
        <motion.ul variants={fromLeft} className={style.list}>
          <li className={style.listItem} >
            <div className={style.listItem__container}>
              <figure>
                <img className={style.listItem__img} src="./images/check_edited.webp" alt="checked" />
              </figure>
              <span className={style.listItem__text}>Get exclusive access to top-brand electronics at competitive prices
              </span>
            </div>
          </li>
          <li className={style.listItem}>
            <div className={style.listItem__container}>
              <figure>
                <img className={style.listItem__img} src="./images/check_edited.webp" alt="checked" />
              </figure>
              <span className={style.listItem__text}>Simplify your supply chain with our B2B platform
              </span>
            </div>
          </li>
        </motion.ul>
        <div className={style.btn__container}>
          <motion.button className={style.btn} variants={fromRight}>Become a partner</motion.button>
        </div>
      </div>
    </motion.section>
  )
}