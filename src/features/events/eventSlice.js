import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    '20230301': [{
        name: 'event11',
        dayStart: '20230301',
        dayEnd: '20230301',
        timeStart: '0900',
        timeEnd: '1200',
        participants: 'Jack, Jone',
        color: 'violet',
    },
    {
        name: 'event12',
        dayStart: '20230301',
        dayEnd: '20230301',
        timeStart: '1000',
        timeEnd: '1300',
        participants: 'Johnny',
        color: 'blue',
    }],
    '20230302': [{
        name: 'event21',
        dayStart: '20230302',
        dayEnd: '20230302',
        timeStart: '1000',
        timeEnd: '1300',
        participants: 'Jenny',
        color: 'purple',
    },
    {
        name: 'event22',
        dayStart: '20230302',
        dayEnd: '20230302',
        timeStart: '1100',
        timeEnd: '1400',
        participants: 'Stella',
        color: 'yellow-green',
    }]
};

export const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        add: (state, { payload : { yar, month, day, event } }) => {
            // console.log(`year: ${year}, month: ${month}, day: ${day}`);

            yar = yar.toString();
            month = month.toString().padStart(2,'0');
            day = day.toString().padStart(2,'0');
            const key = yar + month + day

            if (state[key] === undefined) {
                state[key] = [];
            }

            state[key].push(event);
        },

        modify: (state, { payload: { year, month, day, id, name, dayStart, dayEnd, timeStart, timeEnd, participants, color } }) => {
            year = year.toString();
            month = month.toString().padStart(2,'0');
            day = day.toString().padStart(2,'0');
            const key = year + month + day

            state[key][id] = {
                name,
                dayStart,
                dayEnd,
                timeStart,
                timeEnd,
                participants,
                color,
            };
        },

        remove: (state, { payload : { year, month, day, id} }) => {
            year = year.toString();
            month = month.toString().padStart(2,'0');
            day = day.toString().padStart(2,'0');
            const key = year + month + day

            state[key].splice(id,1);
        },

        setup: (state, { payload : timeString }) => {
            state[timeString] = [];
        },
    },
})

export const { add, modify, remove, setup } = eventSlice.actions
export default eventSlice.reducer