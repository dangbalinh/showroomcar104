import React, { useState, useEffect } from "react";
import styles from "./EmployeePopUp.module.css";
import './EmployeePopUp.css'
import Swal from "sweetalert2";
import CancelIcon from "@mui/icons-material/Cancel";
import { Box } from "@mui/system";
import { Grid, Button, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

import HandleApi from "../../../../Apis/HandleApi";

function EmployeePopUp({ type, setType, updateEmployee, setUpdateEmployee }) {
    const [thumbnail, setThumbnail] = useState();
    const [employeeName, setEmployeeName] = useState();
    const [sex, setSex] = useState();
    const [address, setAddress] = useState();
    const [dateOfBirth, setDateOfBirth] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [cccd, setCccd] = useState();
    const [position, setPosition] = useState();
    const [password, setPassword] = useState();
    const [role, setRole] = useState();

    const inputId = [
        "name",
        "sex",
        "thumbnail",
        "address",
        "dateofbirth",
        "phone",
        "email",
        "cccd",
        "role",
        "position",
        "password",
    ];

    const useStateEvent = [
        setEmployeeName,
        setSex,
        setThumbnail,
        setAddress,
        setDateOfBirth,
        setPhone,
        setEmail,
        setCccd,
        setRole,
        setPosition,
        setPassword,
    ];

    const placeHolder = [
        "Nhập tên nhân viên",
        "Nhập giới tính",
        "Nhập Link Avatar",
        "Nhập địa chỉ",
        "Nhập ngày sinh",
        "Nhập SĐT",
        "Nhập email",
        "Nhập CCCD",
        "Nhập quyền",
        "Nhập chức vụ",
        "Nhập password",
    ];

    const textValue = [
       "Tên nhân viên",
       "Giới tính (Nam / Nữ)",
       "Link avatar",
       "Địa chỉ",
       "Ngày sinh (dd/mm/yyyy)",
       "Số điện thoại",
       "Email",
       "CCCD",
       "Quyền(Employee)",
       "Chức vụ",
       "Password(8 charater)",
    ];

    const inputType = ["text", "text", "text", "text", "text", "number", "text", "number", "text", "text", "password"];

    const inputValue = [
        employeeName,
        sex,
        thumbnail,
        address,
        dateOfBirth,
        phone,
        email,
        cccd,
        role,
        position,
        password,
    ];

    // object data
    const data = {
       ten: employeeName,
       gioitinh: sex,
       hinhanh: thumbnail,
       diachi: address,
       ngaysinh: dateOfBirth,
       sdt: Number(phone),
       email: email,
       cccd: Number(cccd),
       quyen: role,
       chucvu: position,
       matkhau: password,
    };

    const handleBlur = (e) => {
        if (e.target.value === "") {
            e.target.style.borderColor = "red";
        } else {
            e.target.style.borderColor = "#000";
        }
    };

    const handleCreateCar = async (e) => {
        e.preventDefault();
        HandleApi.createCar(data)
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

    const handleUpdateCar = async () => {
        console.log(updateEmployee._id);
        HandleApi.updateCar(updateEmployee._id, data)
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
            setEmployeeName(updateEmployee.ten);
            setSex(updateEmployee.macar);
            setThumbnail(updateEmployee.hinhanh);
            setAddress(updateEmployee.thuonghieu);
            setDateOfBirth(updateEmployee.socho);
            setPhone(updateEmployee.dongco);
            setEmail(updateEmployee.dongco)
            setCccd(updateEmployee.congsuatcucdai);
            setRole(updateEmployee.dungtich);
            setPosition(updateEmployee.namsanxuat);
            setPassword(updateEmployee.tieuhaonhienlieu);
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
                                    onClick={handleCreateCar}
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
                                onClick={handleUpdateCar}
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
                                    <Item sx={{ fontWeight: "bold" }}>{"Tên nhân viên: " + updateEmployee.ten}</Item>
                                    <Item>{"Giới tính: " + updateEmployee.macar}</Item>
                                    <Item>{"Ngày sinh: " + updateEmployee.socho}</Item>
                                    <Item>{"Địa chỉ: " + updateEmployee.thuonghieu}</Item>
                                    <Item>{"Số điện thoại: " + updateEmployee.socho}</Item>
                                    <Item>{"CCCD: " + updateEmployee.kichthuoc}</Item>
                                    <Item>{"Email: " + updateEmployee.socho}</Item>
                                    <Item>{"Quyền: " + updateEmployee.dungtich}</Item>
                                    <Item>{"Chức vụ: " + updateEmployee.namsanxuat}</Item>
                                    <Item>{"Mật khẩu: " + updateEmployee.tieuhaonhienlieu}</Item>
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
