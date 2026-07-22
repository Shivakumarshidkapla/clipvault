import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { loginUser } from "@/services/authService";
import { saveToken } from "@/utils/auth";

export default function LoginForm() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleLogin() {

        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        setLoading(true);
        setError("");

        try {

            const result = await loginUser(
                email,
                password,
            );

            saveToken(result.access_token);

            navigate("/dashboard");

        } catch {

            setError("Invalid email or password.");

        } finally {

            setLoading(false);

        }

    }

    return (

        <Card className="w-full max-w-md p-8 space-y-6">

            <h1 className="text-3xl font-bold text-center">
                Login
            </h1>

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
                onClick={handleLogin}
                disabled={loading}
            >
                {
                    loading
                        ? "Signing in..."
                        : "Login"
                }
            </Button>

        </Card>

    );

}