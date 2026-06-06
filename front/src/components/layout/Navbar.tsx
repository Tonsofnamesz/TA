import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

import { useAuthStore } from "../../stores/authStore";

export default function Navbar() {
    const navigate = useNavigate();

    const logout = useAuthStore(
        (state) => state.logout
    );

    const user = useAuthStore(
        (state) => state.user
    );

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <header
            className="
                h-16
                bg-white
                border-b
                shadow-sm
                px-6
                flex
                items-center
                justify-between
            "
        >
            <div>
                <h1 className="text-xl font-semibold text-slate-800">
                    Asset Inventory System
                </h1>

                <p className="text-sm text-slate-500">
                    Inventory & Warranty Management
                </p>
            </div>

            <div className="flex items-center gap-4">
                <div className="text-right">
                    <p className="font-medium text-slate-800">
                        {user?.name}
                    </p>

                    <p className="text-sm text-slate-500">
                        {user?.email}
                    </p>
                </div>

                <button
                    onClick={handleLogout}
                    className="
                        flex
                        items-center
                        gap-2
                        px-4
                        py-2
                        bg-red-500
                        hover:bg-red-600
                        text-white
                        rounded-lg
                        transition
                    "
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </div>
        </header>
    );
}