import { motion } from "framer-motion";
import style from "./becomePartner.module.scss";
import { animateFromBottom, animateFromLeft, animateFromRight } from "../../animation";
import { useTranslation } from "react-i18next";

export default function BecomePartner({ refName }) {
  const { t } = useTranslation();

  return (
    <section ref={refName} className={style.becomePartner}>
      <div className={style.becomePartner__wrapper}>
        <div className={style.container}>
          <motion.h1 {...animateFromBottom(0)} className={style.title}>{t('becomePartner.title')}</motion.h1>
        <ul className={style.list}>
          <li className={style.listItem} >
            <motion.div {...animateFromLeft(0)} className={style.listItem__container}>
              <figure>
                <img className={style.listItem__img} src="./images/check_edited.webp" alt="checked" />
              </figure>
                <span className={style.listItem__text}>{t('becomePartner.listItem1')}
              </span>
            </motion.div>
          </li>
          <li className={style.listItem}>
            <motion.div {...animateFromLeft(1)} className={style.listItem__container}>
              <figure>
                <img className={style.listItem__img} src="./images/check_edited.webp" alt="checked" />
              </figure>
                <span className={style.listItem__text}>{t('becomePartner.listItem2')}
              </span>
            </motion.div>
          </li>
        </ul>
        <motion.div {...animateFromRight()} className={style.btn__container}>
            <button className={style.btn}>{t('becomePartner.btn')}</button>
        </motion.div>
        </div>
      </div>
    </section>
  )
}