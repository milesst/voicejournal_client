import { AnimatePresence } from "framer-motion";
import DisciplinesPage from "../Disciplines/DisciplinesPage.js"
import { Routes, Route, Link, Router, Outlet, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { motion } from "framer-motion"

export default function ContentWrap() {
    const location = useLocation();
    return (
        <div className="ContentWrap">
                    {/* <Outlet /> */}
                    <AnimatePresence mode="popLayout">
                    <motion.div
                        className="page-wrap"
                        key={location.pathname}
                        initial={{ x: 25, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -25, opacity: 0 }}
                    >
                        <Outlet />
                    </motion.div>
                    </AnimatePresence>
        </div>
    )
}