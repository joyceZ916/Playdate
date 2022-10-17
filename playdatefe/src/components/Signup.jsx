import { useState } from "react";
import Header from "./Header"
import Footer from "./Footer"
import '../styles/signup.css'

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = { username, password };
        console.log(user);

        fetch('http://localhost:8080/register', {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(user)
        }).then(() => 
            console.log('new user added')
        )
    }

    return (
        <div>
            <Header />
            <div className="signup-content">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" placeholder="Enter username" required value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="form-group signin-signup-wrapper">
                        <button type="submit" className="submitBtn button-primary">Signup</button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default Signup