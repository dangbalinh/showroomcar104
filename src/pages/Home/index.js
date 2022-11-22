import style from "./Home.module.css";
import images from "../../assets/image";
import React from "react";
import SliderCar from "./components/SliderCar";
import SliderAdvice from "./components/SliderAdvice";

import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
import { TipsAndUpdatesOutlined } from "@mui/icons-material";
import NewsItem from "./components/NewsItem";

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
                <div className={style.suggestSlider}>
                    <SliderCar />
                </div>
                <div className={style.line} />
            </div>

            {/* <div className={style.vehicle}>
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
            </div> */}

            <div
                className={style.advice}
                style={{
                    backgroundImage: `url(${images.clientImg})`,
                    backgroundSize: "cover",
                    paddingBottom: "52%",
                    // height: "100vh",
                    backgroundRepeat: "no-repeat"
                }}
            >
                <div className={style.adviceOverlay}>
                    <div className={style.adviceHeading}>
                        Let our clients speak for us!
                    </div>
                    <div className={style.adviceSlider}>
                        <SliderAdvice />
                    </div>
                </div>
            </div>

            <div className={style.reason}>
                <div className={style.reasonHeading}>
                    Why do you need car insurance?
                </div>
                <div className={style.reasonParagrapth}>
                    If you own a car, you definitely need car insurance. A car
                    insurance policy helps provide financial protection for you
                    and possibly others if you're involved in an accident. All
                    it takes is 15 minutes to get a personalized car insurance
                    quote with the best rates, discounts, and options available
                    to you.
                </div>
                <ul className={style.reasonList}>
                    <li className={style.reasonItem}>
                        <VolunteerActivismOutlinedIcon
                            className={style.reasonIcon}
                        />
                        <p className={style.reasonText}>
                            Car insurance will protect you from expensive
                            surprises.
                        </p>
                    </li>
                    <li className={style.reasonItem}>
                        <TipsAndUpdatesOutlined className={style.reasonIcon} />
                        <p className={style.reasonText}>
                            It will cover the cost of damage or loss of the
                            insured vehicle.
                        </p>
                    </li>
                    <li className={style.reasonItem}>
                        <AccessTimeOutlinedIcon className={style.reasonIcon} />
                        <p className={style.reasonText}>
                            You will get back to normal driving after the
                            incident quick and hassle-free.
                        </p>
                    </li>
                </ul>
            </div>

            <div
                className={style.news}
                style={{
                    backgroundImage: `url(${images.newsImg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "851px",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div className={style.newsOverlay}>
                    <div className={style.newsHeading}>NEWS</div>
                    <div className={style.newsList}>
                        <NewsItem />    
                        <NewsItem />
                        <NewsItem />
                    </div>
                </div>
            </div>  
        </div>
    );
}

export default Home;
