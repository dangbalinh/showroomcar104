import HeroSlider, {Slide , Overlay} from 'hero-slider';
import style from './SliderImage.module.css';
import Wrapper from './Wrapper';
import images from '../../../assets/image';
function SliderImage() {
    return(
        <HeroSlider
        height={"100vh"}
        autoplay controller={{
          initialSlide: 1,
          slidingDuration: 400,
          slidingDelay: 200,
          onSliding: (nextSlide) =>
            console.debug("onSliding(nextSlide): ", nextSlide),
          onBeforeSliding: (previousSlide, nextSlide) =>
            console.debug(
              "onBeforeSliding(previousSlide, nextSlide): ",
              previousSlide,
              nextSlide
            ),
          onAfterSliding: (nextSlide) =>
            console.debug("onAfterSliding(nextSlide): ", nextSlide)
        }}
        >
        <Overlay>
            <Wrapper>
                <a href="/introduce" className={style.showStarted}>
                    Get Started
                </a>
                <div className={style.showDescription}>
                    Twenty-four years in the market - helping people save money
                    and time all around the states.
                </div>
            </Wrapper>
        </Overlay>
            <Slide
                
                shouldRenderMask
                label="County Clare - Ireland"
                background={{
                    
                    backgroundImageSrc: images.carXImg,
                }}
                />
            <Slide
                shouldRenderMask
                label="County Clare - Ireland"
                background={{
                    backgroundImageSrc: images.carYImg,
                }}/>
            <Slide
                shouldRenderMask
                label="County Clare - Ireland"
                background={{
                    backgroundImageSrc: images.carZImg,
                }}/>
            
        </HeroSlider>
    );
}
export default SliderImage;
