import { Navigate } from "react-router-dom";

type Props = {
    children: React.ReactNode;
};

const TOKEN_KEY = "clipvault_token";

export default function GuestRoute({
    children,
}: Props) {

    const token = localStorage.getItem(TOKEN_KEY);

    if (token) {
        return <Navigate to="/dashboard" replace />;
    }

    return <>{children}</>;
}