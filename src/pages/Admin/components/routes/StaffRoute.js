// import { Navigate } from "react-router-dom";
import FalseRoute from "../../FalseRoute";

function StaffRoute({ children }) {
    let user = JSON.parse(localStorage.getItem("user"));

    return (
        <div>
            {(user.role === "employee") ? <FalseRoute/> : children}
        </div>
    );
}

export default StaffRoute;