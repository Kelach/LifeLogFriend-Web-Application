import "./ResourceCard.css";
import { Link } from "react-router-dom"
import { getTimeFromTimestamp } from "../../utils/timeUtils.js"
export default function ResourceCard({ linkTo, imageUrl, name, created_at, cardDetails }) {
    return (
        <div className="resource-card" key={linkTo}>
            <Link to={linkTo} >
                <div className="resource-card-content box-shadow">
                    <div className="resource-card-details">
                        <div className="resource-card-details-header">
                            <h3>
                                {name}
                            </h3>
                            <div className="card-timestamp">
                                <p>
                                    {getTimeFromTimestamp(created_at)}
                                </p>
                            </div>
                        </div>
                        <div className="resource-card-details-summary">
                            {cardDetails.map((entry, index) => {
                                return (
                                    <p key={`${entry.createdAt} ${index}`}>
                                        <span key={`${entry.name}${index}`} style={{ textTransform: "capitalize" }}>
                                            {entry.name}:</span> {entry.value}
                                    </p>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </Link>

        </div>
    )
}