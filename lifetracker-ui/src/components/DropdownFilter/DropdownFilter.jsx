import "./DropdownFilter.css";

export default function DropdownFilter({ options, name, label, onOptionsChange }) {

    return (
        <div className="drop-down-container category-container">
            <label htmlFor={name}>{label}</label>
            <select onChange={onOptionsChange} name={name} className="drop-down-select">
                {options.map((option) => {
                    return (
                        <option key={option} value={option}>{option}</option>
                    )
                })}
            </select>
        </div>
    )
}