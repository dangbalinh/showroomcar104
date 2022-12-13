import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import style from "../../SearchResult/Search.module.css";
import axios from "axios";
import Pagination from "./Pagination";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {
    MenuItem,
    Select,
    Button,
    // Pagination
} from "@mui/material";
import { TextField } from "@mui/material";
import classes from "../UserInfoPage.module.css";
import Cookies from "js-cookie";

const OrderSide = ({ setDetail }) => {
    const token = Cookies.get("token");
    const gridTitle = ["STT", "ID", "Trị Giá", "Ngày", "Tình trạng", " "];
    const gridColumn = [1, 1, 2, 3, 3, 2];
    /*const filterSuggestions = suggestiondata.filter(dt =>{
              const regex = new RegExp(`${query}`,'gi');
              return dt.ten.match(regex);
            }); */
    const [userData, setUserData] = useState([]);
    const [userDataa, setUserDataa] = useState([]);
    //const [value, setValue] = React.useState(dayjs());
    const [value, setValue] = React.useState("");
    const [pageIndex, setPageIndex] = useState(1);
    const [input, setInput] = useState("");
    const [length, setLength] = useState();
    const [status, setStatus] = useState("all");
    const handleChange = (e) => {
        setInput(e.target.value.toLowerCase());
    };
    /*useEffect(() => {
        if(didMount)
        {var date = new Date(value);
        var finaldate = (parseInt(date.getMonth())<9? ("0" + (0 + date.getMonth() + 1)): (date.getMonth() + 1))  + '-' +  date.getFullYear()
        setfirst(finaldate)}
      }, [value])*/
    const Transform = (temp) => {
        if (temp) {
            var date = new Date(temp);
            var finaldate =
                (parseInt(date.getMonth()) < 9
                    ? "0" + (0 + date.getMonth() + 1)
                    : date.getMonth() + 1) +
                "-" +
                date.getFullYear();
            return finaldate;
        } else return "";
    };
    //useEffect(() => { setDidMount(true) }, [])
    const authAxios = axios.create({
        baseURL: "https://showroomcar104.onrender.com",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const sendRequestSU = async () => {
        const res = await authAxios
            .get(`/users/me`)
            .catch((err) => console.log(err));

        const data = await res.data.hoadons;
        console.log(data);
        return data;
    };
    useEffect(() => {
        sendRequestSU().then((data) => {
            setUserData(data);
            setUserDataa(data);
            setLength(data.length);
          });
          console.log(userData);
    }, []);

    useEffect(() => {
        console.log(status);
        if (status != "all")
            setUserDataa(
                userData.filter((item) => {
                    return item.tinhtrang == status;
                })
            );
        else setUserDataa(userData);
        setUserDataa((prev) =>
            prev.filter((item) => {
                return (
                    item.ngayhd.includes(Transform(value).toString()) &&
                    item.mahd.toLowerCase().includes(input)
                );
            })
        );
        {
            userDataa.map((item, index) => console.log(item.ngayhd));
        }
        setPageIndex(1);
        /*console.log(Math.ceil(userDataa.length/6));
      console.log(value);
      console.log(status);
      console.log(input);*/
    }, [status, input, value]);
    /*useEffect(() => {
      setUserDataa(userDataa.slice(0,6))
    }, [pageIndex])*/
    console.log(pageIndex);
    const handleTest = (e) => {
        /*sendRequestSU()
      .then((data)=>console.log(data))*/
        if (e.target.value !== "Tất cả") setStatus(e.target.value);
        else {
            setStatus(e.target.value);
            console.log(status);
        }
    };
    const handleClear = () => {
        setInput("");
        setStatus("all");
        setValue(0);
    };
    const MenuSelectProps = {
        PaperProps: {
            style: {
                maxHeight: 150,
                overflowX: "scroll",
            },
        },
    };
    const currentPost = userDataa.slice(pageIndex * 6 - 6, pageIndex * 6);
    return (
        <div
            className={classes.OrderSide}
            style={{ width: "100%", height: "500px" }}
        >
            {userData.length !== 0 ? (
                <>
                    <h2>HÓA ĐƠN</h2>
                    <div style={{ textAlign: "end" }}>
                        <button
                            className={classes.ClearButton}
                            onClick={handleClear}
                        >
                            Xóa tất cả lọc
                        </button>
                    </div>
                    <div>
                        <div className={classes.PickStatus}>
                            <input
                                className={classes.input}
                                value={input}
                                type="text"
                                name="name"
                                onChange={handleChange}
                                placeholder="Tìm id hóa đơn..."
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    views={["year", "month"]}
                                    inputFormat="MM-YYYY"
                                    minDate={dayjs("2002-01-01")}
                                    maxDate={dayjs("2024-01-01")}
                                    value={value && value != "" ? value : null}
                                    clearable
                                    emptyLabel="custom label"
                                    onChange={(newValue) => {
                                        setValue(newValue);
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            helperText={null}
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                            <Select
                                className={classes.StatusPicker}
                                style={{ width: "30% !important" }}
                                defaultValue={status}
                                value={status}
                                MenuProps={MenuSelectProps}
                                onChange={handleTest}
                            >
                                <MenuItem
                                    className={classes.menuItem}
                                    value="all"
                                    selected
                                >
                                    Tất cả
                                </MenuItem>
                                <MenuItem
                                    value="Chưa thanh toán"
                                    className={classes.menuItem}
                                >
                                    Chưa thanh toán
                                </MenuItem>
                                <MenuItem
                                    value="Đã thanh toán"
                                    className={classes.menuItem}
                                >
                                    Đã thanh toán
                                </MenuItem>
                            </Select>
                        </div>
                    </div>
                    <Grid
                        container
                        sx={{
                            padding: "0 0",
                            borderRadius: 1,
                            borderBottom: 1,
                        }}
                    >
                        <Grid container sx={{ borderTop: 1, borderRadius: 1 }}>
                            {gridTitle.map((title, index) => (
                                <Grid
                                    item
                                    xs={gridColumn[index]}
                                    key={index}
                                    sx={{ backgroundColor: "#8a0000" }}
                                >
                                    <p
                                        style={{
                                            fontSize: "20px",
                                            color: "white",
                                        }}
                                    >
                                        {title}
                                    </p>
                                </Grid>
                            ))}
                        </Grid>
                        {currentPost.map((item, index) => (
                            <Grid
                                container
                                sx={
                                    index % 2 == 0
                                        ? {
                                              padding: "20px 0",
                                              backgroundColor: "white",
                                          }
                                        : {
                                              padding: "20px 0",
                                              backgroundColor:
                                                  "ButtonHighlight",
                                              color: "#8a0000",
                                          }
                                }
                                key={index}
                            >
                                <Grid item xs={1}>
                                    <p>{index + 1}</p>
                                </Grid>
                                <Grid item xs={1}>
                                    <p
                                        onClick={() => setDetail(item)}
                                        style={{
                                            textDecoration: "underline",
                                            cursor: "pointer",
                                        }}
                                    >
                                        {item.mahd}
                                    </p>
                                </Grid>
                                <Grid item xs={2}>
                                    <p>
                                        {parseInt(item.trigia).toLocaleString()}
                                    </p>
                                </Grid>
                                <Grid item xs={3}>
                                    <p>{item.ngayhd}</p>
                                </Grid>
                                <Grid item xs={3}>
                                    <p>{item.tinhtrang}</p>
                                </Grid>
                                <Grid
                                    item
                                    xs={2}
                                    style={{ textAlign: "center" }}
                                >
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        style={{ marginBottom: "20px" }}
                                        onClick={() => setDetail(item)}
                                    >
                                        Chi tiết
                                    </Button>
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
                    <div
                        className={style.pagination}
                        style={{ margin: "10px" }}
                    >
                        <Pagination
                            totalPosts={userDataa.length}
                            postsPerPage={6}
                            setCurrentPage={setPageIndex}
                            currentPage={pageIndex}
                        />
                    </div>
                </>
            ) : (
                <h1 style={{ padding: "50px" }}>Bạn không có hóa đơn nào...</h1>
            )}
        </div>
    );
};

export default OrderSide;
/*<div style={{display:"flex"}}>
            {item.lineItems.slice(0, 3).map((img,indexx)=>(
            <img src={img.url} key={indexx} onClick={()=>alert("car click")}/>
          ))}
          {item.lineItems.length>3 && <p style={{marginLeft:"5px"}}> . . .</p>}
        </div> 
        
        
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
          views={['year', 'month']}
          mask="____/__/__"
          inputFormat="MM-YYYY"
          label="Year and Month"
          minDate={dayjs('2012-03-01')}
          maxDate={dayjs('2023-06-01')}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} helperText={null} />}

        />
      </LocalizationProvider>
        */
