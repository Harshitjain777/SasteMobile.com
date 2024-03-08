import '../App.css';
import React from 'react';
import { useState } from 'react';
import {Link , useNavigate} from 'react-router-dom';


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const auth=localStorage.getItem('user');
    const obj = JSON.parse(auth);
    let name="User"
    if(obj){
        name = obj.name;
    }
    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };
    const navigate=useNavigate();
    const Logout=()=>{
        localStorage.clear();
        navigate('/signup');
    }

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <div className="navbar-logo">SastePhone.com</div>
                    <ul className={isOpen ? 'navbar-menu active' : 'navbar-menu'}>
                        <li className="navbar-item">
                            <Link to="/" className="navbar-link">Home</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/addproduct" className="navbar-link">Add Product</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/yourproducts" className="navbar-link">Your Products</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/contact" className="navbar-link">Contact</Link>
                        </li>
                        <li className="navbar-item">
                        {
                            auth?<Link onClick={Logout} className="navbar-link" to='/signup'>Logout {'('+name+')'}</Link>: <Link to="/signup" className="navbar-link">SignUp</Link>
                        }
                           
                        </li>
                        <li className="navbar-item">
                        {
                            auth?<Link></Link>:<Link to="/login" className="navbar-link">Login</Link>
                        }
                           
                        </li>
                    </ul>
                    <div className="navbar-toggle" onClick={toggleNavbar}>
                        <i className={isOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;