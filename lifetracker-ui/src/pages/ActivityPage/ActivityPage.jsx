import ApiClient from "../../../services/apiClient";
import { useEffect, useState } from "react";
import ActivityFeedCard from "../../components/ActivityFeedCard/ActivityFeedCard";
export default function ActivityPage( { user } ){
    // const [resourceStats, setResourceStats] = useState({
    //     nutritionStat: null,
    //     exerciseStat: null,
    //     sleepStat: null
    // });

    // // main page after login.
    // useEffect(() => {
    //     // get all tracker stats
    //     const nutritionResponse = await ApiClient.getSum("nutrition", "calories", user.email)
    //     const exerciseResponse = await ApiClient.getSum("exercise", "duration", user.email)
    //     const sleepResponse = await ApiClient.getAvergae("sleep", "duration", user.email)

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
        <>
        <h1>Welcome {user.firstName} </h1>
        <h2>Activity Tings</h2>
        {/* <div className="activity-feed-container">
            <ActivityFeedCard title={"Exercise"} stat={exerciseStat} />
            <ActivityFeedCard title={"Nutrition"} stat={nutritionStat} />
            <ActivityFeedCard title={"Sleep"} stat={sleepStat} />
        </div> */}
        </>
    )
}