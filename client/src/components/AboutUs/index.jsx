import style from "./aboutUs.module.scss";
import { paragraphTexts, statisticItems } from "./aboutUsTexts";

export default function AboutUs({ refName }) {
  return (
    <section ref={refName} className={style.aboutUs}>
      <div className={style.container}>
        <div className={style.content}>
          <h2 className={style.title}>About us</h2>
          <div className={style.subtitle}>
            <span className={style.subtitleText}>Trusted supplier</span>
            <span className={style.subtitleText}>of electronics worldwide</span>
          </div>
          <div className={style.paragraphs}>
            {paragraphTexts.map((text, index) => (
              <p
                className={style.paragraph}
                key={index}
                dangerouslySetInnerHTML={{ __html: text }}
              />
            ))}
          </div>
        </div>
        <div className={style.statistics}>
          {statisticItems.map((item, index) => (
            <div className={`${style.statItem} ${style[`area${index + 1}`]}`} key={index}>
              <div className={style.statValue}>{item.value}</div>
              <div className={style.statLabel}>{item.label}</div>
            </div>
          ))}

        </div>
      </div>
    </section>
  )
}
