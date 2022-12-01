import HeroSlider, {Slide} from 'hero-slider';
import images from '../../../assets/image';
function SliderImage() {
    return(
        <HeroSlider
            slidingAnimation="left_to_right"
            orientation="horizontal"
            initialSlide={1}
            onBeforeChange={(previousSlide,nextSlide) => console.log("onBeforeChange",previousSlide,nextSlide)}    
            onChange={nextSlide => console.log("onChange",nextSlide)}
            onAfterChange={nextSlide => console.log("onAfterChange",nextSlide)}
            style = {{
                backgroundColor: "rgba(0,0,0,0.33)"
            }}
            settings={{
                slidingDuration: 100,
                // slidingDelay: 100,
                shouldAutoplay: true,
                shouldDisplayButtons: true,
                autoplayDuration: 100,
                height: "100vh"
            }}       
        >
            <Slide
                background={{
                    backgroundImageSrc: images.carXImg,
                    backgroundAttachment: "fixed"
                }}/>
            <Slide
                background={{
                    backgroundImageSrc: images.carYImg,
                    backgroundAttachment: "fixed"
                }}/>
            <Slide
                background={{
                    backgroundImageSrc: images.sliderImg,
                    backgroundAttachment: "fixed"
                }}/>
            
        </HeroSlider>
    );
}
export default SliderImage;
