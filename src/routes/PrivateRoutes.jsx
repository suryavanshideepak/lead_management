import { useStore } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ Component }) => {
    const store = useStore()
    const token = store?.getState()?.auth?.token
    return token ? <Component /> : <Navigate to="/" />;
};
export default PrivateRoute;