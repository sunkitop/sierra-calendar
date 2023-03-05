import moment from "moment";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { next, prev } from "../features/time/timeSlice";

export default function LMonthYear() {
    
    const { thisTime } = useSelector((state) => state.time);
    const dispatch = useDispatch();
    
    const thisYear = moment(thisTime).year();
    const thisMonth = moment(thisTime).format('MMM').toUpperCase();
    
    const onClickRight = () => {dispatch(next())};
    const onClickLeft = () => {dispatch(prev())};


    return (
        <div className="month-year">
                <button className="arrow arrow-left" onClick={onClickLeft}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-left" viewBox="0 0 16 16">
                    <path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z" />
                    </svg>
                </button>
                <div className="display">
                    <div>{thisMonth}</div>
                    <div>{thisYear}</div>
                </div>
                <button className="arrow arrow-right" onClick={onClickRight}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right" viewBox="0 0 16 16">
                    <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z" />
                    </svg>
                </button>
            </div>
    );
}