import React from 'react';
import { Link } from 'react-router-dom';


const HeaderUser = () => {
    return (
        <header className='py-1 px-5 d-flex justify-content-between' style={{ height: "70px" }}>
            <div className='col-2 h-100 logo'>
                    <Link to="/">
                         <div className='h-100 col-3' style={{ backgroundImage: `url("./design/logo1.png")`, backgroundPosition: "center", backgroundSize: "cover" }}></div>
                    </Link>
            </div>
            <nav className='d-flex justify-content-between align-items-center'>
                <ul className='list-unstyled d-flex justify-content-between align-items-center gap-5'>
                    <li><Link to="/jobs">Jobs</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/match">Match</Link></li>
                    <li><Link to="/flights">flight</Link></li>
                    {}
                    <li><Link to="/login">Log in</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default HeaderUser
