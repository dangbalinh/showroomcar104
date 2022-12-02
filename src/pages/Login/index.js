import React, { useState } from 'react'
import classes from './Login.module.css'
import { Link, useNavigate } from 'react-router-dom'
import ForgetPass from './ForgetPass/ForgetPass'
import axios from 'axios'
import Swal from 'sweetalert2'


const Login = () => {
    const [modal, setModal] = useState(false)  
    const navigate = useNavigate();
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
        
    }
    const sendRequestSU = async ()=>{
        const res = await axios
        .post(`https://showroomcar104.onrender.com/users/login`,{
          email:String(inputs.email),
          password:String(inputs.password)
        })
        .catch((err)=>{
          Swal.fire({
          icon: 'error',
          title: 'Your email or password is not correct',
        });
        console.log(err);})
        const data = await res.data;
        console.log(data);
        return data;
      }
    const handleSubmit = (e) => {
        if(errors.emailError!=""|| errors.passwordError!="")
        {
            e.preventDefault();
            alert("Login failed!");
        } else {
        e.preventDefault();
        sendRequestSU()
        .then((data)=>{
          localStorage.setItem("user",JSON.stringify(data.user));
          localStorage.setItem("token",JSON.stringify(data.token));
        })
        .then(()=>navigate("/"));
        }
    }
    
  return (
    <div className={classes.register}>
            <h1>Login</h1>
            <form className={classes.form}>
                <p>
                    <label>Email address</label><br/>
                    <input className={classes.input} value={inputs.email}
                    type="email" name="email" onChange={handleChange} onBlur={handleBlur} required />
                    <p style={{color: "red", padding: "10px",fontSize:"12px"}}>{errors.emailError}</p>
                </p>
                <p  className={classes.forgetchoice} >
                    <label>Password</label><br/>
                    <input className={classes.input} value={inputs.password}
                    type="password" name="password" onChange={handleChange} onBlur={handleBlur} required />
                    <p style={{color: "red", padding: "10px",fontSize:"12px"}}>{errors.passwordError}</p>
                    <div className={classes.direct}>
                    <p onClick={()=>setModal(true)}>Forget password?</p>
                    </div>
                </p>
                <p style={{ textAlign:"center", fontSize:"16px"}}>
                    <button className={classes.button} id="sub_btn" type="submit"
                    onClick={handleSubmit}>Login</button><br/>
                    Haven't had an account? Go to <Link to="/register">Register</Link>
                </p>
            </form>
            {modal && <ForgetPass closewindow={setModal}
            handleChange={handleChange}
            handleBlur={handleBlur}
            inputs={inputs}
            errors={errors}
            ></ForgetPass>}
        </div>
  )
}

export default Login