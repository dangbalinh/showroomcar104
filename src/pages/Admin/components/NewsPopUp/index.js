import React, { useState, useEffect } from "react";
import styles from "./NewsPopUp.module.css";
import './NewsPopUp.css'
import CancelIcon from "@mui/icons-material/Cancel";
import Swal from "sweetalert2";
import { Box } from "@mui/system";
import { Grid, Button, Modal, IconButton, Typography, styled, Paper, Select, MenuItem, TextField } from "@mui/material";
import HandleNewsApi from "../../../../Apis/HandleNewsApi";
import { AddCircleOutline, DeleteOutline } from "@mui/icons-material";

function NewsPopup({ type, setType, updatePost, setUpdatePost }) {
    const [image, setImage] = useState();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [dateSource, setDateSource] = useState();
    const [author, setAuthor] = useState();
    const [detail, setDetail] = useState([]);
    const [tag, setTag] = useState("");
    const [content, setContent] = useState();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const inputId = [
        "image",
        "title",
        "description",
        "dateSource",
        "author",
    ];

    const useStateEvent = [
        setImage,
        setTitle,
        setDescription,
        setDateSource,
        setAuthor,
    ];

    const placeHolder = [
        "Nhập link ảnh",
        "Nhập tiêu đề",
        "Nhập mô tả",
        "Nhập ngày đăng",
        "Nhập tác giả",
    ];

    const textValue = [
        "Link ảnh",
        "Tiêu đề",
        "Mô tả",
        "Ngày đăng",
        "Tác giả",
    ];

    const inputType = ["text", "text", "text", "text", "text"]

    const inputValue = [
        image,
        title,
        description,
        dateSource,
        author,
    ];

    // object data
    const data = {
        image: image,
        title: title,
        description: description,
        dateSource: dateSource,
        author: author,
        detail: detail,
    };


    // Custome CSS MUI
    const ItemMain = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        padding: theme.spacing(1),
        textAlign: "center",
        color: "#000",
        boxShadow: "none",
        fontSize: 16,
        fontWeight: "600"
    }));

    const styleModal = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 800,
        bgcolor: "white",
        border: "2px solid #000",
        boxShadow: 24,
        p: 8,
        overflowY: "scroll"
    };

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        padding: theme.spacing(1),
        textAlign: "center",
        color: "#000",
        boxShadow: "none",
        fontSize: 16
    }));


    // useEffect
    useEffect(() => {
        if (updatePost !== {}) {
            setTitle(updatePost.title);
            setImage(updatePost.image);
            setDescription(updatePost.description);
            setDateSource(updatePost.dateSource);
            setDetail(updatePost.detail);
        }
    }, [updatePost]);

    // handle event
    const handleChange = (event) => {
        setTag(event.target.value);
    };

    const addDetail = () => {
        if (detail === undefined) {
            setDetail([])
        } else {
            setDetail([...detail, { type: tag, content: content, id: Date.now() }]);
            setContent('');
        }
    }

    const handleDeleteDetail = (id) => {
        setDetail(detail.filter(i => i.id !== id))
    }

    const handleUpdatePost = async () => {
        console.log(updatePost._id);
        HandleNewsApi.updateNews(updatePost._id, data)
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
        HandleNewsApi.createNews(data)
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
                        <h3>Thêm tin tức</h3>
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
                                        </Grid>
                                    ))}
                                    <Grid item xs={4} sx={{ height: "93px" }}>
                                        <label className={styles.label}>Chi tiết</label>
                                        <br />
                                        <Button variant="contained" size="large" onClick={handleOpen}>Thêm chi tiết</Button>
                                        <Modal
                                            open={open}
                                            onClose={handleClose}
                                        >
                                            <Box sx={[styleModal, { width: "80vw", height: "80vh", overflow: "scroll" }]}>
                                                <Typography variant="h4" sx={{
                                                    fontWeight: "bold",
                                                    paddingBottom: "10px",
                                                    fontSize: "2.4rem",
                                                    textAlign: "center",
                                                }}>
                                                    Chi tiết
                                                </Typography>
                                                <Grid container>
                                                    <Grid container sx={{ padding: '0 0 8px' }}>
                                                        <Grid item xs={2}><ItemMain>Type</ItemMain></Grid>
                                                        <Grid item xs={8}><ItemMain>Content</ItemMain></Grid>
                                                        <Grid item xs={2}>{" "}</Grid>
                                                    </Grid>
                                                    <Grid container>
                                                        <Grid item xs={2}>
                                                            <Select
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                value={tag}
                                                                label="Age"
                                                                onChange={handleChange}
                                                            >
                                                                <MenuItem value="img">img</MenuItem>
                                                                <MenuItem value="p">p</MenuItem>
                                                                <MenuItem value="h3">h3</MenuItem>
                                                            </Select>
                                                        </Grid>
                                                        <Grid item xs={9}>
                                                            <TextField
                                                                sx={{ width: "100%" }}
                                                                type="text"
                                                                required
                                                                placeholder="Nhập nội dung"
                                                                value={content}
                                                                onChange={(e) =>
                                                                    setContent(e.target.value)
                                                                }
                                                                onBlur={handleBlur}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={1}>
                                                            <IconButton onClick={addDetail}>
                                                                <AddCircleOutline sx={{ fontSize: "25px" }} />
                                                            </IconButton>
                                                        </Grid>
                                                    </Grid>
                                                    {detail?.map((d, index) => {
                                                        return (<Grid key={index} container>
                                                            <Grid item xs={2}>
                                                                <Item>{d.type}</Item>
                                                            </Grid>
                                                            <Grid item xs={8}>
                                                                <Item>{d.content}</Item>
                                                            </Grid>
                                                            <Grid item xs={1}>
                                                                <IconButton
                                                                    size="medium"
                                                                    color="error"
                                                                    onClick={() => {
                                                                        handleDeleteDetail(d.id)
                                                                    }}
                                                                >
                                                                    <DeleteOutline
                                                                        sx={{ fontSize: "22px" }}
                                                                    />
                                                                </IconButton>
                                                            </Grid>
                                                        </Grid>)
                                                    })}
                                                </Grid>
                                            </Box>
                                        </Modal>
                                    </Grid>
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
                                        color="error"
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
            )
            }
            {
                type === "update" && (
                    <div>
                        <div className={styles.overlay}></div>

                        <div className={styles.bPopup}>
                            <CancelIcon
                                className={styles.bPopup__close}
                                onClick={() => setType("")}
                            />
                            <h3>Cập nhật dữ liệu tin tức</h3>

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
                                    color="error"
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
                )
            }
        </>
    );
}

export default NewsPopup;
