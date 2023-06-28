import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { JobContext } from '../context/jobContext';
import { toast } from 'react-toastify';
import { TOKEN_KEY } from '../services/apiService';

const HeaderUser = () => {
    const nav = useNavigate();
    const {userSignOut} = useContext(JobContext);

    const onLogOut = () => {
        
        localStorage.removeItem(TOKEN_KEY);
        userSignOut();
        nav("/")
        toast.info("You logged out, see you soon...");
      }

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

                {console.log(localStorage[TOKEN_KEY])}
                {localStorage[TOKEN_KEY] ?
                    <li className="log_out col-auto d-flex align-items-center ">
                        <button onClick={onLogOut} className="btn btn-danger">Log out</button>
                    </li>
                    :
                    <li className="log_in col-auto">
                        <Link to="/login">
                            Log in </Link>|
                        <Link to="/signup"> Sign up</Link>
                    </li>
                }
                </ul>
            </nav>
        </header>
    )
}

export default HeaderUser
