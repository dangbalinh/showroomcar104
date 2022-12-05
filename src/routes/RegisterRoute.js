import { Navigate } from "react-router-dom";

function RegisterRoute({ children }) {
    let user = JSON.parse(localStorage.getItem("user"));

    return (
        <div>
            {!!user ? <Navigate to="/" /> : children}
        </div>
    );
}

export default RegisterRoute;