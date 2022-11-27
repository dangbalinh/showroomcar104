import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./BlogPopUp.module.css";
import { Link } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";
import Swal from "sweetalert2";
import { Box } from "@mui/system";
import { Grid, Button } from "@mui/material";
import HandleApi from "../../../../Apis/HandleApi";

function BlogPopup({ type, setType, updatePost, setUpdatePost }) {
    const [thumbnail, setThumbnail] = useState();
    const [carName, setCarName] = useState();
    const [brand, setBrand] = useState();
    const [price, setPrice] = useState();
    const [engine, setEngine] = useState();
    const [seat, setSeat] = useState();
    const [power, setPower] = useState();
    const [capacity, setCapacity] = useState();
    const [fuel, setFuel] = useState();
    const [speed, setSpeed] = useState();
    const [origin, setOrigin] = useState();
    const [color, setColor] = useState();
    const [desc, setDesc] = useState();
    const [year, setYear] = useState();
    const [size, setSize] = useState();

    const inputId = [
        "name",
        "thumbnail",
        "brand",
        "price",
        "engine",
        "seat",
        "size",
        "origin",
        "speed",
        "capacity",
        "fuel",
        "power",
        "color",
        "year",
        "desc"
    ];

    const useStateEvent = [
        setCarName,
        setThumbnail,
        setBrand,
        setPrice,
        setEngine,
        setSeat,
        setSize,
        setOrigin,
        setSpeed,
        setCapacity,
        setFuel,
        setPower,
        setColor,
        setYear,
        setDesc
    ];

    const placeHolder = [
        "Nhập tên xe",
        "Nhập hình ảnh",
        "Nhập thương hiệu",
        "Nhập giá xe",
        "Nhập động cơ",
        "Nhập số chỗ ngồi",
        "Nhập kích thước",
        "Nhập nguồn gốc",
        "Nhập tốc độ tối đa",
        "Nhập dung tích",
        "Nhập tiêu hao nhiên liệu",
        "Nhập công suất tối đa",
        "Nhập màu sắc xe",
        "Nhập năm sản xuất",
        "Nhập mô tả"
    ];

    const textValue = [
        "Tên xe",
        "Hình ảnh",
        "Thương hiệu",
        "Giá xe",
        "Động cơ",
        "Số chỗ ngồi",
        "Kích thước",
        "Nguồn gốc",
        "Tốc độ tối đa",
        "Dung tích",
        "Tiêu hao nhiên liệu",
        "Công suất tối đa",
        "Màu sắc",
        "Năm sản xuất",
        "Mô tả"
    ];

    const inputValue = [carName, thumbnail, brand, price, engine, seat, size, origin, speed, capacity, fuel, power, color, year, desc];

    // object data
    const data = {
        ten: carName,
        thuonghieu: brand,
        hinhanh: thumbnail,
        gia: Number(price),
        dongco: engine,
        socho: Number(seat),
        kichthuoc: size,
        nguongoc: origin,
        dungtich: capacity,
        congsuatcucdai: power,
        mausac: color,
        tieuhaonhienlieu: fuel,
        mota: desc,
        namsanxuat: Number(year),
        vantoctoida: speed
    };

    const handleCreatePost = async () => {
        HandleApi.createCar(data)
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
                console.log(err);
            });
    };

    const handleUpdatePost = async () => {
        console.log(updatePost._id);
        HandleApi.updateCar(updatePost._id, data)
            .then(async (res) => {
                await Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Cập nhật dữ liệu thành công!",
                    showConfirmButton: false,
                    timer: 1500
                });
                setUpdatePost({});
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        if (updatePost !== {}) {
            setCarName(updatePost.ten);
            setPrice(updatePost.gia);
            setThumbnail(updatePost.hinhanh);
            setBrand(updatePost.thuonghieu);
            setSeat(updatePost.socho);
            setEngine(updatePost.dongco);
            setPower(updatePost.congsuatcucdai);
            setCapacity(updatePost.dungtich);
            setYear(updatePost.namsanxuat);
            setFuel(updatePost.tieuhaonhienlieu);
            setSize(updatePost.kichthuoc);
            setColor(updatePost.mausac);
            setDesc(updatePost.mota);
            setOrigin(updatePost.nguongoc);
            setSpeed(updatePost.vantoctoida);
        }
    }, [updatePost]);

    return (
        <>
            {type === "create" && (
                <div className={styles.bPopup}>
                    <CancelIcon
                        className={styles.bPopup__close}
                        onClick={() => setType("")}
                    />
                    <h3>Thêm sản phẩm</h3>
                    <br />
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container>
                            {inputId.map((item, index) => (
                                <Grid key={index} item xs={4}>
                                    <label htmlFor={item[index]}>{textValue[index]}</label>
                                    <br />
                                    <input
                                        id={item[index]}
                                        type="text"
                                        placeholder={placeHolder[index]}
                                        onChange={(e) =>
                                            useStateEvent[index](e.target.value)
                                        }
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
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
                            onClick={handleCreatePost}
                        >
                            Thêm dữ liệu
                        </Button>
                        <Button
                            variant="contained"
                            color="warning"
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
                </div>
            )}
            {type === "update" && (
                <div className={styles.bPopup}>
                    <CancelIcon
                        className={styles.bPopup__close}
                        onClick={() => setType("")}
                    />
                    <h3>Cập nhật dữ liệu xe</h3>

                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container>
                        {inputId.map((item, index) => (
                                <Grid key={index} item xs={4}>
                                    <label htmlFor={item[index]}>{textValue[index]}</label>
                                    <br />
                                    <input
                                        id={item[index]}
                                        type="text"
                                        value={inputValue[index]}
                                        onChange={(e) =>
                                            useStateEvent[index](e.target.value)
                                        }
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
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
                            onClick={handleUpdatePost}
                        >
                            Cập nhật
                        </Button>
                        <Button
                            variant="contained"
                            color="warning"
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
                </div>
            )}
        </>
    );
}

export default BlogPopup;
