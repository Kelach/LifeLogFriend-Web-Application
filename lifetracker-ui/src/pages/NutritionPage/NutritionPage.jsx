import { Outlet } from "react-router-dom";
import ResourcePageHeader from "../../components/ResourcePageHeader/ResroucePageHeader";
import ForbiddenPage from "../ForbiddenPage/ForbiddenPage";


export default function NutritionPage({ isAuthenticated }) {
    return (
        isAuthenticated ? 
        (<div className="nutrition-page-container">
            <ResourcePageHeader title="Nutrition"
            imageFileName="food.jpg"
            imageAlt={"Cutting board with food"} />
            <Outlet />
        </div>) :
        <ForbiddenPage />

    )
}