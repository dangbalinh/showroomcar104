import { useState, useEffect, memo, useRef } from "react";
import styles from "./EmployeeManagement.module.css";
import "./EmployeeManagement.css";
import HandleApiEmployee from "../../../../Apis/HandleApiEmployee";

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

    const gridColumn = [1, 1, 2, 1, 2, 2, 3];
    const gridTitle = [
        "STT",
        "Mã NV",
        "Tên nhân viên",
        "Giới tính",
        "SĐT",
        "CCCD",
        ""
    ];

    const pageSize = 15;

    // Get API
    useEffect(() => {
        HandleApiEmployee.getEmployeeByPageIndex(pageIndex)
        .then((res) => {
            setData(res.employees);
            setDataLength(res.totalEmployees);
        });
    }, [pageIndex]);

    //Function hanlde Delete
    const handleDeleteItem = async (id) => {
        HandleApiEmployee.deleteEmployee(id)
            .then((res) => {
                console.log(id);
                setOpenDeleteModal(false);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Xóa dữ liệu nhân viên thành công!",
                    showConfirmButton: false,
                    timer: 500
                });
                setData(data.filter((item) => item._id !== id));
            })
            .catch((err) => {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Xóa thất bại!",
                    showConfirmButton: false,
                    timer: 500
                });
            });
    };
    
  //Function hanlde Update
    const handleClickUpdate = async (id) => {
        console.log(id);
        HandleApiEmployee.getEmployeeById(id)
            .then(async (res) => {
                await setUpdateEmployee(res);
                await setType("update");
                console.log(updateEmployee);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    //Function hanlde Read
    const handleReadInfo = async (id) => {
        HandleApiEmployee.getEmployeeById(id)
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

    // Handle search event
    useEffect(() => {
        console.log(searchValue);
        if (searchValue.trim() !== "") {
            HandleApiEmployee.getEmployeeBySearch(searchValue.toUpperCase())
            .then(async (res) => {
                await setData(res.employees);
                await setDataLength(data.length);
            });
        } else {
            HandleApiEmployee.getEmployeeByPageIndex(pageIndex)
            .then((res) => {
                setData(res.employees);
                setDataLength(res.totalEmployees);
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
                                placeholder="Tìm kiếm nhân viên..."
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
                                <Grid item xs={1}>
                                    <Item>{index + 1}</Item>
                                </Grid>
                                <Grid item xs={1}>
                                    <Item>{item.mauser}</Item>
                                </Grid>
                                <Grid item xs={2}>
                                    <Item>{item.name}</Item>
                                </Grid>
                                <Grid item xs={1}>
                                    <Item>{item.gioitinh}</Item>
                                </Grid>
                                <Grid item xs={2}>
                                    <Item>{` 0${item.sdt}`}</Item>
                                </Grid>
                                <Grid item xs={2}>
                                    <Item>{item.cccd}</Item>
                                </Grid>
                               
                                <Grid item xs={3}>
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
                                                    liệu nhân viên này?
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
