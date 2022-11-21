import './Footer.module.css'
import Stack from '@mui/material/Stack';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import classes from "./Footer.module.css"
import Lct from './Location.js';
import logo from '../Header/logo.png'
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import TimerIcon from '@mui/icons-material/Timer';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';

function Footer() {
    return ( 
      <div id={classes.footer}>
        <div className={classes.content}>
        <div className={classes.imgdiv}>
        </div>

        <div className={classes.location}>
          <p className={classes.title}>LOCATION</p>
          <Lct city='Ha Noi City' address='132 Le Duan Street, Nguyen Du Ward, Hai Ba Trung District, City.  Hanoi.'/>
          <Lct city='Da Nang City' address='356 Dien Bien Phu Street, Thanh Khe District, City.  Danang.'/>
          <Lct city='Ho Chi Minh City' address='Mai Chi Tho, An Loi Dong, District 2, Ho Chi Minh City.'/>
          <p className={classes.cr}>KingSpeed Viet Nam 2022 ©. All rights reserved.</p>
        </div >

        <div className={classes.contact}>
        <p className={classes.title}>CONTACT</p>
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
        <p className={classes.title}>WORKING TIME</p>
        <Stack direction="row" alignItems="center" gap={1}>
          <TimerIcon   className={classes.icon}/>
          <p  >Monday to Friday: 8:00 - 21:00</p>
        </Stack>
        <div className={classes.iconlist}>
        <a href=''><InstagramIcon  style={{ color: 'white', fontSize:'25px'}}/></a>
        <a href=''><YouTubeIcon  style={{ color: 'white', fontSize:'25px' }}/></a>
        <a href=''><FacebookIcon  style={{ color: 'white', fontSize:'25px' }}/></a>
        </div>
        </div>

        
        </div>
      </div>
     );
}

export default Footer;