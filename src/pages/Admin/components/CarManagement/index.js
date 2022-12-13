import images from "../../../../assets/image";
import styles from "./CarManagement.module.css";
import "./CarManagement.css";

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
    Pagination,
} from "@mui/material";

import CarPopUp from "../CarPopUp";
import HandleApi from "../../../../Apis/HandleApi";
import Swal from "sweetalert2";

function CarManagement() {
    const [typeCar, setTypeCar] = useState("All");
    const [data, setData] = useState([]);
    const [dataLength, setDataLength] = useState();
    const [pageIndex, setPageIndex] = useState(0);
    const [searchValue, setSearchValue] = useState("");
    const [newData, setNewData] = useState([]);
    const [type, setType] = useState("");
    const [updateCar, setUpdateCar] = useState({});
    const [Id, setId] = useState(0);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    let user = JSON.parse(localStorage.getItem("user"));
    const inputRef = useRef();

    const gridColumn = [0.5, 0.9, 0.8, 1.8, 1.6, 1.8, 1.5, 1.2, 1.9];
    const gridTitle = [
        "STT",
        "Ảnh",
        "Mã xe",
        "Tên xe",
        "Thương hiệu",
        "Giá",
        "Số chỗ ngồi",
        "Số lượng",
        "",
    ];

    const valueSelect = [
        "Honda",
        "Toyota",
        "Vinfast",
        "Mercedes",
        "BMW",
        "Ford",
        "Kia",
        "Hyundai",
    ];

    const pageSize = 15;

    // Get API
    useEffect(() => {
        if (typeCar === "All") {
            HandleApi.getCarByPageIndex(pageIndex).then((res) => {
                setData(res.cars);
                setNewData(res.cars);
                setDataLength(res.totalCarsFilter);
            });
        } else {
            HandleApi.getCarByPageIndexBrand(typeCar, pageIndex).then((res) => {
                setData(res.cars);
                setNewData(res.cars);
                setDataLength(res.totalCarsFilter);
            });
        }
    }, [pageIndex, typeCar]);

    useEffect(() => {
        HandleApi.getCarByPageIndex(0).then((res) => {
            setData(res.cars);
            setNewData(res.cars);
            setDataLength(res.totalCarsFilter);
        });
    }, []);

    // handle Filter select
    useEffect(() => {
        // switch (typeCar) {
        //     case "All":
        //         setNewData(data);
        //         HandleApi.getAllCar().then((res) => {
        //             setDataLength(res.totalCarsFilter);
        //         });
        //         break;
        //     // case "All":
        //     //     HandleApi.getCarByPageIndex(pageIndex).then((res) => {
        //     //         setNewData(res.cars);
        //     //         setDataLength(res.totalCars);
        //     //     });
        //     //     break;
        //     case "Honda":
        //         HandleApi.getCarByBrand("Honda").then((res) => {
        //             setNewData(res.cars);
        //             setDataLength(res.totalCarsFilter);
        //         });
        //         break;
        //     case "Toyota":
        //         HandleApi.getCarByBrand("Toyota").then((res) => {
        //             setNewData(res.cars);
        //             setDataLength(res.totalCarsFilter);
        //         });
        //         break;
        //     case "Mercedes":
        //         HandleApi.getCarByBrand("Mercedes").then((res) => {
        //             setNewData(res.cars);
        //             setDataLength(res.totalCarsFilter);
        //         });
        //         break;
        //     case "Vinfast":
        //         HandleApi.getCarByBrand("Vinfast").then((res) => {
        //             setNewData(res.cars);
        //             setDataLength(res.totalCarsFilter);
        //         });
        //         break;
        //     case "Kia":
        //         HandleApi.getCarByBrand("Kia").then((res) => {
        //             setNewData(res.cars);
        //             setDataLength(res.totalCarsFilter);
        //         });
        //         break;
        //     case "BMW":
        //         HandleApi.getCarByBrand("BMW").then((res) => {
        //             setNewData(res.cars);
        //             setDataLength(res.totalCarsFilter);
        //         });
        //         break;
        //     case "Ford":
        //         HandleApi.getCarByBrand("Ford").then((res) => {
        //             setNewData(res.cars);
        //             setDataLength(res.totalCarsFilter);
        //         });
        //         break;
        //     case "Hyundai":
        //         HandleApi.getCarByBrand("Hyundai").then((res) => {
        //             setNewData(res.cars);
        //             setDataLength(res.totalCarsFilter);
        //         });
        //         break;
        //     default:
        //         break;
        // }
        if (typeCar !== "All") {
            setNewData(
                data.filter((item) => {
                    return item.thuonghieu == typeCar;
                })
            );
            setPageIndex(0);
        }
        else setNewData(data);
        if (searchValue.trim() !== "") {
            HandleApi.getCarByName(searchValue.trim()).then(async (res) => {
                await setNewData(res.cars);
                await setDataLength(res.totalCarsFilter);
            });
        }
        setPageIndex(0);
        console.log("page: ", pageIndex);
    }, [typeCar, searchValue]);

    // handle event
    // const handleChange = (event) => {
    //     setTypeCar(event.target.value);
    // };

    const handleChange = (e) => {
        if (e.target.value !== "Tất cả") setTypeCar(e.target.value);
        else {
            setTypeCar(e.target.value);
        }
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
                    timer: 1500,
                });
                console.log(data);
                setNewData(data.filter((item) => item._id !== id));
            })
            .catch((err) => {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Xóa bài viết thất bại!",
                    showConfirmButton: false,
                    timer: 1500,
                });
            });
    };

    const handleClickUpdate = async (id) => {
        console.log(id);
        HandleApi.getCarById(id)
            .then(async (res) => {
                await setUpdateCar(res);
                await setType("update");
                console.log(updateCar);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleReadInfo = async (id) => {
        HandleApi.getCarById(id)
            .then(async (res) => {
                await setUpdateCar(res);
                await setType("read");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handlePageChange = (e, p) => {
        console.log("PageIndex: ", p);
        setPageIndex(p - 1);
    };

    // handle search event
    // useEffect(() => {
    //     if (searchValue.trim() !== "") {
    //         HandleApi.getCarByName(searchValue).then(async (res) => {
    //             await setData(res.cars);
    //             await setDataLength(res.totalCarsFilter);
    //         });
    //     } else {
    //         HandleApi.getCarByPageIndex(pageIndex).then((res) => {
    //             setData(res.cars);
    //             setDataLength(res.totalCars);
    //         });
    //     }
    // }, [searchValue]);
    // console.log("length: ", dataLength);

    const handleInputChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleClear = () => {
        setSearchValue("");
        inputRef.current.focus();
    };

    // const handleErrorInform = () => {
    //     Swal.fire({
    //         position: "center",
    //         icon: "error",
    //         title: "Bạn không có quyền thêm, xóa, sửa dữ liệu!",
    //         showConfirmButton: true,
    //         timer: 3000,
    //     });
    // };

    // const handleClickDelete = (id) => {
    //     setOpenDeleteModal(true);
    //     setId(id);
    // };

    // Custome CSS MUI
    const ItemMain = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        padding: theme.spacing(1),
        textAlign: "center",
        color: "#000",
        boxShadow: "none",
        fontSize: 18,
        fontWeight: "600",
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
        p: 8,
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

    // const nameActive = {
    //     "cursor": 'pointer',
    //     "&:active": {
    //         color: 'red',
    //     }
    // }
    const currentPost = newData.slice(pageIndex * 15 - 15, pageIndex * 15);

    return (
        <div>
            <header className={styles.header}>
                <img
                    src={images.bmwImg}
                    className={styles.header_image}
                    alt="Header img"
                />
                <h1 className={styles.header_heading}>Quản lý ô tô</h1>
            </header>
            <div className={styles.container}>
                <div className={styles.container_header}>
                    <div className={styles.funcContainer}>
                        <div className={styles.search}>
                            <input
                                ref={inputRef}
                                value={searchValue}
                                type="text"
                                placeholder="Tìm kiếm xe"
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
                                sx={{
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    left: "10px",
                                }}
                                id="input-label"
                            >
                                Hãng xe
                            </InputLabel>
                            <Select
                                className={styles.filter_wrap}
                                labelId="input--"
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

                    {user.role !== "employee" ? (
                        <Button
                            sx={{
                                height: 40,
                                fontSize: 14,
                                textTransform: "none",
                                marginLeft: "80px",
                            }}
                            variant="contained"
                            color="success"
                            startIcon={<Add />}
                            onClick={() => {
                                setType("create");
                            }}
                        >
                            Thêm sản phẩm
                        </Button>
                    ) : (
                        ""
                    )}
                </div>

                <div className={styles.content}>
                    <Box sx={{ flexGrow: 1, padding: "0 12px" }}>
                        <Grid container sx={{ padding: "0 0 8px" }}>
                            {gridTitle.map((title, index) => (
                                <Grid item xs={gridColumn[index]} key={index}>
                                    <ItemMain>{title}</ItemMain>
                                </Grid>
                            ))}
                        </Grid>
                        {/* Render data */}
                        {/* newData */}
                        {newData?.map((item, index) => (
                            <Grid container key={index}>
                                <Grid item xs={0.5}>
                                    <Item>{index + 1}</Item>
                                </Grid>
                                <Grid item xs={0.9}>
                                    <Item>
                                        <img
                                            src={item.hinhanh}
                                            className={styles.content_image}
                                            alt="Car"
                                        />
                                    </Item>
                                </Grid>
                                <Grid item xs={0.8}>
                                    <Item>{item.macar}</Item>
                                </Grid>
                                <Grid item xs={1.8}>
                                    <Item>{item.ten}</Item>
                                </Grid>
                                <Grid item xs={1.6}>
                                    <Item>{item.thuonghieu}</Item>
                                </Grid>
                                <Grid item xs={1.8}>
                                    <Item>
                                        {item.gia.toLocaleString() + " VNĐ"}
                                    </Item>
                                </Grid>
                                {/* <Grid item xs={2.4}>
                                    <Item>{item.dongco}</Item>
                                </Grid> */}
                                <Grid item xs={1.5}>
                                    <Item>{item.socho}</Item>
                                </Grid>
                                <Grid item xs={1.2}>
                                    <Item>{item.soluong}</Item>
                                </Grid>
                                <Grid item xs={1.9}>
                                    {/* Update, delete button */}
                                    <Item>
                                        <Button
                                            variant="outlined"
                                            size="large"
                                            sx={{
                                                fontSize: "10px",
                                                marginRight: "12px",
                                            }}
                                            onClick={() =>
                                                handleReadInfo(item._id)
                                            }
                                        >
                                            Chi tiết
                                        </Button>
                                        {user.role !== "employee" ? (
                                            <IconButton
                                                color="primary"
                                                size="medium"
                                                sx={{ padding: "8px 6px" }}
                                                onClick={() => {
                                                    handleClickUpdate(item._id);
                                                }}
                                            >
                                                <Edit
                                                    sx={{ fontSize: "22px" }}
                                                />
                                            </IconButton>
                                        ) : (
                                            ""
                                        )}

                                        {user.role !== "employee" ? (
                                            <IconButton
                                                size="medium"
                                                color="error"
                                                onClick={() => {
                                                    setOpenDeleteModal(true);
                                                    setId(item._id);
                                                }}
                                                // onClick={() => {
                                                //     handleClickDelete(item._id);
                                                // }}
                                            >
                                                <DeleteOutline
                                                    sx={{ fontSize: "22px" }}
                                                />
                                            </IconButton>
                                        ) : (
                                            ""
                                        )}
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
                                                            marginRight: "12px",
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
                                                            width: "70px",
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
            <CarPopUp
                type={type !== "" ? type : ""}
                setType={setType}
                updateCar={updateCar}
                setUpdateCar={setUpdateCar}
            />
        </div>
    );
}

export default memo(CarManagement);
