import Footer from "../../components/Footer";
import Header from "../../components/Header";

function DefaultLayout() {
    return ( 
        <div>
            <div className="header">
                <Header />
            </div>

            <div className="body">

            </div>

            <div className="footer">
                <Footer />
            </div>
        </div>
     );
}

export default DefaultLayout;