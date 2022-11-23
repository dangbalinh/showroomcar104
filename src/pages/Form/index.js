import { useState} from 'react';
import style from './Form.module.css'

function checkEmailFormat(email) {
    const re =/\S+@\S+\.\S+/;
    return re.test(email);
}

function Form() {
    const [name, setName]=useState("");
    const [email, setEmail]=useState("");
    const [mobile, setMobile]=useState("");
    const [message, setMessage]=useState("");
    const[errorMobile, setErrorMobile]=useState("");
    const[errorEmail, setErrorEmail]=useState("");

    const handleSubmit=function(e){
        e.preventDefault();
        if(errorEmail!=="" || errorMobile!==""){
            alert("Thông tin liên lạc không hợp lệ! Vui lòng điền lại ở những ô màu đỏ!")
        }
        else{
            alert(`Thông tin liên lạc: \nName: ${name}\nEmail: ${email}\nMobile: ${mobile}\nMessage: ${message}`)
        }
    };
    const handleChange=function(e){
        if(e.target.type==="text")
        {
            setName(e.target.value);
        }
        if(e.target.type==="email")
        {
            setEmail(e.target.value);
        }
        if(e.target.type==="tel")
        {
            setMobile(e.target.value);
        }
        if(e.target.className==="textarea")
        {
            setMessage(e.target.value);
        }
    }   
     const handleBlur=function(e){
        if(e.target.value===""){
            e.target.style.borderColor="red";
        }
        else if(e.target.type==="tel" && Number.isInteger(Number(e.target.value))!==true){
            e.target.style.borderColor="red";
            setErrorMobile("Số điện thoại không hợp lệ!");
           
        }
        else if(e.target.type==="email" && checkEmailFormat(e.target.value)===false){
            e.target.style.borderColor="red";
            setErrorEmail("Email không hợp lệ!");
           
        }
        else{
            e.target.style.borderColor="#777777";
            if(e.target.type==="tel"){
                setErrorMobile("");
            }
            if(e.target.type==="email"){
                setErrorEmail("");
            }
           
        }
    }

    return ( 
        <div className={style.formLayer}>
            <div  className={style.formLayout}>
                <div  className={style.formImage}>
                </div> 
                <div className={style.formForm}>
                    <p className={style.formTitle}>Please leave your phone number to be contacted for the latest King Speed ​​car buying policy!</p>
                    <form onSubmit={handleSubmit}>
                        <div className={style.formItem}>
                            <label className={style.formLabel}>Name</label>
                            <input  className={style.formInput} type={"text"} required  onBlur={handleBlur} onChange={handleChange} value={name}></input>
                        </div>
                        <div className={style.formItem}>
                            <label className={style.formLabel} style={{marginTop: "10px"}}>Email</label>
                            <input className={style.formInput} type={"email"} required onBlur={handleBlur} onChange={handleChange} value={email}></input>
                            <p style={{color: "red", padding: "4px"}}>{errorEmail}</p>
                        </div>
                        <div className={style.formItem}>
                            <label className={style.formLabel}>Mobile</label>
                            <input className={style.formInput} type={"tel"} required  onBlur={handleBlur} onChange={handleChange} value={mobile}></input>
                            <p style={{color: "red", padding: "4px"}}>{errorMobile}</p>
                        </div>
                        <div className={style.formItem}>
                            <label className={style.formLabel}>Message</label>
                            <textarea className='textarea' onChange={handleChange} value={message}>
                            </textarea>
                        </div>
                        <button className={style.formSend}>Send</button>
                       
                    </form>
                </div>
            </div>
        </div>
     );
}

export default Form;