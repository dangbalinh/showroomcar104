import { Navigate } from "react-router-dom";

function UserRoute({ children }) {
    let user = JSON.parse(localStorage.getItem("user"));

    return (
        <div>
            {!!user ? children : <Navigate to="/" /> }
        </div>
    );
}

export default UserRoute;