import {HeroSlider, Slide} from 'hero-slider';
import images from '../../../assets/image';
function SliderImage() {
    return(
        <HeroSlider
            slidingAnimation="left_to_right"
            orentation="horizontal"
            initialSlide={1}
            // onBeforeChange={(previousSlide,nextSlide)}    
            // onChange={nextSlide => console.log("onChange")}
            
        >
            <Slide
                background={{
                    backgroundImage: images.carXImg,
                    backgroundAttachment: "fixed",
                }}/>
            <Slide
                background={{
                    backgroundImage: images.carYImg,
                    backgroundAttachment: "fixed",
                }}/>
            <Slide
                background={{
                    backgroundImage: images.carXImg,
                    backgroundAttachment: "fixed",
                }}/>
            
        </HeroSlider>
    );
}