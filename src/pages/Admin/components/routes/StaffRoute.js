// import { Navigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

function StaffRoute({ children }) {
    let user = JSON.parse(localStorage.getItem("user"));

    return (
        <div>
            {(user.role === "admin") ? children : <Navigate to="/dashboard" />}
        </div>
    );
}

export default StaffRoute;