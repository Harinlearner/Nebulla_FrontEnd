import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import './Create.css';
import { Link } from 'react-router-dom';
const UpdateUsers = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const navigate = useNavigate();
    const submit = (e) => {
        e.preventDefault();
        axios.post("https://nebulla-backend.onrender.com/create", { name, userName, password, email })
            .then(result => {
                console.log(result);
                navigate("/main")
            })
            .catch((error) => {
                window.alert("Redirecting to Login");
                navigate("/login")
            });
    }
    return (
        <div className='main1'>
            <div className='container1'>
                <center>
                    <div className="logo"></div>
                </center>

                <h2>Register</h2>
                <form onSubmit={submit}>
                    <div className="input-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" value={userName} onChange={(e) => setUserName(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit">Register</button>
                </form>
                <p style={{color:"black"}}>Already have an account? <Link to={"login"}>Login</Link></p>
            </div>
            <div className='body'>
                <img style={{ height: "710px", width: "auto" }} src='https://images.unsplash.com/photo-1531950769935-13a6e50e10e1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'></img>
            </div>
        </div>
    )
}

export default UpdateUsers;