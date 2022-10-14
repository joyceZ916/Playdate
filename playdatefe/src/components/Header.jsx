import { Link } from "react-router-dom";
import '../styles/Header.css';

const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="header">
        <h1><Link to="/">Playdate</Link></h1>
        <div className="header-buttons">
            <Link to="/signup" className="tooltip">Signup
              <span className="tooltip-text">Want to become a member? Sign up here!</span>
            </Link>
            <Link to="/signin" className="tooltip">Sign in
            <span className="tooltip-text">Already a member? Please sign in here!
</span>
            </Link>
        </div>
        </div>
        </div>
    </header>
  )
}

export default Header