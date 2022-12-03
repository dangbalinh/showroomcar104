/* eslint-disable no-unused-vars */
import style from "./Home.module.css";
import images from "../../assets/image";
import React, { useState, useEffect } from "react";
import SliderCar from "./components/SliderCar";
import SliderAdvice from "./components/SliderAdvice";
import Vehicle from "./components/Vehicle";
import BackToTopButton from "./components/BackToTopButton";
import SliderImage from "./components/SliderImage";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
import { TipsAndUpdatesOutlined } from "@mui/icons-material";
import NewsItem from "./components/NewsItem";

import axios from "axios";
import HandleNewsApi from "../../Apis/HandleNewsApi";

function Home() {
    const [newsData, setNewsData] = useState([])
    useEffect(() => {
        HandleNewsApi.getThreeNews().then(res => setNewsData(res.news));
    }, [newsData])

    return (
        <div>
            <div className={style.showCar}>                  
                <SliderImage/>
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
            {/* Dang Ba Linh */}
            <div className={style.Vehicle}>
                <h1 className={style.VehicleHeading}>OUR VEHICLE</h1>
                <Vehicle/>  
            </div>

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
                        {newsData.map((news, index) => (
                            <NewsItem key={index} data={news} />
                        ))}
                    </div>
                </div>
            </div>  
                <BackToTopButton/>
        </div>
    );
}

export default Home;
