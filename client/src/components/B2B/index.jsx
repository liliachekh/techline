import style from "./b2b.module.scss";
import { listItemTexts, paragraphs } from "./b2bTexts";
import { motion } from "framer-motion";
import { fromLeft, fromRight } from "../../animation";

export default function B2B({ refName }) {

  return (
    <section className={style.b2b} ref={refName}>
      <div className={style.wrapper}>
        <div className={style.container}>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.5, once: true }}
            variants={fromLeft}
            className={style.title}>
            B2B platform
          </motion.h2>
          <div className={style.description}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.5, once: true }}
              className={style.text}>
              {paragraphs.map((text, index) => (
                <motion.p custom={index} variants={fromLeft} className={style.paragraph} key={index}>
                  {text}
                </motion.p>
              ))}
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.5, once: true }}
              variants={fromRight}
              className={style.photo}>
              <div className={style.photo__pc}>
                <img src="./images/pc_b2b_platform.webp" alt="b2b platform for pc" />
                <div className={style.photo__pc_productcard}>
                  <img src="./images/b2b_productcard.webp" alt="b2b productcard for pc" />
                </div>
              </div>
              <div className={style.photo__mobile}>
                <img src="./images/mobile_b2b_platform.webp" alt="b2b platform for mobile phone" />
                <div className={style.photo__mobile_productcard}>
                  <img src="./images/b2b_mobile_productcard.webp" alt="b2b productcard for mobile phone" />
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.2, once: true }}
            variants={fromRight}
            className={style.list}>
            <h3 className={style.subtitle}>Features</h3>
          </motion.div>

          {listItemTexts.map((text, index) => (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.2, once: true }}
              variants={fromRight}
              custom={index / 2}
              className={style.listItem}
              key={index}>
              <figure className={style.img__container}>
                <img
                  className={style.listItem__img}
                  src="./images/check_edited.webp"
                  alt="checked"
                />
              </figure>
              <span className={style.listItem__text}>{text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}