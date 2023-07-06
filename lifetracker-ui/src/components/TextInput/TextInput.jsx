import "./TextInput.css";
export default function TextInput({ helperText, showLabel, name, ...props }) {
    // renders basic text input with optional helper text and label
    return (
        <>
            <div className="text-input-container">
                {showLabel ? <label htmlFor={name.toLowerCase()} className="text-input-label">{name.toLowerCase()}:</label> : <></>}
                <div className="text-input-box">
                    <input
                        name={name}
                        {...props} />
                    <p className={"input-helper-text" + (helperText?.expression ? " show" : "")}>
                        Input must {helperText?.constraint}
                    </p>
                </div>
            </div>
        </>
    )
}