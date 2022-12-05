import React, {useState,useEffect} from 'react'
import { Grid } from '@mui/material'
import axios from 'axios'
import { DatePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import {
  MenuItem,
  Select,
} from "@mui/material";
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
      "Trị Giá",
      "Ngày",
      "Tình trạng",
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
    //const [value, setValue] = React.useState(dayjs());
    const [value, setValue] = React.useState();
    const [first, setfirst] = useState("");
    const [didMount, setDidMount] = useState(false)
    const [input, setInput] = useState("");
    const [status, setStatus] = useState("all")
    const handleChange = (e) =>{
      setInput(e.target.value.toLowerCase());
    }
    useEffect(() => {
        if(didMount)
        {var date = new Date(value);
        var finaldate = (parseInt(date.getMonth())<9? ("0" + (0 + date.getMonth() + 1)): (date.getMonth() + 1))  + '-' +  date.getFullYear()
        setfirst(finaldate)}
      }, [value])
    useEffect(() => { setDidMount(true) }, [])
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
        return (item.ngayhd.includes(first.toString())&&item.mahd.toLowerCase().includes(input))
      }))
      {userDataa.map((item, index) => console.log(item.ngayhd))}
      console.log(first);
      console.log(status);
      console.log(input);
    }, [status,first,input])
    
    const handleTest=(e)=>{
      /*sendRequestSU()
      .then((data)=>console.log(data))*/
      if(e.target.value!=="Tất cả")
      setStatus(e.target.value);
      else{
        setStatus(e.target.value);
        console.log(status);
      }
    }
    const handleClear=()=>{
      setInput("");
      setStatus("all");
      setfirst("");
    }
    const MenuSelectProps = {
      PaperProps: {
          style: {
              maxHeight: 150,
              overflowX: "scroll"
          }
      }
  };
  return (
    <div className={classes.OrderSide} style={{width:"100%", height:"500px"}}>
    {userData.length!==0? <><h2>HÓA ĐƠN</h2>
    <button onClick={handleClear}>Clear Filter</button>
    <div>
      <div className={classes.PickStatus}>
      <input className={classes.input} value={input} 
      type="text" name="name" onChange={handleChange}
      placeholder="Tìm id hóa đơn..."/>
      <LocalizationProvider dateAdapter={AdapterDayjs} >
      <DatePicker
          views={['year', 'month']}
          inputFormat="MM-YYYY"
          label="Year and Month"
          minDate={dayjs('2012-03-01')}
          maxDate={dayjs('2023-06-01')}
          value={value}
          clearable
          emptyLabel="custom label" 
          onChange={(newValue) => {
            setValue(newValue)}}
          renderInput={(params) => <TextField {...params} helperText={null} />}
        />
      </LocalizationProvider>
      <Select
           className={classes.StatusPicker}
           style={{width: "30% !important"}}
                                
                                label="Trạng thái"
                                defaultValue={status}
                                value={status}
                                MenuProps={MenuSelectProps}
                                onChange={handleTest}
                            >
                                <MenuItem
                                    className={classes.menuItem}
                                    value="all"
                                    selected
                                >
                                    Tất cả
                                </MenuItem>
                                <MenuItem
                                        value="Chưa thanh toán"
                                        className={classes.menuItem}
                                    >
                                        Chưa thanh toán
                                </MenuItem>
                                <MenuItem
                                        value="Đã thanh toán"
                                        className={classes.menuItem}
                                    >
                                        Đã thanh toán
                                </MenuItem>
                            </Select>
      </div>
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
            <p onClick={()=>setDetail(item)}
            style={{textDecoration:"underline", cursor:"pointer"}}
            >{item.mahd}</p>
        </Grid>
        <Grid item xs={2}>
          <p>{item.trigia}</p>
      </Grid>
       <Grid item xs={3}>
          <p>{item.ngayhd}</p>
        </Grid>
      <Grid item xs={3}>
       <p>{item.tinhtrang}</p>
      </Grid>
      </Grid>
      ))}
    </Grid></> : <h1 style={{padding:"50px"}}>Bạn không có hóa đơn nào...</h1>}
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