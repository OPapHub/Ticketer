import { NavbarBrand, Nav } from 'reactstrap';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar, menuRef }) => {

    return (
        <>
            <div className="container" ref={menuRef}>
                <div className="menu-header">
                    <img className="menu-close" src="menu.svg" alt="Menu" onClick={toggleSidebar} />
                    <NavbarBrand className="icon" tag={Link} to="/" onClick={toggleSidebar}>
                        <img alt="Ticketer" src="logo.ico" />
                    </NavbarBrand>
                </div>
                <div className="mob_container">
                    <Nav className="menu_list">                        
                        <a className="navigation-link" tag={Link} href="/movies/soon" onClick={toggleSidebar}>Coming Soon</a>
                        <a className="navigation-link" tag={Link} href="/movies/archive" onClick={toggleSidebar}>Archive</a>
                        <a className="navigation-link" tag={Link} href="/about" onClick={toggleSidebar}>About</a>
                        <a className="navigation-link" tag={Link} href="/help" onClick={toggleSidebar}>Help</a>
                    </Nav>
                </div>
                <div className="menu-block">
                    <div className="menu-block-heading">
                        We are in social media
                    </div>
                    <div className="menu_soc">
                        <a className="menu_soc_item" href="/" rel="nofollow" target="_blank">
                            <svg fill="none" height="28" viewBox="0 0 28 28" width="28" xmlns="http://w3.org/2000/svg">
                                <path d="M12.0422 22V14.4923H10V11.7892H12.0422V9.4804C12.0422 7.66611 13.2486 6 16.0282 6C17.1537 6 17.9859 6.10488 17.9859 6.10488L17.9203 8.62914C17.9203 8.62914 17.0716 8.6211 16.1454 8.6211C15.143 8.6211 14.9824 9.07014 14.9824 9.81544V11.7892H18L17.8687 14.4923H14.9824V22H12.0422Z" fill="white"></path>
                                <rect className="hover-border" height="27" rx="7.5" stroke="white" width="27" x="0.5" y="0.5"></rect>
                            </svg>
                            Facebook
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Sidebar