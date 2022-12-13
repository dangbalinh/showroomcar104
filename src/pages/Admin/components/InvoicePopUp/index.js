import { useState } from "react";
import * as React from 'react';
import styles from "./InvoicePopUp.module.css"
import './InvoicePopUp.css'
import CancelIcon from "@mui/icons-material/Cancel";
import Swal from "sweetalert2";
import { styled } from "@mui/material/styles";
import HandleApiInvoice from "../../../../Apis/HandleApiInvoice";
// import { borders } from '@mui/system';
import {
    Add
} from "@mui/icons-material";
import {
    MenuItem,
    Button,
    Grid,
    Paper,
    Select,
    Box,
    Typography,
} from "@mui/material";

function InvoicePopUp({type, setType, updateInvoice, setUdateInvoice}) {


    // Format a date to DD-MM-YYYY (or any other format)
    function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
    }

    function formatDate(date) {
    return [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
    ].join('-');
    }

//========
    const [makh, setMaKH] = useState();
    const [tinhtrang, setTinhTrang] = useState("Chưa thanh toán");
    const [tongtien, setTongTien] = useState(0);
    const [maxe, setMaXe] = useState(null);
    const [soluongxe, setSoLuongXe] = useState(1);
    const [carArrayData, setCarArrayData] = useState([]);
    const [carArrayDisplay, setCarArrayDisplay] = useState([]);
    const [inputMaXe, setInputMaXe] = useState('')
    const [inputSL, setInputSL] = useState('')
    var user = JSON.parse(localStorage.getItem('user'));
    const manv = user.mauser;
    const ngayhd = formatDate(new Date());


    //-----------------------------------

    const dataN = {
        hoadon: {
            manv: manv,
            makh: makh,
            ngayhd: ngayhd,
            tinhtrang: tinhtrang,
            trigia: tongtien,  
    },
        cthd: carArrayData,
    }

    
    const handleBlurMaCar = (e) => {
        if (e.target.value === "") {
            // setErrorName("Vui lòng nhập dữ liệu ");
            e.target.style.borderColor = "red";
        } 
        else {
            e.target.style.borderColor = "#000";
        }
        if(maxe !== null && maxe !== '')
        {
            HandleApiInvoice.getCarByMaCar(maxe).then((res) => {
                console.log(res)
                if(res.totalCarsFilter === 0)
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Không tồn tại mã xe này",
                    showConfirmButton: false,
                    timer: 1700,})
                .catch((err) => {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Xảy ra lỗi!",
                        showConfirmButton: false,
                        timer: 1700,
                    });
                    console.log(err);        
                });
            })
        }
        
    };

    const handleBlurSL = (e) => {
        if ((e.target.value === "" || e.target.value <= 0) && maxe !== null && maxe !== "") {
            e.target.style.borderColor = "red";
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Số lượng phải lớn hơn 0. Vui lòng nhập lại.",
                showConfirmButton: false,
                timer: 1700,})
            setInputSL(1)
        } 
        else {
            e.target.style.borderColor = "#000";
        }
        if(soluongxe!==null && soluongxe>0)
        {
            HandleApiInvoice.getCarByMaCar(maxe).then((res) => {
                console.log(res)
                if(res.cars[0].soluong < soluongxe)
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Số lượng xe không đủ. Vui lòng nhập lại!",
                    showConfirmButton: false,
                    timer: 1700,})
                .catch((err) => {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Xảy ra lỗi!",
                        showConfirmButton: false,
                        timer: 1700,
                    });
                    console.log(err);        
                }); })
        }
    }

    const handleBlurMaKH = (e) => {
        if (e.target.value === "") {
            // setErrorName("Vui lòng nhập dữ liệu ");
            e.target.style.borderColor = "red";
        } 
        else {
            e.target.style.borderColor = "#000";
        }
        if(makh !== null && makh !== '')
        {
            HandleApiInvoice.getCustomerByMaUser(makh).then((res) => {
                if(res.totalCustomersFilter === 0)
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Không tìm thấy khách hàng này",
                    showConfirmButton: false,
                    timer: 1700,})
                    .catch((err) => {
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: "Không tìm thấy khách hàng này!",
                            showConfirmButton: false,
                            timer: 1700,
                        });
                        console.log(err);        
                    });
            })
            
        }
    }

    const handleAddCarToInvoice = async (e) => {
        e.preventDefault();
        HandleApiInvoice.getCarByMaCar(maxe).then( (res) => {
            if(res.totalCarsFilter > 0 && res.cars[0].soluong > soluongxe)
            { 
                if(res.cars[0].soluong >= soluongxe)
                setTongTien(tongtien+res.cars[0].gia*soluongxe)
                let carInforDisplay = {
                    tenxe: res.cars[0].ten,
                    soluong: soluongxe, 
                    dongia: res.cars[0].gia,
                }
                let carData = {
                    macar: maxe,
                    soluong: soluongxe,
                }
                setCarArrayData(carArrayData => [...carArrayData, carData])
                setCarArrayDisplay(carArrayDisplay => [...carArrayDisplay, carInforDisplay])
                setMaXe(null)
                setInputMaXe('')
                setInputSL('')
            } 
            else
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Không thêm xe được vì mã xe hoặc số lượng không hợp lệ!",
                showConfirmButton: false,
                timer: 1700,})
    })}

    const handleCreateInvoice = async (e) => {
        e.preventDefault();
        HandleApiInvoice.createInvoice(dataN)
            .then(async (res) => {
                await Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Tạo dữ liệu thành công!",
                    showConfirmButton: false,
                    timer: 1700
                });
                setType("");
                window.location.reload();              
            })
            .catch((err) => {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Thêm hóa đơn thất bại!",
                    showConfirmButton: false,
                    timer: 1700,
                });
                console.log(err);
            });
            setSoLuongXe(0)
            setInputSL('')
            setTongTien(0)
            setInputMaXe('')
            setMaXe(null)
            setCarArrayDisplay([])
            setCarArrayData([])
    };

    const MenuSelectProps = {
        PaperProps: {
            style: {
                maxHeight: 150,
                overflowX: "scroll",
                //   width: 250,
            },
        },
    };

    const handleChange = (event) => {
        setTinhTrang(event.target.value);
    };

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
                            onClick={() => {setType("")
                            setSoLuongXe(0)
                            setInputSL('')
                            setTongTien(0)
                            setInputMaXe('')
                            setMaXe(null)
                            setCarArrayDisplay([])
                            setCarArrayData([])
                        }}
                        />
                        <h3>Tạo hóa đơn</h3>
                        <br />
                        <Box sx={{ flexGrow: 1 }}>
                            <form onSubmit={handleCreateInvoice}>
                                <Grid container>
                                    <Grid item xs={6}>
                                    <Box sx={{ borderRight: 1, width: '95%'}}>
                                        <Grid container sx={{ width: "390px", marginTop: "16px"}}>
                                        
                                            <Grid item xs={6} sx={{height: "93px"}}>
                                                <label className={styles.label}>Mã khách hàng</label>
                                                <br />
                                                <input
                                                
                                                    type={"text"}
                                                    required
                                                    placeholder={"Nhập mã khách hàng"}
                                                    onChange={(e) => (setMaKH(e.target.value))}
                                                    onBlur={handleBlurMaKH}
                                                />
                                            </Grid> 

                                            <Grid item xs={6} sx={{height: "93px"}} className={styles.nghdpicker}>
                                                <label className={styles.label}>Ngày lập hóa đơn</label>
                                                <br/>
                                                <input disabled value={ngayhd}/>
                                            </Grid> 

                                            <Grid item xs={6} sx={{height: "93px"}}>
                                                <label className={styles.label}>Mã xe</label>
                                                <br />
                                                <input
                                                    id="inputMaXe"
                                                    name="inputMaXe"
                                                    value={inputMaXe}
                                                    type={"text"}
                                                    required
                                                    placeholder={"Nhập mã xe"}
                                                    onChange={(e) => {
                                                        setMaXe(e.target.value)
                                                        setInputMaXe(e.target.value)}}
                                                    onBlur={handleBlurMaCar}
                                                />
                                            </Grid> 

                                            <Grid item xs={6} sx={{height: "93px"}}>
                                                <label className={styles.label}>Số lượng</label>
                                                <br />
                                                <input
                                                    id="inputSL"
                                                    name="inputSL"
                                                    value={inputSL}
                                                    type={"number"}
                                                    min={"1"}
                                                    required
                                                    placeholder={"Nhập số lượng"}
                                                    onChange={(e) => {
                                                        setSoLuongXe(e.target.value)
                                                        setInputSL(e.target.value.toString())
                                                    }}
                                                    onBlur={handleBlurSL}
                                                 />
                                            </Grid> 

                                            <Grid item xs={7} sx={{height: "50px"}}>                       
                                            <Button
                                                sx={{
                                                    height: 40,
                                                    fontSize: 14,
                                                    textTransform: "none",
                                                }}
                                                variant="contained"
                                                color="success"
                                                startIcon={<Add />}
                                                onClick={handleAddCarToInvoice}
                                            >
                                                Thêm xe
                                            </Button>
                                            </Grid> 

                                            <Grid item xs={6} sx={{height: "93px"}}>
                                                <label className={styles.label}>Tình trạng</label>
                                                <br/>
                                                <Select
                                                    className={styles.filter_wrap}
                                                    labelId="input--"
                                                    defaultValue={tinhtrang}
                                                    value={tinhtrang}
                                                    MenuProps={MenuSelectProps}
                                                    onChange={handleChange}
                                                >
                                                    <MenuItem
                                                        className={styles.menuItem}
                                                        value="Chưa thanh toán"
                                                        selected
                                                    >
                                                        Chưa thanh toán
                                                    </MenuItem>
                                                    <MenuItem
                                                        className={styles.menuItem}
                                                        value="Đã thanh toán"
                                                    >
                                                        Đã thanh toán
                                                    </MenuItem>
                                                </Select>
                                            </Grid>

                                        </Grid>
                                    </Box>
                                    </Grid>
                                    <Grid item xs={6}>
                                    <Box sx={{ width: '100%'}}>
                                        <Grid container sx={{ width: "100%", marginTop: "16px"}}>
                                            <Grid item xs={2} sx={{height: "40px"}}>
                                                <label className={styles.label}>STT</label>
                                            </Grid>
                                            <Grid item xs={4.5} sx={{height: "40px"}}>
                                                <label className={styles.label}>Tên xe</label>
                                            </Grid>

                                            <Grid item xs={2} sx={{height: "40px"}}>
                                                <label className={styles.label}>Số lượng</label>
                                            </Grid>
                                            <Grid item xs={3.3} sx={{height: "40px"}}>
                                                <label className={styles.label}>Đơn giá</label>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <div style={{height: "220px", overflowY: 'scroll', overflow: 'scroll'}}>
                                                {carArrayDisplay?.map((item, index) => (
                                                <Grid container key={index}>
                                                    <Grid item xs={1}>
                                                        <Item>{index + 1}</Item>
                                                    </Grid>
                                                    <Grid item xs={5.5}>
                                                        <Item>{item.tenxe}</Item>
                                                    </Grid>
                                                    <Grid item xs={1.8}>
                                                        <Item>{item.soluong}</Item>
                                                    </Grid>
                                                    <Grid item xs={3.5}>
                                                        <Item>{item.dongia.toLocaleString() + " VNĐ"}</Item>
                                                    </Grid>
                                                </Grid>))}
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} sx={{height: "93px"}}>
                                                <label color="error" style={{fontWeight: 'bold'}} className={styles.label}>Tổng tiền</label>
                                                <br/>
                                                <Box>
                                                    <Typography color ={(tinhtrang==="Chưa thanh toán") ? "error" : "#4caf50"}
                                                     fontWeight={'bold'} variant="h4">{tongtien.toLocaleString() + " VNĐ"}</Typography>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    </Grid>
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
                                    onClick={handleCreateInvoice}
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
                                        onClick={() => {setType("")
                                        setSoLuongXe(0)
                                        setTongTien(0)
                                        setInputSL('')
                                        setInputMaXe('')
                                        setMaXe(null)
                                        setCarArrayDisplay([])
                                        setCarArrayData([])
                                        }}
                                    >
                                        Hủy
                                    </Button>
                                </div>

                            </form>
                        </Box>
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
                            <Grid container columnSpacing={5}>
                                <Grid item xs={4.5}>
                                    <div className={styles.infor_hoadon}>
                                    <Item sx={{ fontWeight: "bold" }}>{"Mã khách hàng: " + updateInvoice.hoadon.makh}</Item>
                                    <Item>{"Tên khách hàng: " + updateInvoice.hoadon.tenkh}</Item>
                                    <Item>{"Mã nhân viên: " + updateInvoice.hoadon.manv}</Item>
                                    <Item>{"Mã đơn hàng " + updateInvoice.hoadon.mahd}</Item>
                                    <Item>{"Tình trạng: " + updateInvoice.hoadon.tinhtrang}</Item>
                                    <Item>{"Ngày lập hóa đơn: " + updateInvoice.hoadon.ngayhd}</Item>
                                    </div>
                                </Grid>
                                <Grid item xs={7.5}>
                                    <Grid container>
                                <Grid item xs={2} sx={{height: "30px"}}>
                                    <label className={styles.label}>STT</label>
                                </Grid>
                                <Grid item xs={4.2} sx={{height: "30px"}}>
                                    <label className={styles.label}>Tên xe</label>
                                </Grid>

                                <Grid item xs={2.5} sx={{height: "30px"}}>
                                    <label className={styles.label}>Số lượng</label>
                                </Grid>
                                <Grid item xs={3.3} sx={{height: "30px"}}>
                                    <label className={styles.label}>Đơn giá</label>
                                </Grid>
                                <Grid item xs={12} >
                                <div style={{height: "157px", overflowY: 'scroll', overflow: 'scroll'}}>
                                    <Box component="div">
                                    {updateInvoice.cthds?.map((item, index) => (
                                            <Grid container key={index}>
                                                <Grid item xs={1}>
                                                    <Item>{index + 1}</Item>
                                                </Grid>
                                                <Grid item xs={5.7}>
                                                    <Item>{item.tenxe}</Item>
                                                </Grid>
                                                <Grid item xs={1.8}>
                                                    <Item>{item.soluong}</Item>
                                                </Grid>
                                                <Grid item xs={3.5}>
                                                <Item>{item.gia.toLocaleString() + " VNĐ"}</Item>
                                                </Grid>
                                            </Grid>))}
                                    </Box>
                                </div>
                                    </Grid>
                                    <Grid item xs={6} sx={{height: "93px"}}>
                                        <label style={{fontWeight: "bold"}} className={styles.label}>Tổng tiền</label>
                                    </Grid>
                                    <Grid item xs={6} sx={{height: "93px"}}>
                                        <Box>
                                            <Typography variant="h4" 
                                            color ={(updateInvoice.hoadon.tinhtrang==="Chưa thanh toán") ? "error" : "#4caf50"}>
                                                {updateInvoice.hoadon.trigia.toLocaleString() + " VNĐ"}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
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
                                onClick={() => {setType("")
                                }}
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
export default InvoicePopUp;
