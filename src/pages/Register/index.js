import React, { useState } from 'react'
import classes from './Register.module.css'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
    
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
                emailError:"Invalid Email"
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
            if(e.target.value.length<6||e.target.value==="")
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
        if(e.target.type==="text")
        {
            if(e.target.value==="")
            {e.target.style.borderColor="red"; 
            setErrors((prev)=>{
                return{
                ...prev,
                nameError:"Invalid name"
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
    const sendRequest = async()=>{
        const res = await axios
        .get("https://showroomcar104.onrender.com/cars")
        .catch((err)=>console.log(err))
        const data = await res.data;
        return data;
      }
    const handleSubmit = (e) => {
        if(isSubscribed==false || errors.nameError!=""|| errors.emailError!=""|| errors.passwordError!=""||errors.confirmError!="")
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
              <h2>Create your personal account</h2>
                <p>
                    <label>Name</label><br/>
                    <input className={classes.input} value={inputs.name} 
                    type="text" name="name" onChange={handleChange} onBlur={handleBlur} required />
                    <p style={{color: "red", padding: "10px",fontSize:"12px"}}>{errors.nameError}</p>
                </p>
                
                <p>
                    <label>Email address</label><br/>
                    <input className={classes.input} value={inputs.email}
                    type="email" name="email" onChange={handleChange} onBlur={handleBlur} required />
                    <p style={{color: "red", padding: "10px",fontSize:"12px"}}>{errors.emailError}</p>
                </p>
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
                <p>
                    <input style={{ margin:"0 15px" }}type="checkbox" name="checkbox" id="checkbox" 
                     value={isSubscribed} onChange={()=>setIsSubscribed(!isSubscribed)} required />  
                    <span>I agree all statements in <a href="https://google.com" target="_blank" rel="noopener noreferrer">terms of service</a></span>.
                </p>
                <p style={{ textAlign:"center", fontSize:"16px"}}>
                    <button className={classes.button} id="sub_btn" type="submit"
                    onClick={handleSubmit}>Register</button><br/>
                    Already had a account? Go to <Link to="/login">Login</Link>
                </p>
            </form>
            </div>
        </div>
  )
}

export default Register