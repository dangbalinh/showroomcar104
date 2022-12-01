import React from 'react'
import { Grid } from '@mui/material'
import classes from'../UserInfoPage.module.css'

const OrderSide = ({
  setDetail,
}) => {
    const imgcar= "https://firebasestorage.googleapis.com/v0/b/showroomcar-6961d.appspot.com/o/Toyota%2FTytCamry-trang.png?alt=media&token=b9edc460-e1cb-46a8-850c-d7a3c13683d4";
    const bill = [{
        "operationId": "ship1",
        "lineItems": [
          {
            "productId": "online:en:US:df4sg53ds9",
            "quantity": 1,
            "url":imgcar
          },
          {
            "productId": "online:en:US:df4sg53ds9",
            "quantity": 9,
            "url":imgcar
          },
          {
            "productId": "online:en:US:df4sg53ds9",
            "quantity": 10,
            "url":imgcar
          }
        ],
        "shipmentInfos":
          {
            "shipmentId": "shipment1",
            "carrier": "UPS",
            "trackingId": "1234567890"
          }
        ,
        "Date": 12,
    },
    {
      "operationId": "ship2",
      "lineItems": [
        {
          "productId": "YYFPTREDYNCZEYE",
          "quantity": 2,
          "url":imgcar
        },
        {
          "productId": "online:en:US:df4sg53ds9",
          "quantity": 1,
          "url":imgcar
        },
        {
          "productId": "online:en:US:df4sg53ds9",
          "quantity": 1,
          "url":imgcar
        },
        {
          "productId": "online:en:US:df4sg53ds9",
          "quantity": 1,
          "url":imgcar
        }
      ],
      "shipmentInfos": 
        {
          "shipmentId": "shipment1",
          "carrier": "UPS",
          "trackingId": "1234567890"
        }
      ,
      "Date": 12,
  },
  {
    "operationId": "ship2",
    "lineItems": [
      {
        "productId": "YYFPTREDYNCZEYE",
        "quantity": 2,
        "url":imgcar
      },
      {
        "productId": "online:en:US:df4sg53ds9",
        "quantity": 1,
        "url":imgcar}
    ],
    "shipmentInfos": 
      {
        "shipmentId": "shipment1",
        "carrier": "UPS",
        "trackingId": "1234567890"
      }
    ,
    "Date": 12,
},
{
  "operationId": "ship4",
  "lineItems": [
    {
      "productId": "YYFPTREDYNCZEYE",
      "quantity": 2,
      "url":imgcar
    },
    {
      "productId": "online:en:US:df4sg53ds9",
      "quantity": 1,
      "url":imgcar}
  ],
  "shipmentInfos": 
    {
      "shipmentId": "shipment1",
      "carrier": "UPS",
      "trackingId": "1234567890"
    }
  ,
  "Date": 12,}
  ]
    const gridTitle =[
      "STT",
      "ID",
      "PRODUCTS",
      "ADDRESS",
      "STATUS",
    ]
    const gridColumn =[
        1,3,3,3,2
    ]

  return (
    <div className={classes.OrderSide} style={{width:"100%", height:"500px"}}>
    {true? <><h2>YOUR BILLS</h2>
    <Grid container sx={{ 
    padding: '0 0',
    borderRadius:1,
    borderBottom:1}}>
      <Grid container sx={{borderTop:1,borderRadius:1}}>
      {gridTitle.map((title, index) => (
        <Grid item xs={gridColumn[index]} key={index}
        sx={{backgroundColor:'#8a0000'}}>
          <p style={{fontSize:"20px", color:"white"}}>{title}</p>
        </Grid>
      ))}
    </Grid>
      {bill.map((item, index) => (
        <Grid container sx={index%2==0? { padding: '20px 0', backgroundColor:"white"} : { padding: '20px 0', backgroundColor:"ButtonHighlight",color:"#8a0000"}}
        key={index}>
        <Grid item xs={1}>
            <p>{index+1}</p>
          </Grid>
        <Grid item xs={3}>
            <p onClick={()=>setDetail(item)}>{item.operationId}</p>
        </Grid>
       <Grid item xs={3}>
          <div style={{display:"flex"}}>
            {item.lineItems.slice(0, 3).map((img,indexx)=>(
            <img src={img.url} key={indexx} onClick={()=>alert("car click")}/>
          ))}
          {item.lineItems.length>3 && <p style={{marginLeft:"5px"}}> . . .</p>}
        </div>
        </Grid>
        <Grid item xs={3}>
          <p>{item.shipmentInfos.trackingId}</p>
      </Grid>
      <Grid item xs={2}>
       <p>{item.Date}</p>
      </Grid>
      </Grid>
      ))}
    </Grid></> : <h1>You dont have any bill...</h1>}
</div>
  )
}

export default OrderSide