import style from "./b2b.module.scss";
import { listItemTexts, paragraphs } from "./b2bTexts";
import { motion } from "framer-motion";
import { animateFromLeft, animateFromRight } from "../../animation";
import { useTranslation } from "react-i18next";

export default function B2B({ refName }) {
  const { t } = useTranslation();

  return (
    <section className={style.b2b} ref={refName}>
      <div className={style.wrapper}>
        <div className={style.container}>
          <motion.h2
            {...animateFromLeft()}
            className={style.title}>
            {t('b2b.title')}
          </motion.h2>
          <div className={style.description}>
            <div className={style.text}>
              {paragraphs.map((text, index) => (
                <motion.p
                  {...animateFromLeft(index)}
                  className={style.paragraph}
                  key={index}>
                  {t(`b2b.description.${text}`)}
                </motion.p>
              ))}
            </div>
            <motion.div {...animateFromRight()} className={style.photo}>
              <div className={style.photo__pc}>
                <img src="./images/pc_b2b_platform.webp" alt="b2b platform for pc" />
                <div className={style.photo__pc_productcard}>
                  <img src="./images/b2b_productcard.webp" alt="b2b productcard for pc" />
                </div>
              </div>
              <div className={style.photo__mobile}>
                <img src="./images/mobile_b2b_platform.webp" alt="b2b platform for mobile phone" />
                {/* <div className={style.photo__mobile_productcard}>
                  <img src="./images/b2b_mobile_productcard.webp" alt="b2b productcard for mobile phone" />
                </div> */}
              </div>
            </motion.div>
          </div>

          <motion.div {...animateFromRight()} className={style.list}>
            <h3 className={style.subtitle}>{t('b2b.subtitle')}</h3>
          </motion.div>

          {listItemTexts.map((text, index) => (
            <motion.div
              {...animateFromRight(index / 2)}
              className={style.listItem}
              key={index}>
              <figure className={style.img__container}>
                <img
                  className={style.listItem__img}
                  src="./images/check_edited.webp"
                  alt="checked"
                />
              </figure>
              <span className={style.listItem__text}>{t(`b2b.listItems.${text}`)}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}