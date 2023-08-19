import { animateFromLeft, animateFromRight } from "../../animation";
import style from "./aboutUs.module.scss";
import { paragraphTexts, statisticItems } from "./aboutUsTexts";
import { motion } from "framer-motion";
import PropTypes from 'prop-types';


export default function AboutUs({ refName }) {
  return (
    <section
      ref={refName}
      className={style.aboutUs}>
      <div className={style.container}>
        <div className={style.content}>
          <motion.h2 {...animateFromLeft(0, 1)} className={style.title}>About us</motion.h2>
          <div className={style.subtitle}>
            <motion.span {...animateFromLeft(1)} className={style.subtitleText}>Trusted supplier</motion.span>
            <motion.span {...animateFromLeft(2)} className={style.subtitleText}>of electronics worldwide</motion.span>
          </div>
          <div className={style.paragraphs}>
            {paragraphTexts.map((text, index) => (
              <motion.p
                {...animateFromLeft(3)}
                className={style.paragraph}
                key={index}
                dangerouslySetInnerHTML={{ __html: text }} />
            ))}
          </div>
        </div>
        <div className={style.statistics}>
          {statisticItems.map((item, index) => (
            <motion.div
              {...animateFromRight(index)}
              className={`${style.statItem} ${style[`area${index + 1}`]}`}
              key={index}>
              <div className={style.statValue}>{item.value}</div>
              <div className={style.statLabel}>{item.label}</div>
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