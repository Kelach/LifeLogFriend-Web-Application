import "./ForbiddenPage.css";
import { Link } from "react-router-dom";
export default function ForbiddenPage() {
    return (
        <>
            <div className="forbidden-page-container">
                <h1>Access Forbidden</h1>
                <span className="material-icons">block</span>
                <h2> <Link to="/">Login/Signup</Link> to see your life-log stats!</h2>
            </div>
        </>
    )
}