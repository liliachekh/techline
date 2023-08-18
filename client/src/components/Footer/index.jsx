import style from "./footer.module.scss"
import { useTranslation } from "react-i18next";

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
          <p className={style.footer__infoText}>{t('footer.info.text6')}</p>
        </div>
        <div className={style.footer__copyright}>
          <span>{t('footer.copyright.text1')}</span>
          <span>{t('footer.copyright.text2')}<a href="https://uk.wix.com/?utm_campaign=vir_created_with">Wix</a></span>
        </div>
      </div>
    </footer>
  )
}

export default Footer;