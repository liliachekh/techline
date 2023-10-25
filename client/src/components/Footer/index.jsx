import style from "./footer.module.scss"
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function Footer({ refName }) {
  const { t } = useTranslation();

  return (
    <footer ref={refName} className={style.footer}>
      <div className={style.footer__container}>
        <h2 className={style.footer__title}>{t('footer.title')}</h2>
        <div className={style.footer__info}>
          <h3 className={style.footer__infoTitle}>{t('footer.subtitle')}</h3>
          <p className={style.footer__infoText}>{t('footer.info.text1')}</p>
          <p className={style.footer__infoText}>{t('footer.info.text2')}</p>
          <p className={style.footer__infoText}>{t('footer.info.text3')}</p>
          <p className={style.footer__infoText}>{t('footer.info.text4')}</p>
          <p className={style.footer__infoText}>{t('footer.info.text5')}</p>
        </div>
        <p className={style.footer__devinfo}>2023 © Techlines Distribution. All rights reserved.</p>
        <p className={style.footer__devinfo}>Developed by <Link to="https://othersite.net/" target="blank">OTHERSITE STUDIO</Link></p>

      </div>
    </footer>
  )
}

export default Footer;