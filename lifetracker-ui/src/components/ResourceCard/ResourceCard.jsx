import "./ResourceCard.css";
import { Link } from "react-router-dom"
export default function ResourceCard({ linkTo, imageUrl, name, createdAt, cardDetails }) {
    const getTimeFromTimestamp = (timestamp) => {
        const dateString = new Date(createdAt).toLocaleString().split(",")
        const isToday = dateString[0] === (new Date()).toLocaleString().split(",")[0]
        const time = isToday ? dateString[1]: dateString[0]
        return time
    }
    return (
        <div className="resource-card">
            <Link to={linkTo} >
                <div className="resource-card-content box-shadow">
                    <div className="resource-card-details">
                        <div className="resource-card-details-header">
                            <h3>
                                {name}
                            </h3>
                            <div className="card-timestamp">
                                <p>
                                    {getTimeFromTimestamp(createdAt)}
                                </p>
                            </div>
                        </div>
                        <div className="resource-card-details-summary">
                            {cardDetails.map((entry, index) => {
                                return (
                                    <p key={entry.createdAt}>
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