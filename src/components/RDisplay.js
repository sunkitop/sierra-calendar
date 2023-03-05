import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { change, initialize } from "../features/form/formSlice";
import { add } from "../features/events/eventSlice";

import chroma from 'chroma-js';
import Select from 'react-select';
import { colourOptions } from './data/ColourOption';

const dot = (color = 'transparent') => ({
  alignItems: 'center',
  display: 'flex',

  ':before': {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: 'block',
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

const colourStyles = {
  control: (styles) => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : undefined,
      color: isDisabled
        ? '#ccc'
        : isSelected
        ? chroma.contrast(color, 'white') > 2
          ? 'white'
          : 'black'
        : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled
          ? isSelected
            ? data.color
            : color.alpha(0.3).css()
          : undefined,
      },
    };
  },
  input: (styles) => ({ ...styles, ...dot() }),
  placeholder: (styles) => ({ ...styles, ...dot('#ccc') }),
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
};


export default function RDisplay() {
  const form = useSelector((state) => state.form);
  const dispatch = useDispatch();

  const [ selectedOption, setSelectedOption ] = useState("none");
  
  const onChange = (e) => {
    
    const { name, value } = e.target;
    if (name==='color') {
      setSelectedOption(e.target.value);
    }
    
    
    dispatch(
      change({
        key: name,
        value,
      })
    );
  };

  // form submit event handler
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      add({
        yar: 2023,
        month: 1,
        day: 2,
        event: form,
      })
    );
    dispatch(initialize());
  };

  

  return (
      <div className="midbar">
        <h3>입력</h3>
        <form onSubmit={onSubmit}>
          <input
            name="name"
            placeholder="Event Name"
            onChange={onChange}
            value={form.name}
          />

          <input
            name="dayStart"
            placeholder="Day-Start"
            onChange={onChange}
            value={form.dayStart}
          />

          <input
            name="dayEnd"
            placeholder="Day-End"
            onChange={onChange}
            value={form.dayEnd}
          />

          <input
            name="timeStart"
            placeholder="Time-Start"
            onChange={onChange}
            value={form.timeStart}
          />

          <input
            name="timeEnd"
            placeholder="Time-End"
            onChange={onChange}
            value={form.timeEnd}
          />

          <input
            name="participants"
            placeholder="Participants"
            onChange={onChange}
            value={form.participants}
          />

          <Select
            name="color"
            placeholder="Color"
            onChange={onChange}
            value={colourOptions.filter(function(option) {
              return option.value === selectedOption;
            })}

            options={colourOptions}
            styles={colourStyles}
          />
          
          <button
            className="form-submit-btn"
            type="submit"
          >
            New
          </button>
        </form>

    </div>
  );
}
