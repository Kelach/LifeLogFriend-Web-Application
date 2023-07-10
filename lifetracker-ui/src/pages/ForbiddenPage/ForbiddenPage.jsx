import "./ForbiddenPage.css";
import { Link } from "react-router-dom";
export default function ForbiddenPage({ noPermission }) {
    return (
        <>
            <div className="forbidden-page-container">
                <h1>Access Forbidden</h1>
                <span className="material-icons">block</span>

                {noPermission ?
                    (<h2>You do not have permission to view this page...</h2>)
                    :
                    (<h2>  <Link to="/">Login/Signup</Link> to see your life-log stats!</h2>)}
            </div>
        </>
    )
}