import React, { useState } from 'react'
import classes from '../Login.module.css'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'

const PassReset = () => {
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
    const sendRequest = async()=>{
        const res = await axios
        .get("https://showroomcar104.onrender.com/cars")
        .catch((err)=>console.log(err))
        const data = await res.data;
        return data;
      }
    const handleSubmit = (e) => {
        if(errors.passwordError!=""||errors.confirmError!="")
        {
            e.preventDefault();
            alert("Register failed!");
        } else {
        e.preventDefault();
        console.log(inputs);
        //testApi
        sendRequest()
        .then ((data)=>console.log(data.cars.filter(dt =>{
          const regex = new RegExp("o",'gi');
          return dt.ten.match(regex);
        })))
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