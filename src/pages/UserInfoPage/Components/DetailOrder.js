import React,{useState,useEffect} from 'react'
import classes from'../UserInfoPage.module.css'
import { Grid,Box } from '@mui/material'
import axios from 'axios'
const DetailOrder = ({item}) => {
    const token = localStorage.getItem("token");
    const [detail, setDetail] = useState()
    const [cthd, setCthd] = useState([])
    const [car, setCar] = useState([])
    const [test, setTest] = useState([
      "638a19baf79f21719183651d",
      "638a19aff79f217191836519"
    ])
    const gridTitle =[
      "STT",
      "Car ID",
      "Car Name",
      "Quantity"
    ]
    const gridColumn =[
        1,3,5,3
    ]
      const authAxios = axios.create({
        baseURL: 'https://showroomcar104.onrender.com',
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      const sendRequestSU = async ()=>{
        const res = await authAxios
        .get(`/hoadons/${item._id}`)
        .catch((err)=>console.log(err))
        const data = await res.data;
        return data;
      }
      const getCar = async(cardid)=>{
        const res = await axios
        .get(`https://showroomcar104.onrender.com/cars/${cardid}`)
        .catch((err)=>console.log(err))
        const data = await res.data;
        await console.log( data);
        return data;
      }
      useEffect(()=>{
        sendRequestSU()
        .then((data)=>{
          setDetail(data);
          /*setCthd([]);
          {data.cthds.map((items,index)=>{setCthd(prev=>[...prev,items.macar])})};
          {test.map((tst,index)=>{
              getCar(tst)
              .then((data)=>setCar(prev=>[...prev,data]))
          })};*/
        })
        /*.then(()=>{
          

        })*/
      },[item])
        
  return (
  <div className={classes.DetailCard}>
    <h2>DETAIL ORDER</h2>
    {detail && <div className={classes.ListInfo}>
      <div>
       <p>Bill ID:</p><p> {detail.hoadon.mahd}</p>
      </div>
      <div>
       <p>Date:</p><p> {detail.hoadon.ngayhd}</p>
       </div>
       <div>
       <p>Customer Id: </p><p>{detail.hoadon.makh}</p>
       </div>
       <div>
       <p>Staff Id: </p><p>{detail.hoadon.manv}</p>
       </div>
       <div>
       <p>Status: </p><p>{detail.hoadon.tinhtrang}</p>
       </div>
       <p>List of product: </p>
       <Grid container sx={{ 
    padding: '0 0',
    borderRadius:1,
    borderBottom:0,
    }}>
       <Grid container sx={{borderTop:1,borderRadius:1}}  justify="flex-end">
      {gridTitle.map((title, index) => (
        
        <Grid item xs={gridColumn[index]} key={index}
        sx={{backgroundColor:'#8a0000'}} style={{textAlign:"center"}}>
          <p style={{fontSize:"15px", color:"white", textAglin:"center",
          width:"100%"}}>{title}</p>
        </Grid>
      ))}
    </Grid>
       {detail.cthds.map((dt,index)=>
        <Grid container sx={index%2==0? { padding: '20px 0', backgroundColor:"white",color:"#8a0000"} : { padding: '20px 0', backgroundColor:"ButtonHighlight",color:"#8a0000"} }
        key={index} >
        <Grid item xs={1}>
            <p  style={{textAlign:"center", width:"100%"}}>{index+1}</p>
          </Grid>
        <Grid item xs={3}>
            <p  style={{textAlign:"center", width:"100%"}}>{dt.macar}</p>
        </Grid>
       <Grid item xs={5}>
          <p  style={{textAlign:"center", width:"100%"}}>{dt.tenxe}</p>
        </Grid>
        <Grid item xs={3}>
          <p  style={{textAlign:"center", width:"100%"}}>{dt.soluong}</p>
      </Grid>
      </Grid>
      )}
      </Grid>
       <div>
       <p>Total:</p><p> {detail.hoadon.trigia} vnd</p>
       </div>
       <button onClick={()=>{console.log(cthd);console.log(detail);/*getCar()*/console.log(car);}}>test</button>
    </div>}
  </div>
  )
}

export default DetailOrder
/*{bill.lineItems.map((car,index)=>(
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



       <div>
            <p>{index+1}</p>
          </div>
          <div className={classes.Listcar}>
            <div>
            <p>Car ID </p><p>{dt.macar}</p>
            </div>
            <div>
            <p>Car name </p><p>{dt.tenxe}</p>
            </div>
            <div>
            <p>Quantity </p><p>{dt.soluong}</p>
            </div>
          </div>
       
       
       
       */