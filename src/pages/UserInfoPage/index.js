import React from 'react'
import classes from './UserInfoPage.module.css'
import { Grid } from '@mui/material'
import UserSide from './Components/UserSide'
import OrderSide from './Components/OrderSide'
import DetailOrder from './Components/DetailOrder'
import { useState } from 'react'

const UserInfoPage = () => {
  const [detail, setDetail] = useState();
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