import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import cattlelogo from "../images/cattlelogo.jpg";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:5000/login", { username, password });
            localStorage.setItem("token", response.data.token);
            navigate("/upload");
        } catch (err) {
            setError("Invalid username or password");
        }
    };

    return (
        <div >
        
       <div className={styles.title}>Cattle Health Portal <img src={cattlelogo } className={styles.logo}/></div>
              <div className={styles.background}>
              <div className={styles.form}>
            <h1>Login</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>

            <p>Don't have an account? <a href="Signup">Signup here</a></p>
            <footer>
        <p> 2024 Cattle Health Portal.</p>
    </footer>
            </div>
            </div>
        </div>
    );
};

export default Login;
