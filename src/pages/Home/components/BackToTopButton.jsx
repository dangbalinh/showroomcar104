import { positions, width } from "@mui/system";
import { useEffect, useState } from "react";

function BackToTopButton() {
    const [backToTopButton,setBackToTopButton] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if(window.scrollY > 100) {
                setBackToTopButton(true);
            }
            else {
                setBackToTopButton(false);
            }
        })
    },[])
    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
    return (
        <div className="App">
            {backToTopButton && (<button
            style={{
                positions: "fixed",
                bottom: "50px",
                right: "50px",
                width: "50px",
                height: "50px"
            }}
            onClick={scrollUp}>

            </button>)}
        </div>
    );
}
export default BackToTopButton;