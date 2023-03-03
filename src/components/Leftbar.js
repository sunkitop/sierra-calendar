import React from "react";
import Day from "./Day";

export default function Leftbar () {
    
    const numbers = [];
    for (let i=1 ; i<=35; i++) {
        numbers.push(i);
    }

    return (
        <div className="left-bar">
            <div className="month-year">
                <button class="arrow arrow-left">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-left" viewBox="0 0 16 16">
                    <path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z" />
                    </svg>
                </button>

                <span>JUNE 2023</span>

                <button class="arrow arrow-right">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right" viewBox="0 0 16 16">
                    <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z" />
                    </svg>
                </button>
            </div>

            <div className="weekdays">
                <div class="monday">MON</div>
                <div class="tuesday">TUE</div>
                <div class="wednesday">WED</div>
                <div class="thursday">THU</div>
                <div class="friday">FRI</div>
                <div class="saturday">SAT</div>
                <div class="sunday">SUN</div>
            </div>
            
            <div className="days">
                {numbers.map( (daynum) => (<Day daynum={daynum} />))}
            </div>
        </div>
    );
}