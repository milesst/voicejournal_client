import DisciplinesPage from "../Disciplines/DisciplinesPage.js"
import { Routes, Route, Link, Router, Outlet, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";

export default function ContentWrap() {
    const location = useLocation();
    return (
        <div className="ContentWrap">
            {/* <div className="ContentHeader">
                <div className="content-header-label">Дисциплины</div>
            </div> */}
            {/* <div className="Content"> */}
                {/* <Outlet /> */}
                    <Outlet />
            {/* </div> */}
        </div>
    )
}