import React, { useState, useEffect } from "react";
// import './BlogPopUp.css';
import styles from "./BlogPopUp.module.css";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Link } from "react-router-dom";
// import PostApi from '../../Apis/PostApi';
import CancelIcon from "@mui/icons-material/Cancel";
import Swal from "sweetalert2";
import { Box } from "@mui/system";
import { Grid, Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

function BlogPopup({ type, setType, updatePost, setUpdatePost }) {
    const [thumbnail, setThumbnail] = useState();
    const [title, setTitle] = useState();
    const [carName, setCarName] = useState();
    const [brand, setBrand] = useState();
    const [price, setPrice] = useState();
    const [engine, setEngine] = useState();
    const [seat, setSeat] = useState();
    const [linkPost, setLinkPost] = useState();
    const [power, setPower] = useState();
    const [capacity, setCapacity] = useState();
    const [fuel, setFuel] = useState();
    const [speed, setSpeed] = useState();
    const [origin, setOrigin] = useState();
    const [color, setColor] = useState();
    const [desc, setDesc] = useState();
    const [year, setYear] = useState();
    const [size, setSize] = useState();

    const handleClickUpdate = (data) => {
      // PostApi.getPostById({
      //   postId: data
      // })
      // .then(async (res) => {
      //   await setUpdatePost(res);
      //   await setType('update')
      // })
      // .catch((err) => {
      //   console.log(err);
      // })
    }

    // const handleCreatePost = async () => {
    //   let thumbnailUrl = '';
    //   const formData = new FormData();
    //   await formData.append('image', thumbnail);
    //   await PostApi.uploadImageToFirebase({
    //     image: formData,
    //   }).then((res) => {
    //     thumbnailUrl = res.url;
    //   });

    //   await PostApi.createPost({
    //     title: title,
    //     image: thumbnailUrl,
    //     linkPost: linkPost,
    //     content: content,
    //   })
    //     .then((res) => {
    //       Swal.fire({
    //         position: 'top',
    //         icon: 'success',
    //         title: 'Tạo bài viết thành công!',
    //         showConfirmButton: false,
    //         timer: 1500,
    //       });
    //       window.location.reload();
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // };

    // const handleUpdatePost = async () => {
    //   let thumbnailUrl = '';
    //   if (thumbnail === updatePost.image) {
    //     thumbnailUrl = thumbnail;
    //   } else {
    //     const formData = new FormData();
    //     await formData.append('image', thumbnail);
    //     await PostApi.uploadImageToFirebase({
    //       image: formData,
    //     }).then((res) => {
    //       thumbnailUrl = res.url;
    //     });
    //   }

    //   await PostApi.updatePost({
    //     postId: updatePost._id,
    //     title: title,
    //     image: thumbnailUrl,
    //     linkPost: linkPost,
    //     content: content,
    //   })
    //     .then((res) => {
    //       Swal.fire({
    //         position: 'top',
    //         icon: 'success',
    //         title: 'Cập nhật bài viết thành công!',
    //         showConfirmButton: false,
    //         timer: 1500,
    //       });
    //       setUpdatePost({});
    //       window.location.reload();
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // };

    useEffect(() => {
        if (updatePost !== {}) {
            setTitle(updatePost.title);
            // setContent(updatePost.content);
            setThumbnail(updatePost.image);
        }
    }, [updatePost]);

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        padding: theme.spacing(1),
        textAlign: "left",
        color: "#000",
        boxShadow: "none",
        fontSize: 16
    }));

    return (
        <>
            {type === "create" && (
                <div className={styles.bPopup}>
                    <CancelIcon
                        className={styles.bPopup__close}
                        onClick={() => setType("")}
                    />
                    <h3>Thêm bài đăng</h3>
                    <br />
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container>
                            <Grid xs={4}>
                                <Item>
                                    <label htmlFor="name">Tên xe</label>
                                    <br />
                                    <input
                                        id="name"
                                        type="text"
                                        placeholder="Nhập tiêu đề..."
                                        onChange={(e) =>
                                            setCarName(e.target.value)
                                        }
                                    />
                                </Item>
                            </Grid>
                            <Grid xs={4}>
                                <Item>
                                    <label htmlFor="thumbnail">Hình ảnh</label>
                                    <br />
                                    <input
                                        id="thumbnail"
                                        type="file"
                                        title="Thêm ảnh"
                                        onChange={(e) =>
                                            setThumbnail(e.target.files[0])
                                        }
                                    />
                                </Item>
                            </Grid>
                            <Grid xs={4}>
                                <Item>
                                    <label htmlFor="brand">Thương hiệu</label>
                                    <br />
                                    <input
                                        id="brand"
                                        type="text"
                                        placeholder="Nhập thương hiệu"
                                        onChange={(e) =>
                                            setBrand(e.target.value)
                                        }
                                    />
                                </Item>
                            </Grid>
                            <Grid xs={4}>
                                <Item>
                                    <label htmlFor="price">Nhập giá</label>
                                    <br />
                                    <input
                                        id="price"
                                        type="text"
                                        placeholder="Nhập thương hiệu"
                                        onChange={(e) =>
                                            setPrice(e.target.value)
                                        }
                                    />
                                </Item>
                            </Grid>
                            <Grid xs={4}>
                                <Item>
                                    <label htmlFor="engine">Động cơ</label>
                                    <br />
                                    <input
                                        id="engine"
                                        type="text"
                                        placeholder="Nhập động cơ"
                                        onChange={(e) =>
                                            setEngine(e.target.value)
                                        }
                                    />
                                </Item>
                            </Grid>
                            <Grid xs={4}>
                                <Item>
                                    <label htmlFor="seat">Số chỗ</label>
                                    <br />
                                    <input
                                        id="seat"
                                        type="number"
                                        placeholder="Nhập số chỗ"
                                        onChange={(e) =>
                                            setSeat(e.target.value)
                                        }
                                    />
                                </Item>
                            </Grid>
                            <Grid xs={4}>
                                <Item>
                                    <label htmlFor="size">Kích thước</label>
                                    <br />
                                    <input
                                        id="size"
                                        type="text"
                                        placeholder="Nhập kích thước"
                                        onChange={(e) =>
                                            setSize(e.target.value)
                                        }
                                    />
                                </Item>
                            </Grid>
                            <Grid xs={4}>
                                <Item>
                                    <label htmlFor="origin">Nguồn gốc</label>
                                    <br />
                                    <input
                                        id="origin"
                                        type="text"
                                        placeholder="Nhập nguồn gốc"
                                        onChange={(e) =>
                                            setOrigin(e.target.value)
                                        }
                                    />
                                </Item>
                            </Grid>
                            <Grid xs={4}>
                                <Item>
                                    <label htmlFor="speed">
                                        Vận tốc tối đa
                                    </label>
                                    <br />
                                    <input
                                        id="speed"
                                        type="text"
                                        placeholder="Nhập vận tốc tối đa"
                                        onChange={(e) =>
                                            setSpeed(e.target.value)
                                        }
                                    />
                                </Item>
                            </Grid>
                            <Grid xs={4}>
                                <Item>
                                    <label htmlFor="capacity">Dung tích</label>
                                    <br />
                                    <input
                                        id="capacity"
                                        type="text"
                                        placeholder="Nhập dung tích"
                                        onChange={(e) =>
                                            setCapacity(e.target.value)
                                        }
                                    />
                                </Item>
                            </Grid>
                            <Grid xs={4}>
                                <Item>
                                    <label htmlFor="fuel">
                                        Tiêu hao nhiên liệu
                                    </label>
                                    <br />
                                    <input
                                        id="fuel"
                                        type="text"
                                        placeholder="Nhập tiêu hao nhiên liệu"
                                        onChange={(e) =>
                                            setFuel(e.target.value)
                                        }
                                    />
                                </Item>
                            </Grid>
                            <Grid xs={4}>
                                <Item>
                                    <label htmlFor="power">
                                        Công suất cực đại
                                    </label>
                                    <br />
                                    <input
                                        id="power"
                                        type="text"
                                        placeholder="Nhập công suất cực đại"
                                        onChange={(e) =>
                                            setPower(e.target.value)
                                        }
                                    />
                                </Item>
                            </Grid>
                            <Grid xs={4}>
                                <Item>
                                    <label htmlFor="color">Màu sắc</label>
                                    <br />
                                    <input
                                        id="color"
                                        type="text"
                                        placeholder="Nhập màu sắc"
                                        onChange={(e) =>
                                            setColor(e.target.value)
                                        }
                                    />
                                </Item>
                            </Grid>
                            <Grid xs={4}>
                                <Item>
                                    <label htmlFor="year">Năm sản xuất</label>
                                    <br />
                                    <input
                                        id="year"
                                        type="text"
                                        placeholder="Nhập năm sản xuất"
                                        onChange={(e) =>
                                            setYear(e.target.value)
                                        }
                                    />
                                </Item>
                            </Grid>
                            <Grid xs={4}>
                                <Item>
                                    <label htmlFor="desc">Mô tả</label>
                                    <br />
                                    <input
                                        id="desc"
                                        type="text"
                                        placeholder="Nhập mô tả"
                                        onChange={(e) =>
                                            setDesc(e.target.value)
                                        }
                                    />
                                </Item>
                            </Grid>
                        </Grid>
                    </Box>
                    <div>
                        {/* <button type="button" onClick={handleCreatePost}>
              Đăng bài
            </button> */}
                        <Button
                            variant="contained"
                            color="warning"
                            size="medium"
                            sx={{
                                fontSize: "14px",
                                width: "100px",
                                float: "right",
                                margin: "24px 36px 0"
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
                    <h3>Cập nhật bài đăng</h3>
                    {/* <label htmlFor="title">
                        Tiêu đề<span style={{ color: "red" }}>*</span>
                    </label>
                    <br />
                    <input
                        id="title"
                        type="text"
                        placeholder={updatePost.title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <br />
                    <label htmlFor="thumbnail">Thumbnail</label>
                    <br />
                    <input
                        id="thumbnail"
                        type="file"
                        title="Thêm ảnh"
                        onChange={(e) => setThumbnail(e.target.files[0])}
                    />
                    <br />
                    <img
                        style={{ maxWidth: "200px" }}
                        src={updatePost.image}
                        alt="img"
                    />
                    <br />
                    <label htmlFor="link">Link bài viết</label>
                    <br />
                    <input
                        id="link"
                        type="text"
                        placeholder={updatePost.linkPost}
                        onChange={(e) => setLinkPost(e.target.value)}
                    />
                    <br />
                    <label>Nội dung:</label>
                    <br />
                    <CKEditor
                        editor={ClassicEditor}
                        data={updatePost.content}
                        config={{
                            // plugins: [CKFinder],
                            ckfinder: {
                                uploadUrl: "http://localhost:5000/posts/uploads"
                            }
                        }}
                        onChange={async (event, editor) => {
                            const data = await editor.getData();
                            // setContent(data);
                        }}
                    /> */}
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container>
                            <Grid xs={4}>
                                <Item>
                                    <label htmlFor="name">Tên xe</label>
                                    <br />
                                    <input
                                        id="name"
                                        type="text"
                                        placeholder="Nhập tiêu đề..."
                                        onChange={(e) =>
                                            setCarName(e.target.value)
                                        }
                                    />
                                </Item>
                            </Grid>
                            <Grid xs={4}>
                                <Item>
                                    <label htmlFor="thumbnail">Hình ảnh</label>
                                    <br />
                                    <input
                                        id="thumbnail"
                                        type="file"
                                        title="Thêm ảnh"
                                        onChange={(e) =>
                                            setThumbnail(e.target.files[0])
                                        }
                                    />
                                </Item>
                            </Grid>
                            <Grid xs={4}>
                                <Item>
                                    <label htmlFor="brand">Thương hiệu</label>
                                    <br />
                                    <input
                                        id="brand"
                                        type="text"
                                        placeholder="Nhập thương hiệu"
                                        onChange={(e) =>
                                            setBrand(e.target.value)
                                        }
                                    />
                                </Item>
                            </Grid>
                            <Grid xs={4}>
                                <Item>
                                    <label htmlFor="price">Nhập giá</label>
                                    <br />
                                    <input
                                        id="price"
                                        type="text"
                                        placeholder="Nhập thương hiệu"
                                        onChange={(e) =>
                                            setPrice(e.target.value)
                                        }
                                    />
                                </Item>
                            </Grid>
                            <Grid xs={4}>
                                <Item>
                                    <label htmlFor="engine">Động cơ</label>
                                    <br />
                                    <input
                                        id="engine"
                                        type="text"
                                        placeholder="Nhập động cơ"
                                        onChange={(e) =>
                                            setEngine(e.target.value)
                                        }
                                    />
                                </Item>
                            </Grid>
                            <Grid xs={4}>
                                <Item>
                                    <label htmlFor="seat">Số chỗ</label>
                                    <br />
                                    <input
                                        id="seat"
                                        type="number"
                                        placeholder="Nhập số chỗ"
                                        onChange={(e) =>
                                            setSeat(e.target.value)
                                        }
                                    />
                                </Item>
                            </Grid>
                            <Grid xs={4}>
                                <Item>
                                    <label htmlFor="size">Kích thước</label>
                                    <br />
                                    <input
                                        id="size"
                                        type="text"
                                        placeholder="Nhập kích thước"
                                        onChange={(e) =>
                                            setSize(e.target.value)
                                        }
                                    />
                                </Item>
                            </Grid>
                            <Grid xs={4}>
                                <Item>
                                    <label htmlFor="origin">Nguồn gốc</label>
                                    <br />
                                    <input
                                        id="origin"
                                        type="text"
                                        placeholder="Nhập nguồn gốc"
                                        onChange={(e) =>
                                            setOrigin(e.target.value)
                                        }
                                    />
                                </Item>
                            </Grid>
                            <Grid xs={4}>
                                <Item>
                                    <label htmlFor="speed">
                                        Vận tốc tối đa
                                    </label>
                                    <br />
                                    <input
                                        id="speed"
                                        type="text"
                                        placeholder="Nhập vận tốc tối đa"
                                        onChange={(e) =>
                                            setSpeed(e.target.value)
                                        }
                                    />
                                </Item>
                            </Grid>
                            <Grid xs={4}>
                                <Item>
                                    <label htmlFor="capacity">Dung tích</label>
                                    <br />
                                    <input
                                        id="capacity"
                                        type="text"
                                        placeholder="Nhập dung tích"
                                        onChange={(e) =>
                                            setCapacity(e.target.value)
                                        }
                                    />
                                </Item>
                            </Grid>
                            <Grid xs={4}>
                                <Item>
                                    <label htmlFor="fuel">
                                        Tiêu hao nhiên liệu
                                    </label>
                                    <br />
                                    <input
                                        id="fuel"
                                        type="text"
                                        placeholder="Nhập tiêu hao nhiên liệu"
                                        onChange={(e) =>
                                            setFuel(e.target.value)
                                        }
                                    />
                                </Item>
                            </Grid>
                            <Grid xs={4}>
                                <Item>
                                    <label htmlFor="power">
                                        Công suất cực đại
                                    </label>
                                    <br />
                                    <input
                                        id="power"
                                        type="text"
                                        placeholder="Nhập công suất cực đại"
                                        onChange={(e) =>
                                            setPower(e.target.value)
                                        }
                                    />
                                </Item>
                            </Grid>
                            <Grid xs={4}>
                                <Item>
                                    <label htmlFor="color">Màu sắc</label>
                                    <br />
                                    <input
                                        id="color"
                                        type="text"
                                        placeholder="Nhập màu sắc"
                                        onChange={(e) =>
                                            setColor(e.target.value)
                                        }
                                    />
                                </Item>
                            </Grid>
                            <Grid xs={4}>
                                <Item>
                                    <label htmlFor="year">Năm sản xuất</label>
                                    <br />
                                    <input
                                        id="year"
                                        type="text"
                                        placeholder="Nhập năm sản xuất"
                                        onChange={(e) =>
                                            setYear(e.target.value)
                                        }
                                    />
                                </Item>
                            </Grid>
                            <Grid xs={4}>
                                <Item>
                                    <label htmlFor="desc">Mô tả</label>
                                    <br />
                                    <input
                                        id="desc"
                                        type="text"
                                        placeholder="Nhập mô tả"
                                        onChange={(e) =>
                                            setDesc(e.target.value)
                                        }
                                    />
                                </Item>
                            </Grid>
                        </Grid>
                    </Box>
                    <div>
                        {/* <button type="button" onClick={handleUpdatePost}>
              Cập nhật
            </button> */}
                        <Button
                            variant="contained"
                            color="warning"
                            size="medium"
                            sx={{
                                fontSize: "14px",
                                width: "100px",
                                float: "right",
                                margin: "24px 36px 0"
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
