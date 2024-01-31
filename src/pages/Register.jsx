import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registeruser } from "../features/auth/authSlice";

const Register = () => {
  const { isLoading, user, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formdata, setformdata] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const { name, email, password, confirmpassword } = formdata;
  // console.log(formdata);
  const handlechange = (e) => {
    setformdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };
  const handlesubmit = (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      toast.error("password not match");
    }else{
      dispatch(registeruser(formdata));
    }
    setformdata({
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
    });
  };

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/");
    }
    if (isError && message) {
      toast.error(message);
    }
  }, [user, isError, message, isSuccess]);

  if (isLoading) {
    return <h1>loading.....</h1>;
  }
  return (
    <div className="loginpg">
      <h1>Register</h1>
      <form onSubmit={handlesubmit}>
        <input
          type="text"
          placeholder="enter your name"
          required
          onChange={handlechange}
          name="name"
          value={name}
        />
        <input
          type="email"
          placeholder="enter your email"
          onChange={handlechange}
          name="email"
          value={email}
        />
        <input
          type="password"
          placeholder="enter your password"
          onChange={handlechange}
          name="password"
          value={password}
        />
        <input
          type="password"
          placeholder="confirm password"
          onChange={handlechange}
          name="confirmpassword"
          value={confirmpassword}
        />
        <button>SIGNUP</button>
      </form>
    </div>
  );
};

export default Register;
