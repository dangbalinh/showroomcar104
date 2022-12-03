import HeroSlider, {Slide , Overlay} from 'hero-slider';
import style from './SliderImage.module.css';
import Wrapper from './Wrapper';
import images from '../../../assets/image';
import { memo } from "react";

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
                    Giới thiệu
                </a>
                <div className={style.showDescription}>
                Nơi chuyên trưng bày và mua bán các loại siêu xe, siêu sang của những thương hiệu hàng đầu thế giới. Giúp mọi người tiết kiệm thời gian nhưng vẫn có được những mẫu xe ưng ý.
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
export default memo(SliderImage);
