import React, { useState, useEffect, useRef } from "react";
import styles from "./NewsPopUp.module.css";
import './NewsPopUp.css'
import CancelIcon from "@mui/icons-material/Cancel";
import Swal from "sweetalert2";
import { Box } from "@mui/system";
import { Grid, Button } from "@mui/material";
import HandleNewsApi from "../../../../Apis/HandleNewsApi";
import JoditEditor from 'jodit-react';
import { useMemo } from "react";

function NewsPopup({ type, setType, updatePost, setUpdatePost }) {
    const [image, setImage] = useState();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [dateSource, setDateSource] = useState();
    const [author, setAuthor] = useState();
    const [detail, setDetail] = useState();
    const editor = useRef(null);
    const config = useMemo(
        () => ({
            readonly: false,
            uploader: { insertImageAsBase64URI: true },
            removeButtons: ["brush", "file", "fullsize"],
            showXPathInStatusbar: false,
            showCharsCounter: false,
            showWordsCounter: false,
        }),
        []
    );

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



    // useEffect
    useEffect(() => {
        if (updatePost !== {}) {
            setTitle(updatePost.title);
            setImage(updatePost.image);
            setDescription(updatePost.description);
            setDateSource(updatePost.dateSource);
            setAuthor(updatePost.author);
            if (updatePost.detail)
                setDetail(updatePost.detail[0]);
        }
    }, [updatePost]);


    const handleUpdatePost = async () => {
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
                            onClick={() => {
                                setDetail('')
                                setType("")
                            }}
                        />
                        <h3>Thêm tin tức</h3>
                        <br />
                        <Box sx={{ flexGrow: 1, maxHeight: 520, overflow: "scroll" }}>
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
                                    <Grid item xs={12}>
                                        <label className={styles.label}>Chi tiết</label>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <JoditEditor
                                            ref={editor}
                                            value={detail}
                                            config={config}
                                            tabIndex={999} // tabIndex of textarea
                                            onChange={newContent => {
                                                setDetail(newContent)
                                            }}
                                        />
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
                                onClick={() => {
                                    setDetail('')
                                    setType("")
                                }}
                            />
                            <h3>Cập nhật dữ liệu tin tức</h3>
                            <br />
                            <Box sx={{ flexGrow: 1, maxHeight: 520, overflow: "scroll" }}>
                                <Grid container>
                                    {inputId.map((item, index) => (
                                        <Grid key={index} item xs={4} sx={{ height: "93px" }}>
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
                                    <Grid item xs={12}>
                                        <label className={styles.label}>Chi tiết</label>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <JoditEditor
                                            ref={editor}
                                            value={detail}
                                            config={config}
                                            tabIndex={999} // tabIndex of textarea
                                            onChange={newContent => {
                                                setDetail(newContent)
                                            }}
                                        />
                                    </Grid>
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
                                    onClick={() => {
                                        setDetail('')
                                        setType("")
                                    }}
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
