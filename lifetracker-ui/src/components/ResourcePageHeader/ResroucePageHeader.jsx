import "./ResourcePageHeader.css";
import FoodImage from  "../../assets/food.jpg";
import BikePath from  "../../assets/bikepath.jpg";
import SleepingBed from  "../../assets/bed.jpg";
// import foodImage from  "../../assets/food.jpg";
// import foodImage from  "../../assets/food.jpg";
export default function ResourcePageHeader({ title, imageAlt }) {
    const imagesMap = {
        "Nutrition" : FoodImage,
        "Exercise" : BikePath,
        "SleepingBed" : SleepingBed
    }
    let ImageSRC = imagesMap[title]
    console.log(ImageSRC)
    // all images must be located in the assets folder
    return (
        <div className="resource-header-section">
            <h1 className="resource-header-section-title">{title || "No Title Provided" }</h1>
            <img src={ImageSRC} alt={imageAlt} />
        </div>
    )
}