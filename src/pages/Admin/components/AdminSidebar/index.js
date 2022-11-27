import styles from "./AdminSideBar.module.css";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import GroupIcon from "@mui/icons-material/Group";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LogoutIcon from "@mui/icons-material/Logout";

import images from "../../../../assets/image";
import { Link } from "react-router-dom";
import { useState } from "react";

function AdminSidebar() {
    const [funcActive, setFuncActive] = useState(0);

    const AdminFunc = [
        "Quản lý ô tô",
        "Quản lý khách hàng",
        "Quản lý nhân viên",
        "Quản lý tin tức",
        "Thống kê, báo cáo"
    ];
    const AdminLink = [
        "/admin/car-management",
        "/admin/customer-management",
        "/admin/staff-management",
        "/admin/news-management",
        "/admin/statis-management"
    ];
    const funcIcon = [
        <DirectionsCarIcon className={styles.icon} />,
        <GroupIcon className={styles.icon} />,
        <SupportAgentIcon className={styles.icon} />,
        <NewspaperIcon className={styles.icon} />,
        <LeaderboardIcon className={styles.icon} />
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
                    <CheckCircleIcon className={styles.usericon} />
                </div>
            </div>
            <ul className={styles.sidebar_content}>
                {AdminFunc.map((func, index) => (
                    <li className={styles.sidebar_item} key={index}>
                        <Link
                            to={AdminLink[index]}
                            className={`${styles.item_link} ${
                                index === funcActive ? styles.isActive : ""
                            }`}
                            onClick={() => setFuncActive(index)}
                        >
                            {funcIcon[index]}
                            {func}
                        </Link>
                    </li>
                ))}
            </ul>
            <div className={styles.logout}>
                <button type="button" className={styles.logout_btn}>
                    <LogoutIcon className={styles.icon} />
                    Đăng xuất
                </button>
            </div>
        </div>
    );
}

export default AdminSidebar;
