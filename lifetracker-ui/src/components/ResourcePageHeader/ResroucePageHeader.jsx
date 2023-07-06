import "./ResourcePageHeader.css";
import testImage from "../../assets/food.jpg";
export default function ResourcePageHeader({ title, imageFileName, imageAlt }) {
    // all images must be located in the assets folder
    const basePATH = "/src/assets/";
    return (
        <div className="resource-header-section">
            <h1 className="resource-header-section-title">{title || "No Title Provided" }</h1>
            <img src={basePATH + imageFileName} alt={imageAlt} />
        </div>
    )
}