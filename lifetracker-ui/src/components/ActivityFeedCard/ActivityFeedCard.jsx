import "./ActivityFeedCard.css";
import ApiClient from "../../../services/apiClient";
import { useEffect } from "react";
export default function ActivityFeedCard({ statUnits, stats, resourceType}) {
    useEffect(() => {
        const fetchStats = async () => {
            const { data, success, statusCode} = await ApiClient.fetchResourceStats("nutrition", "calories");
            console.log(data)
        }
        fetchStats();
    }, [])

    return (
        <>

            <div className="activity-feed-card-container box-shadow">
                <div className="feed-card-header">
                    <h3>{resourceType}</h3>
                    <p>{stats.count} {stats.count > 1 ? "entries" : "entry"}</p>
                </div>
                <div className="summary-stats-container">
                    <div className="summary-stats-row  light-text-hover">
                        <p>Weekly Total:</p>
                        <p>{stats.sum} {statUnits}</p>
                    </div>
                    <div className="summary-stats-row light-text-hover">
                        <p>Weekly Average:</p>
                        <p>{stats.avg} {statUnits}</p>
                    </div>
                    <div className="summary-stats-row light-text-hover">
                        <p>Weekly Max: </p>
                        <p>{stats.max} {statUnits}</p>
                    </div>
                    <div className="summary-stats-row light-text-hover">
                        <p>Weekly Min:</p>
                        <p>{stats.min} {statUnits}</p>
                    </div>
                </div>
            </div>
        </>
    )
}