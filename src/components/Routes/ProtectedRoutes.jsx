import { useSelector } from 'react-redux';
import { Navigate } from 'react-router'

const ProtectedRoutes = ({ children }) => {

    const { isAuthenticated } = useSelector((state) => state.authData);

    if (!isAuthenticated) {
        return <Navigate to="/" replace />
    }

    return children;
}

export default ProtectedRoutes