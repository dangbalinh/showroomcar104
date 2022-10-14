import Footer from "../../components/Footer";
import Header from "../../components/Header";
import style from './DefaultLayout.module.css'

function DefaultLayout({children}) {
    return ( 
        <div>
            <div className="header">
                <Header />
            </div>

            <div className={style.container}>
                {children}
            </div>

            <div className="footer">
                <Footer />
            </div>
        </div>
     );
}

export default DefaultLayout;