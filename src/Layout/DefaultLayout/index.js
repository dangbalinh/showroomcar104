import Footer from "../../components/Footer";
import Header from "../../components/Header";
import styles from './DefaultLayout.module.css'

function DefaultLayout({children}) {
    return ( 
        <div>
            <div className={styles.header}>
                <Header />
            </div>

            <div className={styles.container}>
                {children}
            </div>

            <div className={styles.footer}>
                <Footer />
            </div>
        </div>
     );
}

export default DefaultLayout;