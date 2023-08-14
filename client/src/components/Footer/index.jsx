import style from "./footer.module.scss"

function Footer() {

    return (
        <footer className={style.footer}>
            <div className={style.footer__container}>
                <h2 className={style.footer__title}>Contacts</h2>
                <div className={style.footer__info}>
                    <h3 className={style.footer__infoTitle}>HERMES DISTRIBUTION OÜ</h3>
                    <p className={style.footer__infoText}>Legal address: Tornimäe tn 5-2. korrus, Tallinn 10145, Estonia</p>
                    <p className={style.footer__infoText}>Warehouse address: Taevakivi 1, Box No.7, Tallinn 13619, Estonia</p>
                    <p className={style.footer__infoText}>Registration nr: 14158325</p>
                    <p className={style.footer__infoText}>VAT nr: EE101938314</p>
                    <p className={style.footer__infoText}>Email:B2B&lpar;@&rpar;HDC.EE</p>
                    <p className={style.footer__infoText}>Phone nr: +372 581O5773</p>
                </div>
                <div className={style.footer__copyright}>
                    <span>© 2035 by TIC.</span>
                    <span>&nbsp;Powered and secured by Wix</span>
                </div>
            </div>
        </footer>
    )
}

export default Footer;