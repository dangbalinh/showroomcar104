// import images from "../../../../assets/image";
import styles from "./NewsManagement.module.css";
import styleDetail from "../../../ReadNews/ReadNews.module.css";
import "./NewsManagement.css";
import parse from "html-react-parser"

import { styled } from "@mui/material/styles";
import {
    Add,
    Edit,
    ErrorOutline,
    DeleteOutline,
} from "@mui/icons-material";
import { useState, useEffect, memo } from "react";
import {
    IconButton,
    Modal,
    Button,
    Grid,
    Paper,
    Box,
    Typography,
    Stack,
    Pagination
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

import NewsPopUp from "../NewsPopUp"
import HandleNewsApi from "../../../../Apis/HandleNewsApi"
import Swal from "sweetalert2";

function NewsManagement() {
    const [data, setData] = useState([]);
    const [dataLength, setDataLength] = useState();
    const [pageIndex, setPageIndex] = useState(0);
    const [type, setType] = useState("");
    const [updatePost, setUpdatePost] = useState({});
    const [Id, setId] = useState(0);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedDetail, setSelectedDetail] = useState(null);
    const [openDetailModal, setOpenDetailModal] = useState(false);

    const handleOpenDetailModal = (detail) => {
        setOpenDetailModal(true);
        setSelectedDetail(detail)
    }

    const gridColumn = [1, 1, 1, 2, 4, 1, 1, 1];
    const gridTitle = [
        "STT",
        "Ảnh",
        "Tác giả",
        "Tiêu đề",
        "Mô tả",
        "Ngày đăng",
        "Chi tiết",
        ""
    ];

    const pageSize = 5;

    // Get API
    useEffect(() => {
        HandleNewsApi.getNewsByPageIndex(pageIndex).then((res) => {
            setData(res.news);
            setDataLength(res.totalNews);
        });
    }, [pageIndex]);


    const handleDeleteItem = async (id) => {
        HandleNewsApi.deleteNews(id)
            .then((res) => {
                setOpenDeleteModal(false);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Xóa tin tức thành công!",
                    showConfirmButton: false,
                    timer: 1500
                });
                setData(data.filter((item) => item._id !== id));
            })
            .catch((err) => {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Xóa tin tức thất bại!",
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    };

    const handleClickUpdate = async (id) => {
        HandleNewsApi.getNewsById(id)
            .then((res) => {
                setUpdatePost(res);
                setType("update");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handlePageChange = (e, p) => {
        setPageIndex(p - 1);
    };

    // Custome CSS MUI
    const ItemMain = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        padding: theme.spacing(1),
        textAlign: "center",
        color: "#000",
        boxShadow: "none",
        fontSize: 20,
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

    const RenderDetailModal = ({ detail }) => {
        return (<div>
            <div className={styles.overlay}></div>
            <div className={styles.bPopup}>
                <CancelIcon
                    className={styles.bPopup__close}
                    onClick={() => setOpenDetailModal(false)}
                />
                <Typography variant="h4" sx={{
                    fontWeight: "bold",
                    padding: "50px 0 30px 0",
                    fontSize: "2.4rem",
                    textAlign: "center",
                    color: "rgba(0, 0, 0, 0.6)",
                    fontFamily: "LexendRegular",
                    width: "100%",
                }}>
                    Chi tiết
                </Typography>
                <Box sx={{
                    borderBottom: "1px solid rgba(0, 0, 0, 0.5)",
                    margin: "0 50px"
                }} />
                <Box sx={{ padding: "50px" }}>
                    <h3 className={styleDetail.title}>{detail.title}</h3>
                    <p className={styleDetail.date}>{detail.dateSource}</p>
                    <div className={styleDetail.detail}>{parse(detail.detail[0])}</div>
                </Box>
            </div>
        </div>)
    }

    return (
        <div>
            <header className={styles.header}>
                {/* <img
                    src={images.bmwImg}
                    className={styles.header_image}
                    alt="Header img"
                /> */}
                <h1 className={styles.header_heading}>Quản lý tin tức</h1>
            </header>
            <div className={styles.container}>
                <div className={styles.container_header}>
                    <Button
                        sx={{
                            height: 40,
                            fontSize: 14,
                            textTransform: "none",
                            marginRight: 8
                        }}
                        variant="contained"
                        color="success"
                        startIcon={<Add />}
                        onClick={() => setType("create")}
                    >
                        Thêm tin tức
                    </Button>
                </div>

                <div className={styles.content}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container sx={{ padding: '0 0 8px' }}>
                            {gridTitle.map((title, index) => (
                                <Grid item xs={gridColumn[index]} key={index}>
                                    <ItemMain>{title}</ItemMain>
                                </Grid>
                            ))}
                        </Grid>

                        {/* Render data */}
                        {data?.map((item, index) => (
                            <Grid container key={index}>
                                <Grid item xs={1}>
                                    <Item>{index + 1}</Item>
                                </Grid>
                                <Grid item xs={1}>
                                    <Item>
                                        <img
                                            src={item.image}
                                            className={styles.content_image}
                                            alt="news"
                                        />
                                    </Item>
                                </Grid>
                                <Grid item xs={1}>
                                    <Item>{item.author}</Item>
                                </Grid>
                                <Grid item xs={2}>
                                    <Item>{item.title}</Item>
                                </Grid>
                                <Grid item xs={4}>
                                    <Item>{item.description}</Item>
                                </Grid>
                                <Grid item xs={1}>
                                    <Item>{item.dateSource}</Item>
                                </Grid>
                                <Grid item xs={1}>
                                    <Item>
                                        <Button variant="outlined" size="large" sx={{ width: "50px" }} onClick={() => handleOpenDetailModal(item)}>Xem chi tiết</Button>
                                    </Item>
                                </Grid>
                                <Grid item xs={1}>
                                    <Item>
                                        <IconButton
                                            color="primary"
                                            size="medium"
                                            onClick={() => {
                                                handleClickUpdate(item._id);
                                            }}
                                        >
                                            <Edit sx={{ fontSize: "22px" }} />{" "}
                                        </IconButton>
                                        <IconButton
                                            size="medium"
                                            color="error"
                                            onClick={() => {
                                                setOpenDeleteModal(true);
                                                setId(item._id);
                                            }}
                                        >
                                            <DeleteOutline
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
                                                    liệu tin tức này?
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
                        {openDetailModal && <RenderDetailModal detail={selectedDetail} />}
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
            <NewsPopUp
                type={type !== "" ? type : ""}
                setType={setType}
                updatePost={updatePost}
                setUpdatePost={setUpdatePost}
            />
        </div>
    );
}

export default memo(NewsManagement);
