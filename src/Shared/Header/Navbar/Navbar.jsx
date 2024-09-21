import React from 'react';
import { FaUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLogoutMutation } from '../../../slices/userApiSlice';
import { logout } from '../../../slices/authSlice';
import { toast } from 'react-toastify'; 
import { useNavigate } from 'react-router-dom';
const Navbar = () => {

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApi] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();



  const logoutHandler = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logout());
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (err) {
      toast.error(err?.data?.message || err?.message);
    }
  }

  const navItems = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/">About</Link>
      </li>
      <li>
        <Link to="/product">Product</Link>
      </li>
      <li>
        <Link to="/">Contact Us</Link>
      </li>
      <li>
        {
          userInfo ? (
            <Link to="/" onClick={logoutHandler}>Logout</Link>
          ) : (
            <Link to="/login">Login</Link>
          )
        }

      </li>
      <li>
        <Link to="cart">
          <FaShoppingCart /> Cart
          {cartItems.length > 0 && (
            <div className="badge badge-secondary">
              {cartItems.reduce((a, c) => a + c.qty, 0)}
            </div>
          )}
        </Link>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navItems}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          ProShop
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>
      <div className="navbar-end">
        {
          userInfo ? (
            <Link to="/" className='flex items-center gap-2'>
              <FaUserCircle />{(userInfo.name).toUpperCase() || userInfo.email}
            </Link>
          ) : (
            <Link to="/">
              <FaUserCircle />

            </Link>
          )
        }


      </div>
    </div>
  );
};

export default Navbar;