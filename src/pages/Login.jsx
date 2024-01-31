import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../features/auth/authSlice";

const Login = () => {
  const { isLoading, user, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formdata;

  const handlechange = (e) => {
    setformdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    dispatch(login(formdata));
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
      <h1>Login here...</h1>
      <form onSubmit={handlesubmit}>
        <input
          type="email"
          placeholder="enter your email"
          name="email"
          value={email}
          onChange={handlechange}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={password}
          onChange={handlechange}
        />
        <button>LOGIN</button>
      </form>
    </div>
  );
};

export default Login;
