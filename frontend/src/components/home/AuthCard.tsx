import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { useNavigate } from "react-router-dom";

export default function AuthCard() {

    const navigate = useNavigate();

    return (

        <Card className="p-6 text-center space-y-4">

            <h2 className="text-2xl font-semibold">

                Save your clipboards

            </h2>

            <p className="text-muted-foreground">

            Create a free account to securely save, edit and access your clipboards from anywhere.

            </p>

            <div className="flex justify-center gap-4">

                <Button
                    onClick={() => navigate("/register")}
                >
                    Sign Up
                </Button>

                <Button
                    variant="outline"
                    onClick={() => navigate("/login")}
                >
                    Login
                </Button>

            </div>

        </Card>

    );

}