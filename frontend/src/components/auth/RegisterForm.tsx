import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { registerUser } from "@/services/authService";

export default function RegisterForm() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleRegister() {

        if (!username || !email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        setLoading(true);
        setError("");

        try {

            await registerUser(
                username,
                email,
                password,
            );

            navigate("/login");

        } catch {

            setError("Unable to register.");

        } finally {

            setLoading(false);

        }

    }

    return (

        <Card className="w-full max-w-md p-8 space-y-6">

            <h1 className="text-3xl font-bold text-center">
                Register
            </h1>

            <Input
                placeholder="Username"
                value={username}
                onChange={(e) =>
                    setUsername(e.target.value)
                }
            />

            <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) =>
                    setEmail(e.target.value)
                }
            />

            <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                    setPassword(e.target.value)
                }
            />

            {
                error &&
                <p className="text-red-500 text-sm">
                    {error}
                </p>
            }

            <Button
                className="w-full"
                onClick={handleRegister}
                disabled={loading}
            >
                {
                    loading
                        ? "Creating Account..."
                        : "Register"
                }
            </Button>

        </Card>

    );

}