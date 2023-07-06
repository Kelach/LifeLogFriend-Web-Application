"use strict";
// test login: 
// request body: {
//     username: 'jaynuff',
//     first_name: 'John',
//     last_name: 'Dow',
//     email: 'jaynuff@gmail.com',
//     password: 'apples123',
//     confirm_password: 'apples123',
//     firstName: 'John',
//     lastName: 'Dow'
//   }
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../../components/TextInput/TextInput";
import ApiClient  from "../../../services/apiClient";
import "./SignUpPage.css"

export default function SignUpPage() {
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

    // handles form data verification
    const formDataIsValid = () => {
        return true;
    }
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
            localStorage.setItem("token", data);
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
                        onChange={onValueChange}
                        value={formData.first_name}
                        helperText={{constraint: "non-empty", expression: formData.first_name === ""}}
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
                    const { name, placeholder } = textInputProps;
                    return (
                        <TextInput
                            key={name}
                            onChange={onValueChange}
                            value={formData[name]}
                            helperText={{constraint: "non-empty", expression: formData[name] === ""}}
                            name={name}
                            placeholder={placeholder} />)
                }
                )}
                <p className={"form-helper-text" + (invalidMessage !== "" ? " show" : "")}>
                    {invalidMessage}
                </p>
                <button className="btn-compact-large">Sign Up</button>


            </form>
        </div>
    )
}