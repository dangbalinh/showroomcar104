import ItemAdvice from "./ItemAdvice";
import style from './SliderAdvice.module.css'

function SliderAdvice() {
    return ( 
        <div className={style.container}>
            <ItemAdvice/>
            <ItemAdvice/>
            <ItemAdvice/>
        </div>
     );
}

export default SliderAdvice;