import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div>
            <nav className="bg-gradient-to-r from-teal-400 to-teal-600 p-4 shadow-lg rounded-b-xl flex justify-between items-center">
                {/* Logo */}
                <Link className="text-white text-3xl font-extrabold tracking-wide hover:text-teal-200 transition duration-300" to="/">Navbar</Link>

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-8">
                    <li>
                        <Link className="text-white text-lg font-medium hover:text-teal-200 transition duration-300" to='/admin'>Home</Link>
                    </li>
                    <li>
                        <Link className="text-white text-lg font-medium hover:text-teal-200 transition duration-300" to='/admin/product'>Product</Link>
                    </li>
                    <li>
                        <Link className="text-white text-lg font-medium hover:text-teal-200 transition duration-300" to='/admin/order'>Order</Link>
                    </li>
                    <li>
                        <Link className="text-white text-lg font-medium hover:text-teal-200 transition duration-300" to='/admin/user'>User</Link>
                    </li>
                    <li>
                        <Link className="text-white text-lg font-medium hover:text-teal-200 transition duration-300" to='/admin/return-request'>Return Order's Request</Link>
                    </li>
                </ul>

                {/* Search Form
                <form className="flex items-center space-x-4">
                    <input className="px-4 py-2 rounded-full text-gray-700 border-2 border-gray-300 focus:ring-2 focus:ring-teal-500 transition duration-300" type="text" placeholder="Search..." />
                    <button className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-500 focus:outline-none transition duration-300 transform hover:scale-105" type="submit">Search</button>
                </form> */}

                {/* Hamburger Icon for Mobile */}
                <button onClick={toggleMenu} className="md:hidden text-white p-2 rounded-md hover:bg-teal-500 focus:outline-none transition duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </nav>

            {/* Mobile Menu */}
            <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-teal-700 p-4 rounded-b-xl`}>
                <ul className="flex flex-col space-y-4">
                    <li>
                        <Link className="text-white text-lg font-medium hover:text-teal-200 transition duration-300" to='/admin'>Home</Link>
                    </li>
                    <li>
                        <Link className="text-white text-lg font-medium hover:text-teal-200 transition duration-300" to='/admin/product'>Product</Link>
                    </li>
                    <li>
                        <Link className="text-white text-lg font-medium hover:text-teal-200 transition duration-300" to='/admin/order'>Order</Link>
                    </li>
                    <li>
                        <Link className="text-white text-lg font-medium hover:text-teal-200 transition duration-300" to='/admin/user'>User</Link>
                    </li>
                    <li>
                        <Link className="text-white text-lg font-medium hover:text-teal-200 transition duration-300" to='/admin/return-request'>Return Order's Request</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar;
