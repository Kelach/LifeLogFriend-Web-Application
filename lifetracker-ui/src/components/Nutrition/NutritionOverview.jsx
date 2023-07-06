import { Link } from "react-router-dom";
import "./NutritionOverview.css";
function NutritionCard({ imageUrl, name, calories, category, createdAt, quantity }) {
    const getHealthScore = (calories, quantity) => {
        /**
         * @TODO 
         * Calc health score based on calories per quantity
         * Get Link to navigate to unique nutrition page
         */
        return (
            <span style={{ color: "green" }}>Healthy</span>
        )
    }
    return (
        <div className="nutrition-card">

            <Link >
                <div className="nutrition-card-content box-shadow">
                    <div className="nutrition-card-category">
                        <h3>
                            {category}
                        </h3>
                    </div>
                    <div className="nutrition-card-details">
                        <div className="nutrition-card-details-header">
                            <h3>
                                {name}
                            </h3>
                            <div className="card-timestamp">
                                <p>
                                    {createdAt}
                                </p>
                            </div>
                        </div>
                        <div className="nutrition-card-details-summary">
                            <p>Calories: {calories}</p>
                            <p>Quantity: {quantity}</p>
                            <p>Health Score: {getHealthScore(calories, quantity)}</p>
                        </div>
                    </div>
                </div>
            </Link>

        </div>
    )
}
export default function NutritionOverview() {
    return (
        <div className="nutrition-details-section">
            <div className="add-nutrition-btn">
                <Link to={"/nutrition/create"}>
                    <button className="add-nutition-btn">
                        Add Nutition
                    </button>
                </Link>
            </div>
            <div className="nutrition-history">
                <NutritionCard name="Burger"
                    calories={"900"}
                    createdAt={"timestamp here"}
                    quantity={"quantity here"}
                    category={"Food"} />
            </div>
        </div>
    )
}