import './Footer.module.css'
import Stack from '@mui/material/Stack';
import classes from "./Footer.module.css"
import Lct from './Location.js';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import TimerIcon from '@mui/icons-material/Timer';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Link } from 'react-router-dom';

function Footer() {
    return ( 
      <div id={classes.footer}>
        <div className={classes.content}>
        <div className={classes.imgdiv}>
        </div>

        <div className={classes.location}>
          <p className={classes.title}>ĐỊA CHỈ</p>
          <Lct city='TP. Hà Nội' address='113 Lê Duẩn, Quận Hoàn Kiếm, TP Hà Nội'/>
          <Lct city='TP. Đà Nẵng' address='356 Nguyễn Tri Phương, Quận Thanh Khê, TP Đà Nẵng'/>
          <Lct city='TP. Hồ Chí Minh' address='19 Điện Biên Phủ, Quận Bình Thạnh, TP Hồ Chí Minh'/>
          <p className={classes.cr}>KingSpeed Viet Nam 2022 ©. All rights reserved.</p>
        </div >

        <div className={classes.contact}>
        <p className={classes.title}>LIÊN HỆ</p>
        <Stack direction="row" alignItems="center" gap={1}>
          <PhoneAndroidIcon  className={classes.icon}/>
          <p>Hotline: 0943415138</p>
        </Stack>
        <Stack direction="row" alignItems="center" gap={1}>
          <EmailIcon   className={classes.icon}/>
          <p  >Email: IECar@gmail.com</p>
        </Stack>
        <Stack direction="row" alignItems="center" gap={1}>
          <LanguageIcon   className={classes.icon}/>
          <p >Website: IECarvietnam.com.vn</p>
        </Stack>
        <p className={classes.title}>Thời Gian Làm Việc</p>
        <Stack direction="row" alignItems="center" gap={1}>
          <TimerIcon   className={classes.icon}/>
          <p>Thứ 2 đến thứ 7: 8:00 - 21:00</p>
        </Stack>
        <div className={classes.iconlist}>
        <a href=''><InstagramIcon  style={{ color: 'white', fontSize:'25px'}}/></a>
        <a href=''><YouTubeIcon  style={{ color: 'white', fontSize:'25px' }}/></a>
        <a href=''><FacebookIcon  style={{ color: 'white', fontSize:'25px' }}/></a>
        </div>
        <div className={classes.todashboard}>
            <Link to="/admin"  style={{ color: 'inherit', textDecoration: 'inherit'}}>
            Đến trang quản lý
            </Link>
        </div>
        </div>
        </div>
      </div>
     );
}

export default Footer;

/*<a href={true? "/login":"/admin"}  style={{ color: 'inherit', textDecoration: 'inherit'}}>
            Go to dashboard
            </a>*/