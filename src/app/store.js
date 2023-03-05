import { configureStore } from "@reduxjs/toolkit";
import eventReducer from '../features/events/eventSlice';
import formReducer from '../features/form/formSlice';
import timeReducer from '../features/time/timeSlice';


export const store = configureStore({
    reducer: {
        event: eventReducer,
        form: formReducer,
        time: timeReducer,
    },
    },
    );