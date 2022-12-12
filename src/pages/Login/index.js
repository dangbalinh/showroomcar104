import React, { useState } from "react";
import classes from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import ForgetPass from "./ForgetPass/ForgetPass";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const Login = () => {
    const [modal, setModal] = useState(false);
    const navigate = useNavigate();
    const checkEmailFormat = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        emailError: "",
        passwordError: "",
    });
    const handleChange = (e) => {
        setInputs((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            };
        });
    };
    const handleBlur = function (e) {
        if (e.target.type === "email") {
            if (
                checkEmailFormat(e.target.value) === false ||
                e.target.value === ""
            ) {
                e.target.style.borderColor = "red";
                setErrors((prev) => {
                    return {
                        ...prev,
                        emailError: "Email không hợp lệ",
                    };
                });
            } else {
                e.target.style.borderColor = "#fff";
                setErrors((prev) => {
                    return {
                        ...prev,
                        emailError: "",
                    };
                });
            }
        }
        if (e.target.type === "password") {
            if (e.target.value.length < 8 || e.target.value === "") {
                e.target.style.borderColor = "red";
                setErrors((prev) => {
                    return {
                        ...prev,
                        passwordError: "Mật khẩu phải dài hơn 8 ký tự.",
                    };
                });
            } else {
                e.target.style.borderColor = "#fff";
                setErrors((prev) => {
                    return {
                        ...prev,
                        passwordError: "",
                    };
                });
            }
        }
    };
    const sendRequestSU = async () => {
        const res = await axios
            .post(`https://showroomcar104.onrender.com/users/login`, {
                email: String(inputs.email),
                password: String(inputs.password),
            })
            .catch((err) => {
                Swal.fire({
                    icon: "error",
                    title: "Mật khẩu hoặc email không đúng",
                });
                console.log(err);
            });
        const data = await res.data;
        console.log(data);
        return data;
    };
    const handleSubmit = (e) => {
        if (errors.emailError !== "" || errors.passwordError !== "") {
            e.preventDefault();
            alert("Login failed!");
        } else {
            e.preventDefault();
            sendRequestSU()
                .then((data) => {
                    localStorage.setItem("user", JSON.stringify(data.user));
                    //localStorage.setItem("token",data.token);
                    Cookies.set("token", data.token, {
                        expires: 30,
                    });
                })
                //.then(()=>setIsLogin(true))
                .then(() => navigate("/"));
        }
    };

    return (
        <div className={classes.register}>
            <h1> Đăng Nhập </h1>{" "}
            <form className={classes.form}>
                <p>
                    <label> Email </label> <br />
                    <input
                        className={classes.input}
                        value={inputs.email}
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                    />
                    <p
                        style={{
                            color: "red",
                            padding: "10px",
                            fontSize: "12px",
                        }}
                    >
                        {errors.emailError}{" "}
                    </p>{" "}
                </p>{" "}
                <p className={classes.forgetchoice}>
                    <label> Mật Khẩu </label> <br />
                    <input
                        className={classes.input}
                        value={inputs.password}
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                    />
                    <p
                        style={{
                            color: "red",
                            padding: "10px",
                            fontSize: "12px",
                        }}
                    >
                        {errors.passwordError}{" "}
                    </p>{" "}
                    <div className={classes.direct}>
                        <p onClick={() => setModal(true)}> Quên mật khẩu ? </p>{" "}
                    </div>{" "}
                </p>{" "}
                <p
                    style={{
                        textAlign: "center",
                        fontSize: "16px",
                    }}
                >
                    <button
                        className={classes.button}
                        id="sub_btn"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Đăng Nhập{" "}
                    </button>{" "}
                    <br />
                    Bạn chưa có tài khoản ? Đi đến{" "}
                    <Link to="/register"> Đăng kí </Link>{" "}
                </p>{" "}
            </form>{" "}
            {modal && (
                <ForgetPass
                    closewindow={setModal}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    inputs={inputs}
                    errors={errors}
                ></ForgetPass>
            )}{" "}
        </div>
    );
};

export default Login;
