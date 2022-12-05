import styles from "./Admin.module.css";
import { styled } from "@mui/material/styles";
import { Grid, Paper, Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import AdminSidebar from "./components/AdminSidebar";
import CarManagement from "./components/CarManagement";
import NewsManagement from "./components/NewsManagement";
import FormManagement from "./components/FormManagement";
import CustomerManagement from "./components/CustomerManagement";
import EmployeeManagement from "./components/EmployeeManagement";
import StaffRoute from "./components/routes/StaffRoute";
import InvoiceManagement from "./components/InvoiceManagement";

function Admin() {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        color: theme.palette.text.secondary,
        maxWidth: "100%",
    }));
    let user = JSON.parse(localStorage.getItem("user"));

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container>
                <Grid item xs={2.5}>
                    <Item
                        sx={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            bottom: 0,
                            minWidth: "318px",
                        }}
                    >
                        <AdminSidebar />
                    </Item>
                </Grid>
                <Grid item xs={9.5}>
                    <Item>
                        <Routes>
                            <Route
                                path="/"
                                element={<CarManagement />}
                                exactly
                            />
                            <Route
                                path="/customer-management"
                                element={<CustomerManagement />}
                            />
                            <Route
                                path="/staff-management"
                                element={
                                    <StaffRoute>
                                        <EmployeeManagement />
                                    </StaffRoute>
                                }
                            />
                            <Route
                                path="/news-management"
                                element={
                                    <StaffRoute>
                                        <NewsManagement />
                                    </StaffRoute>
                                }
                            />
                            <Route
                                path="/form-management"
                                element={<FormManagement />}
                            />
                            <Route
                                path="/invoice-management"
                                element={<InvoiceManagement />}
                            />
                        </Routes>
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Admin;
