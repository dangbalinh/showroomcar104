import images from "../../../../assets/image";
import styles from "./CarManagement.module.css";
import './CarManagement.css'

import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

import axios from "axios";

import { useState, useEffect } from "react";
import { Checkbox, IconButton } from "@mui/material";

function CarManagement() {
    const [typeCar, setTypeCar] = useState("All");
    const [data, setData] = useState([]);
    const [placeholder, setPlaceholder] = useState("Tìm kiếm...");
    const [newData, setNewData] = useState([]);

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
            }).then(response => setData(response.data));

            // switch (typeCar) {
            //     case "All":
            //         setNewData(data);
            //         break;
            //     case "Honda":
            //         setNewData(
            //             data.filter(item => item.thuonghieu === "Honda")
            //         );
            //         break;
            //     case "Toyota":
            //         setNewData(
            //             data.filter(item => item.thuonghieu === "Toyota")
            //         );
            //         break;
            //     default:
            //         break;
            // }
            // console.log(newData);
            // console.log(data);
        };

        fetchData();
    }, []);

    useEffect(
        () => {
            switch (typeCar) {
                case "All":
                    setNewData(data);
                    break;
                case "Honda":
                    setNewData(
                        data.filter(item => item.thuonghieu === "Honda")
                    );
                    break;
                case "Toyota":
                    setNewData(
                        data.filter(item => item.thuonghieu === "Toyota")
                    );
                    break;
                default:
                    break;
            }
        },
        [data, typeCar]
    );

    // Handle event
    const handleChange = event => {
        setTypeCar(event.target.value);
    };

    const handleCreateItem = e => {};

    const handleDeleteItem = async id => {
        await axios({
            method: "DELETE",
            url: `${fakeAPI}/${id}`
        });
        // .then(res => setData(res.data));
        setData(data.filter(item => item.id !== id));
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
        fontSize: 16
    }));

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
                                    onChange={e =>
                                        setPlaceholder(e.target.value)}
                                />
                            </div>
                            <div className={styles.search_btn}>
                                <SearchIcon className={styles.SearchIcon} />
                            </div>
                        </div>
                        <FormControl
                            className={styles.filter}
                            sx={{ m: 1, minWidth: 120, }}
                            size="medium"
                        >
                            <InputLabel sx={{ fontSize: '14px', fontWeight: '600' }} id="input-label">Hãng xe</InputLabel>
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
                        onClick={handleCreateItem}
                    >
                        Thêm sản phẩm
                    </Button>
                </div>

                <div className={styles.content}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container>
                            {gridTitle.map((title, index) =>
                                <Grid item xs={gridColumn[index]} key={index}>
                                    <ItemMain>
                                        {title}
                                    </ItemMain>
                                </Grid>
                            )}
                        </Grid>

                        {/* Render data */}
                        {newData.map((item, index) =>
                            <Grid container key={index}>
                                <Grid item xs={0.7}>
                                    <Item>
                                        {index + 1}
                                    </Item>
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
                                    <Item>
                                        {item.ten}
                                    </Item>
                                </Grid>
                                <Grid item xs={1.5}>
                                    <Item>
                                        {item.thuonghieu}
                                    </Item>
                                </Grid>
                                <Grid item xs={1.8}>
                                    <Item>
                                        {item.gia + " VNĐ"}
                                    </Item>
                                </Grid>
                                <Grid item xs={2.5}>
                                    <Item>
                                        {item.dongco}
                                    </Item>
                                </Grid>
                                <Grid item xs={1.5}>
                                    <Item>
                                        {item.socho}
                                    </Item>
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
                                        >
                                            <EditIcon sx={{ fontSize: "18px" }} />{" "}
                                            Sửa
                                        </IconButton>
                                        <IconButton
                                            size="medium"
                                            color="error"
                                            onClick={() => {
                                                handleDeleteItem(item.id);
                                            }}
                                        >
                                            <DeleteOutlineIcon
                                                sx={{ fontSize: "22px" }}
                                            />
                                        </IconButton>
                                    </Item>
                                </Grid>
                            </Grid>
                        )}
                    </Box>
                </div>
            </div>
        </div>
    );
}

export default CarManagement;
