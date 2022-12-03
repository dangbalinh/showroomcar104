import React, {useState,useEffect} from 'react'
import { Grid } from '@mui/material'
import axios from 'axios'
import { DatePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

import {
  TextField
} from "@mui/material";
import classes from'../UserInfoPage.module.css'

const OrderSide = ({
  setDetail,
}) => {
    const token = localStorage.getItem("token");
    const gridTitle =[
      "STT",
      "ID",
      "Quantity",
      "Date",
      
      "STATUS",
    ]
    const gridColumn =[
        1,3,2,3,3
    ]
    /*const filterSuggestions = suggestiondata.filter(dt =>{
              const regex = new RegExp(`${query}`,'gi');
              return dt.ten.match(regex);
            }); */
    const [userData, setUserData] = useState([])
    const [userDataa, setUserDataa] = useState([])
    const [value, setValue] = React.useState(dayjs());
    const [first, setfirst] = useState();
    useEffect(() => {
        var date = new Date(value);
        var finaldate = (parseInt(date.getMonth())<9? ("0" + (0 + date.getMonth() + 1)): (date.getMonth() + 1))  + '-' +  date.getFullYear()
        setfirst(finaldate)
      }, [value])
    const [status, setStatus] = useState("all")
    const authAxios = axios.create({
      baseURL: 'https://showroomcar104.onrender.com',
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    const sendRequestSU = async ()=>{
      const res = await authAxios
      .get(`/users/me`)
      .catch((err)=>console.log(err))
  
      const data = await res.data.hoadons;
      console.log(data);
      return data;
    }
    useEffect(() => {
      sendRequestSU()
      .then((data)=>{setUserData(data);setUserDataa(data)})
    }, [])
    useEffect(() => {
    console.log(status);
      if(status!="all")
      setUserDataa(userData.filter((item) =>{ 
        return item.tinhtrang == status;}))
      else
      setUserDataa(userData)
      setUserDataa((prev)=>prev.filter((item)=>{
        return item.ngayhd.includes(first.toString())
      }))
      {userDataa.map((item, index) => console.log(item.ngayhd))}
      console.log(first);
      console.log(status);
    }, [status,first])
    
    const handleTest=()=>{
      /*sendRequestSU()
      .then((data)=>console.log(data))*/
      console.log(first);
    }

  return (
    <div className={classes.OrderSide} style={{width:"100%", height:"500px"}}>
    {userData.length!==0? <><h2>YOUR BILLS</h2>
    <div className={classes.PickStatus}>
      <button onClick={()=>setStatus("all")}>All</button>
      <button onClick={()=>setStatus("Chưa thanh toán")}>Uncomplete</button>
      <button onClick={()=>setStatus("Đã thanh toán")}>Complete</button>
      <button onClick={handleTest}>test</button>
      <input className={classes.input}/>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
          views={['year', 'month']}
          inputFormat="MM-YYYY"
          label="Year and Month"
          minDate={dayjs('2012-03-01')}
          maxDate={dayjs('2023-06-01')}
          value={value}
          onChange={(newValue) => {
            setValue(newValue)}}
          renderInput={(params) => <TextField {...params} helperText={null} />}

        />
      </LocalizationProvider>
      
    </div>
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
      {userDataa.map((item, index) => (
        <Grid container sx={index%2==0? { padding: '20px 0', backgroundColor:"white"} : { padding: '20px 0', backgroundColor:"ButtonHighlight",color:"#8a0000"}}
        key={index}>
        <Grid item xs={1}>
            <p>{index+1}</p>
          </Grid>
        <Grid item xs={3}>
            <p onClick={()=>setDetail(item)}>{item.mahd}</p>
        </Grid>
        <Grid item xs={2}>
          <p>{userData.length}</p>
      </Grid>
       <Grid item xs={3}>
          <p>{item.ngayhd}</p>
        </Grid>
      <Grid item xs={3}>
       <p>{item.tinhtrang}</p>
      </Grid>
      </Grid>
      ))}
    </Grid></> : <h1>You dont have any bill...</h1>}
</div>
  )
}

export default OrderSide
/*<div style={{display:"flex"}}>
            {item.lineItems.slice(0, 3).map((img,indexx)=>(
            <img src={img.url} key={indexx} onClick={()=>alert("car click")}/>
          ))}
          {item.lineItems.length>3 && <p style={{marginLeft:"5px"}}> . . .</p>}
        </div> 
        
        
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
          views={['year', 'month']}
          mask="____/__/__"
          inputFormat="MM-YYYY"
          label="Year and Month"
          minDate={dayjs('2012-03-01')}
          maxDate={dayjs('2023-06-01')}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} helperText={null} />}

        />
      </LocalizationProvider>
        */