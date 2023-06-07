import React, { useState, useEffect } from 'react';
import { Grid, Button, IconButton } from '@material-ui/core';
import { Add as AddIcon, Delete as DeleteIcon } from '@material-ui/icons';

import { TextInput, PercentInput } from '../../components/inputs';

const StepForm3 = ({ formik, previousStep }) => {

    const changeValueAttitude = (index, field, value) => {
        formik.setFieldValue('attitudes', formik.values.attitudes.map((m, i) => {
            if (i === index) {
                return { ...m, [field]: value }
            }
            return m
        }))
    }

    const addAttitude = () => {
        formik.setFieldValue('attitudes', [...formik.values.attitudes, {
            nombre: null,
            descripcion: null,
            peso: 0
        }])
    }

    const deleteAttitude = (index) => {
        formik.setFieldValue('attitudes', formik.values.attitudes.filter((item, i) => i !== index))
    }

    return (
        <Grid container direction="column" alignItems="center">
            {formik.values.attitudes.map((item, i) => (
                <Grid container direction='column' style={{ borderBottom: '1px solid #1976d2', padding: '0.5rem 0' }}>
                    <Grid container>
                        <Grid container md={11}>
                            <TextInput
                                id={`attitudes-${i}-nombre`}
                                label='Nombre actitud'
                                value={item.nombre}
                                onChange={v => changeValueAttitude(i, 'nombre', v)}
                                error={formik.touched?.attitudes?.[i]?.nombre && Boolean(formik.errors?.attitudes?.[i]?.nombre)}
                                helperText={formik.touched?.attitudes?.[i]?.nombre && formik.errors?.attitudes?.[i]?.nombre}
                            />
                        </Grid>
                        <Grid item container justifyContent='center' alignItems='center' md={1}>
                            <IconButton onClick={() => deleteAttitude(i)}>
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid container md={6}>
                            <TextInput
                                id={`attitudes-${i}-descripcion`}
                                label='Descripción'
                                value={item.descripcion}
                                onChange={v => changeValueAttitude(i, 'descripcion', v)}
                                error={formik.touched?.attitudes?.[i]?.descripcion && Boolean(formik.errors?.attitudes?.[i]?.descripcion)}
                                helperText={formik.touched?.attitudes?.[i]?.descripcion && formik.errors?.attitudes?.[i]?.descripcion}
                            />
                        </Grid>
                        <Grid container md={6}>
                            <PercentInput
                                id={`attitudes-${i}-peso`}
                                label="Peso"
                                fullWidth
                                value={item.peso}
                                onChange={(v) => changeValueAttitude(i, 'peso', v)}
                                margin="normal"
                                variant="outlined"
                                error={formik.touched?.attitudes?.[i]?.peso && Boolean(formik.errors?.attitudes?.[i]?.peso)}
                                helperText={formik.touched?.attitudes?.[i]?.peso && formik.errors?.attitudes?.[i]?.peso}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            ))}
            <Button
                variant="outlined"
                color="primary"
                startIcon={<AddIcon />}
                onClick={addAttitude}
                style={{ marginTop: '1.2rem' }}
            >
                Agregar actitud
            </Button>
            <Grid style={{ marginTop: 2 }} container xs={6} direction="row" spacing={1} justifyContent="center">
                <Grid item xs={12} sm={3} >
                    <Button
                        variant="contained"
                        color="secondary"
                        fullWidth
                        onClick={previousStep}
                    >
                        Anterior
                    </Button>
                </Grid >
                <Grid item xs={12} sm={3}>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                    >
                        Siguiente
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default StepForm3;
