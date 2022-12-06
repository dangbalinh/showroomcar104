import './Header.module.css'
import {NavLink,Link} from 'react-router-dom'
import classes from './Header.module.css'
import {menuItems} from './menuItem.js'
import logo from '../../assets/image/logo.png'
import Menu from './Menu'
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import AutoComplete from './Autosearch/AutoComplete'
import PersonIcon from '@mui/icons-material/Person';
import Stack from '@mui/material/Stack';

function Header (){
    console.log(document.cookie.indexOf('token'));


    return (<div >
    <div className={classes.header}>
        <Link to='/'><img src={logo} alt='logo'/></Link>
        <ul className={classes.mainmenu}>
        {menuItems.map((item,index) => 
            (<Menu item={item} key={index}></Menu>)
        )}
        {(document.cookie.indexOf('token') !== -1)? 
        <li className={classes.menu}>
        <NavLink to='/user'
           className={({isActive}) => (isActive ? classes.active : classes.item)}
           end
           style={{color:"white", backgroundColor:"#ffffff67", borderRadius:"5px",width:"131px",textAlign:"center",padding:"0px"}}
           >
        <Stack direction="row" alignItems="center" gap={1} >
          <PersonIcon  style={{ color: 'white', fontSize:'23px'}}/>
          <p style={{fontSize:'20px',padding:"10px 0"}}>Tài Khoản</p>
        </Stack>
        </NavLink>
        </li> :
        <li className={classes.menu}>
        <NavLink to='/login'
            style={{color:"white", backgroundColor:"#ffffff67", borderRadius:"8px",width:"135px"}}
           className={({isActive}) => (isActive ? classes.active : classes.item)}
           end>Đăng Nhập</NavLink>
        </li>
        }
        </ul>
        <AutoComplete></AutoComplete>
        <div className={classes.groupicon}>
           <a href='https://www.instagram.com/'  target="_blank"><InstagramIcon fontSize="large" className={classes.icon}/></a>
           <a href='https://www.youtube.com/'  target="_blank"><YouTubeIcon fontSize="large" className={classes.icon}/></a>
           <a href='https://www.facebook.com/'  target="_blank"><FacebookIcon fontSize="large"className={classes.icon}/></a>
        </div>
    </div>
    </div>);

}

export default Header;