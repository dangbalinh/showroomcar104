import { EastOutlined, KeyboardBackspaceOutlined } from "@mui/icons-material";
import { useState } from "react";
import Carousel from "react-simply-carousel";
import ItemCar from "./ItemCar";

function ReactSimplyCarouselExample() {
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);

    return (
        <div>
            <Carousel   
                disableNavIfEdgeActive={true}
                activeSlideIndex={activeSlideIndex}
                onRequestChange={setActiveSlideIndex}
                itemsToShow={4}
                itemsToScroll={1}
                forwardBtnProps={{
                    //here you can also pass className, or any other button element attributes
                    style: {
                        alignSelf: "center",
                        background: "transparent",
                        border: "2px solid #91534A",
                        borderRadius: "50%",
                        color: "#91534A",
                        cursor: "pointer",
                        width: 36,
                        height: 36,
                        lineHeight: 1,
                        textAlign: "center",
                        marginLeft: "40px"
                    },
                    children: <span>
                        {/* <FontAwesomeIcon icon={faLongArrowAltRight} /> */}
                        <EastOutlined style={{ fontSize: "24px" }} />
                    </span>
                }}
                backwardBtnProps={{
                    //here you can also pass className, or any other button element attributes
                    style: {
                        alignSelf: "center",
                        background: "transparent",
                        border: "2px solid #91534A",
                        borderRadius: "50%",
                        color: "#91534A",
                        cursor: "pointer",
                        width: 36,
                        height: 36,
                        lineHeight: 1,
                        textAlign: "center",
                        marginRight: "40px"
                    },
                    children: <span>
                        {/* <FontAwesomeIcon icon={faLongArrowAltLeft} /> */}
                        <KeyboardBackspaceOutlined style={{ fontSize: "24px"}} />
                    </span>
                }}
                speed={400}
                easing="linear"
            >
                <ItemCar name="BMW"/>
                <ItemCar name="MER"/>
                <ItemCar name="Porches"/>
                <ItemCar name="Audi"/>
                <ItemCar name="Honda"/>
                <ItemCar name="BMW"/>
                <ItemCar name="MER"/>
                <ItemCar name="Porches"/>
                <ItemCar name="Audi"/>
                <ItemCar name="Honda"/> 

            </Carousel>
        </div>
    );
}

export default ReactSimplyCarouselExample;
