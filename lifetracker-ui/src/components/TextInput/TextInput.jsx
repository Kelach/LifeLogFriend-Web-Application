import "./TextInput.css";
export default function TextInput({ helperText, showLabel, name, ...props }) {
    const labelName = name.replace("_", " ").toLowerCase();
    
    // renders basic text input with optional helper text and label
    return (
        <>
            <div className="text-input-container">
                {showLabel ? <label htmlFor={name} className="text-input-label">{labelName}:</label> : <></>}
                <div className="text-input-box">
                    <input
                        name={name}
                        {...props} />
                    <p className={"input-helper-text" + (helperText?.expression ? " show" : "")}>
                        <span style={{textTransform: "capitalize"}}>{labelName}</span> must {helperText?.constraint}
                    </p>
                </div>
            </div>
        </>
    )
}