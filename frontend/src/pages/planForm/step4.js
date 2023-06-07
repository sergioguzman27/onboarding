import React, { useState, useEffect } from 'react';
import { Grid, Button, IconButton } from '@material-ui/core';
import { Add as AddIcon, Delete as DeleteIcon } from '@material-ui/icons';

import { TextInput, SelectInput } from '../../components/inputs';

const StepForm4 = ({ formik, resourcesCatalog, previousStep }) => {

    const changeValueResource = (index, field, value) => {
        formik.setFieldValue('resources', formik.values.resources.map((m, i) => {
            if (i === index) {
                return { ...m, [field]: value }
            }
            return m
        }))
    }

    const addResource = () => {
        formik.setFieldValue('resources', [...formik.values.resources, {
            resource: null,
            responsable: null
        }])
    }

    const deleteResource = (index) => {
        formik.setFieldValue('resources', formik.values.resources.filter((item, i) => i !== index))
    }

    return (
        <Grid container direction="column" alignItems="center">
            {formik.values.resources.map((item, i) => (
                <Grid container direction='column' style={{ borderBottom: '1px solid #1976d2', padding: '0.5rem 0' }}>
                    <Grid container>
                        <Grid container md={11}>
                            <SelectInput
                                options={resourcesCatalog}
                                id={`resources-${i}-resource`}
                                label='Recurso'
                                value={item.resource}
                                getOptionLabel={(option) => `${option.descripcion}`}
                                onChange={(e, v) => changeValueResource(i, 'resource', v)}
                                error={formik.touched?.resources?.[i]?.resource && Boolean(formik.errors?.resources?.[i]?.resource)}
                                helperText={formik.touched?.resources?.[i]?.resource && formik.errors?.resources?.[i]?.resource}
                            />
                        </Grid>
                        <Grid item container justifyContent='center' alignItems='center' md={1}>
                            <IconButton onClick={() => deleteResource(i)}>
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid container md={12}>
                            <TextInput
                                id={`resources-${i}-responsable`}
                                label='Responsable'
                                value={item.responsable}
                                onChange={v => changeValueResource(i, 'responsable', v)}
                                error={formik.touched?.resources?.[i]?.responsable && Boolean(formik.errors?.resources?.[i]?.responsable)}
                                helperText={formik.touched?.resources?.[i]?.responsable && formik.errors?.resources?.[i]?.responsable}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            ))}
            <Button
                variant="outlined"
                color="primary"
                startIcon={<AddIcon />}
                onClick={addResource}
                style={{ marginTop: '1.2rem' }}
            >
                Agregar recurso
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
                        Guardar
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default StepForm4;
