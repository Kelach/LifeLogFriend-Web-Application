// import { } "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import "../../index.css"
// import Socials from "../Socials/Socials";
import Logo from "../../assets/logo.png";
import ApiClient from "../../../services/apiClient";

function NavLinks() {
  const NavLink = ({ linkRoute, linkText }) => {
    return (
      <li>
        <Link to={linkRoute}>
          <div className="nav-link">
            {linkText}
          </div>
        </Link>
      </li>
    )
  }
  const navLinks = [
    { linkText: "Activity", linkRoute: "/activity" },
    { linkText: "Nutrition", linkRoute: "/nutrition" },
    { linkText: "Exercise", linkRoute: "/exercise" },
    { linkText: "Sleep", linkRoute: "/sleep" },
  ];

  return (
    <ul className="links">
      {navLinks.map((navlink) => <NavLink key={navlink.linkText} {...navlink} />)}
    </ul >
  )
}
export default function Navbar( {appState, setAppState } ) {
  const navigate = useNavigate();
  const logoutUser = (event) => {
    event.preventDefault();
    localStorage.setItem("lifetracker_token", "");
    ApiClient.setToken("");
    console.log("navbar token: ", ApiClient.getToken())
    // setAppState((initialState) => ({
    //   ...initialState,
    //   isAuthenticated: false
    // }));
    // navigate("/");
  }
  return (
    <nav className="navbar" name="navigation-bar" >

      <div className="navbar-content">
        <div className="logo">
          <Link to={appState.isAuthenticated ? "/activity" : "/"}>
            <img src={Logo} alt="Life Log Friend Logo" />
          </Link>
        </div>
        <NavLinks />
        <div className="auth-btns">
          {
            appState.isAuthenticated ?
            (
              <button onClick={logoutUser} className="btn-outline-medium auth-btn">Logout</button>
            )
            : (
              <>
                <Link to={"/login"}>
                  <button className="btn-outline-medium auth-btn">Login</button>
                </Link>
                <Link to="/signup">
                  <button className="btn-outline-medium auth-btn">SignUp</button>
                </Link>
              </>
            )
          }
        </div>
        {/* <Socials /> */}
      </div>
    </nav>
  )
}