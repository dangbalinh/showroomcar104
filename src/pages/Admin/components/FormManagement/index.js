import images from "../../../../assets/image";
import styles from "./FormManagement.module.css";
import "./FormManagement.css";
import { styled } from "@mui/material/styles";
import { ErrorOutline, DeleteOutline } from "@mui/icons-material";
import { useState, useEffect, memo, useMemo } from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import {
    IconButton,
    Modal,
    Button,
    Grid,
    Paper,
    TextField,
    Box,
    Typography,
    Stack,
    Pagination,
    InputLabel,
} from "@mui/material";

import FormPopUp from "../FormPopUp";
import HandleApiForm from "../../../../Apis/HandleApiForm";
import Swal from "sweetalert2";

function FormManagement() {
    const [data, setData] = useState([]);
    const [dataLength, setDataLength] = useState();
    const [pageIndex, setPageIndex] = useState(0);
    const [type, setType] = useState("");
    // const [selectedDay, setSelectedDay] = useState(null);
    const [selectedDay, setSelectedDay] = useState("");
    const [newData, setNewData] = useState([]);
    const [updatePost, setUpdatePost] = useState({});
    const [Id, setId] = useState(0);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const pageSize = 15;

    const gridColumn = [1, 2, 1.5, 2, 4.5, 1];
    const gridTitle = [
        "STT",
        "Họ tên",
        "Số điện thoại",
        "Email",
        "Tin nhắn",
        "",
    ];

    // Get API
    // const day = selectedDay ? new Date(selectedDay) : null;

    const Transform = (temp) => {
        if (temp) {
            var date = new Date(temp);
            var finaldate =
                (date.getDate() < 10
                    ? "0" + (0 + date.getDate())
                    : date.getDate()) +
                "-" +
                (date.getMonth() < 10
                    ? "0" + (0 + date.getMonth() + 1)
                    : date.getMonth() + 1) +
                "-" +
                date.getFullYear();
            return finaldate;
        } else return "";
    };

    useEffect(() => {
        HandleApiForm.getFormByPageIndex(pageIndex).then((res) => {
            setData(res.forms);
            setDataLength(res.totalForms);
        });
    }, [pageIndex]);

    useEffect(() => {
        // day
        selectedDay
            ? HandleApiForm.getFormByDate(Transform(selectedDay)).then(
                  (res) => {
                      setData(res.forms);
                      setDataLength(res.totalForms);
                  }
              )
            : HandleApiForm.getAllForm().then((res) => {
                  setData(res.forms);
                  setDataLength(res.totalForms);
              });
    }, [selectedDay]);
    console.log(Transform(selectedDay));
    // handle event
    const handleDeleteItem = async (id) => {
        HandleApiForm.deleteForm(id)
            .then((res) => {
                console.log(id);
                setOpenDeleteModal(false);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Xóa form phản hồi thành công!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                console.log(data);
                setData(data.filter((item) => item._id !== id));
            })
            .catch((err) => {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Xóa form phản hồi thất bại!",
                    showConfirmButton: false,
                    timer: 1500,
                });
            });
    };

    const handlePageChange = (e, p) => {
        console.log("PageIndex: ", p);
        setPageIndex(p - 1);
    };

    const handleReadInfo = async (id) => {
        HandleApiForm.getFormById(id)
            .then(async (res) => {
                await setUpdatePost(res);
                await setType("read");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleDayChange = (e) => {
        setSelectedDay(e);
    };

    // Custome CSS MUI
    const ItemMain = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        padding: theme.spacing(1),
        textAlign: "center",
        color: "#000",
        boxShadow: "none",
        fontSize: 20,
        fontWeight: "600",
    }));

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        padding: theme.spacing(1),
        textAlign: "center",
        color: "#000",
        boxShadow: "none",
        fontSize: 16,
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
        p: 8,
    };

    const nameActive = {
        cursor: "pointer",
        "&:hover": {
            color: "#d32f2f",
        },
        "&:active": {
            color: "#ff0000",
        },
    };

    return (
        <div>
            <header className={styles.header}>
                <h1 className={styles.header_heading}>Quản lý Form phản hồi</h1>
            </header>
            <div className={styles.container}>
                <div className={styles.container_header}>
                    <div className={styles.funcContainer}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Stack spacing={3}>
                                <DesktopDatePicker
                                    inputFormat="DD/MM/YYYY"
                                    value={selectedDay}
                                    onChange={handleDayChange}
                                    renderInput={(params) => (
                                        <TextField {...params} />
                                    )}
                                />
                            </Stack>
                        </LocalizationProvider>
                    </div>
                </div>

                <div className={styles.content}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container>
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
                                    <Item>{item.name}</Item>
                                </Grid>
                                <Grid item xs={1.5}>
                                    <Item>{item.mobile}</Item>
                                </Grid>
                                <Grid item xs={2}>
                                    <Item>{item.email}</Item>
                                </Grid>
                                <Grid item xs={4.5}>
                                    <Item
                                        sx={nameActive}
                                        onClick={() => handleReadInfo(item._id)}
                                    >
                                        {item.message
                                            ? item.message.slice(0, 30)
                                            : ""}
                                    </Item>
                                </Grid>
                                <Grid item xs={1}>
                                    <Item>
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
                                                    Bạn có chắc chắn muốn xóa
                                                    form phản hồi này?
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
                                                            marginRight: "12px",
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
                                                            width: "70px",
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
            <FormPopUp
                type={type !== "" ? type : ""}
                setType={setType}
                updatePost={updatePost}
                setUpdatePost={setUpdatePost}
            />
        </div>
    );
}

export default memo(FormManagement);
