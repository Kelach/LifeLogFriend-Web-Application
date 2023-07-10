import { Link } from "react-router-dom";
import { useEffect, useState } from "react"; 
import ResourceCard from "../ResourceCard/ResourceCard";
import "./SleepOverview.css";
import ApiClient from "../../../services/apiClient";
import DropdownFilter from "../DropdownFilter/DropdownFilter";

export default function SleepOverview({ user }) {
    const [sleepEntries, setSleepEntries] = useState([]);
    const [activeOption, setActiveOption] = useState("All");
    useEffect(() => {
        const getSleepEntries = async () => {
            const {success, data, statusCode} = await ApiClient.fetchEntries("sleep", user?.email);
            if (success){
                setSleepEntries(() => [...data.sleeps])
            } else{
                console.log("unable to retrieve new entries from db");
            }
            // get all sleep entries for a given user
        }
        getSleepEntries();
    }, []);

    const getCardObjFromEntry = (entry) => {
        // converts sleep entries list into card objects
        // that can be passed down to ResourceCard comp
        return {
            name: entry.name,
            created_at: entry.created_at,
            cardDetails:[
                {name: "start time", value: entry.start_time},
                {name: "end time", value: entry.end_time},
                {name: "duration (hours)", value: entry.duration},
                {name: "category", value: entry.category}
            ]
        };
    }
    const dropdownFilterOptions = ["Nap", "Bedtime", "All"];
    const onOptionsChange = (event) => {
        setActiveOption(() => event.target.value);
    }
    return (
        <div className="sleep-details-section">
            <DropdownFilter
            onOptionsChange={onOptionsChange}
            label={"Filter by Category"}
            name={"Category"}
            options={dropdownFilterOptions}/>

            <div className="add-sleep-btn">
                <Link to={"/sleep/create"}>
                    <button  className="add-sleep-btn btn-outline-large">
                        Add Sleep
                    </button>
                </Link>
            </div>
            <div className="sleep-history">
                {sleepEntries.map((entry, index) => {
                    const sleepCardObj = getCardObjFromEntry(entry);

                    return sleepCardObj.cardDetails[3].value === activeOption || activeOption === "All" ?
                     (<ResourceCard 
                        linkTo={`id/${entry.id}`} 
                        key={entry.id} 
                        {...sleepCardObj} />) :
                    (<></>)
                })
                }
            </div>
        </div>
    )
}