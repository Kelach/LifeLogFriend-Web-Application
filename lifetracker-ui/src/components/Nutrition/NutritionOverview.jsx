import "./NutritionOverview.css";
function NutritionCard({ imageUrl, name, calories, category, createdAt, quantity }) {
    const getHealthScore = (calories, quantity) => {
        /**
         * @TODO 
         * Calc health score based on calories per quantity
         */
        return (
            <span style={{color: "green"}}>Healthy</span>
        )
    }
    return (
        <div className="nutrition-card">
            <div className="card-timestamp">{createdAt}</div>
            <div className="nutrition-card-content">
                <div className="nutrition-card-category">
                    {category}
                </div>
                <div className="nutrition-card-details">
                    <div className="nutrition-card-details-header">
                        {name}
                    </div>
                    <div className="nutrition-card-details-summary">
                        <p>Calories: {calories}</p>
                        <p>Quantity: {quantity}</p>
                        <p>Health Score: {getHealthScore(calories, quantity)}</p>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default function NutritionOverview() {
    return (
        <div className="nutrition-details-section">
            <button className="add-nutition-button">
                Add Nutition
            </button>
            <div className="nutrition-history">
                <NutritionCard name="Burger" 
                calories={"900"} 
                createdAt={"timestamp here"} 
                quantity={"quantity here"}
                category={"Food"}/>
            </div>
        </div>
    )
}