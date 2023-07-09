import ApiClient from "../../../services/apiClient";
import { useEffect, useState } from "react";
import ActivityFeedCard from "../../components/ActivityFeedCard/ActivityFeedCard";
import ForbiddenPage from "../ForbiddenPage/ForbiddenPage";
import "./ActivityPage.css";
export default function ActivityPage({ user, isAuthenticated }) {

    const [resourceStats, setResourceStats] = useState({});
    console.log(resourceStats)
    // main page after login.
    useEffect(() => {
        // get all tracker stats
        const getAllStats = async () => {

            const nutritionResponse = await ApiClient.fetchResourceStats("nutrition", "calories")
            console.log("nutrition stats: ", nutritionResponse)
            // const exerciseResponse = await ApiClient.fetchResourceStats("exercise", "calories")
            // const sleepResponse = await ApiClient.fetchResourceStats("sleep", "duration")
            if (nutritionResponse.success){
                setResourceStats((initialData) => ({
                    ...initialData,
                    nutritionStats: {
                        resourceType: "nutrition",
                        statUnits: "calories",
                        stats: nutritionResponse.data.stats
                    }}))
            }
            // if (exerciseResponse.success){
            //     setResourceStats((initialData) => ({
            //         ...initialData,
            //         exerciseStats: {
            //             resourceType: "exercise",
            //             statUnits: "calories burned",
            //             stats: exerciseResponse.data.stats
            //         }}))
            // }
            // if (sleepResponse.success){
            //     setResourceStats((initialData) => ({
            //         ...initialData,
            //         sleepStats: {
            //             resourceType: "sleep",
            //             statUnits: "hours",
            //             stats: sleepResponse.data.stats
            //         }}))
            // }
        }
        getAllStats();
    }, []);
    return (
        isAuthenticated ?
            (
                <div className="activity-feed-container">
                    <div className="activity-feed-header box-shadow">
                        <h1 className="title">Welcome <span style={{ color: "var(--p-color)", textDecoration: "underline" }}>
                                  {user?.firstName}
                            </span>
                        <h2>Activity Dashboard</h2>
                        </h1>
                    </div>
                    <div className="activity-dashboard-container">
                        <div className="activity-summary-cards">
                        {Object.keys(resourceStats).map((statObjKey, index) => {
                            const statObj = resourceStats[statObjKey]

                            return (
                                <ActivityFeedCard key={statObj.resourceType} 
                                statUnits={statObj.statUnits}
                                stats={statObj.stats} 
                                resourceType={statObj.resourceType}/>
                            )
                        })}
                        {/* <ActivityFeedCard /> */}
                        {/* <ActivityFeedCard /> */}
                        </div>
                            {/* <ActivityFeedCard title={"Nutrition"} stat={s} /> */}
                        {/* <ActivityFeedCard title={"Exercise"} stat={exerciseStat} />
            <ActivityFeedCard title={"Sleep"} stat={sleepStat} /> */}
                    </div>
                </div>) :
            (
                <ForbiddenPage />
            )
    )
}