import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import ItemCar from "./ItemCar";
import "./SliderCar.css";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";

import { useEffect, useState } from 'react';
import HandleApi from "../../../Apis/HandleApi";

function SliderCar() {
    const [data, setData] = useState([]);

    useEffect(() => {
        // const fetchData = async () => {
        //     const response = await axios.get('https://637c281172f3ce38ea9be907.mockapi.io/carapi/products',);
        //     setData(response.data);
        // }
        // fetchData();
        HandleApi.getAllCar().then((res) => {
            setData(res.cars);
          });
    }, []);

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
                    {data.map((product) => (
                        <SplideSlide key={product.id}>
                            <ItemCar data={product} />
                        </SplideSlide>
                    ))}
                </SplideTrack>
            </div>

            <div className="splide__arrows">
                <button className="splide__arrow splide__arrow--prev">
                    <EastIcon />
                </button>
                <button className="splide__arrow splide__arrow--next">
                    <EastIcon />
                </button>
            </div>
        </Splide>
    );
}

export default SliderCar;
