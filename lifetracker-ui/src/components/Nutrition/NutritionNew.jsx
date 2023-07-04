import { useState } from "react";
import TextInput from "../TextInput/TextInput";
export default function NutritionNew() {
    /**
     * @todo
     * - update input component to have labels
     * - update form to include error text (maybe also update input componenet to include helper text)
     * - style form
     * - make pseudo backend call to db to update nutrition
     * - start working on API state management
     */
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        calories: "",
        category: "Food",
        quantity: ""
    });
    const invalidForm = () => {

        return (!formData.name
        || !formData.calories
        || !formData.category
        || !formData.quantity)
    }
    const createNutritionEntry = (event) => {
        event.preventDefault();
        if (!invalidForm()){
            console.log("upload entry to database");
        }else{
            setShowErrorMessage(true);
            console.log("showing error msg")
        }
    }
    const onValueChange = (event) => {
        const name = event.target.name;
        let value = event.target.value;
        if ((name == "quantity" || name == "calories") && parseInt(value) < 0) {
            value = 0
        }
        console.log(typeof event.target.value)
        setFormData(() => ({
            ...formData,
            [name]: value
        }));
        console.log(formData);
    }

    return (
        <>
            <div className="nutrition-entry-container">
                <div className="nutrition-entry-content">
                    <div className="nutrition-entry-header">
                        <h2>Add Nutrition Entry</h2>
                    </div>
                    <form onSubmit={createNutritionEntry} className="nutrition-entry-form">
                        <TextInput
                        name={"name"}
                        placeholder={"Name"} 
                        onChange={onValueChange}
                        value={formData.name}/>
                        <select onChange={onValueChange} className="nutrition-category-select" name="category">
                            <option value="Food">Food</option>
                            <option value="Beverage">Beverage</option>
                            <option value="Snack">Snack</option>
                        </select>
                        <TextInput
                            value={formData.calories}
                            onChange={onValueChange}
                            name="calories"
                            placeholder="Calories"
                            type="number" />
                        <TextInput value={formData.quantity}
                            onChange={onValueChange}
                            name="quantity"
                            min="0"
                            placeholder="Quantity"
                            type="number" />
                            <button>Save</button>
                    </form>
                </div>
            </div>

        </>
    )
}