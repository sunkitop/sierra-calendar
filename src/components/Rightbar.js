import React from "react";

export default function Rightbar() {
    return (
        <div className="right-bar">
            <div className="topbar">
                <div class="day">
                    <span>22</span>
                </div>
                <div class="weekday">
                    <span>Wednesday</span>
                </div>
            </div>

            <div className="midbar">events</div>
            
            <div className="bottombar">
                <button className="form-submit-btn">Add</button>
                <button className="form-submit-btn">Modify</button>
                <button className="form-submit-btn">Delete</button>
            </div>
        </div>
    );
}