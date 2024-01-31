import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutuser } from "../features/auth/authSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);

 const dispatch= useDispatch()
 const navigate= useNavigate()

 const handlelogout=()=>{
  dispatch(logoutuser())
  navigate("/login")
 }

  return (
    <nav className="navbar">
      <Link to={"/"}>
        <h2>AUTH app</h2>
      </Link>
      <span id="btnauth">
        {!user ? (
          <>
            <Link to={"/Login"}>LOGIN</Link>
            <Link to={"/Register"}>SIGNUP</Link>
          </>
        ) : (
          <button onClick={handlelogout}>LOGOUT</button>
        )}
      </span>
    </nav>
  );
};

export default Navbar;
