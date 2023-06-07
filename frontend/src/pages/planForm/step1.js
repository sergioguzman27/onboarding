import React, { useState, useEffect } from 'react';
import { Grid, Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

import { TextInput, PercentInput } from '../../components/inputs';

const StepForm1 = ({ formik, cancelAction }) => {

    return (
        <Grid container direction="column" alignItems="center">
            <Grid container sm={6} xs={10}>
                <TextInput
                    id='puesto'
                    label='Puesto'
                    value={formik.values.puesto}
                    onChange={v => formik.setFieldValue("puesto", v)}
                    error={formik.touched.puesto && Boolean(formik.errors.puesto)}
                    helperText={formik.touched.puesto && formik.errors.puesto}
                />
            </Grid>
            <Grid container sm={6} xs={10}>
                <PercentInput
                    id="peso_skill"
                    label="Peso Skill"
                    fullWidth
                    value={formik.values.peso_skill}
                    onChange={(v) => formik.setFieldValue("peso_skill", v)}
                    margin="normal"
                    variant="outlined"
                    error={formik.touched.peso_skill && Boolean(formik.errors.peso_skill)}
                    helperText={formik.touched.peso_skill && formik.errors.peso_skill}
                />
            </Grid>
            <Grid container sm={6} xs={10}>
                <PercentInput
                    id="peso_will"
                    label="Peso Will"
                    fullWidth
                    value={formik.values.peso_will}
                    onChange={(v) => formik.setFieldValue("peso_will", v)}
                    margin="normal"
                    variant="outlined"
                    error={formik.touched.peso_will && Boolean(formik.errors.peso_will)}
                    helperText={formik.touched.peso_will && formik.errors.peso_will}
                />
            </Grid>
            <Grid style={{ marginTop: 1 }} container xs={6} direction="row" spacing={1} justifyContent="center">
                <Grid item xs={12} sm={3} >
                    <Button
                        variant="contained"
                        color="secondary"
                        fullWidth
                        onClick={cancelAction}
                    >
                        Cancelar
                    </Button>
                </Grid >
                <Grid item xs={12} sm={3}>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                        // startIcon={<SaveIcon />}
                    >
                        Siguiente
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default StepForm1;
