import React,{useState} from 'react'
import avatar from './avatar.jpg'
import classes from'../UserInfoPage.module.css'
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
    <div style={{width:"100%",height:"800px",backgroundColor:"#8A0000"}}>
      <div className={classes.UserSide}>
        <img style={{borderRadius:"50%"}} src={avatar} alt='rr'></img>
        <p className={classes.SideRole}>{user1.role}</p>
        <p className={classes.SideName}>{user1.name}</p>
        <div style={{width:"100%", }}>
        <p className={classes.SideMail}>{user1.email}</p>
        </div>
      <button className={classes.button} 
      onClick={()=>{
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        //setIsLogin(false)
        navigate('/')
      }}
      id="sub_btn" type="submit">Log out</button><br/>
      </div>
    </div>
  )
}

export default UserSide