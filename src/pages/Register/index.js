import React, { useState } from 'react'
import classes from './Register.module.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import Cookies from 'js-cookie'

const Register = () => {
  const navigate = useNavigate();
    
    const checkEmailFormat=(email)=>{
        const re =/\S+@\S+\.\S+/;
        return re.test(email);
    }
    const [isSubscribed, setIsSubscribed] = useState(false);

    const [inputs, setInputs] = useState({
        name:"",email:"",password:""
      })
      const [errors, setErrors] = useState({
        nameError:" ",emailError:" ",passwordError:" ",confirmError:" "
      })
    const handleChange = (e) =>{
        setInputs((prev)=>{
          return{
          ...prev,
          [e.target.name]:e.target.value
        }
        })

      }
    const handleBlur=function(e){
      
        if(e.target.type==="email")
        {
            if(checkEmailFormat(e.target.value)===false||e.target.value==="")
            {e.target.style.borderColor="red"; 
            setErrors((prev)=>{
                return{
                ...prev,
                emailError:"Email không hợp lệ."
              }
              })
            }
            else
            {
            e.target.style.borderColor="#fff"
            setErrors((prev)=>{
                return{
                ...prev,
                emailError:""
              }
              })
            }
        }
        if(e.target.name==="password")
        {
            if(e.target.value.length<8||e.target.value==="")
            {e.target.style.borderColor="red"; 
            setErrors((prev)=>{
                return{
                ...prev,
                passwordError:"Mật khẩu phải ít nhất 8 ký tự."
              }
              })
            }
            else
            {
            e.target.style.borderColor="#fff"
            setErrors((prev)=>{
                return{
                ...prev,
                passwordError:""
              }
              })
            }
        }
        if(e.target.name==="password2")
        {
            if(e.target.value!==inputs.password)
            {e.target.style.borderColor="red"; 
            setErrors((prev)=>{
                return{
                ...prev,
                confirmError:"Mật khẩu không khớp."
              }
              })
            }
            else
            {
            e.target.style.borderColor="#fff"
            setErrors((prev)=>{
                return{
                ...prev,
                confirmError:""
              }
              })
            }
        }
        if(e.target.type==="text")
        {
            if(e.target.value==="")
            {e.target.style.borderColor="red"; 
            setErrors((prev)=>{
                return{
                ...prev,
                nameError:"Tên không được để trống."
              }
              })
            }
            else
            {
            e.target.style.borderColor="#fff"
            setErrors((prev)=>{
                return{
                ...prev,
                nameError:""
              }
              })
            }
        }
    }
    /*const sendRequestSU = async ()=>{
        const res = await axios
        .post(`someapihere/signup`,{
          name:String(inputs.name),
          email:String(inputs.email),
          password:String(inputs.password)
        })
        .catch((err)=>console.log(err))
    
        const data = await res.data;
        console.log(data);
        return data;
      }
    */
      const sendRequestSU = async ()=>{
        const res = await axios
        .post(`https://showroomcar104.onrender.com/users`,{
          name:String(inputs.name),
          email:String(inputs.email),
          password:String(inputs.password)
        })
        .catch((err)=>{
          Swal.fire({
            icon: 'error',
            title: 'Email đã tồn tại',
          });
          console.log(err);})
        const data = await res.data;
        console.log(data);
        return data;
      }
    const handleSubmit = (e) => {
        if(isSubscribed==false || errors.nameError!=""|| errors.emailError!=""|| errors.passwordError!=""||errors.confirmError!="")
        {
            e.preventDefault();
            alert("Register failed!");
        } else {
          e.preventDefault();
          sendRequestSU()
          .then((data)=>{
            localStorage.setItem("user",JSON.stringify(data.user));
            //localStorage.setItem("token",data.token);
            Cookies.set('token', data.token);
          })
          .then(()=>{const id = localStorage.getItem("userId"); console.log(id);})
          .then(()=>navigate("/"));
          }
    }
    
  return (
    <div className={classes.register}>
            <div className={classes.registerlayout}>
            <div className={classes.registerimg}></div>
            <form className={classes.form}>
              <h2>Tạo Tài Khoản Của Bạn</h2>
                <p>
                    <label>Tên</label><br/>
                    <input className={classes.input} value={inputs.name} 
                    type="text" name="name" onChange={handleChange} onBlur={handleBlur} required />
                    <p style={{color: "red", padding: "10px",fontSize:"12px"}}>{errors.nameError}</p>
                </p>
                
                <p>
                    <label>Email</label><br/>
                    <input className={classes.input} value={inputs.email}
                    type="email" name="email" onChange={handleChange} onBlur={handleBlur} required />
                    <p style={{color: "red", padding: "10px",fontSize:"12px"}}>{errors.emailError}</p>
                </p>
                <p>
                    <label>Mật Khẩu</label><br/>
                    <input className={classes.input} value={inputs.password}
                    type="password" name="password" onChange={handleChange} onBlur={handleBlur} required />
                    <p style={{color: "red", padding: "10px",fontSize:"12px"}}>{errors.passwordError}</p>
                </p>
                <p>
                    <label>Xác nhận mật khẩu</label><br/>
                    <input className={classes.input} 
                    type="password" name="password2" onBlur={handleBlur} required />
                    <p style={{color: "red", padding: "10px",fontSize:"12px"}}>{errors.confirmError}</p>
                </p>
                <p>
                    <input style={{ margin:"0 15px" }}type="checkbox" name="checkbox" id="checkbox" 
                     value={isSubscribed} onChange={()=>setIsSubscribed(!isSubscribed)} required />  
                    <span>Tôi đồng ý với các <a href="https://google.com" target="_blank" rel="noopener noreferrer">điều khoản dịch vụ</a></span>.
                </p>
                <p style={{ textAlign:"center", fontSize:"16px"}}>
                    <button className={classes.button} id="sub_btn" type="submit"
                    onClick={handleSubmit}>Đăng Kí</button><br/>
                    Bạn đã có 1 tài khoản? Đi đến <Link to="/login">Đăng nhập</Link>
                </p>
            </form>
            </div>
        </div>
  )
}

export default Register