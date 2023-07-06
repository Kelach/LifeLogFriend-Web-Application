import { Outlet } from "react-router-dom";
import ResourcePageHeader from "../../components/ResourcePageHeader/ResroucePageHeader";
import "./NutritionPage.css";

export default function NutritionPage() {
    return (
        <div className="nutrition-page-container">
            <ResourcePageHeader title="Nutrition"
            imageFileName="food.jpg"
            imageAlt={"Cutting board with food"} />
            <Outlet />
        </div>

    )
}