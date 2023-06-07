import { TextField } from '@material-ui/core'
import React from 'react'
import NumberFormat from 'react-number-format';

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      decimalScale={2}
      suffix={' %'}

    />
  );
}

const PercentInput = (props) => {
  const handleChange = (event) => {
    props.onChange(event.target.value);
  };
  return (

    <TextField
      {...props}
      onChange={handleChange}
      InputProps={{
        inputComponent: NumberFormatCustom, ...props.inputProps ? props.inputProps : {}
      }}
    />
  )
}

export default PercentInput;
