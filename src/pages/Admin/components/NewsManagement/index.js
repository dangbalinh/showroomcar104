import images from "../../../../assets/image";
import styles from "./NewsManagement.module.css";
import "./NewsManagement.css";

import { styled } from "@mui/material/styles";
import {
    Add,
    Search,
    Edit,
    ErrorOutline,
    DeleteOutline,
    Cancel,
    RestartAlt
} from "@mui/icons-material";
import { useState, useEffect, memo, useRef } from "react";
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
    Typography,
    Stack,
    Pagination
} from "@mui/material";

import NewsPopUp from "../NewsPopUp"
import HandleApi from "../../../../Apis/HandleApi";
import HandleNewsApi from "../../../../Apis/HandleNewsApi"
import Swal from "sweetalert2";

function NewsManagement() {
    const [typeCar, setTypeCar] = useState("All");
    const [data, setData] = useState([]);
    const [dataLength, setDataLength] = useState();
    const [pageIndex, setPageIndex] = useState(0);
    const [searchValue, setSearchValue] = useState("");
    const [type, setType] = useState("");
    const [updatePost, setUpdatePost] = useState({});
    const [Id, setId] = useState(0);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const inputRef = useRef();

    const gridColumn = [1, 2, 2, 4, 1, 1, 1];
    const gridTitle = [
        "STT",
        "Ảnh",
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

    // handle event
    const handleChange = (event) => {
        setTypeCar(event.target.value);
    };

    const handleDeleteItem = async (id) => {
        HandleNewsApi.deleteNews(id)
            .then((res) => {
                console.log(id);
                setOpenDeleteModal(false);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Xóa tin tức thành công!",
                    showConfirmButton: false,
                    timer: 1500
                });
                console.log(data);
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
        console.log(id);
        HandleApi.getCarById(id)
            .then(async (res) => {
                await setUpdatePost(res);
                await setType("update");
                console.log(updatePost);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handlePageChange = (e, p) => {
        console.log("PageIndex: ", p);
        setPageIndex(p - 1);
    };

    // handle search event
    const handleInputChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSearch = async () => {
        if (searchValue.trim() !== "") {
            HandleApi.getCarByName(searchValue).then(async (res) => {
                await setData(res.cars);
                await setDataLength(data.length);
            });
        }
    };

    const handleClear = () => {
        setSearchValue("");
        inputRef.current.focus();
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

    const MenuSelectProps = {
        PaperProps: {
            style: {
                maxHeight: 150,
                overflowX: "scroll"
                //   width: 250,
            }
        }
    };

    return (
        <div>
            <header className={styles.header}>
                <img
                    src={images.bmwImg}
                    className={styles.header_image}
                    alt="Header img"
                />
                <h1 className={styles.header_heading}>Quản lý tin tức</h1>
            </header>
            <div className={styles.container}>
                <div className={styles.container_header}>
                    <div className={styles.funcContainer}>
                        <div className={styles.search}>
                            <input
                                ref={inputRef}
                                value={searchValue}
                                type="text"
                                placeholder="Tìm kiếm tin tức"
                                spellCheck={false}
                                onChange={handleInputChange}
                            />

                            {!!searchValue && (
                                <button
                                    className={styles.clear}
                                    onClick={handleClear}
                                >
                                    <Cancel className={styles.clearIcon} />
                                </button>
                            )}

                            <button
                                className={styles.searchBtn}
                                onMouseDown={(e) => e.preventDefault()}
                            >
                                <Search className={styles.searchIcon} />
                            </button>
                        </div>
                    </div>

                    <Button
                        sx={{
                            height: 40,
                            fontSize: 14,
                            textTransform: "none",
                            marginLeft: "80px"
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
                                <Grid item xs={2}>
                                    <Item>
                                        <img
                                            src={item.image}
                                            className={styles.content_image}
                                            alt="news"
                                        />
                                    </Item>
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
                                        <Button>
                                            Chi tiết
                                        </Button>
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
                                                // handleDeleteItem(item._id)
                                                console.log(item._id);
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
                                                            console.log(Id);
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
