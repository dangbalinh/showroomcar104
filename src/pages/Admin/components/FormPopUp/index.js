import React, { useState, useEffect } from "react";
import styles from "./FormPopUp.module.css";
import './FormPopUp.css'
import CancelIcon from "@mui/icons-material/Cancel";
import Swal from "sweetalert2";
import { Box } from "@mui/system";
import { Grid, Button, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";


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
                                    <Item sx={{ fontWeight: "bold", fontSize: "18px" }}>{"Chi tiết tin nhắn: " + (updatePost.message ? updatePost.message : "") }</Item>
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
                                    margin: "68px -10px -12px 0"
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
