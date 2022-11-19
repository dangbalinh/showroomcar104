import style from "./Contact.module.css" 
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import MailIcon from '@mui/icons-material/Mail';
import WebIcon from '@mui/icons-material/Web';
function Contact() {
    return (
        <div className={style.contactLayout}>
            {/* Contact Branch */}
            <div className={style.contactBranch}>
                <div className={style.contactItem}>
                    <div className={style.contactName}>
                    <FmdGoodOutlinedIcon sx={{color: "#AE0D0D", fontSize: 32,marginRight:1}}></FmdGoodOutlinedIcon>
                    <h5>King Speed Ha Noi</h5>
                    </div>
                    <p className={style.contactLocation}>132 Le Duan Street, Nguyen Du Ward, Hai Ba Trung District, City.  Hanoi.</p>
                </div>
                <div className={style.contactItem}>
                    <div className={style.contactName}>
                    <FmdGoodOutlinedIcon sx={{color: "#AE0D0D", fontSize: 32,marginRight:1}}></FmdGoodOutlinedIcon>
                    <h5>KING SPEED HO CHI MINH</h5>
                    </div>
                    <p className={style.contactLocation}>101 Mai Chi Tho Street, District 2, Ho Chi Minh City.</p>
                </div>
                <div className={style.contactItem}>
                    <div className={style.contactName}>
                    <FmdGoodOutlinedIcon sx={{color: "#AE0D0D", fontSize: 32,marginRight:1}}></FmdGoodOutlinedIcon>
                    <h5>KING SPEED DA NANG</h5>
                    </div>
                    <p className={style.contactLocation}>356 Dien Bien Phu Street, Thanh Khe District, Danang City.</p>
                </div>
            </div>
            {/* Contact Country */}
            <div>
                <div className={style.contactCountry}>
                    <div className={style.contactName}>
                        <FmdGoodOutlinedIcon sx={{color: "#AE0D0D", fontSize: 32,marginRight:1}}></FmdGoodOutlinedIcon>
                        <h5>KING SPEED DA NANG</h5>
                    </div>
                    <div className={style.contactDetail}>
                        <PhoneIphoneIcon sx={{color: "#AE0D0D", fontSize: 20,marginRight:1}}></PhoneIphoneIcon>
                        <p>Hotline: <a href="tel:+84943415138">0943415138</a></p>
                    </div>
                    <div className={style.contactDetail}>
                        <MailIcon sx={{color: "#AE0D0D", fontSize: 20,marginRight:1}}></MailIcon>
                        <p>Email: <a href="mailto: kingspeed@gmail.com">kingspeed@gmail.com</a></p>
                    </div>
                    <div className={style.contactDetail}>
                        <WebIcon sx={{color: "#AE0D0D", fontSize: 20,marginRight:1}}></WebIcon>
                        <p>Website: <a href="KingSpeedvietnam.com.vn">KingSpeedvietnam.com.vn</a></p>
                    </div>
                </div>
            </div>
                
        </div>
    );
}

export default Contact;
