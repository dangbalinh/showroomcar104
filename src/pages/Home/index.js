/* eslint-disable no-unused-vars */
import style from "./Home.module.css";
import React, { useState, useEffect, memo } from "react";
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
    }, [])

    return (
        <div>
            <div className={style.showCar}>                  
                <SliderImage/>
            </div>

            <div className={style.contact}>
                <div className={style.contactHeading}>
                    Nhận thông tin xe bằng cách liên hệ
                </div>
                <div className={style.contactDesc}>
                    Lưu ý, bạn hãy chọn ra những mẫu xe yêu thích trước khi liên hệ với chúng tôi.
                </div>
                <a href="/contact" className={style.contactLink}>
                    Liên hệ ngay!
                </a>
            </div>

            <div className={style.suggest}>
                <div className={style.suggestHeading}>Gợi ý sản phẩm</div>
                <div className={style.suggestSlider}>
                    <SliderCar />
                </div>
                <div className={style.line} />
            </div>
            {/* Dang Ba Linh */}
            <div className={style.Vehicle}>
                <h1 className={style.VehicleHeading}>Tất cả mẫu xe</h1>
                <Vehicle/>  
            </div>

            <div
                className={style.advice}
                style={{
                    backgroundImage: "url(https://firebasestorage.googleapis.com/v0/b/kingspeed-1ee63.appspot.com/o/homepage%2F%24RHPLO4O.jpg?alt=media&token=b853d689-6eee-490a-ab9d-20a1910dbb7b)",
                    backgroundSize: "cover",
                    paddingBottom: "52%",
                    // height: "100vh",
                    backgroundRepeat: "no-repeat"
                }}
            >
                <div className={style.adviceOverlay}>
                    <div className={style.adviceHeading}>
                        Đánh giá của khách hàng
                    </div>
                    <div className={style.adviceSlider}>
                        <SliderAdvice />
                    </div>
                </div>
            </div>

            <div className={style.reason}>
                <div className={style.reasonHeading}>
                    Tại sao bạn cần bảo hiểm xe hơi?
                </div>
                <div className={style.reasonParagrapth}>
                    Nếu bạn sở hữu một chiếc xe hơi, bạn chắc chắn cần bảo hiểm xe hơi. Chính sách bảo hiểm xe hơi 
                    giúp cung cấp sự bảo vệ tài chính cho bạn và có thể cả những người khác nếu bạn gặp tai nạn. 
                    Tất cả chỉ mất 15 phút để nhận được báo giá bảo hiểm xe hơi được cá nhân hóa với mức giá tốt 
                    nhất, giảm giá và các tùy chọn có sẵn cho bạn.
                </div>
                <ul className={style.reasonList}>
                    <li className={style.reasonItem}>
                        <VolunteerActivismOutlinedIcon
                            className={style.reasonIcon}
                        />
                        <p className={style.reasonText}>
                            Bảo hiểm xe hơi sẽ bảo vệ bạn khỏi những sự cố bất ngờ.
                        </p>
                    </li>
                    <li className={style.reasonItem}>
                        <TipsAndUpdatesOutlined className={style.reasonIcon} />
                        <p className={style.reasonText}>
                            Nó sẽ bao gồm chi phí thiệt hại hoặc mất mát của chiếc xe được bảo hiểm.
                        </p>
                    </li>
                    <li className={style.reasonItem}>
                        <AccessTimeOutlinedIcon className={style.reasonIcon} />
                        <p className={style.reasonText}>
                            Bạn sẽ trở lại lái xe bình thường sau sự cố một cách nhanh chóng và không gặp rắc rối.
                        </p>
                    </li>
                </ul>
            </div>

            <div
                className={style.news}
                style={{
                    backgroundImage: "url(https://firebasestorage.googleapis.com/v0/b/kingspeed-1ee63.appspot.com/o/homepage%2Fnewsimg.png?alt=media&token=a6633157-390e-4df1-9935-f6887feccdd1)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "851px",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div className={style.newsOverlay}>
                    <div className={style.newsHeading}>Tin tức</div>
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

export default memo(Home);
