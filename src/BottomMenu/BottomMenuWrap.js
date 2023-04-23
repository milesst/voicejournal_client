import {AiFillHome, AiFillCalendar, AiFillProfile, AiFillSmile} from "react-icons/ai"
import { Link, NavLink } from "react-router-dom";
export default function BottomMenuWrap() {
    return(
        <div className="BottomMenuWrap">
            <NavLink to="/" className={({ isActive, isPending }) =>
                      isActive
                        ? "selected"
                        : isPending
                        ? "pending"
                        : ""
                    }><AiFillHome className="icon" />
            </NavLink>
            <NavLink to="/schedule" className={({ isActive, isPending }) =>
                      isActive
                        ? "selected"
                        : isPending
                        ? "pending"
                        : ""
                    }>
            <AiFillCalendar className="icon" /></NavLink>
            <NavLink to="/disciplines" className={({ isActive, isPending }) =>
                      isActive
                        ? "selected"
                        : isPending
                        ? "pending"
                        : ""
                    }>
                    <AiFillProfile className="icon" />
            </NavLink>
            <NavLink to="/profile" className={({ isActive, isPending }) =>
                      isActive
                        ? "selected"
                        : isPending
                        ? "pending"
                        : ""
                    }>
            <AiFillSmile className="icon" /></NavLink>
        </div>
    )
}