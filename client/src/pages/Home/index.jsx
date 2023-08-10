import AboutUs from "../../components/AboutUs"
import Header from "../../components/Header"
import BecomePartner from "../../components/becomePartner"
import style from "./Home.module.scss"

export function Home () {
    return (
        <>
        <Header/>
        <BecomePartner/>
        <AboutUs/>
        </>
    )
}