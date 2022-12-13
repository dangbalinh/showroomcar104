import { useState} from 'react';
import style from './Contact.module.css'
import HandleApiForm from '../../Apis/HandleApiForm';
import Swal from "sweetalert2";

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

    const handleSubmit= async function(e){
        e.preventDefault();
        if(errorEmail!=="" || errorMobile!==""){
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Thất bại!",
                html:"<h2>Thông tin liên lạc không hợp lệ!</h2>",
                showConfirmButton: false,
                timer: 3000,
            });
        }
        else{
            const data={name,email,mobile,message }
            try {
              const formData= await HandleApiForm.createForm(data)
              if(!formData){
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Đã xảy ra lỗi!",
                    html:"<h2>Vui lòng thử lại!</h2>",
                    showConfirmButton: false,
                    timer: 3000,
                });
              }
            console.log(formData)
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Thành công!",
                html:"<h2>Nhân viên của chúng tôi sẽ sớm liên hệ bạn.</h2>",
                showConfirmButton: false,
                timer: 3000,
                });
              setName("")
              setEmail("")
              setMobile("")
              setMessage("")
            } catch (error) {
                console.log(error)
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Đã xảy ra lỗi!",
                    html:"<h2>Vui lòng thử lại!</h2>",
                    showConfirmButton: false,
                    timer: 3000,
                });
            }
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
                    <p className={style.contactTitle}>Vui lòng để lại thông tin liên lạc để nhận tư vấn từ bộ phận chăm sóc khách hàng hoặc các chính sách của King Speed!</p>
                    <form onSubmit={handleSubmit}>
                        <div className={style.contactItem}>
                            <label className={style.contactLabel}>Họ và tên</label>
                            <input  className={style.contactInput} type={"text"} required  onBlur={handleBlur} onChange={handleChange} value={name}></input>
                        </div>
                        <div className={style.contactItem}>
                            <label className={style.contactLabel} style={{marginTop: "10px"}}>Email</label>
                            <input className={style.contactInput} type={"email"} required onBlur={handleBlur} onChange={handleChange} value={email}></input>
                            <p style={{color: "red", padding: "4px"}}>{errorEmail}</p>
                        </div>
                        <div className={style.contactItem}>
                            <label className={style.contactLabel}>Số điện thoại</label>
                            <input className={style.contactInput} type={"tel"} required  onBlur={handleBlur} onChange={handleChange} value={mobile}></input>
                            <p style={{color: "red", padding: "4px"}}>{errorMobile}</p>
                        </div>
                        <div className={style.contactItem}>
                            <label className={style.contactLabel}>Tin nhắn</label>
                            <textarea className='textarea' onChange={handleChange} value={message}>
                            </textarea>
                        </div>
                        <button className={style.contactSend}>Gửi</button>
                    </form>
                </div>
            </div>
        </div>
     );
}

export default Contact;