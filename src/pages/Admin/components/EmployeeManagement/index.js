import { useState, useEffect, memo, useRef } from "react";
import styles from "./EmployeeManagement.module.css";
import "./EmployeeManagement.css";
import HandleApi from "../../../../Apis/HandleApi";

import { styled } from "@mui/material/styles";
import {
    Add,
    Search,
    Edit,
    ErrorOutline,
    DeleteOutline,
    Cancel,
} from "@mui/icons-material";
import {
    IconButton,
    Modal,
    Button,
    Grid,
    Paper,
    Box,
    Typography,
    Stack,
    Pagination
} from "@mui/material";

import EmployeePopUp from "../EmployeePopUp";
import Swal from "sweetalert2";

function EmployeeManagement() {
    const [data, setData] = useState([]);
    const [dataLength, setDataLength] = useState();
    const [pageIndex, setPageIndex] = useState(0);
    const [searchValue, setSearchValue] = useState("");
    const [type, setType] = useState("");
    const [updateEmployee, setUpdateEmployee] = useState({});
    const [Id, setId] = useState(0);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const inputRef = useRef();

    const gridColumn = [0.5, 0.9, 2, 1, 1.6, 1.2, 1.5, 1.2, 2];
    const gridTitle = [
        "STT",
        "Ảnh",
        "Tên nhân viên",
        "Giới tính",
        "Ngày sinh",
        "SĐT",
        "Địa chỉ",
        "CCCD",
        ""
    ];

    const pageSize = 3;

    // Get API
    useEffect(() => {
        HandleApi.getCarByPageIndex(pageIndex).then((res) => {
            setData(res.cars);
            setDataLength(res.totalCars);
        });
    }, [pageIndex]);


    const handleDeleteItem = async (id) => {
        HandleApi.deleteCar(id)
            .then((res) => {
                console.log(id);
                setOpenDeleteModal(false);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Xóa dữ liệu xe thành công!",
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

    const handleClickUpdate = async (id) => {
        console.log(id);
        HandleApi.getCarById(id)
            .then(async (res) => {
                await setUpdateEmployee(res);
                await setType("update");
                console.log(updateEmployee);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleReadInfo = async (id) => {
        HandleApi.getCarById(id)
            .then(async (res) => {
                await setUpdateEmployee(res);
                await setType("read");
                console.log(updateEmployee);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handlePageChange = (e, p) => {
        setPageIndex(p - 1);
    };

    // handle search event
    useEffect(() => {
        console.log(searchValue);
        if (searchValue.trim() !== "") {
            HandleApi.getCarByName(searchValue).then(async (res) => {
                await setData(res.cars);
                await setDataLength(data.length);
            });
        } else {
            HandleApi.getCarByPageIndex(pageIndex).then((res) => {
                setData(res.cars);
                setDataLength(res.totalCars);
            });
        }
    }, [searchValue]);

    const handleInputChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSearch = async () => {
        if (searchValue.trim() !== "") {
            HandleApi.getCarByName(searchValue).then(async (res) => {
                await setData(res.cars);
                await setDataLength(data.length);
            });
        }
    };

    const handleClear = () => {
        setSearchValue("");
        inputRef.current.focus();
    };

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
        fontSize: 16,
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
                <h1 className={styles.header_heading}>Quản lý nhân viên</h1>
            </header>

            <div className={styles.container}>
                <div className={styles.container_header}>
                    <div className={styles.funcContainer}>
                        <div className={styles.search}>
                            <input
                                ref={inputRef}
                                value={searchValue}
                                type="text"
                                placeholder="Tìm kiếm nhân viên"
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
                        Thêm nhân viên
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
                                        <img src={item.hinhanh} className={styles.content_image} alt="EmployeeImg"/>
                                    </Item>
                                </Grid>
                                <Grid item xs={2}>
                                    <Item>{item.ten}</Item>
                                </Grid>
                                <Grid item xs={1}>
                                    <Item>{item.thuonghieu}</Item>
                                </Grid>
                                <Grid item xs={1.6}>
                                    <Item>{item.gia.toLocaleString() + " VNĐ"}</Item>
                                </Grid>
                                <Grid item xs={1.2}>
                                    <Item>{item.dungtich}</Item>
                                </Grid>
                                <Grid item xs={1.5}>
                                    <Item>{item.socho}</Item>
                                </Grid>
                                <Grid item xs={1.2}>
                                    <Item>{item.soluong}</Item>
                                </Grid>
                                <Grid item xs={2}>
                                    {/* Update, delete button */}
                                    <Item>
                                        <Button variant="outlined" size="small" sx={{ fontSize: "10px", marginRight: "12px" }}
                                            onClick={() => handleReadInfo(item._id)} >Chi tiết</Button>
                                        <IconButton
                                            color="primary"
                                            size="medium"
                                            sx={{ padding: "8px 6px" }}
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
                                                    liệu xe này?
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
                                                        color="primary"
                                                        onClick={() =>
                                                            handleDeleteItem(Id)
                                                        }
                                                        sx={{
                                                            fontSize: "14px",
                                                            marginRight: "12px"
                                                        }}
                                                    >
                                                        Đồng ý
                                                    </Button>

                                                    <Button
                                                        variant="contained"
                                                        color="error"
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
            <EmployeePopUp
                type={type !== "" ? type : ""}
                setType={setType}
                updateEmployee={updateEmployee}
                setUpdateEmployee={setUpdateEmployee}
            />
        </div>
    );
}

export default memo(EmployeeManagement);
