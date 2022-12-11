import React, { useState, useEffect } from "react";
import styles from "./EmployeePopUp.module.css";
import './EmployeePopUp.css'
import CancelIcon from "@mui/icons-material/Cancel";
import { Box } from "@mui/system";
import { Grid, Button, Paper } from "@mui/material";
import Swal from "sweetalert2";
import { styled } from "@mui/material/styles";
import images from "../../../../assets/image";

import HandleApiEmployee from "../../../../Apis/HandleApiEmployee";

function EmployeePopUp({type, setType, updateEmployee, setUpdateEmployee }) {
    const [employeeName, setEmployeeName] = useState();
    const [sex, setSex] = useState();
    const [address, setAddress] = useState();
    const [dateOfBirth, setDateOfBirth] = useState();
    const [phone, setPhone] = useState();
    const [position, setPosition] = useState();
    const [cccd, setCccd] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordConfirm, setPasswordConfirm] = useState();

    const inputId = [
        "name",
        "sex",
        "address",
        "dateofbirth",
        "phone",
        "position",
        "cccd",
        "email",
        "password",
        "passwordConfirm"
    ];

    const inputIdUpdate = [
        "name",
        "sex",
        "address",
        "dateofbirth",
        "phone",
        "cccd",
        "position",
    ];
    const useStateEvent = [
        setEmployeeName,
        setSex,
        setAddress,
        setDateOfBirth,
        setPhone,
        setPosition,
        setCccd,
        setEmail,
        setPassword,
        setPasswordConfirm
    ];

    const useStateEventUpdate = [
        setEmployeeName,
        setSex,
        setAddress,
        setDateOfBirth,
        setPhone,
        setCccd,
        setPosition,
    ];

    const textValue = [
        "Tên nhân viên",
        "Giới tính (Nam / Nữ)",
        "Địa chỉ",
        "Ngày sinh (dd-mm-yyyy)",
        "Số điện thoại",
        "Chức vụ",
        "CCCD",
        "Email",
        "Mật khẩu",
        "Xác nhận mật khẩu"
     ];
     const textValueUpdate = [
        "Tên nhân viên",
        "Giới tính (Nam / Nữ)",
        "Địa chỉ",
        "Ngày sinh (dd-mm-yyyy)",
        "Số điện thoại",
        "CCCD",
        "Chức vụ"
     ];

    const placeHolder = [
        "Nhập tên nhân viên",
        "Nhập giới tính",
        "Nhập địa chỉ",
        "Nhập ngày sinh",
        "Nhập SĐT",
        "Nhập chức vụ",
        "Nhập CCCD",
        "Nhập email",
        "Nhập mật khẩu",
        "Nhập lại mật khẩu"
    ];

    const inputType = ["text", "text", "text", "text",  "number", "text", "number", "text", "password", "password"];

    const inputTypeUpdate = ["text", "text", "text", "text",  "number", "number", "text"];

    const inputValueUpdate = [
        employeeName,
        sex,
        address,
        dateOfBirth,
        phone,
        cccd,
        position,
    ];

    // object data
    const dataCreate = {
       name: employeeName,
       gioitinh: sex,
       diachi: address,
       ngaysinh: dateOfBirth,
       sdt: Number(phone),
       chucvu: position,
       cccd: Number(cccd),
       email: email,
       password: password,
       passwordConfirm: passwordConfirm
    };

    const dataUpdate = {
        name: employeeName,
        gioitinh: sex,
        diachi: address,
        ngaysinh: dateOfBirth, 
        sdt: Number(phone),
        cccd: Number(cccd),
        chucvu: position,
     };

    const handleBlur = (e) => {
        if (e.target.value === "") {
            e.target.style.borderColor = "red";
        } else {
            e.target.style.borderColor = "#000";
        }
    };

    const handleCreateEmployee = async (e) => {
        e.preventDefault();
        HandleApiEmployee.createEmployee(dataCreate)
            .then(async (res) => {
                await Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Tạo dữ liệu thành công!",
                    showConfirmButton: false,
                    timer: 500
                });
                setType("");
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleUpdateEmployee = async () => {
        console.log(updateEmployee._id);
        HandleApiEmployee.updateEmployee(updateEmployee._id, dataUpdate)
            .then(async (res) => {
                await Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Cập nhật dữ liệu thành công!",
                    showConfirmButton: false,
                    timer: 500
                });
                setUpdateEmployee({});
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        if (updateEmployee !== {}) {
            setEmployeeName(updateEmployee.name);
            setSex(updateEmployee.gioitinh);
            setAddress(updateEmployee.diachi);
            setDateOfBirth(updateEmployee.ngaysinh);
            setPhone(updateEmployee.sdt);
            setPosition(updateEmployee.chucvu);
            setCccd(updateEmployee.cccd);
            setEmail(updateEmployee.email)
            setPassword(updateEmployee.password);
            setPasswordConfirm(updateEmployee.passwordConfirm);
        }
    }, [updateEmployee]);

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        padding: theme.spacing(1),
        textAlign: "left",
        color: "#000",
        boxShadow: "none",
        fontSize: 16,
    }));

    return (
        <>
            {type === "create" && (
                <div>
                    <div className={styles.overlay}></div>
                    <div className={styles.bPopup}>
                        <CancelIcon
                            className={styles.bPopup__close}
                            onClick={() => setType("")}
                        />
                        <h3>Thêm nhân viên </h3>
                        <br />
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container sx={{ width: "1120px", marginTop: "16px" }}>
                                {inputId.map((item, index) => (
                                    <Grid key={index} item xs={3} sx={{ height: "93px" }}>
                                        <label htmlFor={item[index]} className={styles.label}>
                                            {textValue[index]}
                                        </label>
                                        <br />
                                        <input
                                            id={item[index]}
                                            name={item[index]}
                                            type={inputType[index]}
                                            required
                                            placeholder={placeHolder[index]}
                                            onChange={(e) =>
                                                useStateEvent[index](
                                                    e.target.value
                                                )
                                            }
                                            onBlur={handleBlur}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                            <div className={styles.btn}>
                                <Button
                                    variant="contained"
                                    color="success"
                                    size="large"
                                    sx={{
                                        fontSize: "14px",
                                        width: "160px",
                                    }}
                                    onClick={handleCreateEmployee}
                                >
                                    Thêm dữ liệu
                                </Button>
                                <Button
                                    variant="contained"
                                    color="error"
                                    size="large"
                                    sx={{
                                        fontSize: "14px",
                                        width: "100px",
                                        margin: "0 36px 0 20px"
                                    }}
                                    onClick={() => setType("")}
                                >
                                    Hủy
                                </Button>
                            </div>
                        </Box>
                    </div>

                </div>
            )}

            {type === "update" && (
                <div>
                    <div className={styles.overlay}></div>

                    <div className={styles.bPopup}>
                        <CancelIcon
                            className={styles.bPopup__close}
                            onClick={() => setType("")}
                        />
                        <h3>Cập nhật dữ liệu nhân viên</h3>

                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container sx={{ width: "1120px", marginTop: "16px" }}>
                                {inputIdUpdate.map((item, index) => (
                                    <Grid key={index} item xs={3} sx={{ height: '93px' }}>
                                        <label htmlFor={item[index]}>
                                            {textValueUpdate[index]}
                                        </label>
                                        <br />
                                        <input
                                            id={item[index]}
                                            type={inputTypeUpdate[index]}
                                            value={inputValueUpdate[index]}
                                            onChange={(e) =>
                                                useStateEventUpdate[index](e.target.value)
                                            }
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                        <div className={styles.btn}>
                            <Button
                                variant="contained"
                                color="success"
                                size="large"
                                sx={{
                                    fontSize: "14px",
                                    width: "160px",
                                }}
                                onClick={handleUpdateEmployee}
                            >
                                Cập nhật
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                size="large"
                                sx={{
                                    fontSize: "14px",
                                    width: "100px",
                                    margin: "0 36px 0 20px"
                                }}
                                onClick={() => setType("")}
                            >
                                Hủy
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            {type === "read" && (
                <div>
                    <div className={styles.overlay}></div>
                    <div className={styles.bPopup}>
                        <CancelIcon
                            className={styles.bPopup__close}
                            onClick={() => setType("")}
                        />
                        <h3>Thông tin chi tiết nhân viên</h3>
                        <Box sx={{ flexGrow: 1, marginTop: "24px" }}>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Item>{"Mã nhân viên: " + updateEmployee.mauser}</Item>
                                    <Item>{"Tên nhân viên: " + updateEmployee.name}</Item>
                                    <Item>{"Ngày sinh: " + updateEmployee.ngaysinh}</Item>
                                    <Item>{"Giới tính: " + updateEmployee.gioitinh}</Item>
                                    <Item>{"Số điện thoại: " + 0 +updateEmployee.sdt}</Item>
                                    <Item>{"CCCD: " + updateEmployee.cccd}</Item>
                                    <Item>{"Địa chỉ: " + updateEmployee.diachi}</Item>
                                    <Item>{"Email: " + updateEmployee.email}</Item>
                                    <Item>{"Chức vụ: "+updateEmployee.chucvu}</Item>
                                </Grid>
                                <Grid item xs={6}>
                                    <img
                                        src={images.imgPageDetailEmployee}
                                        className={styles.readImg}
                                    ></img>
                                    <Item
                                        sx={{
                                            textAlign: "center",
                                            fontSize: "24px",
                                            color: "red",
                                            fontWeight: "bold",
                                        }}
                                    ></Item>
                                </Grid>
                            </Grid>
                        </Box>

                        <div className={styles.btn}>
                            <Button
                                variant="contained"
                                color="error"
                                size="large"
                                sx={{
                                    fontSize: "14px",
                                    width: "100px",
                                    margin: "24px -10px -12px 0"
                                }}
                                onClick={() => setType("")}
                            >
                                Hủy
                            </Button>
                        </div>
                    </div>

                </div>
            )}
        </>
    );
}

export default EmployeePopUp;
