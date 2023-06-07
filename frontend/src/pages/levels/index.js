import React, { useState, useEffect } from 'react';
import { Backdrop, Box, Button, CircularProgress, Container, Grid, Link, Paper, makeStyles } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Layout from '../../components/layout';
import TableGrid from '../../components/grid';
import FabAddButton from '../../components/buttons/fabAddButton';
import { TextInput, SelectInput, PercentInput } from '../../components/inputs';
import Api from '../../utils/api';
import { levelTypes } from '../../utils/constants';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 10000000,
        color: "#fff",
    }
}));

const validationSchema = yup.object({
    etiqueta: yup.mixed('Campo requerido').required('Campo requerido'),
    porcentaje: yup.mixed('Campo requerido').required('Campo requerido'),
    tipo: yup.mixed('Campo requerido').required('Campo requerido'),
});

const Levels = (props) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [formMode, setFormMode] = useState(false);

    const getLevels = async () => {
        setLoading(true);
        try {
            const response = await Api.Get('level');
            setData(response.data);
        } catch (e) {
            toast.error("Error de servidor")
        }
        setLoading(false);
    }

    useEffect(() => {
        getLevels();
    }, []);

    const onSubmit = async (values) => {
        let response = null;
        setLoading(true);
        console.log('values ', values)
        try {
            values.tipo = values.tipo.key
            if (values.id)
                response = await Api.Put(`level/${values.id}`, values);
            if (!values.id)
                response = await Api.Post('level', values);
            setLoading(false);
            getLevels();
            // toast.success("Recurso guardado");
            setFormMode(false);
            formik.resetForm();
        } catch (e) {
            toast.error("Error de servidor")
        }
        setLoading(false);
    }

    const formik = useFormik({
        initialValues: {
            id: null,
            etiqueta: null,
            porcentaje: null,
            tipo: null
        },
        validationSchema: validationSchema,
        onSubmit: onSubmit
    });

    const editMode = (row) => {
        const typeObject = levelTypes.find(i => i.key == row.tipo);
        formik.setValues({
            id: row.id,
            etiqueta: row.etiqueta,
            porcentaje: row.porcentaje,
            tipo: typeObject
        });
        setFormMode(true);
    }

    const deleteResource = async (row) => {
        setLoading(true);
        try {
            await Api.Delete(`level/${row.id}`);
            // toast.success("Recurso eliminado")
        } catch (e) {
            // toast.error("Error de servidor")
        }
        setLoading(false);
    }

    return (
        <Layout title="Niveles de evaluación">
            <Backdrop
                className={classes.backdrop}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Container fixed component={Paper}>
                {(formMode) ? (
                    <form onSubmit={formik.handleSubmit} style={{ padding: '2rem 0' }}>
                        <Grid container direction="column" alignItems="center">
                            <Grid container sm={6} xs={10}>
                                <TextInput
                                    id='etiqueta'
                                    label='Etiqueta'
                                    value={formik.values.etiqueta}
                                    onChange={v => formik.setFieldValue("etiqueta", v)}
                                    error={formik.touched.etiqueta && Boolean(formik.errors.etiqueta)}
                                    helperText={formik.touched.etiqueta && formik.errors.etiqueta}
                                />
                            </Grid>
                            <Grid container sm={6} xs={10}>
                                <PercentInput
                                    id="porcentaje"
                                    label="Porcentaje"
                                    fullWidth
                                    value={formik.values.porcentaje}
                                    onChange={(v) => formik.setFieldValue("porcentaje", v)}
                                    margin="normal"
                                    variant="outlined"
                                    error={formik.touched.porcentaje && Boolean(formik.errors.porcentaje)}
                                    helperText={formik.touched.porcentaje && formik.errors.porcentaje}
                                />
                            </Grid>
                            <Grid container sm={6} xs={10}>
                                <SelectInput
                                    id="tipo"
                                    label="Tipo"
                                    value={formik.values.tipo}
                                    options={levelTypes}
                                    getOptionLabel={(option) => option.value}
                                    onChange={(e, v) => formik.setFieldValue("tipo", v)}
                                    error={formik.touched.tipo && Boolean(formik.errors.tipo)}
                                    helperText={formik.touched.tipo && formik.errors.tipo}
                                />
                            </Grid>
                            <Grid style={{ marginTop: 1 }} container xs={6} direction="row" spacing={1} justifyContent="center">
                                <Grid item xs={12} sm={3}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        fullWidth
                                        startIcon={<SaveIcon />}
                                    >
                                        Guardar
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={3} >
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        fullWidth
                                        onClick={(e) => { setFormMode(false); formik.resetForm(); }}
                                    >
                                        Cancelar
                                    </Button>
                                </Grid >
                            </Grid>
                        </Grid>
                    </form>
                ) : (
                    <Container fixed style={{ padding: '2rem 1rem' }}>
                        <TableGrid
                            defaultPageSize={25}
                            excelName='Recursos'
                            id="Recursos-grid"
                            data={data}
                            info={[
                                { dataField: "id", caption: "Id", width: "auto" },
                                { dataField: "etiqueta", caption: "Etiqueta" },
                                { dataField: "porcentaje", caption: "Porcentaje" },
                                { dataField: "tipo", caption: "Tipo" },
                            ]}
                            actions={[
                                { action: "edit", function: editMode, text: "Editar" },
                                { action: "delete", function: deleteResource, text: "Eliminar" }
                            ]}
                            actionsWidth='auto'
                        >
                        </TableGrid>
                        <FabAddButton onClick={() => setFormMode(true)} />
                    </Container>
                )}
            </Container>
        </Layout>
    )
}

export default withRouter(Levels);

