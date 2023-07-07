import "./ActivityFeedCard.css";
export default function ActivityFeedCard({title, stat}){

    return (
        <>

        <div className="activity-feed-card-container">
            <h3>{title}</h3>
            <p>{stat.title}: {stat.value}</p>
            <p>Last updated: {stat.timestamp}</p>
        </div>
        </>
    )
}