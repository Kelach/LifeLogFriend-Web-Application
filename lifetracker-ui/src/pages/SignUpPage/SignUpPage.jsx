import { useState } from "react";
import TextInput from "../../components/TextInput/TextInput";
export default function SignUpPage(){
    const [formData, setFormData] = useState({});
    const createNewUserAccount = () => {
        console.log("User creation here")
    }
    const onValueChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setFormData(() => ({
            ...formData,
            [name] : value
        }))
        console.log(value, name)
        
    }
    const formTextInputs = [{
        name: "first_name",
        placeholder: "First Name",
    },
{
    name: "last_name",
    placeholder: "Last Name"
},{
    name: "email",
    placeholder: "Email Address"
},{
    name: "password",
    placeholder: "Password"
}
]
    return (
        <div className="signup-container">
        <h1>Create An Account</h1>
        <form className="signup-form" onSubmit={createNewUserAccount}>
            <div style={{display : "flex"}}className="name-inputs">
            <TextInput
            onValueChange={onValueChange}
            value={formData.name || ""}
            name={"name"}  
            placeholder="Your name"/>
            </div>

        </form>
        </div>
    )
}