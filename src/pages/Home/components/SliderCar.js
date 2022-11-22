import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import ItemCar from "./ItemCar";
import "./SliderCar.css";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";

function SliderCar() {
    const options = {
        rewind: true,
        type: "loop",
        speed: 1200,
        perPage: 4,
        perMove: 1,
        width: 1060,
        isNavigation: true,
        gap: "3rem"
        // fixedWidth: 250,
        // arrows: { prev: <WestIcon />, next: <EastIcon /> }
    };

    return (
        <Splide hasTrack={ false } options={options} aria-label="Slider Car">
            <div className="CarSlider__Costume">
                <SplideTrack>
                    <SplideSlide>
                        <ItemCar name="BMW" />
                    </SplideSlide>
                    <SplideSlide>
                        <ItemCar name="Honda" />
                    </SplideSlide>
                    <SplideSlide>
                        <ItemCar name="CRV" />
                    </SplideSlide>
                    <SplideSlide>
                        <ItemCar name="VINFAST" />
                    </SplideSlide>
                    <SplideSlide>
                        <ItemCar name="Roll Royce" />
                    </SplideSlide>
                    <SplideSlide>
                        <ItemCar name="Bently" />
                    </SplideSlide>
                    <SplideSlide>
                        <ItemCar name="Roll Royce" />
                    </SplideSlide>
                    <SplideSlide>
                        <ItemCar name="Bently" />
                    </SplideSlide>
                </SplideTrack>
            </div>

            <div className="splide__arrows">
                <button className="splide__arrow splide__arrow--prev">
                    {/* <WestIcon /> */}
                    <EastIcon />
                </button>
                <button className="splide__arrow splide__arrow--next">
                    <EastIcon />
                    {/* <WestIcon /> */}
                </button>
            </div>
        </Splide>
    );
}

export default SliderCar;
