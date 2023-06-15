import { AiOutlineArrowLeft } from "react-icons/ai"
import { NavLink, Outlet, matchRoutes, useLocation } from "react-router-dom"

export function AdminPage() {
    const location = useLocation()
    const routes = [{ path: "/admin" }]
    console.log(matchRoutes(routes, location))

    return (
        <div className="AdminPage">
            <div className="admin-header">
                {!matchRoutes(routes, location) ? <NavLink className={'back-link'} to="/admin"><AiOutlineArrowLeft /></NavLink> : ''}
                <div className="label">Панель администрирования</div>
            </div>
            <div className="admin-content">
            <Outlet />
            </div>
        </div>
    )
}