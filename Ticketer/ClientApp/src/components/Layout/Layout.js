import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import NavMenu from '../NavMenu/NavMenu';
import Sidebar from '../Sidebar/Sidebar';
import './Layout.css'

const Layout = ({ children }) => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    let menuRef = useRef();

    const location = useLocation();
    const isLoginPage = location.pathname === '/login';

    useEffect(() => {

        let handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setIsSidebarOpen(false);
            }
        };

        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        }
    });

    const toggleSidebar = () => {
        setIsSidebarOpen(prevState => !prevState);
    };

    return (
        <div className="layout">
            {isLoginPage ? (<></>) : <>
                <div className={`header ${isSidebarOpen ? 'blur' : ''}`}>
                    <NavMenu toggleSidebar={toggleSidebar} />
                </div>
                <div className={`menu ${isSidebarOpen ? 'visible' : ''}`}>
                    <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} menuRef={menuRef} />
                </div>
            </>
            }
            <div className={`mob_fix_container ${isSidebarOpen ? 'blur' : ''} ${isLoginPage ? 'no-padding-top':''}`}>
                {children}
            </div>
        </div>
    );
}

export default Layout;
