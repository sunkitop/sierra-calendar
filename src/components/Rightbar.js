import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { modify, remove } from '../features/event/eventSlice';
import RDisplay from './RDisplay';

export default function Rightbar() {
    console.log('🎨 Render : Rightbar');
    const now = useSelector((state) => state.time);

    const nowDay = moment(now).format('D');
    const nowWeekday = moment(now).format('dddd');

    const form = useSelector((state) => state.form);
    const dispatch = useDispatch();

    const onModify = (e) => {
        const {
            name,
            dayStart,
            dayEnd,
            timeStart,
            timeEnd,
            participants,
            color,
        } = form;
        dispatch(
            modify({
                year: 2023,
                month: 1,
                day: 2,
                id: 0,
                name,
                dayStart,
                dayEnd,
                timeStart,
                timeEnd,
                participants,
                color,
            }),
        );
    };

    const onRemove = (e) => {
        dispatch(
            remove({
                year: 2023,
                month: 1,
                day: 2,
                id: 1,
            }),
        );
    };

    return (
        <div className="right-bar">
            <div className="topbar">
                <div className="day">
                    <span>{nowDay}</span>
                </div>
                <div className="weekday">
                    <span>{nowWeekday}</span>
                </div>
            </div>

            <RDisplay />

            <div className="bottombar">
                <button className="form-submit-btn" onClick={() => onModify()}>
                    Modify
                </button>

                <button className="form-submit-btn" onClick={() => onRemove()}>
                    Delete
                </button>
            </div>
        </div>
    );
}
