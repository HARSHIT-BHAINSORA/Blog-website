import React from "react";
import './register.css';
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from 'axios'; 

function Register() {

    const [username , setUsername] = useState("");
    const [email , setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);


    const handleSubmit = async(e) =>{
        setError(false);
        e.preventDefault();
        try{
            const res = await axios.post("/auth/register" , {
                username ,
                email,
                password
            });
            res.data && window.location.replace("/login");    
        }catch(err){
           setError(true);
        }
       
        
    };
  return (
    <div className="register">
        <span className="registerTitle">Register</span>
        <form className="registerForm" onSubmit={handleSubmit}>
            <label>Username</label>
            <input className="registerInput" type="text" placeholder="Enter your username..."
                onChange={e =>setUsername(e.target.value)}
            />
            <label>Email</label>
            <input className="registerInput" type="text" placeholder="Enter your email..." 
               onChange={e =>setEmail(e.target.value)}
            />
            <label>Password</label>
            <input className="registerInput" type="password" placeholder="Enter your password..." 
                onChange={e =>setPassword(e.target.value)}
            />
            <button className="registerButton" type ="submit">Register</button>
        </form>
        <Link className="link" to="/login">
            <button className="registerLoginButton">Login</button>
        </Link>
       {error &&<span style={{color:"red" , marginTop : "10px"}}>Oops Something went Worng !!! </span>}
    </div>
)};

export default Register;
