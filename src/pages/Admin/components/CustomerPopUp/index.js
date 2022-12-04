import React, { useState, useEffect } from "react";
import styles from "./CustomerPopUp.module.css";
import './CustomerPopUp.css'
import CancelIcon from "@mui/icons-material/Cancel";
import Swal from "sweetalert2";
import { Box } from "@mui/system";
import { Grid, Button, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import HandleApisCustomer from "../../../../Apis/HandleApisCustomer";
function CustomerPopup({ type, setType, updateCustomer, setUpdateCustomer }) {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [dateOfBirth, setDateOfBirth] = useState();
    const [address, setAddress] = useState();
    const [cccd, setCccd] = useState();
    const [role] = useState(() => JSON.parse(localStorage.getItem("user")).role)
    const [token] = useState(() => localStorage.getItem("token"))
 

    const inputId = [
        "name",
        "email",
        "sdt",
        "dateOfBirth",
        "cccd",
        "address",
    ];

    const useStateEvent = [
        setName,
        setEmail,
        setPhoneNumber,
        setDateOfBirth,
        setAddress,
        setCccd,
    ];

    const placeHolder = [
        "Nhập tên",
        "Nhập email",
        "Nhập số điện thoại",
        "Nhập ngày sinh",
        "Nhập địa chỉ ",
        "Nhập số căn cước",
    ];

    const textValue = [
        "Tên khách hàng",
        "Email",
        "Số điện thoại",
        "Ngày sinh",
        "Địa chỉ",
        "CCCD",
    ];

    const inputType = ["text", "text","number", "date", "text", "number"];

    const inputValue = [
        name,
        email,
        phoneNumber,
        dateOfBirth,
        address,
        cccd
    ];

    // object data
    const data = {
        ten: name,
        email: email,
        sodienthoai: Number(phoneNumber),
        ngaysinh: Date(dateOfBirth),
        diachi: address,
        cccd: Number(cccd),
      
    };

    const handleBlur = (e) => {
        if (e.target.value === "") {
            e.target.style.borderColor = "red";
        } else {
            e.target.style.borderColor = "#000";
        }
    };

    const handleCreateCustomer = async (e) => {
        e.preventDefault();
        HandleApisCustomer.createCustomer(data,token)
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

    const handleUpdateCustomer = async () => {
        console.log(updateCustomer._id);
        HandleApisCustomer.updateCar(updateCustomer._id, data)
            .then(async (res) => {
                await Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Cập nhật dữ liệu thành công!",
                    showConfirmButton: false,
                    timer: 1500
                });
                setUpdateCustomer({});
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        if (updateCustomer !== {}) {
            setName(updateCustomer.ten);
            setEmail(updateCustomer.email);
            setPhoneNumber(updateCustomer.sdt);
            setDateOfBirth(updateCustomer.ngaysinh);
            setAddress(updateCustomer.diachi);
        }
    }, [updateCustomer]);

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        padding: theme.spacing(1),
        textAlign: "left",
        color: "#000",
        boxShadow: "none",
        fontSize: 16,
        // marginLeft: "20px",
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
                        <h3>Thêm khách hàng</h3>
                        <br />
                        <Box sx={{ flexGrow: 1 }}>
                            <form onSubmit={handleCreateCustomer}>
                                <Grid container>
                                    {inputId.map((item, index) => (
                                        <Grid key={index} item xs={4} sx={{ height: "93px" }}>
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
                                            margin: "24px 0 0"
                                        }}
                                        type={"submit"}
                                    // onClick={handleCreateCar}
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
                                            margin: "24px 36px 0 20px"
                                        }}
                                        onClick={() => setType("")}
                                    >
                                        Hủy
                                    </Button>
                                </div>
                            </form>
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
                        <h3>Cập nhật dữ liệu khách hàng</h3>

                        <Box sx={{ flexGrow: 1, marginTop: '20px' }}>
                            <Grid container>
                                {inputId.map((item, index) => (
                                    <Grid key={index} item xs={4} sx={{ height: '93px' }}>
                                        <label htmlFor={item[index]}>
                                            {textValue[index]}
                                        </label>
                                        <br />
                                        <input
                                            id={item[index]}
                                            type="text"
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
                                onClick={handleUpdateCustomer}
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
                        <h3>Thông tin chi tiết</h3>

                        <Box sx={{ flexGrow: 1, marginTop: "24px" }}>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Item sx={{ fontWeight: "bold" }}>{"Tên khách hàng: " + updateCustomer.ten}</Item>
                                    <Item>{"Tên khách hàng: " + updateCustomer.ten}</Item>
                                    <Item>{"Email: " + updateCustomer.email}</Item>
                                    <Item>{"Số điện thoại: " + updateCustomer.sdt}</Item>
                                    <Item>{"Căn cước công dân: " + updateCustomer.cccd}</Item>
                                    <Item>{"Địa chỉ: " + updateCustomer.diachi}</Item>

                                </Grid>
                                <Grid item xs={6}>
                                    <Item sx={{ textAlign: 'center', fontSize: '24px', color: "red", fontWeight: "bold" }}>
                                        {"Giá: " + updateCustomer.gia.toLocaleString() + " VNĐ"}
                                    </Item>
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

export default CustomerPopup;
