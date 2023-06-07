import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

const SelectInput = (props) => {
    const { required } = props

    const handleChange = (event, value) => {
        props.onChange(event, value)
    }
    const getOptionLabel = (option) => {

        return props.getOptionLabel(option)
    }
    return (

        !(props.visible ?? true) ? null :
            (<Autocomplete
                options={props.options}
                value={props.value}
                required={required}
                onChange={handleChange}
                fullWidth
                visible={props.visible}
                disabled={props.disabled}
                getOptionLabel={getOptionLabel}
                disableClearable={props.disableClearable}
                size={props.size || 'medium'}
                renderInput={(params) =>
                    <TextField {...params} required={!props.noRequiere}
                        id="outlined-full-width"
                        label={props.label}
                        fullWidth
                        visible={props.visible}
                        error={props.error}
                        multiline={props.multiline !== undefined}
                        helperText={props.helperText}
                        type="string"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined" />} />)
    )
}

export default SelectInput;
