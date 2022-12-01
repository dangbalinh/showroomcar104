import React from 'react'
import avatar from './avatar.jpg'
import classes from'../UserInfoPage.module.css'
const UserSide = () => {
    const user ={
        "email":"20522065@gm.uit.edu.vn",
        "name":"TRUC"
    }
  return (
    <div style={{width:"100%",height:"800px",backgroundColor:"#8A0000"}}>
      <div className={classes.UserSide}>
        <img style={{borderRadius:"50%"}} src={avatar} alt='rr'></img>
        <p className={classes.SideName}>{user.name}</p>
        <p className={classes.SideMail}>{user.email}</p>
      <button className={classes.button} id="sub_btn" type="submit">Log out</button><br/>
      </div>
    </div>
  )
}

export default UserSide