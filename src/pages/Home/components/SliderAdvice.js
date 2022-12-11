import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import ItemAdvice from "./ItemAdvice";
import style from "./SliderAdvice.module.css";
import "./SliderAdvice.css";
// import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
import axios from "axios";
import { useEffect, useState, memo } from 'react';

function SliderAdvice() {
    const options = {
        rewind: true,
        type: "loop",
        speed: 1500,
        perPage: 3,
        perMove: 1,
        width: 1370,
        autoHeight: true,
        gap: "5.4rem",
        fixedWidth: 400,
        fixedHeight: 362,
        // padding: '5rem',
        focus: "center",
        autoplay: true,
        interval: 3500,
        pauseOnHover: true,
        updateOnMove: true,
        // fixedWidth: 250,
    };

    const [data, setData] = useState([]);

    useEffect(() => {
      axios.get("https://637c281172f3ce38ea9be907.mockapi.io/carapi/products").then(res => setData(res.data))
    }, [])
    console.log(data)

    return (
        <Splide className="AdviceSlider__splide" hasTrack={false} options={options} aria-label="Slider Advice">
            <div className="AdviceSlider__custome">
                <SplideTrack>
                    {data.map((item, index) => (
                        <SplideSlide key={index}>
                            <ItemAdvice data={item} />
                        </SplideSlide>
                    ))}
                </SplideTrack>
            </div>

            <div className="splide__arrows">
                <button className="splide__arrow splide__arrow--prev" id={style.iconPrev}>
                    {/* <WestIcon /> */}
                    <EastIcon />
                </button>
                <button className="splide__arrow splide__arrow--next" id={style.iconNext}>
                    <EastIcon />
                    {/* <WestIcon /> */}
                </button>
            </div>
        </Splide>
    );
}

export default memo(SliderAdvice);
