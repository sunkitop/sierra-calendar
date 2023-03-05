import React from "react";
import LDays from "./LDays";
import LMonthYear from "./LMonthYear";

export default function Leftbar () {
    

    return (
        <div className="left-bar">
            <LMonthYear />

            <div className="weekdays">
                <div className="monday">MON</div>
                <div className="tuesday">TUE</div>
                <div className="wednesday">WED</div>
                <div className="thursday">THU</div>
                <div className="friday">FRI</div>
                <div className="saturday">SAT</div>
                <div className="sunday">SUN</div>
            </div>
            
            <LDays />
        </div>
    );
}