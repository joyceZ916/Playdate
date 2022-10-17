import Header from "./Header"
import Footer from "./Footer"
import '../styles/signin.css'
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const Signin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {authenticationToken, setAuthenticationToken} = useContext(UserContext);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = { username, password };
        const response = fetch('http://localhost:8080/authenticate', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        }).then(response => response.json())
            .then(data => {
                if(data.token){
                    setAuthenticationToken(data.token);
                    navigate('/playtabs');
                } else{
                    alert("Invalid credentials");
                }
        }).catch(error => {
            console.log(error);
        })

    }

    return (
        <div>
            <Header />
            <div className="signup-content signin">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="form-group signin-signup-wrapper">
                        <button type="submit" className="submitBtn button-primary">Sign in</button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default Signin