import { useState } from "react";
import TextInput from "../TextInput/TextInput";
import CircleLoader from "../CircleLoader/CircleLoader";
import "./ExerciseForm.css";
import ApiClient from "../../../services/apiClient";
import { fetchMinutes } from "../../utils/timeUtils";
import { useNavigate } from "react-router-dom";

export default function ExerciseForm({ setAppState, user }) {

    const navigate = useNavigate();
    const [formErrorText, setFormErrorText] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        calories_burned: "",
        category: "Workout",
        start_time: "0:0",
        end_time: "0:0"
    });
    const onExerciseFormSubmit = async (event) => {
        event.preventDefault();

        // calculating duration
        const {start_time, end_time, ...payload} = formData;
        let duration = (fetchMinutes(end_time) - fetchMinutes(start_time)) / 60 ;
        duration = duration > 0 ? duration : undefined

        // making request
        const { success, statusCode, data } =
            await ApiClient.postEntry("exercise",
                {
                    ...payload,
                    duration: duration,
                    userId: user.email
                }
            );
        
        if (success) {
            // update app state with data
            console.log("retrieve exercise entry: ", data);
            navigate("/exercise");
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
        <div className="exercise-entry-container">
            <div className="exercise-entry-content">
                <div className="exercise-entry-header">
                    <h2>Add Exercise</h2>
                </div>
                <form onSubmit={onExerciseFormSubmit} className="exercise-entry-form">
                    <div className="exercise-form-content box-shadow">
                        <TextInput
                            name={"name"}
                            placeholder={"Name"}
                            onChange={onValueChange}
                            value={formData.name}
                            helperText={{ constraint: "be non-empty", expression: formData.name == "" }}
                            showLabel={true} />
                        <div className="category-container">
                            <label htmlFor="category">Cateogory:</label>
                            <select onChange={onValueChange} className="exercise-category-select" name="category">
                                <option value="Workout">Workout</option>
                                <option value="Sports">Sports</option>
                            </select>
                        </div>
                        <TextInput
                            value={formData.calories_burned}
                            onChange={onValueChange}
                            name="calories_burned"
                            placeholder="Calories"
                            type="number"
                            helperText={{ constraint: "be non-zero", expression: formData.calories_burned == 0 }}
                            showLabel={true} />
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