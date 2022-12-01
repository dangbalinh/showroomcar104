import React,{useState,useEffect} from 'react'
import classes from'../UserInfoPage.module.css'
import Stack from '@mui/material/Stack';

const DetailOrder = (item) => {
    const [bill, setBill] = useState()
    useEffect(()=>{
        setBill(item.item)
      },[item])
  return (
  <div className={classes.DetailCard}>
    <h2>DETAIL ORDER</h2>
    {bill && <div>
       <p>Bill ID: {bill.operationId}</p>
       <p>Date: {bill.Date}</p>
       <p>List of product: </p>
       {bill.lineItems.map((car,index)=>(
       <div className={classes.DetailImg}>
        <Stack direction="row" alignItems="center" gap={1}>
        <img src={car.url}></img>
        <div>
        <p>Car name: {car.productId}</p>
        <p>Amount: {car.quantity}</p>
        </div>
        </Stack>
       </div>
       ))}
       <p>{bill.shipmentInfos.carrier}</p>
    </div>}
  </div>
  )
}

export default DetailOrder