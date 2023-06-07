import React from 'react';
import { TextField } from '@material-ui/core';

const TextInput = (props) => {

    return (
        <TextField
            {...props}
            id={props.id}
            label={props.label}
            fullWidth
            defaultValue={props.value ? props.value : null}
            value={props.value ? props.value : null}
            onChange={(e, v) => props.onChange(e.target.value)}
            type="string"
            margin="normal"
            variant="outlined"
        />
    )
}

export default TextInput;
