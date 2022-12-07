import styles from "./CustomerManagement.module.css";
import "./CustomerManagement.css";

import { styled } from "@mui/material/styles";
import {
    Add,
    Search,
    Edit,
    ErrorOutline,
    DeleteOutline,
    Cancel,
} from "@mui/icons-material";
import { useState, useEffect, memo, useRef } from "react";
import {
    IconButton,
    Modal,
    Button,
    Grid,
    Box,
    Typography,
    Paper,
    Stack,
    Pagination
} from "@mui/material";

import CustomerPopUp from "../CustomerPopUp";
import HandleApi from "../../../../Apis/HandleApi";
import HandleApisCustomer from "../../../../Apis/HandleApisCustomer";
import Swal from "sweetalert2";

function CarManagement() {
    const [data, setData] = useState([]);
    const [dataLength, setDataLength] = useState();
    const [searchValue, setSearchValue] = useState("");// gia tri search value
    const [pageIndex, setPageIndex] = useState(0);
    const [type, setType] = useState("");
    const [updateCustomer, setUpdateCustomer] = useState({});
    const [Id, setId] = useState(0);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    

    const inputRef = useRef();
    const gridColumn = [0.5, 0.9, 2, 1.5, 1.8, 2.5, 1.5, 1];
    const gridTitle = [
        "STT",
        "Mã KH",
        "Họ và tên",
        "Số điện thoại",
        "Email",
        "Địa chỉ",
        "CCCD",
        ""
    ];
    const pageSize = 10;

    // Get API


    useEffect(() => {
        HandleApisCustomer.getCustomerByPageIndex(pageIndex).then((res) => {
            setData(res.customers);
            setDataLength(res.totalCustomers);
        });
    }, [pageIndex]);
    // handle event



    const handlePageChange = (e, p) => {
        setPageIndex(p - 1);
    };
    const handleDeleteItem = async (id) => {
        HandleApisCustomer.deleteCustomer(id)
            .then((res) => {
                console.log(id);
                setOpenDeleteModal(false);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Xóa dữ liệu nhân viên thành công!",
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
                    title: "Xóa bài viết thất bại!",
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    };



    //Update
    const handleClickUpdate = async (id) => {
        console.log(id);
        HandleApisCustomer.getCustomerById(id)
            .then(async (res) => {
                await setUpdateCustomer(res);
                await setType("update");
                console.log(updateCustomer);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    // Read Info
    const handleReadInfo = async (id) => {
        HandleApisCustomer.getCustomerById(id)
            .then(async (res) => {
                await setUpdateCustomer(res);
                await setType("read");
                console.log(updateCustomer);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    // handle search function
    useEffect(() => {
        console.log(searchValue);
        if (searchValue.trim() !== "") {
            HandleApisCustomer.getCustomerByName(searchValue).then(async (res) => {
                await setData(res.customers);
                await setDataLength(data.length);
            });
        } else {
            HandleApisCustomer.getCustomerByPageIndex().then((res) => {
                setData(res.customers);
                setDataLength(res.totalCustomers);
            });
        }
    }, [searchValue]);

    const handleInputChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleClear = () => {
        setSearchValue("");
        inputRef.current.focus();
    };



    ////////////// Custome CSS MUI
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
    return (
        <div>
            <header className={styles.header}>
                <h1 className={styles.header_heading}>Quản lý khách hàng</h1>
            </header>
            <div className={styles.container}>
                <div className={styles.container_header}>
                    <div className={styles.funcContainer}>
                        <div className={styles.search}>
                            <input
                                ref={inputRef}
                                value={searchValue}
                                type="text"
                                placeholder="Tìm kiếm khách hàng"
                                spellCheck={false}
                                onChange={handleInputChange}
                            />

                            {!!searchValue && (
                                <button
                                    className={styles.clear}
                                    onClick={handleClear}
                                >
                                    <Cancel className={styles.clearIcon} />
                                </button>
                            )}

                            <button
                                className={styles.searchBtn}
                                onMouseDown={(e) => e.preventDefault()}
                            >
                                <Search className={styles.searchIcon} />
                            </button>
                        </div>
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
                        Thêm khách hàng 
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
                        {data?.map((item, index) => (
                            <Grid container key={index}>
                                <Grid item xs={0.5}>
                                    <Item>{index + 1}</Item>
                                </Grid>
                                <Grid item xs={0.9}>
                                    <Item>
                                        {item.mauser}
                                    </Item>
                                </Grid>
                                <Grid item xs={2}>
                                    <Item>{item.name}</Item>
                                </Grid>
                                <Grid item xs={1.5}>
                                    <Item>{item.sdt}</Item>
                                </Grid>
                                <Grid item xs={1.8}>
                                    <Item>{item.email}</Item>
                                </Grid>
                                <Grid item xs={2.5}>
                                    <Item>{item.diachi}</Item>
                                </Grid>
                                <Grid item xs={1.5}>
                                    <Item>{item.cccd}</Item>
                                </Grid>
                                <Grid item xs={1}>
                                    {/* Update, delete button */}
                                    <Item>
                                    <Button variant="outlined" size="small" sx={{ fontSize: "10px",          marginRight: "12px" }}
                                            onClick={() => handleReadInfo(item._id)} >Chi tiết</Button>
                                        <IconButton
                                            color="primary"
                                            size="medium"
                                            onClick={() => {
                                                handleClickUpdate(item._id);
                                            }}
                                        >
                                            <Edit sx={{ fontSize: "22px" }} />
                                        </IconButton>

                                        <IconButton
                                            size="medium"
                                            color="error"
                                            onClick={() => {
                                                console.log(item._id);
                                                setOpenDeleteModal(true);
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
                                                    Bạn có chắc chắn muốn xóa dữ
                                                    liệu khách hàng này?
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
            <CustomerPopUp
                type={type !== "" ? type : ""}
                setType={setType}
                updateCustomer={updateCustomer}
                setUpdateCustomer={setUpdateCustomer}
            />
        </div>
    );
}

export default memo(CarManagement);
