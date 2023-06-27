// import { } "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import "../../index.css"
import Socials from "../Socials/Socials";
import FittyLogo from "../../assets/fitty.png";

function NavLinks() {
  const NavLink = ({linkRoute, linkText}) => {
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
    {linkText: "Activity", linkRoute: "/activity"},
    {linkText: "Nutrition", linkRoute: "/nutrition"},
    // {linkText: "Home", linkRoute: "/"},
    // {linkText: "Home", linkRoute: "/"}
  ];

  return (
    <ul className="links">
      {navLinks.map((navlink) => <NavLink {...navlink} />)}
    </ul >
  )
}
function Logo() {
  return (
    <div className="logo">
      <a href="/">
        <img src={FittyLogo} alt="Fitty logo" />
      </a>
    </div>
  )
}

export default function Navbar() {
  return (
    <nav className="navbar" name="navigation-bar" >
      <div className="navbar-content">
        <Logo />
        <NavLinks />
        {/* <Socials /> */}
      </div>
    </nav>
  )
}