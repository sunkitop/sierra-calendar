import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setup } from "../features/events/eventSlice";

export default function Day({ daynum }) {
  const events = useSelector((state) => state.event);
  const dispatch = useDispatch();

  const { thisTime } = useSelector((state) => state.time);

  const type =
    (moment(thisTime).month() === daynum.month() ? "active" : "inactive") +
    "-" +
    (moment(daynum).weekday() === 0 || moment(daynum).weekday() === 6
      ? "holiday"
      : "ordinary");

  const timeString = moment(daynum).format("YYYYMMDD");

  
  
  if (events[timeString] === undefined) {
      dispatch(setup(timeString));
  }

const arrEvent = events[timeString];

  return (
    <div className="daybox">
      <button className="daynum" type={type}>
        {moment(daynum).format("D")}
      </button>

      {arrEvent?.map((ele, idx) => (
        <div
          className="event"
          color={ele.color}

          key={
            moment(daynum).format("YYYYMMDD") +
            "-" +
            idx.toString().padStart(2, "0")
          }
        >
          {ele.name}
        </div>
      ))}
    </div>
  );
}
