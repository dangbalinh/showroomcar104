import React, { useState } from 'react'
import classes from './Register.module.css'
import { Link, Navigate } from 'react-router-dom'


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
        nameError:" ",emailError:" ",passwordError:" "
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
        if(e.target.type==="password")
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
    const handleSubmit = (e) => {
        if(isSubscribed==false || errors.nameError!=""|| errors.emailError!=""|| errors.passwordError!="")
        {
            e.preventDefault();
            alert("Register failed!");
        } else {
        e.preventDefault();
        console.log(inputs);
        /*sendRequestSU()
        .then((data)=>localStorage.setItem("userId",data.user._id))
        .then(()=>dispath(authAction.login()))
        .then(()=>navigate("/blogs"));*/
        }
    }
    
  return (
    <div className={classes.register}>
            <h2>Create your personal account</h2>
            <form className={classes.form}>
                <p>
                    <label>Username</label><br/>
                    <input className={classes.input} value={inputs.name}
                    type="text" name="name" onChange={handleChange} onBlur={handleBlur} required />
                    <p style={{color: "red", padding: "10px"}}>{errors.nameError}</p>
                </p>
                <p>
                    <label>Email address</label><br/>
                    <input className={classes.input} value={inputs.email}
                    type="email" name="email" onChange={handleChange} onBlur={handleBlur} required />
                    <p style={{color: "red", padding: "10px"}}>{errors.emailError}</p>
                </p>
                <p>
                    <label>Password</label><br/>
                    <input className={classes.input} value={inputs.password}
                    type="password" name="password" onChange={handleChange} onBlur={handleBlur} required />
                    <p style={{color: "red", padding: "10px"}}>{errors.passwordError}</p>
                </p>
                <p>
                    <input style={{ margin:"0 15px" }}type="checkbox" name="checkbox" id="checkbox" 
                     value={isSubscribed} onChange={()=>setIsSubscribed(!isSubscribed)} required />  
                    <span>I agree all statements in <a href="https://google.com" target="_blank" rel="noopener noreferrer">terms of service</a></span>.
                </p>
                <p style={{ textAlign:"center", fontSize:"16px"}}>
                    <button className={classes.button} id="sub_btn" type="submit"
                    onClick={handleSubmit}>Register</button><br/>
                    Already had a account? Go to <Link to="/">Login</Link>
                </p>
            </form>
        </div>
  )
}

export default Register