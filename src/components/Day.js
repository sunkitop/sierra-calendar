import React from "react";

export default function Day({daynum}) {
    return (
     <div className="daybox">
        <button className="daynum">{daynum}</button>
        <button className="event event1">event1</button>
        <button className="event event2">event2</button>
        <button className="event event3">event3</button>
        <button className="event event4">event4</button>
    </div>
    );
}