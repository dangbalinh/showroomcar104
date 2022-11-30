import images from "../../../../assets/image";
import styles from "./FormManagement.module.css";
import "./FormManagement.css";

import { styled } from "@mui/material/styles";
import {
    Add,
    Search,
    Edit,
    ErrorOutline,
    DeleteOutline,
    Cancel,
    RestartAlt
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

import FormPopUp from "../FormPopUp"
import HandleApi from "../../../../Apis/HandleApi";
import Swal from "sweetalert2";

function FormManagement() {
    const [typeCar, setTypeCar] = useState("All");
    const [data, setData] = useState([]);
    const [dataLength, setDataLength] = useState();
    const [pageIndex, setPageIndex] = useState(0);
    const [searchValue, setSearchValue] = useState("");
    const [newData, setNewData] = useState([]);
    const [type, setType] = useState("");
    const [updatePost, setUpdatePost] = useState({});
    const [Id, setId] = useState(0);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const inputRef = useRef();

    const gridColumn = [1, 2, 1.5, 2, 4.5, 1];
    const gridTitle = [
        "STT",
        "Họ tên",
        "SĐT",
        "Email",
        "Tin nhắn",
        ""
    ];

    const valueSelect = [
        "Honda",
        "Toyota",
        "Vinfast",
        "Mercedes",
        "BMW",
        "Kia"
    ];

    const pageSize = 15;

    // Get API
    useEffect(() => {
        HandleApi.getCarByPageIndex(pageIndex).then((res) => {
            setData(res.cars);
            setDataLength(res.totalCars);
        });
    }, [pageIndex]);

    // handle Filter select
    useEffect(() => {
        switch (typeCar) {
            case "All":
                setNewData(data);
                HandleApi.getAllCar().then((res) =>
                    setDataLength(res.totalCars)
                );
                break;
            case "Honda":
                HandleApi.getCarByBrand("Honda").then((res) => {
                    setNewData(res.cars)
                    setDataLength(res.totalCarsFilter)
                });
                break;
            case "Toyota":
                HandleApi.getCarByBrand("Toyota").then((res) => {
                    setNewData(res.cars)
                    setDataLength(res.totalCarsFilter)
                });
                break;
            case "Mercedes":
                HandleApi.getCarByBrand("Mercedes").then((res) => {
                    setNewData(res.cars)
                    setDataLength(res.totalCarsFilter)
                });
                break;
            case "Vinfast":
                HandleApi.getCarByBrand("Vinfast").then((res) => {
                    setNewData(res.cars)
                    setDataLength(res.totalCarsFilter)
                });
                break;
            case "Kia":
                HandleApi.getCarByBrand("Kia").then((res) => {
                    setNewData(res.cars)
                    setDataLength(res.totalCarsFilter)
                });
                break;
            case "BMW":
                HandleApi.getCarByBrand("BMW").then((res) => {
                    setNewData(res.cars)
                    setDataLength(res.totalCarsFilter)
                });
                break;
            default:
                break;
        }
    }, [data, typeCar]);

    // handle event
    const handleChange = (event) => {
        setTypeCar(event.target.value);
    };

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
                await setUpdatePost(res);
                await setType("update");
                console.log(updatePost);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handlePageChange = (e, p) => {
        console.log("PageIndex: ", p);
        setPageIndex(p - 1);
    };

    const handleReadInfo = async (id) => {
        HandleApi.getCarById(id)
            .then(async (res) => {
                await setUpdatePost(res);
                await setType("read");
            })
            .catch((err) => {
                console.log(err);
            });
    }

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
        fontSize: 20,
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
                <h1 className={styles.header_heading}>Quản lý Form phản hồi</h1>
            </header>
            <div className={styles.container}>
                <div className={styles.container_header}>
                    <div className={styles.funcContainer}>
                        <div className={styles.search}>
                            <input
                                ref={inputRef}
                                value={searchValue}
                                type="text"
                                placeholder="Tìm kiếm tin tức"
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
                        <FormControl
                            className={styles.filter}
                            sx={{ m: 1, minWidth: 220, height: 44 }}
                            size="medium"
                        >
                            <InputLabel
                                sx={{ fontSize: "14px", fontWeight: "600" }}
                                id="input-label"
                            >
                                Hãng xe
                            </InputLabel>
                            <Select
                                className={styles.filter_wrap}
                                labelId="input-label"
                                label="typecar"
                                defaultValue={typeCar}
                                value={typeCar}
                                MenuProps={MenuSelectProps}
                                onChange={handleChange}
                            >
                                <MenuItem
                                    className={styles.menuItem}
                                    value="All"
                                    selected
                                >
                                    Tất cả
                                </MenuItem>
                                {valueSelect.map((item, index) => (
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
                        Thêm tin tức
                    </Button>
                </div>

                <div className={styles.content}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container>
                            {gridTitle.map((title, index) => (
                                <Grid item xs={gridColumn[index]} key={index}>
                                    <ItemMain>{title}</ItemMain>
                                </Grid>
                            ))}
                        </Grid>

                        {/* Render data */}
                        {newData?.map((item, index) => (
                            <Grid container key={index}>
                                <Grid item xs={1}>
                                    <Item>{index + 1}</Item>
                                </Grid>
                                <Grid item xs={2}>
                                    <Item>
                                        <img
                                            src={item.hinhanh}
                                            className={styles.content_image}
                                            alt="Car"
                                        />
                                    </Item>
                                </Grid>
                                <Grid item xs={1.5}>
                                    <Item>{item.ten}</Item>
                                </Grid>
                                <Grid item xs={2}>
                                    <Item>{item.thuonghieu}</Item>
                                </Grid>
                                <Grid item xs={4.5}>
                                    <Item sx={nameActive} onClick={() => handleReadInfo(item._id)}>{item.gia + " VNĐ"}</Item>
                                </Grid>
                                <Grid item xs={1}>
                                    <Item>
                                        <IconButton
                                            size="medium"
                                            color="error"
                                            onClick={() => {
                                                // handleDeleteItem(item._id)
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
            <FormPopUp
                type={type !== "" ? type : ""}
                setType={setType}
                updatePost={updatePost}
                setUpdatePost={setUpdatePost}
            />
        </div>
    );
}

export default memo(FormManagement);
