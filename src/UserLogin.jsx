import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import './Create.css';

const UpdateUsers = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const submit = (e) => {
    let Name = "Admin", Username = "ad";
    e.preventDefault();
    axios.post("https://nebulla-backend.onrender.com/fetch", { email, password })
      .then(result => {
        Name = result.data.name;
        Username = result.data.userName;
        let userData = {
          Name,
          Username
        };
        localStorage.setItem('userData', JSON.stringify(userData));
        navigate("/main");
      })
      .catch(error => {
        window.alert("Invalid Email / Password");
      })

  }


  // let userDate={
  //   Name,
  //   Username
  // };
  // localStorage.json

  return (
    <div className="main2">
      <center>
        <div className="container2">
          <center>
            <div className="logo"></div>
          </center>
          <h2>Login</h2>
          <form onSubmit={submit}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit">LOGIN</button>
          </form>
          <p style={{ color: "black" }} >Are you a new user? <Link to={"/register"}>Register</Link></p>
        </div>
        {/* <div className='body2'>
        <img style={{ height: "710px", width: "auto" }} src='https://images.unsplash.com/photo-1531950769935-13a6e50e10e1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'></img>
      </div> */}
      </center>
    </div>

  )
}

export default UpdateUsers;