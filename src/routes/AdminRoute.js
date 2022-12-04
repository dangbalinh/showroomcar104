import { Navigate } from "react-router-dom";

function AdminRoute({children}) {
    let user = JSON.parse(localStorage.getItem("user"));

    return ( 
        <div>
            {(!!user && ((user.role === "admin" || user.role === "employee") && localStorage.getItem("token"))) ? children : <Navigate to="/" /> } 
        </div>
     );
}

export default AdminRoute;