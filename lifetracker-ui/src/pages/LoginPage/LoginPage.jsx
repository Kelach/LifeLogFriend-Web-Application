import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiClient from "../../../services/apiClient";
import TextInput from "../../components/TextInput/TextInput";
import "./LoginPage.css";
export default function LoginPage({ appState, setAppState }){
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email : "",
        password : ""
    });
    const [invalidMessage, setInvalidMessage] = useState("");
    const onValueChange = (event) => {
        // updating form state and clearing invalid message
        const name = event.target.name
        const value = event.target.value

        setFormData(() => ({
            ...formData,
            [name]: value
        }))
        setInvalidMessage("");
        console.log(formData);
    }
    const onUserLoginRequest = async (event) => {
        event.preventDefault();
        // showloader button loader here maybe?
        console.log("attempting login", formData);
        const { success, data, statusCode } = await ApiClient.login(formData);// returns {token : ....}

        if (success) {
            console.log(data) // 
            localStorage.setItem("lifetracker_token", data.token);
            console.log("saving token: ", data.token)
            setAppState((initialState) => ({
                ...initialState,
                isAuthenticated: true
            }))
            navigate("/activity");
            // navigate to activity page
            // store user token in local storage
        } else{
            if (statusCode === 500){
                // badrequest error
                setInvalidMessage("Please provide a username/password and try again.");

            } else if (statusCode === 401){
                setInvalidMessage("Invalid email or password.")
            } else{
                // unexpected error
                setInvalidMessage("Oh no! An error occured. Please try again later");
                console.log("An Unexpected error occured", {success : success, statusCode : statusCode});
            }
        }
    }
    // used for input text component mapping
    const formTextInputs = [
        {
            name: "email",
            placeholder: "Email Address",
            type: "text"
        }, {
            name: "password",
            placeholder: "Password",
            type: "password"
        }
    ]
    return (
        <div className="login-container">
            <h1>Login</h1>
            <span className="material-icons">face</span>
            <form className="login-form box-shadow" onSubmit={onUserLoginRequest}>
                {formTextInputs.map((textInputProps) => {
                    const { name, placeholder, type } = textInputProps;
                    return (
                        <TextInput
                            key={name}
                            onChange={onValueChange}
                            type={type}
                            value={formData[name]}
                            helperText={{constraint: "non-empty", expression: formData[name] === ""}}
                            name={name}
                            placeholder={placeholder} />)
                }
                )}
                <p className={"form-helper-text" + (invalidMessage !== "" ? " show" : "")}>
                    {invalidMessage}
                </p>
                <button className="btn-compact-large login-btn">Login</button>
            </form>
        </div>
    )
}