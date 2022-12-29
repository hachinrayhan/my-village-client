import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const Navbar = () => {
    const { user, signOutUser } = useContext(AuthContext);

    const handleSignOut = () => {
        signOutUser()
            .then(() => {
                toast('Sign out successful')
            })
            .catch(err => console.log(err))
    }

    const navItems = <>
        <li><Link to={'/'}>Home</Link></li>
        <li><Link to={'/media'}>Media</Link></li>
        <li><Link>Message</Link></li>
        <li><Link>My Posts</Link></li>
        <li><Link to={'about'}>About</Link></li>
        {
            user?.uid ?
                <li><button onClick={handleSignOut}>SignOut</button></li>
                : <li><Link to={'/login'}>Login</Link></li>
        }
    </>
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {navItems}
                    </ul>
                </div>
                <Link to={'/'} className="btn btn-ghost normal-case text-xl">My Village</Link>
            </div>
            <div className="navbar-end hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;