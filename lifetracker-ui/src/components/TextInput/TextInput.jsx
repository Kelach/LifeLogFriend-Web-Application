import { useState } from "react";
import "./TextInput.css";
export default function TextInput(props){
    // const {name = "text", onValueChange, value, placeholder, type, style} = props;
    return (
        <input 
        className="input-text"
        {...props}/>
    )
}