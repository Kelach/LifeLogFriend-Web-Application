import { useState } from "react";
import "./TextInput.css";
export default function TextInput(props){
    const {name = "text", onValueChange, value, placeholder, type} = props;
    return (
        <input 
        className="input-text"
        type={type} 
        onChange={onValueChange}
        value={value}
        name={name}
        placeholder={placeholder}/>
    )
}