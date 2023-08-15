import style from "./becomePartner.module.scss";

export default function BecomePartner() {
  return (
    <section className={style.becomePartner}>
      <div className={style.becomePartner__wrapper}>
        <h1 className={style.title}>Unlock your business potential with our wholesale B2B platform</h1>
        <ul className={style.list}>
          <li className={style.listItem}>
            <div className={style.listItem__container}>
              <figure>
                <img className={style.listItem__img} src="./images/check_edited.webp" alt="checked"/>
              </figure>
              <span className={style.listItem__text}>Get exclusive access to top-brand electronics at competitive prices
              </span>
            </div>
          </li>
          <li className={style.listItem}>
            <div className={style.listItem__container}>
              <figure>
                <img className={style.listItem__img} src="./images/check_edited.webp" alt="checked"/>
              </figure>
              <span className={style.listItem__text}>Simplify your supply chain with our B2B platform
              </span>
            </div>
          </li>
        </ul>
        <div className={style.btn__container}>
          <button className={style.btn}>Become a partner</button>
        </div>
      </div>
    </section>
  );
}