import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
import cattlelogo from "../images/cattlelogo.jpg";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            await axios.post("http://localhost:5000/signup", { username, password });
            navigate("/");
        } catch (err) {
            setError("Signup failed. Username may already exist.");
        }
    };

    return (
        <div >
           
                <div className={styles.title}>Cattle Health Portal <img src={cattlelogo} className={styles.logo}/></div>
                
             <div className={styles.background}>
                          
                <div className={styles.form}>
            <h1>Signup</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSignup}>Signup</button>
            <footer>
        <p> 2024 Cattle Health Portal.</p>
    </footer>
            </div>
            </div>
        </div>
    );
};

export default Signup;
