import React, { useState } from "react";
import classes from "../Login.module.css";
import axios from "axios";
import Swal from "sweetalert2";

const ForgetPass = (props) => {
    const [message, setMessage] = useState();

    const sendRequestSU = async () => {
        const res = await axios
            .post(`https://showroomcar104.onrender.com/users/forgotPassword`, {
                email: String(props.inputs.email),
            })
            .catch((err) => {
                console.log(err);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Your email is not exists",
                });
            });
        const data = await res.data;
        if (data.status == 201) {
            console.log(data.status);
        } else {
            console.log(data.message);
        }
        return data;
    };
    const handleClick = () => {
        props.closewindow(false);
    };
    const submitEmail = (e) => {
        if (props.errors.emailError != "") {
            e.preventDefault();
            alert("submit failed!");
        } else {
            e.preventDefault();
            sendRequestSU()
                .then((data) => {
                    setMessage(data.message);
                })
                .then(() => {
                    Swal.fire({
                        icon: "success",
                        title: "Hãy kiểm tra email",
                        text: "Email xác nhận mật khẩu đả được gửi cho bạn",
                    });
                });
        }
    };

    return (
        <>
            <div className={classes.forgetpass}>
                <form className={classes.form}>
                    <h2>Quên mật khẩu?</h2>
                    <p
                        style={{
                            color: "#c3aeae",
                            padding: "20px 0",
                            fontSize: "18px",
                            textAlign: "center",
                        }}
                    >
                        Đừng lo lắng hãy nhập vào email của bạn và bắt đầu thiết
                        lập mật khẩu mới!
                    </p>
                    <p>
                        <label>Email</label>
                        <br />
                        <input
                            className={classes.input}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            type="email"
                            name="email"
                            value={props.inputs.email}
                            required
                        />
                        <p
                            style={{
                                color: "red",
                                padding: "10px",
                                fontSize: "12px",
                            }}
                        >
                            {props.errors.emailError}
                        </p>
                    </p>
                    {message && (
                        <p style={{ color: "green", fontSize: "15px" }}>
                            {message}
                        </p>
                    )}
                    <p style={{ textAlign: "center", fontSize: "16px" }}>
                        <button
                            className={classes.button}
                            id="sub_btn"
                            type="submit"
                            onClick={submitEmail}
                        >
                            Gửi Email
                        </button>
                        <br />
                        <p className={classes.direct} onClick={handleClick}>
                            Quay về đăng nhập
                        </p>
                    </p>
                </form>
            </div>
            <div className={classes.backdrop} onClick={handleClick}></div>
        </>
    );
};

export default ForgetPass;
