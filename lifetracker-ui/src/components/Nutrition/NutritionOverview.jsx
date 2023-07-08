import { Link } from "react-router-dom";
import { useEffect, useState } from "react"; 
import ResourceCard from "../ResourceCard/ResourceCard";
import "./NutritionOverview.css";
import ApiClient from "../../../services/apiClient";

export default function NutritionOverview({ user }) {
    const [nutritionEntries, setNutritionEntries] = useState([]);
    useEffect(() => {
        const getNutritionEntries = async () => {
            const {success, data, statusCode} = await ApiClient.getEntries("nutrition", user?.email);
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
                {
                    name: "calories",
                    value: entry.calories
                },
                {
                    name: "quantity",
                    value: entry.quantity
                },
                {
                    name: "category",
                    value: entry.category
                }
            ]
        };
    }
    return (
        <div className="nutrition-details-section">
            <div className="add-nutrition-btn">
                <Link to={"/nutrition/create"}>
                    <button  className="add-nutition-btn btn-outline-large">
                        Add Nutrition
                    </button>
                </Link>
            </div>
            <div className="nutrition-history">
                {nutritionEntries.map((entry, index) => {
                    const nutritionCardObj = getCardObjFromEntry(entry);
                    return (
                        <ResourceCard key={entry.id} {...nutritionCardObj} />
                    )
                })}
                {/* <ResourceCard name="Burger"
                    calories={"900"}
                    createdAt={"timestamp here"}
                    quantity={"quantity here"}
                    category={"Food"} /> */}
            </div>
        </div>
    )
}