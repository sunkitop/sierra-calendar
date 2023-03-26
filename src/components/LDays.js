import moment from 'moment';
// import Positioner from "./lib/Positioner";

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setup } from '../features/event/eventSlice';

function LDays() {
    console.log('🎨 Render : LDays');
    const { thisTime } = useSelector((state) => state.time);
    const thisMonthFirstDay = moment(thisTime).startOf('month');
    const thisMonthFirstDayWeekday =
        thisMonthFirstDay.weekday() === 0 ? 7 : thisMonthFirstDay.weekday();
    const thisMonthLastDay = moment(thisTime)
        .startOf('month')
        .add(1, 'months')
        .subtract(1, 'days');
    const thisMonthLastDayWeekday =
        thisMonthLastDay.weekday() === 0 ? 7 : thisMonthLastDay.weekday();
    const thisMonthLength =
        thisMonthLastDay.diff(thisMonthFirstDay, 'days') + 1;

    // console.log(`커서 날 : ${moment(thisTime).format('M/D')}`);
    // console.log(`이번 달 첫 날 : ${thisMonthFirstDay.format('M/D')}`);
    // console.log(`ㄴ요일 : ${thisMonthFirstDayWeekday}`);
    // console.log(`이번 달 막 날 : ${thisMonthLastDay.format('M/D')}`);
    // console.log(`ㄴ요일 : ${thisMonthLastDayWeekday}`);
    // console.log(`이번 달에는 ${thisMonthLength}일이 있습니다.`);
    // console.log(`${-thisMonthFirstDayWeekday+1}`);
    // console.log(`${thisMonthLength+7-thisMonthLastDayWeekday}`);

    const numbers = [];
    for (
        let i = -thisMonthFirstDayWeekday + 1;
        i <= thisMonthLength + 7 - thisMonthLastDayWeekday - 1;
        i++
    ) {
        numbers.push(moment(thisMonthFirstDay).add(i, 'days'));
    }

    return (
        <div className="days">
            {Positioner(
                1 - thisMonthFirstDayWeekday,
                thisMonthLength + 7 - thisMonthLastDayWeekday - 1,
            )}
        </div>
    );
}

export default React.memo(LDays);

function mergeCells(data) {
    let mergedColumns = {};

    // Loop through the data to find cells to merge
    data.forEach((week, weekIndex) => {
        week.forEach((day, dayIndex) => {
            day.forEach((item, itemIndex) => {
                if (item !== null) {
                    // Check if the cell should be merged with the cell to its left
                    if (
                        dayIndex > 0 &&
                        item === week[dayIndex - 1][itemIndex]
                    ) {
                        let prevKey = `${weekIndex}-${
                            dayIndex - 1
                        }-${itemIndex}`;
                        const key = `${weekIndex}-${dayIndex}-${itemIndex}`;

                        if (!mergedColumns.hasOwnProperty(prevKey)) {
                            mergedColumns[prevKey] = 2;
                        } else {
                            let copyDayIndex = dayIndex;
                            while (mergedColumns[prevKey] === 'refer left') {
                                copyDayIndex -= 1;
                                prevKey = `${weekIndex}-${
                                    copyDayIndex - 1
                                }-${itemIndex}`;
                            }
                            mergedColumns[prevKey] += 1;
                        }

                        mergedColumns[key] = 'refer left';
                    }
                }
            });
        });
    });

    return mergedColumns;
}

function Positioner() {
    console.log('🎨 FunctionCall : Positioner');
    const { thisTime } = useSelector((state) => state.time);
    const objEvents = useSelector((state) => state.event);
    const dispatch = useDispatch();

    const handleSetup = (sampleTimeString) => dispatch(setup(sampleTimeString));

    const thisMonthFirstDay = moment(thisTime).startOf('month');
    const thisMonthFirstDayWeekday =
        thisMonthFirstDay.weekday() === 0 ? 7 : thisMonthFirstDay.weekday(); // Sunday is 0 but we need to regard it as 7
    const thisMonthLastDay = moment(thisTime)
        .startOf('month')
        .add(1, 'months')
        .subtract(1, 'days');
    const thisMonthLastDayWeekday =
        thisMonthLastDay.weekday() === 0 ? 7 : thisMonthLastDay.weekday();
    const thisMonthLength =
        thisMonthLastDay.diff(thisMonthFirstDay, 'days') + 1;

    const subtractValue = 1 - thisMonthFirstDayWeekday;
    const addValue = thisMonthLength + 7 - thisMonthLastDayWeekday - 1;

    const firstDay = moment(thisMonthFirstDay).add(subtractValue, 'days');
    const lastDay = moment(thisMonthFirstDay).add(addValue, 'days');
    
    // 4 ~ 6 weeks are required depending on the month
    const weeks = (lastDay.diff(firstDay, 'days') + 1) / 7;

    // define 2 functions that returns week and day from string-format Date('20230101')
    const week = (strDate) =>
        Math.floor(moment(strDate).diff(firstDay, 'days') / 7);

    const day = (strDate) =>
        moment(strDate).weekday() - 1 < 0
            ? moment(strDate).weekday() + 6
            : moment(strDate).weekday() - 1;

    // make a new array filled with 0, this will be used to position events in this array
    let arrPos = new Array(weeks).fill('0');

    const arrPosUnit = new Array(6);
    for (let i = 0; i < arrPos.length; i++) {
        arrPos[i] = new Array(7);

        for (let j = 0; j < 7; j++) {
            let arrPosUnitCopied = JSON.parse(JSON.stringify(arrPosUnit)); // deep copying the unit array
            arrPos[i][j] = arrPosUnitCopied;
        }
    }

    // Put in daynums in arrPos
    for (let d = subtractValue; d <= addValue; d++) {
        let cnt = d - subtractValue;
        let r = cnt % 7;
        let q = (cnt - r) / 7;
        arrPos[q][r][0] = moment(thisMonthFirstDay).add(d, 'days');
    }

    console.log('😈 Putting empty arrays');
    for (let w = 0; w < weeks; w++) {

        for (let d = 0; d < 7; d++) {
            let timeString = arrPos[w][d][0].format('YYYYMMDD');
            handleSetup(timeString); // key로 timeString을 추가하고, 빈 배열 []을 할당
        }
    }

    console.log('😈 Positioning in arrPos');
    for (let w = 0; w < weeks; w++) {
        // console.log(`-----------w: ${w}-----------`);

        for (let d = 0; d < 7; d++) {
            let timeString = arrPos[w][d][0].format('YYYYMMDD');
            // console.log(`- timeString : ${timeString}`);

            // console.log(`length : ${objEvents[timeString].length}`);

            let idx = 1;

            // if a certain date has an event(s)
            if (
                objEvents.hasOwnProperty(timeString) &&
                objEvents[timeString].length > 0
            ) {
                objEvents[timeString].forEach((element) => {
                    // new event must be positioned on un-positioned place
                    while (arrPos[w][d][idx] !== null) {
                        idx += 1;
                    }
                    
                    // idx is determined. it's the index where this-event should be placed `by principle`
                    // but if non-plural event is already placed before,
                    // the non-plural event and this-event should be switched, because plural events precede
                    if (element.dayStart !== element.dayEnd) {
                        for (let cnt = 1; cnt < idx; cnt++) {
                            if (arrPos[w][d][cnt].dayStart === arrPos[w][d][cnt].dayEnd) {
                                arrPos[w][d][idx] = {...arrPos[w][d][cnt]};
                                idx = cnt; // idx(=the place where this-event must be placed) -> cnt(=preceding non-plural event's former place)
                            }
                        }
                    }

                    arrPos[w][d][idx] = element; // position the event

                    // if the event takes plural days
                    if (element.dayStart !== element.dayEnd) {
                        const duration = moment(element.dayEnd).diff(
                            moment(element.dayStart),
                            'days',
                        );
                        // the event needs to be positioned also in nearby days
                        for (let i = 0; i <= duration; i++) {
                            const strDate = moment(element.dayStart)
                                .add(i, 'days')
                                .format('YYYYMMDD');
                            const numWeek = week(strDate);
                            const numDay = day(strDate);

                            arrPos[numWeek][numDay][idx] = element;
                        }
                    }

                });
            }
        }
    }

    // an Array in order to avoid multiple `map` functions in return()
    let arrIndex = [];

    for (let r = 0; r < weeks; r++) {
        for (let i = 0; i < 6; i++) {
            for (let c = 0; c < 7; c++) {
                arrIndex.push('' + r + c + i);
            }
        }
    }

    
    const mergedColumns = mergeCells(arrPos);
    
    // if mergedColumns value is `refer left`, it means the cell is deleted by merge
    // theses deleted cells must be opt out in return() by `filter` function
    let arrPosCopied = JSON.parse(JSON.stringify(arrPos)); // deep copying the unit array

    arrPosCopied.forEach((row, r) =>
    row.forEach((column, c) =>
    column.forEach((item, i) => {
        if (mergedColumns[r + '-' + c + '-' + i] === 'refer left') {
            arrPos[r][c][i] = 'deleted by merge';
            arrIndex[arrIndex.indexOf(''+r+c+i)] = 'deleted by merge';
        }
    }),
    ),
    );
    
    console.log(arrIndex);
    console.log(arrPos);
    console.log(mergedColumns);

    return (
        <>
            {arrIndex.filter(item => item !== 'deleted by merge')
            .map((ele) => {
                const rowIndex = Number(ele.slice(0, 1));
                const columnIndex = Number(ele.slice(1, 2));
                const eventIndex = Number(ele.slice(2, 3));

                const daynum = arrPos[rowIndex][columnIndex][eventIndex]; // type: moment Object

                const key = `${rowIndex}-${columnIndex}-${eventIndex}`;
                const columnSpan = mergedColumns[key] ? mergedColumns[key] : 0;
                const classNames = ['item'];

                if (
                    typeof mergedColumns[key] === 'number' &&
                    isFinite(mergedColumns[key])
                ) {
                    classNames.push('merged');
                }

                return ele.slice(2, 3) === '0' ? (
                    // day number button = index 0 in arrPos
                    <button
                        className="daynum"
                        type={
                            (moment(thisTime).month() === daynum.month()
                                ? 'active'
                                : 'inactive') +
                            '-' +
                            (daynum.weekday() === 0 || daynum.weekday() === 6
                                ? 'holiday'
                                : 'ordinary')
                        }
                    >
                        {daynum.format('D')}
                    </button>
                ) : (
                    // event item
                    <div
                        className={classNames.join(' ')}
                        type="event"
                        color={daynum?.color}
                        style={{
                            gridColumn: `${
                                columnIndex + 1
                            } / span ${columnSpan}`,
                        }}
                        id={`${rowIndex}-${columnIndex}-${eventIndex}`}
                    >
                        {daynum?.name}
                    </div>
                );
            })}
        </>
    );
}
