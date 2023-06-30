"use strict";

import { useState } from "react";
import TextInput from "../../components/TextInput/TextInput";
import "./SignUpPage.css"
export default function SignUpPage() {
    const [formData, setFormData] = useState({});
    const createNewUserAccount = (event) => {
        event.preventDefault();
        console.log("User creation here")
    }
    const onValueChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setFormData(() => ({
            ...formData,
            [name]: value
        }))
        console.log(value, name)

    }
    const formTextInputs = [{
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
                <button className="button-compact-large">Sign Up</button>


            </form>
        </div>
    )
}