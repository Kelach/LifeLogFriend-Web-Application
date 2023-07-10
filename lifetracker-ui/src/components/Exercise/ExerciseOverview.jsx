import { Link } from "react-router-dom";
import { useEffect, useState } from "react"; 
import ResourceCard from "../ResourceCard/ResourceCard";
import "./ExerciseOverview.css";
import ApiClient from "../../../services/apiClient";
import DropdownFilter from "../DropdownFilter/DropdownFilter";

export default function ExerciseOverview({ user }) {
    const [exerciseEntries, setExerciseEntries] = useState([]);
    const [activeOption, setActiveOption] = useState("All");
    useEffect(() => {
        const getExerciseEntries = async () => {
            const {success, data, statusCode} = await ApiClient.fetchEntries("exercise", user?.email);
            if (success){
                setExerciseEntries(() => [...data.exercises])
            } else{
                console.log("unable to retrieve new entries from db");
            }
            // get all exercise entries for a given user
        }
        getExerciseEntries();
    }, []);

    const getCardObjFromEntry = (entry) => {
        // converts exercise entries list into card objects
        // that can be passed down to ResourceCard comp
        return {
            name: entry.name,
            createdAt: entry.createdAt,
            cardDetails:[
                {name: "calories burned", value: entry.caloriesBurned},
                {name: "duration (hours)", value: (parseInt(entry.duration) / 3600).toFixed(2)},
                {name: "category", value: entry.category}
            ]
        };
    }
    const dropdownFilterOptions = ["Sports", "Workout", "All"];
    const onOptionsChange = (event) => {
        setActiveOption(() => event.target.value);
    }
    return (
        <div className="exercise-details-section">
            <DropdownFilter
            onOptionsChange={onOptionsChange}
            label={"Filter by Category"}
            name={"Category"}
            options={dropdownFilterOptions}/>

            <div className="add-exercise-btn">
                <Link to={"/exercise/create"}>
                    <button  className="add-exercise-btn btn-outline-large">
                        Add Exercise
                    </button>
                </Link>
            </div>
            <div className="exercise-history">
                {exerciseEntries.map((entry, index) => {
                    const exerciseCardObj = getCardObjFromEntry(entry);

                    return exerciseCardObj.cardDetails[2].value === activeOption || activeOption === "All" ?
                     (<ResourceCard 
                        linkTo={`id/${entry.id}`} 
                        key={entry.id} 
                        {...exerciseCardObj} />) :
                    (<></>)
                })
                }
            </div>
        </div>
    )
}