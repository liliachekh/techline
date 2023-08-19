import { animateFromLeft, animateFromRight } from "../../animation";
import style from "./aboutUs.module.scss";
import { paragraphTexts, statisticItems } from "./aboutUsTexts";
import { motion } from "framer-motion";
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";

export default function AboutUs({ refName }) {
  const { t } = useTranslation();

  return (
    <section
      ref={refName}
      className={style.aboutUs}>
      <div className={style.container}>
        <div className={style.content}>
          <motion.h2 {...animateFromLeft(0, 0.7)} className={style.title}>{t('aboutUs.title')}</motion.h2>
          <div className={style.subtitle}>
            <motion.span {...animateFromLeft(1)} className={style.subtitleText}>{t('aboutUs.subtitle1')}</motion.span>
            <motion.span {...animateFromLeft(2)} className={style.subtitleText}>{t('aboutUs.subtitle2')}</motion.span>
          </div>
          <div className={style.paragraphs}>
            {paragraphTexts.map((text, index) => (
              <motion.p
                {...animateFromLeft(3)}
                className={style.paragraph}
                key={index}
                dangerouslySetInnerHTML={{ __html: t(`aboutUs.${text}`) }} />
            ))}
          </div>
        </div>
        <div className={style.statistics}>
          {statisticItems.map((item, index) => (
            <motion.div
              {...animateFromRight(index, 0.2)}
              className={`${style.statItem} ${style[`area${index + 1}`]}`}
              key={index}>
              <div className={style.statValue}>{item.value}</div>
              <div className={style.statLabel}>{t(`aboutUs.statisticItems.${item.label}`)}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

AboutUs.propTypes ={
  refName: PropTypes.object
}