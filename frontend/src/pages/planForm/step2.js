import React, { useState, useEffect } from 'react';
import { Grid, Button, IconButton } from '@material-ui/core';
import { Add as AddIcon, Delete as DeleteIcon } from '@material-ui/icons';

import { TextInput, PercentInput } from '../../components/inputs';

const StepForm2 = ({ formik, previousStep }) => {

    const changeNameObjective = (index, value) => {
        formik.setFieldValue('objectives', formik.values.objectives.map((m, i) => {
            if (i === index) {
                return { ...m, nombre: value }
            }
            return m
        }))
    }

    const changeNameActivity = (index1, index2, value) => {
        formik.setFieldValue('objectives', formik.values.objectives.map((m, i) => {
            if (i === index1) {
                const activities = m.activities.map((a, j) => {
                    if (j === index2)
                        return { ...a, nombre: value }
                    return a
                })
                return { ...m, activities }
            }
            return m
        }))
    }

    const addObjective = () => {
        formik.setFieldValue('objectives', [...formik.values.objectives, {
            nombre: null,
            activities: [{ nombre: null }]
        }])
    }

    const addActivity = (index) => {
        formik.setFieldValue('objectives', formik.values.objectives.map((m, i) => {
            if (i === index) {
                return { ...m, activities: [...m.activities, { nombre: null }] }
            }
            return m
        }))
    }

    const deleteObjective = (index) => {
        formik.setFieldValue('objectives', formik.values.objectives.filter((item, i) => i !== index))
    }

    const deleteActivity = (index, index2) => {
        formik.setFieldValue('objectives', formik.values.objectives.map((m, i) => {
            if (i === index) {
                return { ...m, activities: m.activities.filter((a, j) => j !== index2) }
            }
            return m
        }))
    }

    return (
        <Grid container direction="column" alignItems="center">
            {formik.values.objectives.map((item, i) => (
                <Grid container direction='column' style={{ borderBottom: '1px solid #1976d2', padding: '0.5rem 0' }}>
                    <Grid container>
                        <Grid container md={11}>
                            <TextInput
                                id={`objective-${i}-nombre`}
                                label='Nombre Objetivo'
                                value={item.nombre}
                                onChange={v => changeNameObjective(i, v)}
                                error={formik.touched?.objectives?.[i]?.nombre && Boolean(formik.errors?.objectives?.[i]?.nombre)}
                                helperText={formik.touched?.objectives?.[i]?.nombre && formik.errors?.objectives?.[i]?.nombre}
                            />
                        </Grid>
                        <Grid item container justifyContent='center' alignItems='center' md={1}>
                            <IconButton onClick={() => deleteObjective(i)}>
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Grid container direction='column'>
                        {item.activities.map((activity, j) => (
                            <Grid container style={{ margin: '0.5rem 0' }}>
                                <Grid container md={10}>
                                    <TextInput
                                        id={`activity-${i}-${j}-nombre`}
                                        label='Nombre Actividad'
                                        value={activity.nombre}
                                        onChange={v => changeNameActivity(i, j, v)}
                                        error={formik.touched?.objectives?.[i]?.activities?.[j]?.nombre && Boolean(formik.errors?.objectives?.[i]?.activities?.[j]?.nombre)}
                                        helperText={formik.touched?.objectives?.[i]?.activities?.[j]?.nombre && formik.errors?.objectives?.[i]?.activities?.[j]?.nombre}
                                    />
                                </Grid>
                                <Grid item container justifyContent='center' alignItems='center' md={1}>
                                    <IconButton onClick={() => deleteActivity(i, j)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Grid>
                                {(j == (item.activities.length - 1)) && (
                                    <Grid item container justifyContent='center' alignItems='center' md={1}>
                                        <IconButton onClick={() => addActivity(i)}>
                                            <AddIcon />
                                        </IconButton>
                                    </Grid>
                                )}
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            ))}
            <Button
                variant="outlined"
                color="primary"
                startIcon={<AddIcon />}
                onClick={addObjective}
                style={{ marginTop: '1.2rem' }}
            >
                Agregar objectivo
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

export default StepForm2;
