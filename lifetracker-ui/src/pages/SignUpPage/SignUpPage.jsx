"use strict";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../../components/TextInput/TextInput";
import "./SignUpPage.css"

export default function SignUpPage() {
    // form state + navigator
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ 
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: ""

    });

    // handles form data verification
    const formDataIsValid = () => {
        return true;
    }
    // handles form submissions
    const createNewUserAccount = (event) => {
        event.preventDefault();
        if (formDataIsValid()){
            navigate("/activity")
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
        console.log(formData);

    }
    // used for input text component mapping
    const formTextInputs = [
        {
            name: "username",
            placeholder: "Username"
        },
        {
            name: "email",
            placeholder: "Email Address"
        }, {
            name: "password",
            placeholder: "Password"
        }, {
            name: "confirm_password",
            placeholder: "Confirm Password"
        }
    ]
    return (
        <div className="signup-container">
            <h1>Create An Account</h1>
            <form className="signup-form" onSubmit={createNewUserAccount}>
                <div style={{ display: "flex" }} className="name-inputs">
                    <TextInput
                    style={{width: "100"}}
                        onValueChange={onValueChange}
                        value={formData["first_name"] || ""}
                        name={"first_name"}
                        placeholder="First Name" />
                    <TextInput
                        onValueChange={onValueChange}
                        value={formData["last_name"] || ""}
                        name={"last_name"}
                        placeholder="Last Name" />
                </div>
                {formTextInputs.map((textInputProps) => {
                    const { name, placeholder } = textInputProps;
                    return (
                        <TextInput
                            key={name}
                            onValueChange={onValueChange}
                            value={formData[name]}
                            name={name}
                            placeholder={placeholder} />)
                }
                )}
                <button className="btn-compact-large">Sign Up</button>


            </form>
        </div>
    )
}