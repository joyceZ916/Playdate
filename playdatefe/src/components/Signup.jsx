import Header from "./Header"
import Footer from "./Footer"
import '../styles/signup.css'

const Signup = () => {
  return (
    <div>
        <Header/>
            <div className="signup-content">
                <form>
                    <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" placeholder="Enter username" required/>
                    </div>
                    <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" placeholder="Enter password" required/>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="submitBtn">Signup</button>
                    </div>
                </form>
            </div>
        <Footer/>
    </div>
  )
}

export default Signup