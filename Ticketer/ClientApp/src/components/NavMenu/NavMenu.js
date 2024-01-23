import React from 'react';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { getUser, setUser } from './../../userConfig';

const NavMenu = ({ toggleSidebar }) => {    

    const handleLogOut = () => {
        setUser(null);
    }

    return (
        <>
            <img className="menu-btn" src="menu.svg" alt="Menu" onClick={toggleSidebar} />
            <a className="logo" href="/">
                <img src="logo.ico" alt="Ticketer" />
            </a>
            {getUser() == null ? (
                <Link className="lk_link" to='/login'>
                    Log In
                    <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
                        <g fill="none" fillRule="evenodd">
                            <path d="M0 0h30v30H0z"></path>
                            <path d="M15.064 9.614a1 1 0 0 0 .229 1.093L18.586 14H8a1 1 0 1 0 0 2h10.586l-3.293 3.293a1 1 0 1 0 1.414 1.414l4.912-4.912a1 1 0 0 0-.002-1.592l-4.91-4.91a1 1 0 0 0-1.643.321z" fill="#FFF" fillRule="nonzero"></path>
                        </g>
                    </svg>
                </Link>
            ) :
                (
                    <Link className="lk_link" to='/' onClick={handleLogOut}>
                        Log Out
                        <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
                            <g fill="none" fillRule="evenodd">
                                <path d="M0 0h30v30H0z"></path>
                                <path d="M15.064 9.614a1 1 0 0 0 .229 1.093L18.586 14H8a1 1 0 1 0 0 2h10.586l-3.293 3.293a1 1 0 1 0 1.414 1.414l4.912-4.912a1 1 0 0 0-.002-1.592l-4.91-4.91a1 1 0 0 0-1.643.321z" fill="#FFF" fillRule="nonzero"></path>
                            </g>
                        </svg>
                    </Link>
                )
            }
            {getUser() == null ? (<></>) : (
                <Link className="lk_link" to="/cabinet">
                    Profile
                    <img src="ava_temp1.svg" alt="profile"></img>
                </Link>
            )
            }
        </>
    );
}
export default NavMenu