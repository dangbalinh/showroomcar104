import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import classes  from '../Login.module.css'


const ForgetPass = (props) => {
    /*const sendRequestSU = async ()=>{
        const res = await axios
        .post(`someapihere/signup`,{
          email:String(inputs.email),
        })
        .catch((err)=>console.log(err))
    
        const data = await res.data;
        if (data.status != 201) {
          await setMessage(true)
        else {
          console.log(data.message);
          await alert("cant send!")
        }
        return data;
      }
    */
   const [message, setMessage] = useState(false)
    const handleClick = () => {
        props.closewindow(false);
    }
    const submitEmail=(e)=>{
        if(props.errors.emailError!="")
        {
            e.preventDefault();
            alert("submit failed!");
        } else {
            e.preventDefault();
            setMessage(true);
            console.log(props.inputs);
        /*sendRequestSU()
        .then((data)=>localStorage.setItem("userId",data.user._id))
        .then(()=>navigate("/dashboard"));*/
        }

    }

  return (
    <>
    <div className={classes.forgetpass}>
        
    <form className={classes.form}>
                <h2>FORGET YOUR PASSWORD?</h2>
                <p style={{color: "#c3aeae",padding: "20px 0",fontSize:"18px", textAlign:"center"}}>You baka but don't worry, please enter your email below and we will send you a link to recover your password!</p>
                <p>
                    <label>Email address</label><br/>
                    <input className={classes.input} onChange={props.handleChange} onBlur={props.handleBlur}
                    type="email" name="email" value={props.inputs.email} required />
                    <p style={{color: "red", padding: "10px",fontSize:"12px"}}>{props.errors.emailError}</p>
                </p>
                {message && <p style={{color: "green"}} >
                    SENT! PLEASE CHECK YOUR EMAIL
                </p>}
                <p style={{ textAlign:"center", fontSize:"16px"}}>
                    <button className={classes.button} id="sub_btn" type="submit" onClick={submitEmail}
                    >Send email</button><br/>
                    <p className={classes.direct} onClick={handleClick}>Go back to Login</p>
                </p>
                
            </form>
            </div>
        <div className={classes.backdrop} onClick={handleClick}></div>
        </>
  )
}

export default ForgetPass