import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: '',
    dayStart: '',
    dayEnd: '',
    timeStart: '',
    timeEnd: '',
    participants: '',
    color: '',
};

export const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        change: (state, { payload : { key, value } }) => {
            state[key] = value;
        },

        initialize: (state) => ({
            ...initialState
        }),

    },
})

export const { change, initialize } = formSlice.actions
export default formSlice.reducer