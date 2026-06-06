import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

interface Props {
    children: React.ReactNode;
}

export default function ProtectedRoute({
    children,
}: Props) {
    const token = useAuthStore(
        (state) => state.token
    );

    console.log("TOKEN:", token);

    if (!token) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}