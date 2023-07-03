// import { } "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; 
import "../../index.css"
// import Socials from "../Socials/Socials";
import Logo from "../../assets/logo.png";

function NavLinks() {
  const NavLink = ({ linkRoute, linkText }) => {
    return (
      <li>
        <Link to={linkRoute}>
          <div className="social-link">
            {linkText}
          </div>
        </Link>
      </li>
    )
  }
  const navLinks = [
    { linkText: "Activity", linkRoute: "/activity" },
    { linkText: "Nutrition", linkRoute: "/nutrition" },
    // {linkText: "Home", linkRoute: "/"},
    // {linkText: "Home", linkRoute: "/"}
  ];

  return (
    <ul className="links">
      {navLinks.map((navlink) => <NavLink {...navlink} />)}
    </ul >
  )
}
export default function Navbar() {
  return (
    <nav className="navbar" name="navigation-bar" >

      <div className="navbar-content">
        <div className="logo">
          <Link to={"/"}>
            <img src={Logo} alt="Life Log Friend Logo" />
          </Link>
        </div>
        <NavLinks />

        {/* <Socials /> */}
      </div>
    </nav>
  )
}