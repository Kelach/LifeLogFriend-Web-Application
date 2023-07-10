import { useState } from "react";
import TextInput from "../TextInput/TextInput";
import CircleLoader from "../CircleLoader/CircleLoader";
import "./SleepForm.css";
import ApiClient from "../../../services/apiClient";
import { useNavigate } from "react-router-dom";
import { fetchMinutes } from "../../utils/timeUtils";

export default function SleepForm({ setAppState, user }) {

    const navigate = useNavigate();
    const [formErrorText, setFormErrorText] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        category: "Nap",
        start_time: "0:0",
        end_time: "0:0",
    });

    const onSleepFormSubmit = async (event) => {
        event.preventDefault();

        // calculating duration
        const {start_time, end_time, ...payload} = formData;
        let duration = (fetchMinutes(end_time) - fetchMinutes(start_time)) / 60
        duration = duration > 0 ? duration : undefined

        // making request
        const { success, statusCode, data } =
            await ApiClient.postEntry("sleep",
                {
                    ...payload,
                    duration: duration.toFixed(2),
                    user_id: user.email,
                    start_time: fetchMinutes(start_time),
                    end_time: fetchMinutes(end_time)
                }
            );
        
        if (success) {
            // update app state with data
            console.log("retrieve sleep entry: ", data);
            navigate("/sleep");
        } else {
            if (statusCode == 422) {
                const message = "Invalid response. Please review the required field and try again."
                setFormErrorText(message);
            } else if (statusCode == 404) {
                const message = "An error occured. Please try again later"
                setFormErrorText(message);
            } else {
                console.log("error with status code", statusCode)
            }
        }
    }
    
    const onValueChange = (event) => {
        // updates form data values
        const name = event.target.name;
        let value = event.target.value;
        if ((name == "quantity" || name == "calories") && parseInt(value) < 0) {
            value = 0
        }
        setFormData(() => ({
            ...formData,
            [name]: value
        }));
        console.log(formData);
    }
    return (
        <div className="sleep-entry-container">
            <div className="sleep-entry-content">
                <div className="sleep-entry-header">
                    <h2>Add Sleep</h2>
                </div>
                <form onSubmit={onSleepFormSubmit} className="sleep-entry-form">
                    <div className="sleep-form-content box-shadow">
                        <TextInput
                            name={"name"}
                            placeholder={"Name"}
                            onChange={onValueChange}
                            value={formData.name}
                            helperText={{ constraint: "be non-empty", expression: formData.name == "" }}
                            showLabel={true} />
                        <div className="category-container">
                            <label htmlFor="category">Cateogory:</label>
                            <select onChange={onValueChange} className="sleep-category-select" name="category">
                                <option value="Nap">Nap</option>
                                <option value="Bedtime">Bedtime</option>
                            </select>
                        </div>
                        <TextInput value={formData.start_time}
                            onChange={onValueChange}
                            name="start_time"
                            placeholder="Start Time"
                            type="time"
                            showLabel={true} />
                        <TextInput value={formData.end_time}
                            onChange={onValueChange}
                            name="end_time"
                            placeholder="End Time"
                            type="time"
                            helperText={{
                                constraint: "be after start time",
                                expression: fetchMinutes(formData.start_time) >= fetchMinutes(formData.end_time)
                            }}
                            showLabel={true} />
                        <button className="btn-compact-medium">Save</button>
                    </div>
                </form>
                <p className={"form-helper-text" + (formErrorText !== "" ? " show" : "")}>
                    {formErrorText}
                </p>
            </div>
            {/* <CircleLoader
                    showLoading={formOnSubmitState.showLoader}
                    isFailure={loaderStates.failure}
                    isSuccess={loaderStates.success} /> */}
        </div>

    )
}