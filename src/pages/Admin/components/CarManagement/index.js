import images from "../../../../assets/image";
import styles from "./CarManagement.module.css";
import "./CarManagement.css";

import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useState, useEffect, memo } from "react";
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
    Typography
} from "@mui/material";
import HandleApi from "../../../../Apis/HandleApi";
import Swal from "sweetalert2";

import axios from "axios";
import BlogPopUp from "../BlogPopUp";

function CarManagement() {
    const [typeCar, setTypeCar] = useState("All");
    const [data, setData] = useState([]);
    const [placeholder, setPlaceholder] = useState("Tìm kiếm...");
    const [newData, setNewData] = useState([]);
    const [type, setType] = useState("");
    const [updatePost, setUpdatePost] = useState({});
    const [IdDelete, setIdDelete] = useState(-1);

    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const gridColumn = [0.7, 1, 2, 1.5, 1.8, 2.5, 1.5, 1];
    const gridTitle = [
        "STT",
        "Ảnh",
        "Tên xe",
        "Thương hiệu",
        "Giá",
        "Động cơ",
        "Số chỗ ngồi",
        ""
    ];

    const fakeAPI =
        "https://637c281172f3ce38ea9be907.mockapi.io/carapi/products";

    const API = "https://showroomcar104.onrender.com/cars";

    // Get API
    useEffect(() => {
        const fetchData = async () => {
            await axios({
                method: "GET",
                url: fakeAPI
            }).then((response) => setData(response.data));
        };

        fetchData();
        // HandleApi.getAllproducts().then((res) => {
        //     setData(res);
        //     console.log(res);
        //   });
    }, []);

    useEffect(() => {
        switch (typeCar) {
            case "All":
                setNewData(data);
                break;
            case "Honda":
                setNewData(data.filter((item) => item.thuonghieu === "Honda"));
                break;
            case "Toyota":
                setNewData(data.filter((item) => item.thuonghieu === "Toyota"));
                break;
            default:
                break;
        }
    }, [data, typeCar]);

    // Handle event
    const handleChange = (event) => {
        setTypeCar(event.target.value);
    };

    const handleCreateItem = (e) => {};

    const handleDeleteItem = async (id) => {
        await axios({
            method: "DELETE",
            url: `${fakeAPI}/${id}`
        })
            .then((res) => {
                setOpenDeleteModal(false);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Xóa xe thành công!  ",
                    showConfirmButton: false,
                    timer: 1500
                });
                console.log(data);
                setData(data.filter((item) => item.id !== id));
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

    // const handleDeleteItem = async (id) => {
    //     await axios({
    //         method: "DELETE",
    //         url: `${fakeAPI}/${id}`
    //     });
    //             setData(data.filter((item) => item.id !== id));

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
                            <div className={styles.input_wrap}>
                                <input
                                    typeCar="text"
                                    className={styles.input}
                                    placeholder={placeholder}
                                    onChange={(e) =>
                                        setPlaceholder(e.target.value)
                                    }
                                />
                            </div>
                            <div className={styles.search_btn}>
                                <SearchIcon className={styles.SearchIcon} />
                            </div>
                        </div>
                        <FormControl
                            className={styles.filter}
                            sx={{ m: 1, minWidth: 120 }}
                            size="medium"
                        >
                            <InputLabel
                                sx={{ fontSize: "14px", fontWeight: "600" }}
                                id="input-label"
                            >
                                Hãng xe
                            </InputLabel>
                            <Select
                                labelId="input-label"
                                label="typecar"
                                defaultValue={typeCar}
                                className={styles.filter_wrap}
                                value={typeCar}
                                onChange={handleChange}
                            >
                                <MenuItem
                                    className={styles.menuItem}
                                    value="All"
                                    selected
                                >
                                    All
                                </MenuItem>
                                <MenuItem
                                    className={styles.menuItem}
                                    value="Honda"
                                >
                                    Honda
                                </MenuItem>
                                <MenuItem
                                    className={styles.menuItem}
                                    value="Toyota"
                                >
                                    Toyota
                                </MenuItem>
                                <MenuItem
                                    className={styles.menuItem}
                                    value="Kia SUV"
                                >
                                    Kia SUV
                                </MenuItem>
                                <MenuItem
                                    className={styles.menuItem}
                                    value="brand 1"
                                >
                                    Brand 1
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <Button
                        sx={{
                            height: 34,
                            fontSize: 14,
                            textTransform: "none",
                            marginLeft: "80px"
                        }}
                        variant="contained"
                        color="success"
                        startIcon={<AddIcon />}
                        onClick={() => setType("create")}
                    >
                        Thêm sản phẩm
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
                                <Grid item xs={0.7}>
                                    <Item>{index + 1}</Item>
                                </Grid>
                                <Grid item xs={1}>
                                    <Item>
                                        <img
                                            src={item.hinhanh}
                                            className={styles.content_image}
                                            alt="Car"
                                        />
                                    </Item>
                                </Grid>
                                <Grid item xs={2}>
                                    <Item>{item.ten}</Item>
                                </Grid>
                                <Grid item xs={1.5}>
                                    <Item>{item.thuonghieu}</Item>
                                </Grid>
                                <Grid item xs={1.8}>
                                    <Item>{item.gia + " VNĐ"}</Item>
                                </Grid>
                                <Grid item xs={2.5}>
                                    <Item>{item.dongco}</Item>
                                </Grid>
                                <Grid item xs={1.5}>
                                    <Item>{item.socho}</Item>
                                </Grid>
                                <Grid item xs={1}>
                                    <Item>
                                        <IconButton
                                            color="primary"
                                            sx={{
                                                width: 70,
                                                height: 34,
                                                borderRadius: "4px",
                                                border: "1px solid #1976D2",
                                                justifyContent: "space-between",
                                                marginLeft: "-24px"
                                            }}
                                            onClick={() => setType("update")}
                                        >
                                            <EditIcon
                                                sx={{ fontSize: "18px" }}
                                            />{" "}
                                            Sửa
                                        </IconButton>
                                        <IconButton
                                            size="medium"
                                            color="error"
                                            onClick={() => {
                                                // handleDeleteItem(item.id)
                                                console.log(item.id);
                                                setOpenDeleteModal(true);
                                                setIdDelete(item.id);
                                            }}
                                        >
                                            <DeleteOutlineIcon
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
                                                <ErrorOutlineIcon
                                                    className={styles.modalIcon}
                                                />
                                                <Typography
                                                    id="modal-modal-title"
                                                    fontSize="20px"
                                                    fontWeight="600"
                                                    color="#d32f2f"
                                                    textAlign="center"
                                                >
                                                    Bạn có chắc chắn muốn xóa dữ
                                                    liệu xe này?
                                                </Typography>
                                                <Typography
                                                    id="modal-modal-description"
                                                    sx={{ mt: 2 }}
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
                                                            handleDeleteItem(
                                                                IdDelete
                                                            )
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
                                                            console.log(
                                                                IdDelete
                                                            );
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
            </div>
            <BlogPopUp
                type={type !== "" ? type : ""}
                setType={setType}
                updatePost={updatePost}
                setUpdatePost={setUpdatePost}
            />
        </div>
    );
}

export default memo(CarManagement);
