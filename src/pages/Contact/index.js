import { useState} from 'react';
import style from './Contact.module.css'

function checkEmailFormat(email) {
    const re =/\S+@\S+\.\S+/;
    return re.test(email);
}

function Contact() {
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
        <div className={style.contactLayer}>
            <div  className={style.contactLayout}>
                <div  className={style.contactImage}>
                </div> 
                <div className={style.contactForm}>
                    <p className={style.contactTitle}>Please leave your phone number to be contacted for the latest King Speed ​​car buying policy!</p>
                    <form onSubmit={handleSubmit}>
                        <div className={style.contactItem}>
                            <label className={style.contactLabel}>Name</label>
                            <input  className={style.contactInput} type={"text"} required  onBlur={handleBlur} onChange={handleChange} value={name}></input>
                        </div>
                        <div className={style.contactItem}>
                            <label className={style.contactLabel} style={{marginTop: "10px"}}>Email</label>
                            <input className={style.contactInput} type={"email"} required onBlur={handleBlur} onChange={handleChange} value={email}></input>
                            <p style={{color: "red", padding: "4px"}}>{errorEmail}</p>
                        </div>
                        <div className={style.contactItem}>
                            <label className={style.contactLabel}>Mobile</label>
                            <input className={style.contactInput} type={"tel"} required  onBlur={handleBlur} onChange={handleChange} value={mobile}></input>
                            <p style={{color: "red", padding: "4px"}}>{errorMobile}</p>
                        </div>
                        <div className={style.contactItem}>
                            <label className={style.contactLabel}>Message</label>
                            <textarea className='textarea' onChange={handleChange} value={message}>
                            </textarea>
                        </div>
                        <button className={style.contactSend}>Send</button>
                       
                    </form>
                </div>
            </div>
        </div>
     );
}

export default Contact;