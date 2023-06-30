import { Link } from "react-router-dom";
import "./LandingPage.css";
import Logo from "../../assets/LifeLogFriendLogo.png"
export default function LandingPage() {

    return (
        <div className="hero-container">
            <div className="hero-content">
                <div className="hero-header">

                    <div className="cta-text">
                        <h1>Life-Log </h1>
                        <h1>Friend</h1>
                        <p>Helping You <b>Reach Your Goals</b> Til' The End</p>
                        <Link to="/signup">
                            <button className="sign-up-button button-compact-large">Sign Up</button>
                        </Link>

                    </div>
                    <div className="hero-media floating">
                        <img src={Logo} alt="Life-Log Friend art logo" />
                    </div>
                </div>
                <div className="hero-info">
                    <nav className="info-tags-container">
                        <ul>
                            <li className="nutrtion-tag info-tag">Nutrition</li>
                            <li className="exercise-tag info-tag">Excercise</li>
                            <li className="sleep-tag info-tag">Sleep</li>
                        </ul>
                    </nav>

                </div>
            </div>

        </div>
    )
}