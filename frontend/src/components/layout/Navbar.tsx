import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Navbar() {

    const navigate = useNavigate();

    function logout() {

        localStorage.removeItem("clipvault_token");

        navigate("/login");

    }

    return (

        <div className="border-b bg-white">

            <div className="max-w-6xl mx-auto h-16 flex items-center justify-between">

                <h1 className="text-2xl font-bold">

                    ClipVault

                </h1>

                <Button
                    variant="outline"
                    onClick={logout}
                >
                    Logout
                </Button>

            </div>

        </div>

    );

}