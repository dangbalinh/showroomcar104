import React, { useState, useEffect } from "react";
import styles from "./FormPopUp.module.css";
import './FormPopUp.css'
import CancelIcon from "@mui/icons-material/Cancel";
import Swal from "sweetalert2";
import { Box } from "@mui/system";
import { Grid, Button, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

import HandleApi from "../../../../Apis/HandleApi";

function FormPopup({ type, setType, updatePost, setUpdatePost }) {
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
        "Kích thước (AxBxC)",
        "Nguồn gốc",
        "Tốc độ tối đa (Km/h)",
        "Dung tích (cc)",
        "Tiêu hao nhiên liệu (l/100km)",
        "Công suất tối đa",
        "Màu sắc",
        "Năm sản xuất",
        "Mô tả"
    ];

    const inputType = ["text", "text", "text", "number", "text", "number", "text", "text", "text", "text", "text", "text", "text", "number", "text"];

    const inputValue = [
        carName,
        thumbnail,
        brand,
        price,
        engine,
        seat,
        size,
        origin,
        speed,
        capacity,
        fuel,
        power,
        color,
        year,
        desc
    ];

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

    const handleBlur = (e) => {
        if (e.target.value === "") {
            // setErrorName("Vui lòng nhập dữ liệu ");
            e.target.style.borderColor = "red";
        } else {
            e.target.style.borderColor = "#000";
        }
    };

    const handleCreatePost = async (e) => {
        e.preventDefault();
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
        HandleApi.updatePost(updatePost._id, data)
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


    // CSS MUI GRID ITEM
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
                        <h3>Thêm sản phẩm</h3>
                        <br />
                        <Box sx={{ flexGrow: 1 }}>
                            <form onSubmit={handleCreatePost}>
                                <Grid container>
                                    {inputId.map((item, index) => (
                                        <Grid key={index} item xs={4} sx={{ height: "93px" }}>
                                            <label htmlFor={item[index]} className={styles.label}>
                                                {textValue[index]}
                                            </label>
                                            <br />
                                            <input
                                                id={item[index]}
                                                name={item[index]}
                                                type={inputType[index]}
                                                required
                                                placeholder={placeHolder[index]}
                                                onChange={(e) =>
                                                    useStateEvent[index](
                                                        e.target.value
                                                    )
                                                }
                                                onBlur={handleBlur}
                                            />
                                            {/* <div>{errorName}</div> */}
                                        </Grid>
                                    ))}
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
                                    // onClick={handleCreatePost}
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
                            </form>
                        </Box>
                    </div>

                </div>
            )}
            {type === "update" && (
                <div>
                    <div className={styles.overlay}></div>

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
                                        <label htmlFor={item[index]}>
                                            {textValue[index]}
                                        </label>
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
                        <h3>Tin nhắn</h3>

                        <Box sx={{ flexGrow: 1, marginTop: "24px" }}>
                            <Grid container>
                                <Grid item xs={12}>
                                    {/* <div className={styles.infoCar}> */}
                                    <Item sx={{ fontWeight: "bold" }}>{"Tên xe: " + updatePost.ten}</Item>
                                    {/* </div> */}
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

export default FormPopup;