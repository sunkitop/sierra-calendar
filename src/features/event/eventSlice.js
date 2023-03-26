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
    },
    {
        name: 'event13',
        dayStart: '20230301',
        dayEnd: '20230301',
        timeStart: '0900',
        timeEnd: '1200',
        participants: 'Jack, Jone',
        color: 'orange',
    },
    {
        name: 'event14',
        dayStart: '20230301',
        dayEnd: '20230301',
        timeStart: '1000',
        timeEnd: '1300',
        participants: 'Johnny',
        color: 'red',
    },
    {
        name: 'event15',
        dayStart: '20230301',
        dayEnd: '20230301',
        timeStart: '1000',
        timeEnd: '1300',
        participants: 'Johnny',
        color: 'lime',
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
    }],
    '20230304': [{
        name: 'event41',
        dayStart: '20230304',
        dayEnd: '20230305',
        timeStart: '1000',
        timeEnd: '1300',
        participants: 'Kenny',
        color: 'red',
    }],
    '20230305': [{
        name: 'event51',
        dayStart: '20230305',
        dayEnd: '20230308',
        timeStart: '1000',
        timeEnd: '1300',
        participants: 'Jexnny',
        color: 'purple',
    },
    {
        name: 'event52',
        dayStart: '20230305',
        dayEnd: '20230305',
        timeStart: '1100',
        timeEnd: '1400',
        participants: 'Estella',
        color: 'yellow-green',
    }],
    '20230307': [{
        name: 'event71',
        dayStart: '20230307',
        dayEnd: '20230307',
        timeStart: '1000',
        timeEnd: '1300',
        participants: 'Jexanny',
        color: 'red',
    },
    {
        name: 'event72',
        dayStart: '20230307',
        dayEnd: '20230309',
        timeStart: '1100',
        timeEnd: '1400',
        participants: 'Jestella',
        color: 'blue',
    }],
    '20230309': [{
        name: "event91",
        dayStart: "20230309",
        dayEnd: "20230310",
        timeStart: "0900",
        timeEnd: "",
        participants: "",
        color: "red-orange",
    }],
    // event91이 있는 위에 아래 이벤트를 추가하면 또 grid가 어그러짐
    // '20230310': [{ 
    //     name: "event101",
    //     dayStart: "20230310",
    //     dayEnd: "20230311",
    //     timeStart: "0900",
    //     timeEnd: "",
    //     participants: "",
    //     color: "mint",
    // }],
};

export const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        add: (state, { payload : { year, month, day, event } }) => {
            // console.log(`year: ${year}, month: ${month}, day: ${day}`);

            month = month.padStart(2,'0');
            day = day.padStart(2,'0');
            const key = year + month + day
            console.log(`key: ${key}`);
            // if (state[key] === undefined) {
            //     state[key] = [];
            // }

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
            state[timeString] = state[timeString] || [];
        },
    },
})

export const { add, modify, remove, setup } = eventSlice.actions
export default eventSlice.reducer