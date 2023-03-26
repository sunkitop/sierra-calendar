import chroma from "chroma-js";

export const colourOptions = [
  { name: 'color', value: 'lunch', label: 'Lunch', color: chroma('rgb(0, 0, 0)').hex(), target: {name: 'color', value: 'lunch', label: 'Lunch', color: chroma('rgb(0, 0, 0)').hex(),}},
  { name: 'color', value: 'red', label: 'Red', color: chroma('rgb(255, 135, 135)').hex(), target: {name: 'color', value: 'red', label: 'Red', color: chroma('rgb(255, 135, 135)').hex(),}},
  { name: 'color', value: 'red-orange', label: 'Red-orange', color: chroma('rgb(248, 196, 180)').hex(), target: {name: 'color', value: 'red-orange', label: 'Red-orange', color: chroma('rgb(248, 196, 180)').hex(),}},
  { name: 'color', value: 'orange', label: 'Orange', color: chroma('rgb(220, 132, 73)').hex(), target: {name: 'color', value: 'orange', label: 'Orange', color: chroma('rgb(220, 132, 73)').hex(),}},
  { name: 'color', value: 'yellow', label: 'Yellow', color: chroma('rgb(253, 211, 106)').hex(), target: {name: 'color', value: 'yellow', label: 'Yellow', color: chroma('rgb(253, 211, 106)').hex(),}},
  { name: 'color', value: 'yellow-green', label: 'Yellow-green', color: chroma('rgb(229, 235, 178)').hex(), target: {name: 'color', value: 'yellow-green', label: 'Yellow-green', color: chroma('rgb(229, 235, 178)').hex(),}},
  { name: 'color', value: 'lime', label: 'Lime', color: chroma('rgb(188, 226, 158)').hex(), target: {name: 'color', value: 'lime', label: 'Lime', color: chroma('rgb(188, 226, 158)').hex(),}},
  { name: 'color', value: 'mint', label: 'Mint', color: chroma('rgb(200, 255, 212)').hex(), target: {name: 'color', value: 'mint', label: 'Mint', color: chroma('rgb(200, 255, 212)').hex(),}},
  { name: 'color', value: 'blue', label: 'Blue', color: chroma('rgb(184, 232, 252)').hex(), target: {name: 'color', value: 'blue', label: 'Blue', color: chroma('rgb(184, 232, 252)').hex(),}},
  { name: 'color', value: 'purple', label: 'Purple', color: chroma('rgb(190, 109, 183)').hex(), target: {name: 'color', value: 'purple', label: 'Purple', color: chroma('rgb(190, 109, 183)').hex(),}},
  { name: 'color', value: 'violet', label: 'Violet', color: chroma('rgb(192, 74, 130)').hex(), target: {name: 'color', value: 'violet', label: 'Violet', color: chroma('rgb(192, 74, 130)').hex(),}},
  { name: 'color', value: 'brown', label: 'Brown', color: chroma('rgb(139, 126, 116)').hex(), target: {name: 'color', value: 'brown', label: 'Brown', color: chroma('rgb(139, 126, 116)').hex(),}},
  ];

  export const dot = (color = 'transparent') => ({
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
  
  export const colourStyles = {
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