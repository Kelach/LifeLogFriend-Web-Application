import "./ActivityFeedCard.css";
export default function ActivityFeedCard() {

    return (
        <>

            <div className="activity-feed-card-container box-shadow">
                <div className="feed-card-header">
                    <h3>Nutrition</h3>
                    <p>XX entries/entry</p>
                </div>
                <div className="summary-stats-container">
                    <div className="summary-stats-row">
                        <p>Weekly Total:</p>
                        <p>value</p>
                    </div>
                    <div className="summary-stats-row">
                        <p>Weekly Average:</p>
                        <p>value</p>
                    </div>
                    <div className="summary-stats-row">
                        <p>Weekly Max: </p>
                        <p>value</p>
                    </div>
                    <div className="summary-stats-row">
                        <p>Weekly Min:</p>
                        <p>value</p>
                    </div>
                </div>
            </div>
        </>
    )
}