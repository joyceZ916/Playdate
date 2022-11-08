import { useContext } from "react";
import { Link, useNavigate, Route } from "react-router-dom";
import { UserContext } from "../App";
import 'antd/dist/antd.css'; 
import { Tooltip } from 'antd';
import '../styles/Header.css';
const signupText = <span>Want to become a member? Sign up here!</span>;
const signinText = <span>Already a member? Please sign in here!</span>;
const Header = () => {
  const navigate = useNavigate();

  const { authenticationToken, setAuthenticationToken } = useContext(UserContext);

  const handleLogout = (e) => {
    e.preventDefault();
    setAuthenticationToken(null);
    navigate("/");
  }


  return (
    <header>
      <div className="container">
        <div className="header">
          <h1><Link to="/">Playdate</Link></h1>
          {authenticationToken?.length > 0 ? (
            <div className="header-buttons">
              <Link to="/playtabs">Playdates</Link>
            <button onClick={handleLogout} className="tooltip">Logout
            </button>
            </div>
          ) : (
            <div className="header-buttons">
              <Tooltip placement="bottom" title={signupText} arrowPointAtCenter>
                <Link to="/signup" className="tooltip">Sign up</Link>
              </Tooltip>
              <Tooltip placement="bottomRight" title={signinText} arrowPointAtCenter>
                <Link to="/signin" className="tooltip">Sign in</Link>
              </Tooltip>
            </div>
          )

          }

        </div>
      </div>
    </header>
  )
}

export default Header