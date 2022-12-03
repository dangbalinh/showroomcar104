import styles from "./AdminSideBar.module.css";

import {
    SupportAgent,
    CheckCircle,
    Logout,
    Newspaper,
    Group,
    DirectionsCar,
    ContactMail
} from "@mui/icons-material";

import images from "../../../../assets/image";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

function AdminSidebar() {
    const [funcActive, setFuncActive] = useState(0);

    const AdminFunc = [
        "Quản lý ô tô",
        "Quản lý khách hàng",
        "Quản lý nhân viên",
        "Quản lý tin tức",
        "Quản lý form",
    ];
    const AdminLink = [
        "/admin",
        "/admin/customer-management",
        "/admin/staff-management",
        "/admin/news-management",
        "/admin/form-management",
    ];
    const funcIcon = [
        <DirectionsCar className={styles.icon} />,
        <Group className={styles.icon} />,
        <SupportAgent className={styles.icon} />,
        <Newspaper className={styles.icon} />,
        <ContactMail className={styles.icon} />,
    ];
    return (
        <div className={styles.sidebar}>
            <div className={styles.user}>
                <img
                    className={styles.avatar}
                    src={images.logoImg}
                    alt="Avatar"
                />
                <div className={styles.username}>
                    Nguyễn Thành Trung
                    <CheckCircle className={styles.usericon} />
                </div>
            </div>
            <ul className={styles.sidebar_content}>
                {AdminFunc.map((func, index) => (
                    <li className={styles.sidebar_item} key={index}>
                        <NavLink
                            to={AdminLink[index]}
                            // className={`${styles.item_link} ${
                            //     index === funcActive ? styles.isActive : ""}`}
                            className={({isActive}) => (isActive ? styles.isActive : styles.item_link)}
                            end
                            onClick={() => setFuncActive(index)}
                        >
                            {funcIcon[index]}
                            {func}
                        </NavLink>
                    </li>
                ))}
            </ul>
            <div className={styles.logout}>
                <button type="button" className={styles.logout_btn}>
                    <Logout className={styles.icon} />
                    Đăng xuất
                </button>
            </div>
        </div>
    );
}

export default AdminSidebar;
