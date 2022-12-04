import { Navigate } from "react-router-dom";

function LoginRoute({ children }) {
    let user = JSON.parse(localStorage.getItem("user"));

    return (
        <div>
            {!!user ? <Navigate to="/" /> : children}
        </div>
    );
}

export default LoginRoute;