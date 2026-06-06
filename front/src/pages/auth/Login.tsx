import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginRequest } from "../../api/auth";
import { useAuthStore } from "../../stores/authStore";

export default function Login() {
    const navigate = useNavigate();

    const login = useAuthStore(
        (state) => state.login
    );

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const handleLogin = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        try {
            setLoading(true);

            const response =
                await loginRequest(
                    email,
                    password
                );

            login(
                response.user,
                response.token
            );

            navigate("/dashboard");
        } catch (error) {
            console.error(error);

            alert(
                "Invalid credentials"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="
                min-h-screen
                flex
                items-center
                justify-center
                bg-slate-100
            "
        >
            <div
                className="
                    w-full
                    max-w-md
                    bg-white
                    rounded-2xl
                    shadow-xl
                    p-8
                "
            >
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-slate-800">
                        Asset Inventory
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Sign in to continue
                    </p>
                </div>

                <form
                    onSubmit={handleLogin}
                    className="space-y-4"
                >
                    <div>
                        <label className="block mb-2 text-sm font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(
                                    e.target.value
                                )
                            }
                            className="
                                w-full
                                border
                                rounded-lg
                                px-4
                                py-3
                                focus:outline-none
                                focus:ring-2
                                focus:ring-blue-500
                            "
                            placeholder="admin@test.com"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium">
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(
                                    e.target.value
                                )
                            }
                            className="
                                w-full
                                border
                                rounded-lg
                                px-4
                                py-3
                                focus:outline-none
                                focus:ring-2
                                focus:ring-blue-500
                            "
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            w-full
                            bg-blue-600
                            hover:bg-blue-700
                            text-white
                            py-3
                            rounded-lg
                            font-medium
                            transition
                        "
                    >
                        {loading
                            ? "Signing In..."
                            : "Sign In"}
                    </button>
                </form>
            </div>
        </div>
    );
}