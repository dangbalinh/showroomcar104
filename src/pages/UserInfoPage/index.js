import React from 'react'
import classes from './UserInfoPage.module.css'
import { Grid } from '@mui/material'
import UserSide from './Components/UserSide'
import OrderSide from './Components/OrderSide'
import DetailOrder from './Components/DetailOrder'
import axios from 'axios'
import { useState,useEffect } from 'react'
import Cookies from 'js-cookie'

const UserInfoPage = ({setIsLogin}) => {
  const token = Cookies.get('token');
  const [detail, setDetail] = useState();
  useEffect(()=>{
    console.log(detail);
  },[detail])
  console.log(detail);
  return (

    <div className={classes.UserPage}>
    <Grid container spacing={1}>
        <Grid item xs={2}>
            <UserSide/>
        </Grid>
        
        <Grid item xs={6}>
        <OrderSide setDetail={setDetail}/>
        </Grid>
        <Grid item xs={4}>
        <DetailOrder item={detail}/>
        </Grid>
        
    </Grid>
    </div>
  )
}

export default UserInfoPage