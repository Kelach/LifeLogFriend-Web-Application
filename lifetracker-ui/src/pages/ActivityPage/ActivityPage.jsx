import "axios";
import { useState } from "react";
import ActivityFeedCard from "../../components/ActivityFeedCard/ActivityFeedCard";
export default function ActivityPage(){
    // main page after login.
    return (
        <>
        <h1>Activity Tings</h1>
        <div className="activity-feed-container">
            <ActivityFeedCard title={"Exercise"} change={0} value={0} />
            <ActivityFeedCard title={"Nutrition"} change={0} value={0} />
            <ActivityFeedCard title={"Sleep"} change={0} value={0} />
            <div className="activity-summary-card">
                <h3>activity summary tings</h3>
            </div>
                    
        </div>
        </>
    )
}