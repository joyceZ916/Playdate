import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
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
            <button onClick={handleLogout} className="tooltip">Logout
            </button>
            </div>
          ) : (
            <div className="header-buttons">
              {/* <Link to="/signup" className="tooltip">Signup
                <span className="tooltip-text">Want to become a member? Sign up here!</span>
              </Link>
              <Link to="/signin" className="tooltip">Sign in
                <span className="tooltip-text">Already a member? Please sign in here!
                </span>
              </Link> */}
              <Tooltip placement="bottom" title={signupText} arrowPointAtCenter>
                <Link to="/signup">Signup</Link>
              </Tooltip>
              <Tooltip placement="bottom" title={signinText} arrowPointAtCenter>
                <Link to="/signin">Sign in</Link>
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