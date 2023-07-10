import { Outlet } from "react-router-dom";
import ResourcePageHeader from "../../components/ResourcePageHeader/ResroucePageHeader";
import ForbiddenPage from "../ForbiddenPage/ForbiddenPage";
import "./ExercisePage.css";

export default function ExercisePage({ isAuthenticated }) {
    return (
        isAuthenticated ? 
        (<div className="nutrition-page-container">
            <ResourcePageHeader title="Exercise"
            imageAlt={"Cutting board with food"} />
            <Outlet />
        </div>) :
        <ForbiddenPage />

    )
}