import images from "../../../../assets/image";
import styles from "./InvoiceManagement.module.css";
import "./InvoiceManagement.css";

import { styled } from "@mui/material/styles";
import {
    Add,
    Search,
    Edit,
    ErrorOutline,
    DeleteOutline,
    Cancel,
    QuestionMark,
} from "@mui/icons-material";
import { useState, useEffect, memo, useRef } from "react";
import {
    IconButton,
    Modal,
    MenuItem,
    Button,
    Grid,
    Paper,
    Select,
    InputLabel,
    FormControl,
    Box,
    Typography,
    Stack,
    Pagination
} from "@mui/material";

import CarPopUp from "../CarPopUp";
import HandleApiInvoice from "../../../../Apis/HandleApiInvoice";
import Swal from "sweetalert2";
import { red } from "@mui/material/colors";
import NewsPopup from "../NewsPopUp";
import InvoicePopUp from "../InvoicePopUp";

function InvoiceManagement() {
    const [data, setData] = useState([]);
    const [tinhtrang, setTinhTrang] = useState("Tất cả");
    const [dataLength, setDataLength] = useState();
    const [pageIndex, setPageIndex] = useState(0);
    // const [searchValue, setSearchValue] = useState("");
    const [newData, setNewData] = useState([]);
    const [type, setType] = useState("");
    const [updateCar, setUpdateCar] = useState({});
    const [updateInvoice, setUpdateInvoice] = useState()
    const [Id, setId] = useState(0);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const updateData = {
        tinhtrang: "Đã thanh toán"
    }

    const inputRef = useRef();

    const gridColumn = [0.7, 1.6, 1.6, 1.8, 2, 2, 1.2, 1.1];
    const gridTitle = [
        "STT",
        "Mã hóa đơn",
        "Mã nhân viên",
        "Mã khách hàng",
        "Ngày lập hóa đơn",
        "Tình trạng",
        "Trị giá",
        "",
    ];

    const valueSelectN = [
        "Đã thanh toán",
        "Chưa thanh toán",
    ]

    const pageSize = 5;

    //get API
    useEffect(() => {
        HandleApiInvoice.getInvoiceByPageIndex(pageIndex).then((res) => {
            setData(res.hoadons);
            setDataLength(res.totalHoaDon);
        })
    }, [pageIndex]);

    // handle Filter select
    useEffect(() => {
        switch (tinhtrang)
        {
            case "Tất cả":
                setNewData(data);
                HandleApiInvoice.getInvoiceByTinhTrang("").then((res) => {
                setDataLength(res.totalHoaDon)
                });
                break;
            case "Đã thanh toán":
                    HandleApiInvoice.getInvoiceByTinhTrang("Đã thanh toán").then((res) => {
                    setNewData(res.hoadons)
                    setDataLength(res.totalHoaDon)
                });
                break;
            case "Chưa thanh toán":
                HandleApiInvoice.getInvoiceByTinhTrang("Chưa thanh toán").then((res) => {
                    setNewData(res.hoadons)
                    setDataLength(res.totalHoaDon)
                });
                break;
            default:
                break;
        }
    },[data, tinhtrang]);


    //function 
    function isDonDatHang(tinhtrang){
        if(tinhtrang=="Chưa thanh toán")
        return true
        else
        return false
    }

    // handle event
    const handleChange = (event) => {
        setTinhTrang(event.target.value);
    };

    const handleDeleteItem = async (id) => {
        HandleApiInvoice.xoaDonDatHang(id)
            .then((res) => {
                console.log(id);
                setOpenDeleteModal(false);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Xóa đơn đặt hàng thành công!",
                    showConfirmButton: false,
                    timer: 1500
                });
                console.log(data);
                setData(data.filter((item) => item._id !== id));
            })
            .catch((err) => {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Xóa đơn đặt hàng thất bại!",
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    };

    const handleClickUpdate = async (id) => {
        console.log(id);
        HandleApiInvoice.capnhatTinhTrang(id, updateData)
            .then(async (res) => {
                console.log(id);
                setOpenEditModal(false);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Cập nhật đơn đặt hàng thành công! Tình trạng hiện tại: Đã thanh toán!",
                    showConfirmButton: false,
                    timer: 1500
                });
                console.log(data);
                window.location.reload(); 
            })
            .catch((err) => {
                console.log(err);
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Cập nhật tình trạng đơn đặt hàng thất bại!",
                    showConfirmButton: false,
                    timer: 1500
                });
            });
        } ;         
    

    // const handleReadInfo = async (id) => {
    //     HandleApi.getCarById(id)
    //         .then(async (res) => {
    //             await setUpdateCar(res);
    //             await setType("read");
    //             console.log(updateCar);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }

    const handlePageChange = (e, p) => {
        console.log("PageIndex: ", p);
        setPageIndex(p - 1);
    };

    // handle search event
    // useEffect(() => {
    //     console.log(searchValue);
    //     if (searchValue.trim() !== "") {
    //         HandleApi.getCarByName(searchValue).then(async (res) => {
    //             await setData(res.cars);
    //             await setDataLength(data.length);
    //         });
    //     } else {
    //         HandleApi.getCarByPageIndex(pageIndex).then((res) => {
    //             setData(res.cars);
    //             setDataLength(res.totalCars);
    //         });
    //     }
    // }, [searchValue]);

    // const handleInputChange = (e) => {
    //     setSearchValue(e.target.value);
    // };

    // const handleSearch = async () => {
    //     if (searchValue.trim() !== "") {
    //         HandleApi.getCarByName(searchValue).then(async (res) => {
    //             await setData(res.cars);
    //             await setDataLength(data.length);
    //         });
    //     }
    // };

    // const handleClear = () => {
    //     setSearchValue("");
    //     inputRef.current.focus();
    // };

    // Custome CSS MUI
    const ItemMain = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        padding: theme.spacing(1),
        textAlign: "center",
        color: "#000",
        boxShadow: "none",
        fontSize: 18,
        fontWeight: "600"
    }));

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        padding: theme.spacing(1),
        textAlign: "center",
        color: "#000",
        boxShadow: "none",
        fontSize: 16
    }));

    const styleModal = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 8
    };

    const MenuSelectProps = {
        PaperProps: {
            style: {
                maxHeight: 150,
                overflowX: "scroll"
                //   width: 250,
            }
        }
    };

    const nameActive = {
        "cursor": 'pointer',
        "&:active": {
            color: 'red',
        }
    }

    return (
        <div>
            <header className={styles.header}>
                <img
                    src={images.bmwImg}
                    className={styles.header_image}
                    alt="Header img"
                />
                <h1 className={styles.header_heading}>Quản lý hóa đơn</h1>
            </header>
            <div className={styles.container}>
                <div className={styles.container_header}>
                    <div className={styles.funcContainer}>
                        <div className={styles.search}>
                            {/* <input
                                ref={inputRef}
                                value={searchValue}
                                type="text"
                                placeholder="Tìm hóa đơn"
                                spellCheck={false}
                                onChange={handleInputChange}
                            /> */}

                            {/* {!!searchValue && (
                                <button
                                    className={styles.clear}
                                    onClick={handleClear}
                                >
                                    <Cancel className={styles.clearIcon} />
                                </button>
                            )} */}

                            <button
                                className={styles.searchBtn}
                                onMouseDown={(e) => e.preventDefault()}
                            >
                                <Search className={styles.searchIcon} />
                            </button>
                        </div>
                        <FormControl
                            className={styles.filter}
                            sx={{ m: 1, minWidth: 220, height: 44 }}
                            size="medium"
                        >
                            <InputLabel
                                sx={{ fontSize: "14px", fontWeight: "600", left: "10px" }}
                                id="input-label"
                            >
                                Tình trạng
                            </InputLabel>
                            <Select
                                className={styles.filter_wrap}
                                labelId="input--"
                                label="tinhtrang"
                                defaultValue={tinhtrang}
                                value={tinhtrang}
                                MenuProps={MenuSelectProps}
                                onChange={handleChange}
                            >
                                <MenuItem
                                    className={styles.menuItem}
                                    value="Tất cả"
                                    selected
                                >
                                    Tất cả
                                </MenuItem>
                                {valueSelectN.map((item, index) => (
                                    <MenuItem
                                        key={index}
                                        value={item}
                                        className={styles.menuItem}
                                    >
                                        {item}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>

                    <Button
                        sx={{
                            height: 40,
                            fontSize: 14,
                            textTransform: "none",
                            marginLeft: "80px"
                        }}
                        variant="contained"
                        color="success"
                        startIcon={<Add />}
                        onClick={() => setType("create")}
                    >
                        Thêm hóa đơn
                    </Button>
                </div>

                <div className={styles.content}>
                    <Box sx={{ flexGrow: 1, padding: '0 12px' }}>
                        <Grid container sx={{ padding: '0 0 8px' }}>
                            {gridTitle.map((title, index) => (
                                <Grid item xs={gridColumn[index]} key={index}>
                                    <ItemMain>{title}</ItemMain>
                                </Grid>
                            ))}
                        </Grid>

                        {/* Render data */}
                        {newData?.map((item, index) => (
                            <Grid container key={index}>
                                <Grid item xs={0.7}>
                                    <Item>{index + 1}</Item>
                                </Grid>
                                <Grid item xs={1.6}>
                                    <Item>{item.mahd}</Item>
                                </Grid>
                                <Grid item xs={1.6}>
                                    <Item>{item.manv}</Item>
                                </Grid>
                                <Grid item xs={1.8}>
                                    <Item>{item.makh}</Item>
                                </Grid>
                                <Grid item xs={2}>
                                    <Item>{item.ngayhd}</Item>
                                </Grid>
                                <Grid item xs={2}>
                                    <Item>{item.tinhtrang}</Item>
                                </Grid>
                                <Grid item xs={1.2}>
                                    <Item>{item.trigia}</Item>
                                </Grid>
                                <Grid item xs={1.1}>
                                    {/* Update, delete button */}
                                    <Item>
                                        <IconButton
                                            color="primary"
                                            size="medium"
                                            sx={{
                                                width: 35,
                                                height: 34,
                                                borderRadius: "4px",
                                                border: "1px solid #1976D2",
                                                justifyContent: "space-between",
                                                marginLeft: "-24px"
                                            }}
                                            onClick={() => {
                                                console.log(item._id);
                                                setOpenEditModal(isDonDatHang(item.tinhtrang));
                                                setId(item._id);
                                            }}
                                        >
                                            <Edit sx={{ fontSize: "22px" }} />
                                        </IconButton>
                                        <Modal
                                            open={openEditModal}
                                            onClose={() =>
                                                setOpenEditModal(false)
                                            }
                                        >
                                            <Box sx={styleModal}>
                                                <QuestionMark
                                                    className={styles.modalIcon}
                                                />
                                                <Typography
                                                    id="modal-modal-title"
                                                    fontSize="22px"
                                                    fontWeight="600"
                                                    color="#d32f2f"
                                                    textAlign="center"
                                                >
                                                    Hóa đơn này đã được thanh toán phải không?
                                                </Typography>
                                                <Typography
                                                    id="modal-modal-description"
                                                    sx={{ mt: 2, mb: 1 }}
                                                    fontSize="16px"
                                                    textAlign="center"
                                                >
                                                    Sau khi xác nhận sẽ không thể
                                                    hoàn tác!
                                                </Typography>
                                                <div
                                                    className={styles.modalBtn}
                                                >
                                                    <Button
                                                        variant="contained"
                                                        color="success"
                                                        onClick={() =>
                                                            handleClickUpdate(Id)
                                                        }
                                                        sx={{
                                                            fontSize: "14px",
                                                            marginRight: "12px"
                                                        }}
                                                    >
                                                        Đúng vậy
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        color="error"
                                                        onClick={() => {
                                                            setOpenEditModal(
                                                                false
                                                            );
                                                            console.log(Id);
                                                        }}
                                                        sx={{
                                                            fontSize: "14px",
                                                            marginLeft: "12px"
                                                        }}
                                                    >
                                                        Không phải
                                                    </Button>
                                                </div>
                                            </Box>
                                        </Modal>
                                        <IconButton
                                            disabled={!isDonDatHang(item.tinhtrang)}
                                            size="medium"
                                            color="error"
                                            onClick={() => {
                                                console.log(item._id);
                                                setOpenDeleteModal(isDonDatHang(item.tinhtrang));
                                                setId(item._id);
                                            }}
                                        >
                                            <DeleteOutline
                                                sx={{ fontSize: "22px" }}
                                            />
                                        </IconButton>
                                        <Modal
                                            open={openDeleteModal}
                                            onClose={() =>
                                                setOpenDeleteModal(false)
                                            }
                                        >
                                            <Box sx={styleModal}>
                                                <ErrorOutline
                                                    className={styles.modalIcon}
                                                />
                                                <Typography
                                                    id="modal-modal-title"
                                                    fontSize="22px"
                                                    fontWeight="600"
                                                    color="#d32f2f"
                                                    textAlign="center"
                                                >
                                                    Bạn có chắc chắn muốn xóa đơn thanh toán này?
                                                </Typography>
                                                <Typography
                                                    id="modal-modal-description"
                                                    sx={{ mt: 2, mb: 1 }}
                                                    fontSize="16px"
                                                    textAlign="center"
                                                >
                                                    Sau khi xóa sẽ không thể
                                                    hoàn tác!
                                                </Typography>
                                                <div
                                                    className={styles.modalBtn}
                                                >
                                                    <Button
                                                        variant="contained"
                                                        color="error"
                                                        onClick={() =>
                                                            handleDeleteItem(Id)
                                                        }
                                                        sx={{
                                                            fontSize: "14px",
                                                            marginRight: "12px"
                                                        }}
                                                    >
                                                        Xóa luôn
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={() => {
                                                            setOpenDeleteModal(
                                                                false
                                                            );
                                                            console.log(Id);
                                                        }}
                                                        sx={{
                                                            fontSize: "14px",
                                                            width: "70px"
                                                        }}
                                                    >
                                                        Hủy
                                                    </Button>
                                                </div>
                                            </Box>
                                        </Modal>
                                    </Item>
                                </Grid>
                            </Grid>
                        ))}
                    </Box>
                </div>

                <div className={styles.pagination}>
                    <Stack spacing={2}>
                        <Pagination
                            size="large"
                            color="primary"
                            count={Math.ceil(dataLength / pageSize)}
                            showFirstButton
                            showLastButton
                            sx={{ margin: "32px 0 56px" }}
                            onChange={handlePageChange}
                        />
                    </Stack>
                </div>
            </div>
            <InvoicePopUp
                type={type !== "" ? type : ""}
                setType={setType}
                updateInvoice={updateInvoice}
                setUpdateInvoice={setUpdateInvoice}
            />
        </div>
    );
}

export default memo(InvoiceManagement);
