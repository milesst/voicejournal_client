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
                    {/* <div className='bottom-menu-button-label'>Главная</div> */}
            </NavLink>
            <NavLink to="/schedule" className={({ isActive, isPending }) =>
                      isActive
                        ? "selected"
                        : isPending
                        ? "pending"
                        : ""
                    }>
            <AiFillCalendar className="icon" />
                    {/* <div className='bottom-menu-button-label'>Расписание</div> */}
            </NavLink>
            <NavLink to="/disciplines" className={({ isActive, isPending }) =>
                      isActive
                        ? "selected"
                        : isPending
                        ? "pending"
                        : ""
                    }>
                    <AiFillProfile className="icon" />
                    {/* <div className='bottom-menu-button-label'>Дисциплины</div> */}
            </NavLink>
            <NavLink to="/profile" className={({ isActive, isPending }) =>
                      isActive
                        ? "selected"
                        : isPending
                        ? "pending"
                        : ""
                    }>
            <AiFillSmile className="icon" />
            {/* <div className='bottom-menu-button-label'>Профиль</div> */}
            </NavLink>
        </div>
    )
}