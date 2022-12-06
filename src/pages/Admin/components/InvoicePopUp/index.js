import { useState } from "react";
import * as React from 'react';
import styles from "./InvoicePopUp.module.css"
import './InvoicePopUp.css'
import CancelIcon from "@mui/icons-material/Cancel";
import Swal from "sweetalert2";
import { styled } from "@mui/material/styles";
import HandleApiInvoice from "../../../../Apis/HandleApiInvoice";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// import { borders } from '@mui/system';
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
    const [datepicker, setdatepicker] = useState(new Date());
    const [ngayhd, setngayhd] = useState(formatDate(new Date()))
    const [tinhtrang, setTinhTrang] = useState("Chưa thanh toán");
    const [trigia, setTriGia] = useState();
    const [maxe, setMaXe] = useState();
    const [soluongxe, setSoLuongXe] = useState(0);

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
            trigia: trigia,  
    },
        cthd: [
            {
                macar: maxe,
                soluong: soluongxe,
            }
        ],
    }


    // const [thumbnail, setThumbnail] = useState();
    const [carName, setCarName] = useState();
    

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
                if(res.cars[0].soluong >= soluongxe)
                {
                    setCarName(res.cars[0].ten)
                    setTriGia(res.cars[0].gia*soluongxe)
                }
                else
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Số lượng xe không đủ",
                    showConfirmButton: false,
                    timer: 1500,
                })
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

    const handleCreateInvoice = async (e) => {
        e.preventDefault();
        // console.log(dataN)
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
    };

    const handleUpdateInvoice = async () => {
        console.log(updateInvoice._id);
        HandleApiInvoice.capnhatTinhTrang(updateInvoice._id, tinhtrang)
            .then(async (res) => {
                await Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Cập nhật dữ liệu thành công!",
                    showConfirmButton: false,
                    timer: 1500
                });
                setUdateInvoice({});
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });
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

    const handleDayChange = (e) => {  
        setdatepicker(e)
        setngayhd(formatDate(e.$d));
        console.log(e)
        console.log("e la ",typeof e,"e.$d la",e.$d)
    }
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
                        <h3>Tạo hóa đơn</h3>
                        <br />
                        <Box sx={{ flexGrow: 1 }}>
                            <form onSubmit={handleCreateInvoice}>
                                <Grid container>
                                    <Grid item xs={8}>
                                    <Box sx={{ borderRight: 1, width: '90%'}}>
                                        <Grid container sx={{ width: "420px", marginTop: "16px"}}>
                                            {    inputIdN.map((item, index) => (
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
                                                    {/* <div>{errorName}</div> */}
                                                </Grid>
                                                ))
                                            }
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
                                            <Grid item xs={6} sx={{height: "93px"}} className={styles.nghdpicker}>
                                                <label className={styles.label}>Ngày lập hóa đơn</label>
                                                <br/>
                                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                                    <Stack spacing={3}>
                                                        <DesktopDatePicker 
                                                            inputFormat="DD/MM/YYYY"
                                                            value={datepicker}
                                                            onChange={handleDayChange}
                                                            renderInput={(params) => <TextField {...params} />}
                                                        />
                                                    </Stack>
                                                </LocalizationProvider>
                                                
                                            </Grid>

                                        </Grid>
                                    </Box>
                                    </Grid>
                                    <Grid item xs={4}>
                                    <Box sx={{ width: '100%'}}>
                                        <Grid container sx={{ width: "100%", marginTop: "16px"}}>
                                            <Grid item xs={12} sx={{height: "93px"}}>
                                                <label className={styles.label}>Tên xe</label>
                                                <br/>
                                                <Box>
                                                    <Typography variant="h4">{carName}</Typography>
                                                </Box>
                                            </Grid>

                                            <Grid item xs={12} sx={{height: "93px"}}>
                                                <label className={styles.label}>Số lượng</label>
                                                <br/>
                                                <Box>
                                                    <Typography variant="h4">{soluongxe}</Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={12} sx={{height: "93px"}}>
                                                <label className={styles.label}>Trị giá</label>
                                                <br/>
                                                <Box>
                                                    <Typography variant="h4">{trigia}</Typography>
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
                                <Grid item xs={12}>
                                    <div className={styles.infor_hoadon}>
                                    <Item sx={{ fontWeight: "bold" }}>{"Mã khách hàng: " + updateInvoice.hoadon.makh}</Item>
                                    <Item>{"Mã nhân viên: " + updateInvoice.hoadon.manv}</Item>
                                    <Item>{"Mã đơn hàng " + updateInvoice.hoadon.mahd}</Item>
                                    <Item>{"Tình trạng: " + updateInvoice.hoadon.tinhtrang}</Item>
                                    <Item>{"Ngày lập hóa đơn: " + updateInvoice.hoadon.ngayhd}</Item>
                                    <Item>{"Trị giá: " + updateInvoice.hoadon.trigia}</Item>
                                    <Item>{"Mã xe: " + updateInvoice.cthds[0].macar}</Item>
                                    <Item>{"Tên xe: " + updateInvoice.cthds[0].tenxe}</Item>
                                    <Item>{"Số lượng xe: " + updateInvoice.cthds[0].soluong}</Item>
                                    </div>
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
export default InvoicePopUp;
