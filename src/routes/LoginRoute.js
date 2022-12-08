import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

function LoginRoute({ children }) {
    let user = JSON.parse(localStorage.getItem("user"));
    const token = Cookies.get("token");

    return (
        <div>
            {!!token && !!user ? <Navigate to="/" /> : children}
        </div>
    );
}

export default LoginRoute;