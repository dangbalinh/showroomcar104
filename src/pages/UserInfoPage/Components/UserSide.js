import React,{useState,useEffect,useRef} from 'react'
import Stack from '@mui/material/Stack';
import avatar from './avatar.jpg'
import classes from'../UserInfoPage.module.css'
import UpatePopUp from './UpatePopUp';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
  Boy,
  Cookie,
  Logout,
} from "@mui/icons-material";
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import CakeIcon from '@mui/icons-material/Cake';
import BoyIcon from '@mui/icons-material/Boy';
import { useNavigate } from 'react-router-dom'
const UserSide = () => {
  const user1 = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const modalRef=useRef(false);
  const [userData, setUserData] = useState([])
  const [modal, setModal] = useState(false) 
  const [status, setStatus] = useState() 
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

    const data = await res.data.user;
    console.log(data);
    return data;
  }
  console.log(modalRef);
  useEffect(() => {
    sendRequestSU()
    .then((data)=>{setUserData(data);})
  }, [status])
    const navigate = useNavigate();
  const handleModal = ()=>{
    setModal(true);
    console.log(modal);
    /*modalRef.current=true;
    console.log(modalRef.current);*/
  }
  console.log(user1);
  return (<>
    {userData && <div style={{width:"100%",height:"800px",backgroundColor:"#650707"}}>
      <div className={classes.UserSide}>
        <img style={{borderRadius:"50%"}} src={avatar} alt='rr'></img>
        <p className={classes.SideRole}>{user1.role}</p>
        <p className={classes.SideName}>{userData.name}</p>
        <p className={classes.SideMail}>{userData.email}</p>
        <div className={classes.Stack}>
        <Stack direction="row" alignItems="center" gap={1}>
          <BoyIcon  style={{ color: '#ffff', fontSize:'25px' }}/>
          <p style={{ color: '#AFAFAF',fontSize:'14px' }}>{(userData.gioitinh)? userData.gioitinh : "Chưa thiết lập"}</p>
        </Stack>
        <Stack direction="row" alignItems="center" gap={1}>
          <CakeIcon  style={{ color: '#ffff', fontSize:'25px' }}/>
          <p style={{ color: '#AFAFAF',fontSize:'14px' }}>{(userData.ngaysinh)? userData.ngaysinh: "Chưa thiết lập"}</p>
        </Stack>
        <Stack direction="row" alignItems="center" gap={1}>
          <PhoneIcon  style={{ color: '#ffff', fontSize:'25px' }}/>
          <p style={{ color: '#AFAFAF',fontSize:'14px' }}>{(userData.sdt)? userData.sdt : "Chưa thiết lập"}</p>
        </Stack>
        <Stack direction="row" alignItems="center" gap={1}>
          <HomeIcon  style={{ color: '#ffff', fontSize:'25px' }}/>
          <p style={{ color: '#AFAFAF',fontSize:'14px', width:"80%",wordWrap:"break-word", textAlign:"left" }}>{(userData.diachi)? userData.diachi : "Chưa thiết lập"}</p>
        </Stack>
        </div>
      </div>
      <div style={{marginTop:"80px"}}>
      <p className={classes.Pbutton} onClick={handleModal}>Cập nhật thông tin</p>
      <div className={classes.logout}>
                
                <button type="button" className={classes.logout_btn}
                onClick={()=>{
                  localStorage.removeItem("user");
                  localStorage.removeItem("token");
                  Cookies.remove('token')
                  //setIsLogin(false)
                  navigate('/')
                }}>
                    <Logout className={classes.icon} />
                    Đăng xuất
                </button>
                <button onClick={()=>console.log(Cookies.get('token'))}>test</button>
        </div>
        </div>
        {modal? <UpatePopUp closewindow={setModal}
        data={userData}
        setStatus={setStatus}
    ></UpatePopUp>:<></>}
    </div>
    }</>
  )
}

export default UserSide