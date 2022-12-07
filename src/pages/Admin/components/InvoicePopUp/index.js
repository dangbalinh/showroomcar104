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
    TextField,
    Box,
    Typography,
    Stack,
} from "@mui/material";
import { width } from "@mui/system";
import { GridFilterInputValue } from "@mui/x-data-grid";

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
    const [ngayhd, setngayhd] = useState(formatDate(new Date()))
    const [tinhtrang, setTinhTrang] = useState("Chưa thanh toán");
    const [trigia, setTriGia] = useState();
    const [donGiaChiTiet, setDonGiaChiTiet] = useState(0)
    const [tongtien, setTongTien] = useState(0);
    const [maxe, setMaXe] = useState();
    const [soluongxe, setSoLuongXe] = useState(0);
    const [carName, setCarName] = useState();
    const [carArrayData, setCarArrayData] = useState([]);
    const [carArrayDisplay, setCarArrayDisplay] = useState([]);
    const [inputMaXe, setInputMaXe] = useState('')
    const [inputSL, setInputSL] = useState('')
    var user = JSON.parse(localStorage.getItem('user'));
    const manv = user.mauser;

    //-----------------------------------

    
    const inputIdN = [
        "makh",
        "macar",
        "soluongxe"
    ]

    const useStateEventN = [
        setMaKH,
        setMaXe,
        setSoLuongXe
    ];
    const placeHolderN = [
        "Nhập mã khách hàng",
        "Nhập mã xe",
        "Nhập số lượng",
    ]

    const textValueN = [
        "Mã khách hàng",
        "Mã xe",
        "Nhập số lượng"
    ]

    const inputTypeN = ["text", "text", "number"]
    
    // const inputValueN = [
    //     makh, 
    //     maxe,
    //     soluongxe
    // ]

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


    // const [thumbnail, setThumbnail] = useState();
    
    const handleBlur = (e) => {
        if (e.target.value === "") {
            // setErrorName("Vui lòng nhập dữ liệu ");
            e.target.style.borderColor = "red";
        } 
        else {
            e.target.style.borderColor = "#000";
        }
        if(maxe !== null)
        {
            HandleApiInvoice.getCarByMaCar(maxe).then((res) => {
                if(res.cars[0].soluong < soluongxe)
                    Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Số lượng xe không đủ",
                    showConfirmButton: false,
                    timer: 1500,})
                
                .catch((err) => {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Không có mã xe nào giống mã xe đã nhập!",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    console.log(err);
                });
            })
        }
    };

    const handleAddCarToInvoice = async (e) => {
        e.preventDefault();
        HandleApiInvoice.getCarByMaCar(maxe).then( (res) => {
            if(res.cars[0].soluong >= soluongxe)
            { 
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
                setInputMaXe('')
                setInputSL('')
            } 
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
                    timer: 1500
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
                    timer: 1500,
                });
                console.log(err);
            });
            setTriGia(null) 
            setCarName("") 
            setSoLuongXe(0)
            setTongTien(0)
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
                            setTriGia(null) 
                            setCarName("") 
                            setSoLuongXe(0)
                            setTongTien(0)
                            setCarArrayDisplay([])
                            setCarArrayData([])
                        }}
                        />
                        <h3>Tạo hóa đơn</h3>
                        <br />
                        <Box sx={{ flexGrow: 1 }}>
                            <form onSubmit={handleCreateInvoice}>
                                <Grid container>
                                    <Grid item xs={6.5}>
                                    <Box sx={{ borderRight: 1, width: '95%'}}>
                                        <Grid container sx={{ width: "400px", marginTop: "16px"}}>
                                            {/* {    inputIdN.map((item, index) => (
                                                <Grid key={index} item xs={6} sx={{ height: "93px" }}>
                                                    <label htmlFor={item[index]} className={styles.label}>
                                                        {textValueN[index]}
                                                    </label>
                                                    <br />
                                                    <input
                                                        id={item[index]}
                                                        name={item[index]}
                                                        type={inputTypeN[index]}
                                                        required
                                                        placeholder={placeHolderN[index]}
                                                        onChange={(e) =>
                                                            useStateEventN[index](
                                                                e.target.value
                                                            )
                                                        }
                                                        onBlur={handleBlur}
                                                    />
                                                    <div>{errorName}</div>
                                                </Grid>
                                                ))
                                            } */}
                                            <Grid item xs={6} sx={{height: "93px"}}>
                                                <label className={styles.label}>Mã khách hàng</label>
                                                <br />
                                                <input
                                                
                                                    type={"text"}
                                                    required
                                                    placeholder={"Nhập mã khách hàng"}
                                                    onChange={(e) => (setMaKH(e.target.value))}
                                                    onBlur={handleBlur}
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
                                                    onBlur={handleBlur}
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
                                                    required
                                                    placeholder={"Nhập số lượng"}
                                                    onChange={(e) => {
                                                        setSoLuongXe(e.target.value)
                                                        setInputSL(e.target.value.toString())
                                                    }}
                                                    onBlur={handleBlur}
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
                                    <Grid item xs={5.5}>
                                    <Box sx={{ width: '100%'}}>
                                        <Grid container sx={{ width: "100%", marginTop: "16px"}}>
                                            <Grid item xs={2} sx={{height: "40px"}}>
                                                <label className={styles.label}>STT</label>
                                            </Grid>
                                            <Grid item xs={4.7} sx={{height: "40px"}}>
                                                <label className={styles.label}>Tên xe</label>
                                                {/* <br/>
                                                <Box>
                                                    <Typography variant="h4">{carName}</Typography>
                                                </Box> */}
                                            </Grid>

                                            <Grid item xs={2} sx={{height: "40px"}}>
                                                <label className={styles.label}>Số lượng</label>
                                                {/* <br/>
                                                <Box>
                                                    <Typography variant="h4">{soluongxe}</Typography>
                                                </Box> */}
                                            </Grid>
                                            <Grid item xs={3.3} sx={{height: "40px"}}>
                                                <label className={styles.label}>Đơn giá</label>
                                                {/* <br/>
                                                <Box>
                                                    <Typography variant="h4">{soluongxe}</Typography>
                                                </Box> */}
                                            </Grid>
                                            {carArrayDisplay?.map((item, index) => (
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
                                                    <Item>{item.dongia}</Item>
                                                </Grid>
                                            </Grid>))}
                                            <Grid item xs={12} sx={{height: "93px"}}>
                                                <label className={styles.label}>Tổng tiền</label>
                                                <br/>
                                                <Box>
                                                    <Typography variant="h4">{tongtien}</Typography>
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
                                        setTriGia(null) 
                                        setCarName("") 
                                        setSoLuongXe(0)
                                        setTongTien(0)
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
                                    <Item>{"Mã nhân viên: " + updateInvoice.hoadon.manv}</Item>
                                    <Item>{"Mã đơn hàng " + updateInvoice.hoadon.mahd}</Item>
                                    <Item>{"Tình trạng: " + updateInvoice.hoadon.tinhtrang}</Item>
                                    <Item>{"Ngày lập hóa đơn: " + updateInvoice.hoadon.ngayhd}</Item>
                                    <Item>{"Trị giá: " + updateInvoice.hoadon.trigia}</Item>
                                    </div>
                                </Grid>
                                <Grid item xs={7.5}>
                                    <Grid container>
                                    <Grid item xs={2} sx={{height: "40px"}}>
                                        <label className={styles.label}>STT</label>
                                    </Grid>
                                    <Grid item xs={4.7} sx={{height: "40px"}}>
                                        <label className={styles.label}>Tên xe</label>
                                        {/* <br/>
                                        <Box>
                                            <Typography variant="h4">{carName}</Typography>
                                        </Box> */}
                                    </Grid>

                                    <Grid item xs={2} sx={{height: "40px"}}>
                                        <label className={styles.label}>Số lượng</label>
                                        {/* <br/>
                                        <Box>
                                            <Typography variant="h4">{soluongxe}</Typography>
                                        </Box> */}
                                    </Grid>
                                    <Grid item xs={3.3} sx={{height: "40px"}}>
                                        <label className={styles.label}>Đơn giá</label>
                                        {/* <br/>
                                        <Box>
                                            <Typography variant="h4">{soluongxe}</Typography>
                                        </Box> */}
                                    </Grid>
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
                                                <Item>0</Item>
                                                </Grid>
                                            </Grid>))}
                                            <Grid item xs={12} sx={{height: "93px"}}>
                                                <label className={styles.label}>Tổng tiền</label>
                                                <br/>
                                                <Box>
                                                    <Typography variant="h4">{updateInvoice.hoadon.trigia}</Typography>
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
