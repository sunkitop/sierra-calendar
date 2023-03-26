import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { change, initialize } from '../features/form/formSlice';
import { add } from '../features/event/eventSlice';

import Select from 'react-select';
import { colourOptions, colourStyles } from './data/ColourOption';

export default function RDisplay() {
    console.log('🎨 Render : RDisplay');
    const form = useSelector((state) => state.form);
    const dispatch = useDispatch();

    const [selectedOption, setSelectedOption] = useState('none');

    const decomposeForm = (formObj) => {
      const newDayStart = formObj.dayStart.replace(/-/gi,"");
      const newDayEnd = formObj.dayEnd.replace(/-/gi,"");
      const newTimeStart = formObj.timeStart.replace(/:/gi,"");
      const newTimeEnd = formObj.timeEnd.replace(/:/gi,"");
      
      return (
        {
          year: newDayStart.slice(0,4), 
          month: newDayStart.slice(4,6), 
          day: newDayStart.slice(6,8), 
          event: {
            ...formObj,
            dayStart: newDayStart,
            dayEnd: newDayEnd,
            timeStart: newTimeStart,
            timeEnd: newTimeEnd,
          }
        }
      );
    }
    
    const onChange = (e) => {
        const { name, value } = e.target;
        if (name === 'color') {
            setSelectedOption(e.target.value);
        }
        // console.log(`${e.target.name} : ${typeof(e.target.value)}`);
        dispatch(
            change({
                key: name,
                value,
            }),
        );
    };

    // form submit event handler
    const onSubmit = (e) => {
        e.preventDefault();
        const newObject = decomposeForm(form);
        dispatch(
            add({
                ...newObject
            }),
        );
        dispatch(initialize());
        setSelectedOption('none'); // we need to manually initialize React-Select

    };

    const inputStyles = {
        backgroundColor: 'white',
        border: '1px solid #ccc',
        borderRadius: 4,
        padding: '10px',
        margin: '1px 0',
        width: '150px',
        height: '1px',
        color: '#555',
        fontSize: '16px',
    };

    return (
        <div className="midbar">
            <form id="form" onSubmit={onSubmit}>
              <label htmlFor="eventName">Event Name:</label>
              <input
                  id="eventName"
                  name="name"
                  type="text"
                  placeholder="Event Name"
                  onChange={onChange}
                  value={form.name}
                  style={inputStyles}
              />
              <label htmlFor="dayStart">From:</label>
              <input
                  id="dayStart"
                  name="dayStart"
                  type="date"
                  placeholder="Date-Start"
                  onChange={onChange}
                  value={form.dayStart}
                  style={inputStyles}
              />
              <label htmlFor="dayEnd">To:</label>
              <input
                  id="dayEnd"
                  name="dayEnd"
                  type="date"
                  placeholder="Date-End"
                  onChange={onChange}
                  value={form.dayEnd}
                  style={inputStyles}
              />
              <label htmlFor="timeStart">Time starts:</label>
              <input
                  id="timeStart"
                  name="timeStart"
                  type="time"
                  placeholder="Time-Start"
                  onChange={onChange}
                  value={form.timeStart}
                  style={inputStyles}
              />
              <label htmlFor="timeEnd">Time ends:</label>
              <input
                  id='timeEnd'
                  name="timeEnd"
                  type="time"
                  placeholder="Time-End"
                  onChange={onChange}
                  value={form.timeEnd}
                  style={inputStyles}
              />
              <label htmlFor="participants">Participants:</label>
              <input
                  id='participants'
                  name="participants"
                  type="text"
                  placeholder="Participants"
                  onChange={onChange}
                  value={form.participants}
                  style={inputStyles}
              />

              <label htmlFor="color">Color:</label>
              <Select
                  id="color"
                  name="color"
                  placeholder="Color"
                  onChange={onChange}
                  value={colourOptions.filter(function (option) {
                      return option.value === selectedOption;
                  })}
                  defaultValue=''
                  options={colourOptions}
                  styles={colourStyles}
                  style={inputStyles}
              />

                <button id="create" className="form-submit-btn" type="submit">
                    Create
                </button>
            </form>
        </div>
    );
}
