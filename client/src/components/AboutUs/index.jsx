import style from "./aboutUs.module.scss"

export default function AboutUs () {
    return (
        <section className={style.aboutUs}>
            <div className={style.container}>
            <div className={style.content}>
                <h2 className={style.title}>About us</h2>
                <div className={style.subtitle}>
                <span className={style.subtitleText}>Trusted supplier</span>
                <span className={style.subtitleText}>of electronics worldwide</span>
                </div>
                <div className={style.paragraphs}>
                <p className={style.paragraph}>We specialize in electronics wholesale and are able to supply products from numerous brands worldwide.</p>
                <p className={style.paragraph}><i>Apple, Samsung, Xiaomi, Huawei, Sony - you name it!</i><br/>
                Our longtime experience in the business has
                shaped our expertise in fast delivery times
                and meaningful partnerships. </p>
                </div>
            </div>
            <div className={style.statistics__wrapper}>
            {/* <div className={style.statistics}> */}
            <div className={`${style.statItem} ${style.area1}`}>
            <div className={style.statValue}>2016</div>
            <div className={style.statLabel}>Reliable Partner Since</div>
            </div>
            <div className={`${style.statItem} ${style.area2}`}>
            <div className={style.statValue}>16</div>
            <div className={style.statLabel}>Number of Employees</div>
            </div>
            <div className={`${style.statItem} ${style.area3}`}>
            <div className={`${style.statValue} ${style.statValue_plus}`}>300</div>
            <div className={style.statLabel}>Number of Trade Partners</div>
            </div>

            {/* </div> */}
            {/* <div className={style.statistics}> */}
            <div className={`${style.statItem} ${style.area4}`}>
            <div className={style.statValue}>€100M</div>
            <div className={style.statLabel}>Gross Turnover in 2022</div>
            </div>
            <div className={`${style.statItem} ${style.area5}`}>
            <div className={`${style.statValue} ${style.statValue_plus}`}>400'000</div>
            <div className={style.statLabel}>Number of Products Sold per year</div>
            </div>
            {/* </div> */}
            </div>
            </div>
        </section>
    )
}