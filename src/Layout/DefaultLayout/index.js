import Footer from "../../components/Footer";
import Header from "../../components/Header";

function DefaultLayout({children}) {
    return ( 
        <div>
            <div className="header">
                <Header />
            </div>

            <div className="container">
                {children}
            </div>

            <div className="footer">
                <Footer />
            </div>
        </div>
     );
}

export default DefaultLayout;