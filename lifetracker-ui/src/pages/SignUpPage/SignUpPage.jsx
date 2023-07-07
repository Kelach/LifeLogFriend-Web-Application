"use strict";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import TextInput from "../../components/TextInput/TextInput";
import ApiClient  from "../../../services/apiClient";
import "./SignUpPage.css"

export default function SignUpPage({appState, setAppState}) {
    // form state + navigator
    const navigate = useNavigate();
    const [invalidMessage, setInvalidMessage] = useState("");
    const [formData, setFormData] = useState({ 
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: ""

    });

    // handles form submissions
    const createNewUserAccount = async (event) => {
        event.preventDefault();
        // showloader button loader here maybe?
        const { success, data, statusCode } = await
            ApiClient.signup({
                ...formData,
                firstName: formData.first_name,
                lastName: formData.last_name
            });
        if (success) {
            localStorage.setItem("lifetracker_token", data.token);
            setAppState((initialState) => ({
                ...initialState,
                isAuthenticated: true
            }))
            navigate("/activity");
            // navigate to activity page
            // store user token in local storage
        } else{
            if (statusCode === 422){
                // badrequest error
                setInvalidMessage("Please review the required fields and try again.");

            } else if (statusCode === 400){
                setInvalidMessage("A user with that email address already exists!")
            } else{
                // unexpected error
                setInvalidMessage("Oh no! An error occured. Please try again later");
                console.log("An Unexpected error occured", {success : success, statusCode : statusCode});
            }
        }

    }
    // handles user keyboard presses
    const onValueChange = (event) => {
        const name = event.target.name
        const value = event.target.value

        setFormData(() => ({
            ...formData,
            [name]: value
        }))
        setInvalidMessage("");
        console.log(formData);
    }
    // used for input text component mapping
    const formTextInputs = [
        {
            name: "username",
            placeholder: "Username",
            type: "text",
            helperText : {constraint: "non-empty", expression: formData.username === ""}
        },
        {
            name: "email",
            placeholder: "Email Address",
            type: "text",
            helperText : {constraint: "non-empty", expression: formData.email === ""}
        }, {
            name: "password",
            placeholder: "Password",
            type: "password",
            helperText : {constraint: "non-empty", expression: formData.password === ""}
        }, {
            name: "confirm_password",
            placeholder: "Confirm Password",
            type: "password",
            helperText : {constraint: "match password", expression: formData.confirm_password !== formData.password}
        }
    ]
    return (
        <div className="signup-container">
            <h1>Create Account</h1>
            <span className="material-icons">person_outline</span>
            <form className="signup-form box-shadow" onSubmit={createNewUserAccount}>
                <div style={{ display: "flex" }} className="name-inputs">
                    <TextInput
                    style={{width: "100"}}
                        onChange={onValueChange}
                        value={formData.first_name}
                        helperText={{}}
                        name={"first_name"}
                        placeholder="First Name" />
                    <TextInput
                        onChange={onValueChange}
                        helperText={{constraint: "non-empty", expression: formData.last_name === ""}}
                        value={formData.last_name}
                        name={"last_name"}
                        placeholder="Last Name" />
                </div>
                {formTextInputs.map((textInputProps) => {
                    const { name, placeholder, type, helperText } = textInputProps;
                    return (
                        <TextInput
                            key={name}
                            type={type}
                            onChange={onValueChange}
                            value={formData[name]}
                            helperText={helperText}
                            name={name}
                            placeholder={placeholder} />)
                }
                )}
                <p className={"form-helper-text" + (invalidMessage !== "" ? " show" : "")}>
                    {invalidMessage}
                </p>
                <button className="btn-compact-large sign-up-btn">Sign Up</button>
                <p className="returning-user">Already have an acount? Sign in
                        <Link style={{color: "var(--highlight-p)"}} to={"/login"}> here.</Link>
                </p>
            </form>
        </div>
    )
}