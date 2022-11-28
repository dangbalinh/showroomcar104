import styles from "./Admin.module.css";
import { styled } from "@mui/material/styles";
import { Grid, Paper, Box } from "@mui/material";
import AdminSidebar from "./components/AdminSidebar";
import CarManagement from "./components/CarManagement";
import NewsManagement from "./components/NewsManagement"
import { Routes, Route } from "react-router-dom";

function Admin() {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        color: theme.palette.text.secondary
    }));

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container>
                <Grid item xs={2.5}>
                    <Item>
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
                                path="/news-management"
                                element={<NewsManagement />}
                            />
                        </Routes>
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Admin;
