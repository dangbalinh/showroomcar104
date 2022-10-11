import style from "./Home.module.css";
import images from "../../assets/image";
import React from "react";
import Slider from "./Slider";

function Home() {
    return (
        <div>
            <div className={style.showCar}>
                <img
                    src={images.sliderImg}
                    alt="Car"
                    className={style.showImg}
                />
                <a href="/detailproduct" className={style.showStarted}>
                    Get Started
                </a>
                <div className={style.showDescription}>
                    Twenty-four years in the market - helping people save money
                    and time all around the states.
                </div>
            </div>

            <div className={style.contact}>
                <div className={style.contactHeading}>
                    Get a fast quote by making a call
                </div>
                <div className={style.contactDesc}>
                    Note, that you need to have an active insurance package
                    before you request a quote.
                </div>
                <a href="/contact" className={style.contactLink}>
                    Call Now!
                </a>
            </div>

            <div className={style.suggest}>
                <div className={style.suggestHeading}>OUR RECOMMENDATIONS</div>
                <Slider />
                <div className={style.line} />
            </div>

            <div className={style.vehicle}>
                <div className={style.vehicleHeading}>OUR VEHICLES</div>
                <ul className={style.vehicleList}>
                    <li className={style.styleVehicleItem}>TOYOTA</li>
                    <li className={style.styleVehicleItem}>BMW</li>
                    <li className={style.styleVehicleItem}>FORD</li>
                    <li className={style.styleVehicleItem}>HONDA</li>
                    <li className={style.styleVehicleItem}>HUYNDAI</li>
                    <li className={style.styleVehicleItem}>MERCEDES</li>
                    <li className={style.styleVehicleItem}>VINFAST</li>
                    <li className={style.styleVehicleItem}>KIA</li>
                </ul>
            </div>
        </div>
    );
}

export default Home;
