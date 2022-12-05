import React, { useState, useEffect } from "react";
import styles from "./EmployeePopUp.module.css";
import './EmployeePopUp.css'
import CancelIcon from "@mui/icons-material/Cancel";
import { Box } from "@mui/system";
import { Grid, Button, Paper } from "@mui/material";
import Swal from "sweetalert2";
import { styled } from "@mui/material/styles";

import HandleApiEmployee from "../../../../Apis/HandleApiEmployee";

function EmployeePopUp({ type, setType, updateEmployee, setUpdateEmployee }) {
    const [employeeName, setEmployeeName] = useState();
    const [sex, setSex] = useState();
    const [address, setAddress] = useState();
    const [dateOfBirth, setDateOfBirth] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [cccd, setCccd] = useState();
    const [position, setPosition] = useState();
    const [password, setPassword] = useState();

    const inputId = [
        "name",
        "sex",
        "address",
        "dateofbirth",
        "phone",
        "email",
        "cccd",
        "position",
        "password",
    ];

    const useStateEvent = [
        setEmployeeName,
        setSex,
        setAddress,
        setDateOfBirth,
        setPhone,
        setEmail,
        setCccd,
        setPosition,
        setPassword,
    ];

    const placeHolder = [
        "Nhập tên nhân viên",
        "Nhập giới tính",
        "Nhập địa chỉ",
        "Nhập ngày sinh",
        "Nhập SĐT",
        "Nhập email",
        "Nhập CCCD",
        "Nhập chức vụ",
        "Nhập password",
    ];

    const textValue = [
       "Tên nhân viên",
       "Giới tính (Nam / Nữ)",
       "Địa chỉ",
       "Ngày sinh (dd/mm/yyyy)",
       "Số điện thoại",
       "Email",
       "CCCD",
       "Chức vụ",
       "Password(8 charater)",
    ];

    const inputType = ["text", "text", "text", "date",  "number", "text", "number", "text", "password"];

    const inputValue = [
        employeeName,
        sex,
        address,
        dateOfBirth,
        phone,
        email,
        cccd,
        position,
        password,
    ];

    // object data
    const data = {
       name: employeeName,
       gioitinh: sex,
       diachi: address,
       ngaysinh: Date(dateOfBirth),
       sdt: Number(phone),
       email: email,
       cccd: Number(cccd),
       chucvu: position,
       password: password,
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
        HandleApiEmployee.createEmployee(data)
            .then(async (res) => {
                await Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Tạo dữ liệu thành công!",
                    showConfirmButton: false,
                    timer: 1500
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
        HandleApiEmployee.updateEmployee(updateEmployee._id, data)
            .then(async (res) => {
                await Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Cập nhật dữ liệu thành công!",
                    showConfirmButton: false,
                    timer: 1500
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
            setEmail(updateEmployee.email)
            setCccd(updateEmployee.cccd);
            setPosition(updateEmployee.chucvu);
            setPassword(updateEmployee.password);
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
                                        {/* <div>{errorName}</div> */}
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
                                {inputId.map((item, index) => (
                                    <Grid key={index} item xs={3} sx={{ height: '93px' }}>
                                        <label htmlFor={item[index]}>
                                            {textValue[index]}
                                        </label>
                                        <br />
                                        <input
                                            id={item[index]}
                                            type={inputType[index]}
                                            value={inputValue[index]}
                                            onChange={(e) =>
                                                useStateEvent[index](e.target.value)
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
                                    <Item>{"Giới tính: " + updateEmployee.gioitinh}</Item>
                                    <Item>{"Ngày sinh: " + updateEmployee.ngaysinh}</Item>
                                    <Item>{"Địa chỉ: " + updateEmployee.diachi}</Item>
                                    <Item>{"Số điện thoại: " + updateEmployee.sdt}</Item>
                                    <Item>{"CCCD: " + updateEmployee.cccd}</Item>
                                    <Item>{"Email: " + updateEmployee.email}</Item>
                                    <Item>{"Chức vụ: " + updateEmployee.chucvu}</Item>
                                    <Item>{"Mật khẩu: " + updateEmployee.password}</Item>
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
