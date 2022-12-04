import { Navigate } from "react-router-dom";

function AdminRoute({children}) {
    let user = JSON.parse(localStorage.getItem("user"));
    console.log(user.role);

    return ( 
        <div>
            {((user.role === "admin" || user.role === "employee") && localStorage.getItem("token")) ? children : <Navigate to="/" /> } 
        </div>
     );
}

export default AdminRoute;