import React, { useState } from 'react'
import classes from '../Login.module.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'


const PassReset = () => {
  const navigate = useNavigate();
  const token = useParams().token.toString();
  console.log(token);
    const [inputs, setInputs] = useState({
        password:""
      })
      const [errors, setErrors] = useState({
        passwordError:" ",confirmError:" "
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
      
        if(e.target.name==="password")
        {
            if(e.target.value.length<8||e.target.value==="")
            {e.target.style.borderColor="red"; 
            setErrors((prev)=>{
                return{
                ...prev,
                passwordError:"The password provided is not long enough."
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
                confirmError:"The password is incorrect."
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
    }
    const authAxios = axios.create({
      baseURL: 'https://showroomcar104.onrender.com/users',
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    const sendRequestSU = async ()=>{
        const res = await authAxios
        .put(`/resetPassword`,{
          password:String(inputs.password),
          verifyToken:String(token)
        })
        .catch((err)=>console.log(err))
    
        const data = await res.data;
        console.log(data);
        return data;
      }
    const handleSubmit = (e) => {
        if(errors.passwordError!=""||errors.confirmError!="")
        {
            e.preventDefault();
            alert("Register failed!");
        } else {
          e.preventDefault();
          sendRequestSU()
          .then((data)=>{ console.log(data);
          })
          .then(()=>Swal.fire({
            icon: 'success',
            title: 'Congrats',
            text: 'Your password has been changed',
          }))
          .then(()=>navigate("/login"));
        }
    }
    
  return (
    <div className={classes.register}>
            <div className={classes.registerlayout}>
            <div className={classes.registerimg}></div>
            <form className={classes.form}>
              <h2 style={{color:"#8A0000",padding: "25px 0", textAlign:"center"}}>Enter your new password</h2>
                <p>
                    <label>Password</label><br/>
                    <input className={classes.input} value={inputs.password}
                    type="password" name="password" onChange={handleChange} onBlur={handleBlur} required />
                    <p style={{color: "red", padding: "10px",fontSize:"12px"}}>{errors.passwordError}</p>
                </p>
                <p>
                    <label>Confirm Password</label><br/>
                    <input className={classes.input} 
                    type="password" name="password2" onBlur={handleBlur} required />
                    <p style={{color: "red", padding: "10px",fontSize:"12px"}}>{errors.confirmError}</p>
                </p>
                <p style={{ textAlign:"center", fontSize:"16px"}}>
                    <button className={classes.button} id="sub_btn" type="submit"
                    onClick={handleSubmit}>Submit</button><br/>
                    <Link to="/login">Go back to Login</Link>
                </p>
            </form>
            </div>
        </div>
  )
}

export default PassReset