import { Outlet } from "react-router-dom";
import ResourcePageHeader from "../../components/ResourcePageHeader/ResroucePageHeader";
import ForbiddenPage from "../ForbiddenPage/ForbiddenPage";


export default function SleepPage({ isAuthenticated }) {
    return (
        isAuthenticated ? 
        (<div className="nutrition-page-container">
            <ResourcePageHeader title="Sleep"
            imageAlt={"Image of a messy bed"} />
            <Outlet />
        </div>) :
        <ForbiddenPage />

    )
}