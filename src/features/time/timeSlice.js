import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const initialState = {
    now: moment().format('YYYY-MM-DD'),
    thisTime: moment().startOf('month').format('YYYY-MM-DD'),
};

export const timeSlice = createSlice({
    name: 'time',
    initialState,
    reducers: {
        next: (state) => ({
            ...state,
            thisTime: moment(state.thisTime).startOf('month').add(1, 'months').format('YYYY-MM-DD')
        })
        ,
        
        prev: (state) => ({
            ...state,
            thisTime: moment(state.thisTime).startOf('month').subtract(1, 'months').format('YYYY-MM-DD')
        })
        ,
        

        initialize: (state) => ({
            ...initialState
        }),

    },
})

export const { next, prev, initialize } = timeSlice.actions
export default timeSlice.reducer