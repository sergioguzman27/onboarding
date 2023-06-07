import { TextField } from '@material-ui/core'
import React from 'react'
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

const NumberInput = (props) => {
    const { onChange, decimalScale, ...other } = props;
    const handleChange = (event) => {
        if (props.onChange !== undefined)
            props.onChange(event);
    };
    return (
        <NumberFormat
            {...other}
            decimalSeparator="."
            displayType="input"
            type="text"
            thousandSeparator={false}
            customInput={TextField}
            allowNegative={false}
            isNumericString={false}
            onValueChange={({ value: v }) => {
                handleChange({
                    target: {
                        name: props.name,
                        value: v ? parseFloat(v) : 0,
                    },
                });
            }}
            decimalScale={decimalScale === undefined ? 2 : decimalScale}
        />
    )
}

export default NumberInput