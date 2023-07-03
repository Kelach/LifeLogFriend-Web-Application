import { Routes, Route, Outlet } from "react-router-dom";
import NutritionOverview from "../../components/Nutrition/NutritionOverview";
import NutritionDetail from "../../components/Nutrition/NutritionDetail";
import NutritionNew from "../../components/Nutrition/NutritionNew";
import ResourcePageHeader from "../../components/ResourcePageHeader/ResroucePageHeader";
import "./NutritionPage.css";

export default function NutritionPage() {
    /**
     * @ TODO add image path
     */
    return (
        <div className="nutrition-page-container">
            <ResourcePageHeader title="Nutrition" imagePath="ADD IMAGE PATH" />
            <Outlet />
        </div>

    )
}