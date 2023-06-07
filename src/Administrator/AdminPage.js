import { Outlet } from "react-router-dom"

export function AdminPage() {
    return (
        <div className="AdminPage">
            <div className="admin-header">
                <div className="label">Панель администрирования</div>
            </div>
            <div className="admin-content">
            <Outlet />
            </div>
        </div>
    )
}