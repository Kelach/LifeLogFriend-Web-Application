import ApiClient from "../../../services/apiClient";
import { useEffect, useState } from "react";
import ActivityFeedCard from "../../components/ActivityFeedCard/ActivityFeedCard";
import ForbiddenPage from "../ForbiddenPage/ForbiddenPage";
import "./ActivityPage.css";
export default function ActivityPage({ user, isAuthenticated }) {

    const [resourceStats, setResourceStats] = useState({
        nutritionStat: null,
        exerciseStat: null,
        sleepStat: null
    });

    // // main page after login.
    // useEffect(() => {
    //     // get all tracker stats
    //     const nutritionResponse = await ApiClient.fetchResourceStats("nutrition")
    //     const exerciseResponse = await ApiClient.fetchResourceStats"exercise")
    //     const sleepResponse = await ApiClient.fetchResourceStats("sleep")

    //     setResourceStats((initialData) => ({
    //         ...initialData,
    //         nutritionStat: {
    //             text: "Total calories eaten",
    //             value: nutritionResponse.data.stat
    //         },
    //         exerciseStat: {
    //             text: "Total minutes of exercise",
    //             value: exerciseResponse.data.stat
    //         },
    //         sleepStat: {
    //             text: "Average hours of sleep",
    //             value: sleepResponse.data.stat
    //         })
    //         )
    // }, []);
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
                        <ActivityFeedCard />
                        <ActivityFeedCard />
                        <ActivityFeedCard />
                        </div>
                            {/* <ActivityFeedCard title={"Nutrition"} stat={nutritionStat} /> */}
                        {/* <ActivityFeedCard title={"Exercise"} stat={exerciseStat} />
            <ActivityFeedCard title={"Sleep"} stat={sleepStat} /> */}
                    </div>
                </div>) :
            (
                <ForbiddenPage />
            )
    )
}