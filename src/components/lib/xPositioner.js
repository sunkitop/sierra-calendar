import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setup } from "../../features/event/eventSlice";

export default function Positioner() {
    console.log('🎨 Render : Positioner');
    const { thisTime } = useSelector((state) => state.time);
    const objEvents = useSelector((state) => state.event);
    const dispatch = useDispatch();

    const handleSetup = (sampleTimeString) => dispatch(setup(sampleTimeString));

    const thisMonthFirstDay = moment(thisTime).startOf('month');
    const thisMonthFirstDayWeekday = thisMonthFirstDay.weekday() === 0 ? 7 : thisMonthFirstDay.weekday();
    const thisMonthLastDay = moment(thisTime).startOf('month').add(1,'months').subtract(1,'days');
    const thisMonthLastDayWeekday = thisMonthLastDay.weekday() === 0 ? 7 : thisMonthLastDay.weekday();
    const thisMonthLength = thisMonthLastDay.diff(thisMonthFirstDay,'days')+1;
    
    const subtractValue = 1-thisMonthFirstDayWeekday;
    const addValue = thisMonthLength+7-thisMonthLastDayWeekday-1;

    const firstDay = moment(thisMonthFirstDay).add(subtractValue, 'days');
    const lastDay = moment(thisMonthFirstDay).add(addValue, 'days');
    // Initialize the Position Array
    const weeks = (lastDay.diff(firstDay, 'days') + 1) / 7;
    let arrPos = new Array(weeks).fill('0');

    const arrPosUnit = new Array(6);
    for (let i = 0; i < arrPos.length; i++) {
        arrPos[i] = new Array(7);

        for (let j = 0; j < 7; j++) {
            let arrPosUnitCopied = JSON.parse(JSON.stringify(arrPosUnit)); // deep copying the unit array
            arrPos[i][j] = arrPosUnitCopied;
        }
    }

    // Put in daynums
    for (let d = subtractValue; d <= addValue; d++) {
        let cnt = d - subtractValue;
        let r = cnt % 7;
        let q = (cnt - r) / 7;

    
        arrPos[q][r][0] = moment(thisMonthFirstDay).add(d, 'days');
    }

    console.log(arrPos);

    const objEvent = useSelector((state) => state.event);

    for (let w = 0; w < weeks; w++) {
        console.log(`-----------w: ${w}-----------`);

        for (let d = 0; d < 7; d++) {
            let timeString = arrPos[w][d][0].format('YYYYMMDD');
            console.log(`- timeString : ${timeString}`);

            handleSetup(timeString);//무한 렌더링 됨
            
            
            
    //         try {
    //             console.log(`length : ${objEvents[timeString].length}`);

    //             if(objEvents[timeString].length > 0) {
    //                 objEvents[timeString].forEach(element => {
    //                     let plural = false;
    
    //                     if (element.dayStart !== element.dayEnd) {
    //                         plural = true;
    //                     }
    
    //                     // 차곡차곡 arrPos에 배치하는 로직 필요
    //                 });
    //             }    
    //         } catch(e) {

    //         }

        }
    }    

    return (
        <></>
    );
}

