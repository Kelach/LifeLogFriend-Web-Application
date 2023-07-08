import "./ResourcePageHeader.css";
import FoodImage from  "../../assets/food.jpg";
// import foodImage from  "../../assets/food.jpg";
// import foodImage from  "../../assets/food.jpg";
export default function ResourcePageHeader({ title, imageFileName, imageAlt }) {
    const imageSRC = FoodImage
    // all images must be located in the assets folder
    return (
        <div className="resource-header-section">
            <h1 className="resource-header-section-title">{title || "No Title Provided" }</h1>
            <img src={imageSRC} alt={imageAlt} />
        </div>
    )
}