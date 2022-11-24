import React, { useState } from 'react'
import classes from './Login.module.css'
import { Link, Navigate } from 'react-router-dom'


const Login = () => {
    
    const checkEmailFormat=(email)=>{
        const re =/\S+@\S+\.\S+/;
        return re.test(email);
    }
    

    const [inputs, setInputs] = useState({
        email:"",password:""
      })
      const [errors, setErrors] = useState({
        emailError:" ",passwordError:" "
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
        
    }
    /*const sendRequestSU = async ()=>{
        const res = await axios
        .post(`someapihere/signup`,{
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
        if(errors.emailError!=""|| errors.passwordError!="")
        {
            e.preventDefault();
            alert("Login failed!");
        } else {
        e.preventDefault();
        console.log(inputs);
        /*sendRequestSU()
        .then((data)=>localStorage.setItem("userId",data.user._id))
        .then(()=>dispath(authAction.login()))
        .then(()=>navigate("/dashboard"));*/
        }
    }
    
  return (
    <div className={classes.register}>
            <h2>Login</h2>
            <form className={classes.form}>
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
                    <Link to="/">Forget password?</Link>
                </p>
                <p style={{ textAlign:"center", fontSize:"16px"}}>
                    <button className={classes.button} id="sub_btn" type="submit"
                    onClick={handleSubmit}>Login</button><br/>
                    Haven't had an account? Go to <Link to="/register">Register</Link>
                </p>
            </form>
        </div>
  )
}

export default Login