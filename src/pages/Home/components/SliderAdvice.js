import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import ItemAdvice from "./ItemAdvice";
import style from "./SliderAdvice.module.css";
import "./SliderAdvice.css";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";

function SliderAdvice() {
    const options = {
        rewind: true,
        type: "loop",
        speed: 1500,
        perPage: 3,
        perMove: 1,
        width: 1370,
        // height: "100%",
        autoHeight: true,
        gap: "5.4rem",
        fixedWidth: 400,
        fixedHeight: 362,
        focus: "center",
        // autoplay: true,
        pauseOnHover: true,
        updateOnMove: true,
        padding: 20,
        // fixedWidth: 250,
    };

    return (
        <Splide className="AdviceSlider__splide" hasTrack={false} options={options} aria-label="Slider Advice">
            <div className="AdviceSlider__custome">
                <SplideTrack>
                    <SplideSlide>
                        <ItemAdvice />
                    </SplideSlide>
                    <SplideSlide>
                        <ItemAdvice />
                    </SplideSlide>
                    <SplideSlide>
                        <ItemAdvice />
                    </SplideSlide>
                    <SplideSlide>
                        <ItemAdvice />
                    </SplideSlide>
                    <SplideSlide>
                        <ItemAdvice />
                    </SplideSlide>
                    <SplideSlide>
                        <ItemAdvice />
                    </SplideSlide>
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

export default SliderAdvice;
