import style from "./b2b.module.scss"
import { listItemTexts, paragraphs } from "./b2bTexts"

export default function B2B({ refName }) {

  return (
    <section className={style.b2b} ref={refName}>
      <div className={style.wrapper}>
        <div className={style.container}>
          <h2 className={style.title}>B2B platform</h2>
          <div className={style.description}>
            <div className={style.text}>

              {paragraphs.map((text, index) => (
                <p className={style.paragraph} key={index}>
                  {text}
                </p>
              ))}
            </div>
            <div className={style.photo}>
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

            </div>
          </div>

          <div className={style.list}>
            <h3 className={style.subtitle}>Features</h3>
          </div>

          {listItemTexts.map((text, index) => (
            <div className={style.listItem} key={index}>
              <figure className={style.img__container}>
                <img
                  className={style.listItem__img}
                  src="./images/check_edited.webp"
                  alt="checked"
                />
              </figure>
              <span className={style.listItem__text}>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}