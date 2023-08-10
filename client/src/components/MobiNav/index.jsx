import style from "./mobiNav.module.scss"

export default function MobiNav (props) {
    const {isOpen, toggleBurgerMenu} = props
    return (
        <div className={style.mobilNav}>
            <div className={`${style.wrapper} ${isOpen ? style.active : ''}`}>
                <ul className={style.list}>
                    <li className={style.listItem}>Home</li>
                    <li className={style.listItem}>About us</li>
                    <li className={style.listItem}>B2B</li>
                    <li className={style.listItem}>Contacts</li>
                    <li className={style.listItem}>Sign up</li>
                </ul>
        </div>
        <button type="button" className={`${style.burgerBtn} ${isOpen ? style.active : ''}`} onClick={toggleBurgerMenu}>
        <span className={`${style.burgerBtn__lines} ${isOpen ? style.active : ''}`}></span> </button>

              </div>

    )
}