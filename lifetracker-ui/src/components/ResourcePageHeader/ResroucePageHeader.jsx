import "./ResourcePageHeader.css";
export default function ResourcePageHeader({ title, imagePath }) {
    return (
        <div className="resource-header-section">
            <h1 className="resource-header-section-title">{title || "No Title Provided" }</h1>
        </div>
    )
}