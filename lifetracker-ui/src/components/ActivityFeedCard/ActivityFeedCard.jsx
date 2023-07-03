
export default function ActivityFeedCard({title, value, change}){
    return (
        <>
        <div className="activity-feed-card-container">
            <p>title: {title}</p>
            <p>stat: {value}</p>
            <p>value change: {change}</p>
        </div>
        </>
    )
}