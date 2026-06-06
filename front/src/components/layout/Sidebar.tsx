import {
    LayoutDashboard,
    Building2,
    Users,
    Truck,
    Laptop,
    ClipboardList,
    FileBarChart,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
    const location = useLocation();

    const linkClass = (path: string) =>
        `
        flex
        items-center
        gap-3
        px-3
        py-2
        rounded-lg
        transition
        ${
            location.pathname === path
                ? "bg-slate-700 text-white"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
        }
    `;

    return (
        <aside
            className="
                w-64
                bg-slate-900
                text-white
                min-h-screen
                p-5
                shadow-xl
            "
        >
            <h1 className="text-2xl font-bold mb-8">
                Asset Manager
            </h1>

            <nav className="flex flex-col gap-2">
                <Link
                    to="/dashboard"
                    className={linkClass("/dashboard")}
                >
                    <LayoutDashboard size={18} />
                    Dashboard
                </Link>

                <div className="mt-6 mb-2 text-xs uppercase tracking-wider text-slate-400">
                    Master Data
                </div>

                <Link
                    to="/sites"
                    className={linkClass("/sites")}
                >
                    <Building2 size={18} />
                    Sites
                </Link>

                <Link
                    to="/departments"
                    className={linkClass("/departments")}
                >
                    <Users size={18} />
                    Departments
                </Link>

                <Link
                    to="/suppliers"
                    className={linkClass("/suppliers")}
                >
                    <Truck size={18} />
                    Suppliers
                </Link>

                <Link
                    to="/device-types"
                    className={linkClass("/device-types")}
                >
                    <Laptop size={18} />
                    Device Types
                </Link>

                <div className="mt-6 mb-2 text-xs uppercase tracking-wider text-slate-400">
                    Asset Management
                </div>

                <Link
                    to="/assets"
                    className={linkClass("/assets")}
                >
                    <Laptop size={18} />
                    Assets
                </Link>

                <Link
                    to="/assignments"
                    className={linkClass("/assignments")}
                >
                    <ClipboardList size={18} />
                    Assignments
                </Link>

                <Link
                    to="/reports"
                    className={linkClass("/reports")}
                >
                    <FileBarChart size={18} />
                    Reports
                </Link>
            </nav>
        </aside>
    );
}