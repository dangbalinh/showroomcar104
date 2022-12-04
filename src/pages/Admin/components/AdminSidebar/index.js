import styles from "./AdminSideBar.module.css";

import {
    SupportAgent,
    CheckCircle,
    Logout,
    Newspaper,
    Group,
    DirectionsCar,
    ContactMail,
    ReceiptLong,
} from "@mui/icons-material";
import { Button } from "@mui/material";

import images from "../../../../assets/image";
import { NavLink, useNavigate } from "react-router-dom";

function AdminSidebar() {
    const navigate = useNavigate();

    const AdminFunc = [
        "Quản lý ô tô",
        "Quản lý khách hàng",
        "Quản lý nhân viên",
        "Quản lý tin tức",
        "Quản lý form",
        "Quản lý hóa đơn",
    ];
    const AdminLink = [
        "/dashboard",
        "/dashboard/customer-management",
        "/dashboard/staff-management",
        "/dashboard/news-management",
        "/dashboard/form-management",
        "/dashboard/invoice-management",
    ];
    const funcIcon = [
        <DirectionsCar className={styles.icon} />,
        <Group className={styles.icon} />,
        <SupportAgent className={styles.icon} />,
        <Newspaper className={styles.icon} />,
        <ContactMail className={styles.icon} />,
        <ReceiptLong className={styles.icon}/>
    ];

    let user = JSON.parse(localStorage.getItem("user"));

    const handleLogOut = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate('/')
    }

    const handleBackHome = () => {
        navigate("/")
    }

    return (
        <div className={styles.sidebar}>
            <div className={styles.user}>
                <img
                    className={styles.avatar}
                    src={images.logoImg}
                    alt="Avatar"
                    onClick={handleBackHome}
                />
                <div className={styles.username}>
                    {user.name}
                    <CheckCircle className={styles.usericon} />
                </div>
            </div>
            <ul className={styles.sidebar_content}>
                {AdminFunc.map((func, index) => (
                    <li className={styles.sidebar_item} key={index}>
                        <NavLink
                            to={AdminLink[index]}
                            className={({ isActive }) => (isActive ? styles.isActive : styles.item_link)}
                            end
                        >
                            {funcIcon[index]}
                            {func}
                        </NavLink>
                    </li>
                ))}
            </ul>
            <div className={styles.logout}>
                <Button variant="contained" size="large" color="error"
                    sx={{ fontSize: "14px", marginTop: "36px", textAlign: "center" }}
                    onClick={handleLogOut}>
                    <Logout className={styles.icon} />
                    Đăng xuất
                </Button>
            </div>
        </div>
    );
}

export default AdminSidebar;
