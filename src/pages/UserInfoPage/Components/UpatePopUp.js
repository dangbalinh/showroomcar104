import React,{useState,useEffect} from 'react'
import classes from'../UserInfoPage.module.css'
import { DesktopDatePicker } from "@mui/x-date-pickers"
import { Stack } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import {
  Box,
  Grid,
  styled,
  Theme,
  Paper,
  TextField
} from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
const UpatePopUp = (props) => {
  const token = Cookies.get('token');
  const [didMount, setDidMount] = useState(false)
  const [birth, setBirth] = useState(props.data.ngaysinh)
  const [date, setDate] = useState(dayjs(props.data.ngaysinh,"DD:MM:YYYY"))
  const authAxios = axios.create({
    baseURL: 'https://showroomcar104.onrender.com',
    headers:{
      Authorization:`Bearer ${token}`
    }
  })
  //console.log(props.data.ngaysinh);
  //console.log(birth);
  //console.log(date);

  const sendRequestSU = async ()=>{
    const res = await authAxios
    .put(`/users/me`,{
      name:String(formData.name),
      diachi:String(formData.diachi),
      sdt:String(formData.sdt),
      cccd:String(formData.cccd),
      ngaysinh:String(birth),
      gioitinh:String(formData.gioitinh)
    })
    .catch((err)=>console.log(err))

    const data = await res.data;
    console.log(data);
    return data;
  }
  useEffect(() => {
     var value = new Date(date);
    var finaldate = (parseInt(value.getDate())<10? ("0" + (0 + value.getDate())): (value.getDate())) + "-" + (parseInt(value.getMonth())<9? ("0" + (0 + value.getMonth() + 1)): (value.getMonth() + 1))  + '-' +  value.getFullYear()
    setBirth(finaldate)
  }, [date])
  useEffect(() => { setDidMount(true) }, [])
  const [formData, setFormData] = useState(
    {
        name: (props.data.name !== "undefined")? props.data.name : "" , 
        diachi: (props.data.diachi !== "undefined" && props.data.cccd !== "null")? props.data.diachi : "",
        sdt: (props.data.sdt !== "undefined" && props.data.cccd !== "null")? props.data.sdt : "", 
        cccd: (props.data.cccd !== "undefined" && props.data.cccd !== "null" )? props.data.cccd : "", 
        gioitinh: (props.data.gioitinh && props.data.gioitinh!== "undefined")? props.data.gioitinh : "Nam",
    }
  )

function handleChange(event) {
  if(event.target.type==="tel" && Number.isInteger(Number(event.target.value))!==true){
    
  }else{
    const {name, value} = event.target
    setFormData(prevFormData => {
        return {
            ...prevFormData,
            [name]: value
        }
    })
  }
}
 function handleSubmit(event) {
  event.preventDefault()
  // submitToApi(formData)
  //console.log(birth);
  //console.log(dayjs('01-09-2002',"DD:MM:YYYY"));
  //console.log(formData)
  sendRequestSU()
  .then((data)=>props.setStatus(data))
  .then(()=>{Swal.fire({
    icon: 'success',
    title: 'Cập nhật thành công',
    })})
  .then(()=>props.closewindow(false))
}
const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: 'right',
  justify:"flex-end"
}));
  return (<>
    <div className={classes.Update}>
    <form className={classes.form}>
    <h1>Cập nhật thông tin</h1>
    <div className={classes.NameGT}>
    <div  style={{width:"65%"}}>
      <lable style={{width:"25%", display:"inline-block"}}>Tên</lable>
            <input
                type="text"
                placeholder="Tên"
                onChange={handleChange}
                name="name"
                style={{width:"70%"}}
                value={formData.name}
            />
    </div>
    <div  style={{width:"35%"}}>
      <label>Giới tính </label>
            <select 
                id="favColor" 
                value={formData.gioitinh}
                onChange={handleChange}
                
                name="gioitinh"
            >
                <option value="Nữ">Nữ</option>
                <option value="Nam">Nam</option>
            </select>
    </div>
    </div>
    <div>
      <label style={{width:"16%", display:"inline-block"}}>Địa chỉ</label>
            <input
                type="text"
                placeholder="Địa chỉ"
                onChange={handleChange}
                name="diachi"
                style={{width:"84%"}}
                value={formData.diachi}
            />
    </div>
    <div>
      <label style={{width:"16%",display:"inline-block"}}>SDT</label>
            <input
                type="tel"
                placeholder="SDT"
                onChange={handleChange}
                name="sdt"
                style={{width:"84%"}}
                value={formData.sdt}
            />
    </div>
    <div style={{paddingBottom:"0"}}>
      <label style={{width:"16%",display:"inline-block"}}>CCCD</label>
            <input
                type="text"
                placeholder="CCCD"
                onChange={handleChange}
                name="cccd"
                style={{width:"84%"}}
                value={formData.cccd}
            />
    </div>
    <div className={classes.NgaySinh} style={{padding:"0",display:"flex", alignItems:"baseline"}}>
      <label style={{width:"40%"}}>Ngày sinh</label>
      <div className={classes.funcContainer}>
               <LocalizationProvider dateAdapter={AdapterDayjs} >
                   <Stack spacing={3}>
                       <DesktopDatePicker 
                          className={classes.DesDate}
                          inputFormat="DD/MM/YYYY"
                          value={date}
                          onChange={setDate}
                          renderInput={(params) => <TextField size='small' {...params} />}
                          />
                    </Stack>
              </LocalizationProvider>
    </div>
              
    </div>
            <button className={classes.buttonsubmit} onClick={handleSubmit}>Submit</button>
    </form>
    </div>
    <div className={classes.backdrop} onClick={()=>props.closewindow(false)}></div>
    </>
  )
}

export default UpatePopUp