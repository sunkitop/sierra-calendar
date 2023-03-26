import React from 'react';
import chroma from 'chroma-js';

import {  colourOptions } from './data/ColourOption';
import Select from 'react-select';

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

const inputStyles = {
  backgroundColor: 'white',
  border: '1px solid #ccc',
  borderRadius: 5,
  padding: '10px',
  margin: '1px 0',
  width: '75%',
  height: '15px',
  color: '#555',
  fontSize: '16px',
};

function InputTags () {
  return(
    <>

        <input type="text" placeholder="Event Name" style={inputStyles} />
        <input type="date" placeholder="Date-Start" style={inputStyles} />
        <input type="date" placeholder="Date-End" style={inputStyles} />
        <input type="time" placeholder="Time-Start" style={inputStyles} />
        <input type="time" placeholder="Time-End" style={inputStyles} />
        <input type="text" placeholder="Participants" style={inputStyles} />
        <Select
        defaultValue={colourOptions[2]}
        options={colourOptions}
        styles={colourStyles}
        />
    </>
  );
}

export default InputTags;
