import React,{useState} from 'react'
import avatar from './avatar.jpg'
import classes from'../UserInfoPage.module.css'
import {
  Logout,
} from "@mui/icons-material";
import { useNavigate } from 'react-router-dom'
const UserSide = ({setIsLogin}) => {
    const navigate = useNavigate();
    const user ={
        "email":"20522065@gm.uit.edu.vn",
        "name":"TRUC"
    }
  const user1 = JSON.parse(localStorage.getItem("user"));
  console.log(user1);
  return (
    <div style={{width:"100%",height:"800px",backgroundColor:"#650707"}}>
      <div className={classes.UserSide}>
        <img style={{borderRadius:"50%"}} src={avatar} alt='rr'></img>
        <p className={classes.SideRole}>{user1.role}</p>
        <p className={classes.SideName}>{user1.name}</p>
        <div style={{width:"100%", }}>
        <p className={classes.SideMail}>{user1.email}</p>
        </div>
      </div>
      <div className={classes.logout}>
                <button type="button" className={classes.logout_btn}
                onClick={()=>{
                  localStorage.removeItem("user");
                  localStorage.removeItem("token");
                  //setIsLogin(false)
                  navigate('/')
                }}>
                    <Logout className={classes.icon} />
                    Đăng xuất
                </button>
        </div>
    </div>
  )
}

export default UserSide