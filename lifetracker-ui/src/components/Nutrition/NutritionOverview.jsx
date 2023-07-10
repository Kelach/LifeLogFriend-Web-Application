import { Link } from "react-router-dom";
import { useEffect, useState } from "react"; 
import ResourceCard from "../ResourceCard/ResourceCard";
import "./NutritionOverview.css";
import ApiClient from "../../../services/apiClient";
import DropdownFilter from "../DropdownFilter/DropdownFilter";

export default function NutritionOverview({ user }) {
    const [nutritionEntries, setNutritionEntries] = useState([]);
    const [activeOption, setActiveOption] = useState("All");
    useEffect(() => {
        const getNutritionEntries = async () => {
            const {success, data, statusCode} = await ApiClient.fetchEntries("nutrition", user?.email);
            if (success){
                setNutritionEntries(() => [...data.nutritions])
            } else{
                console.log("unable to retrieve new entries from db");
            }
            // get all nutrition entries for a given user
        }
        getNutritionEntries();
    }, []);

    const getCardObjFromEntry = (entry) => {
        // converts nutrition entries list into card objects
        // that can be passed down to ResourceCard comp
        return {
            name: entry.name,
            createdAt: entry.createdAt,
            cardDetails:[
                {name: "calories", value: entry.calories},
                {name: "quantity", value: entry.quantity},
                {name: "category", value: entry.category}
            ]
        };
    }
    const dropdownFilterOptions = ["Food", "Beverage", "Snack", "All"];
    const onOptionsChange = (event) => {
        setActiveOption(() => event.target.value);
    }
    return (
        <div className="nutrition-details-section">
            <DropdownFilter
            onOptionsChange={onOptionsChange}
            label={"Filter by Category"}
            name={"Category"}
            options={dropdownFilterOptions}/>

            <div className="add-nutrition-btn">
                <Link to={"/nutrition/create"}>
                    <button  className="add-nutrition-btn btn-outline-large">
                        Add Nutrition
                    </button>
                </Link>
            </div>
            <div className="nutrition-history">
                {nutritionEntries.map((entry, index) => {
                    const nutritionCardObj = getCardObjFromEntry(entry);

                    return nutritionCardObj.cardDetails[2].value === activeOption || activeOption === "All" ?
                     (<ResourceCard 
                        linkTo={`id/${entry.id}`} 
                        key={entry.id} 
                        {...nutritionCardObj} />) :
                    (<></>)
                })
                }
            </div>
        </div>
    )
}