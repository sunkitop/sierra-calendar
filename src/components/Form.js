import React from "react";
import Leftbar from "./Leftbar";
import Rightbar from "./Rightbar";


export default function Form () {
    
    return (
        <form className="form">
            <Leftbar />
            <Rightbar />
        </form>
    );
}