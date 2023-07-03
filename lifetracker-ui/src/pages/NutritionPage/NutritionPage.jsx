import { Routes, Route } from "react-router-dom";
import NutritionOverview from "../../components/Nutrition/NutritionOverview";
import NutritionDetail from "../../components/Nutrition/NutritionDetail";
import NutritionNew from "../../components/Nutrition/NutritionNew";
import "./NutritionPage.css";

export default function NutritionPage() {
    return (
        <div className="nutrition-page-container">
            <div className="nutrition-header-section">
                <h1 className="resource-header-section-title">Nutrition</h1>
            </div>
            <Routes>
                <Route to={"/"} element={<NutritionOverview />} />
                <Route to={"/create"} element={<NutritionNew />} />
                <Route to={"/id/:nutritionId"} element={<NutritionDetail />} />
            </Routes>
        </div>
    )
}