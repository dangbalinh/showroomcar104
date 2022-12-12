import { useEffect, useState } from "react";
import NorthIcon from '@mui/icons-material/North';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import styles from "./BackToTopButton.module.css"

function BackToTopButton() {
    const [backToTopButton, setBackToTopButton] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 1000) {
                setBackToTopButton(true);
            } else {
                setBackToTopButton(false);
            }
        });
    }, []);

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div className="App">
            {backToTopButton && (
                <button className={styles.btn}
                    onClick={scrollUp}
                >
                    <KeyboardDoubleArrowUpIcon className={styles.btnIcon} />
                </button>
            )}
        </div>
    );
}

export default BackToTopButton;
