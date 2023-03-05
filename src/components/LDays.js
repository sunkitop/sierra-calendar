import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import Day from "./Day";

export default function LDays () {
    const { thisTime } = useSelector((state) => state.time);
    const thisMonthFirstDay = moment(thisTime).startOf('month');
    const thisMonthFirstDayWeekday = thisMonthFirstDay.weekday() == 0 ? 7 : thisMonthFirstDay.weekday();
    const thisMonthLastDay = moment(thisTime).startOf('month').add(1,'months').subtract(1,'days');
    const thisMonthLastDayWeekday = thisMonthLastDay.weekday() == 0 ? 7 : thisMonthLastDay.weekday();
    const thisMonthLength = thisMonthLastDay.diff(thisMonthFirstDay,'days')+1;
    
    

    // console.log(`커서 날 : ${moment(thisTime).format('M/D')}`);
    // console.log(`이번 달 첫 날 : ${thisMonthFirstDay.format('M/D')}`);
    // console.log(`ㄴ요일 : ${thisMonthFirstDayWeekday}`);
    // console.log(`이번 달 막 날 : ${thisMonthLastDay.format('M/D')}`);
    // console.log(`ㄴ요일 : ${thisMonthLastDayWeekday}`);
    // console.log(`이번 달에는 ${thisMonthLength}일이 있습니다.`);
    // console.log(`${-thisMonthFirstDayWeekday+1}`);
    // console.log(`${thisMonthLength+7-thisMonthLastDayWeekday}`);
    
    const numbers = [];
    for (let i=-thisMonthFirstDayWeekday+1 ; i<=thisMonthLength+7-thisMonthLastDayWeekday-1; i++) {
        numbers.push(moment(thisMonthFirstDay).add(i,'days'));
    }


    return (
        <div className="days">
            {numbers.map( (daynum) => (<Day key={daynum.format('YYYY-MM-DD')} daynum={daynum} 
            />))} 
            {/* key는 년월을 반영한 형태로 바꿔야 */}
        </div>
    );
}
