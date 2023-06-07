import React, { useState, useEffect } from 'react';
import { Backdrop, CircularProgress, Container, makeStyles } from '@material-ui/core';
import { Typography, Paper, Grid } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { useFormik } from 'formik';
import { format } from 'date-fns';
import * as yup from 'yup';

import Layout from '../../components/layout';
import StepForm1 from './step1';
import StepForm2 from './step2';
import StepForm3 from './step3';
import StepForm4 from './step4';
import Api from '../../utils/api';

const STEP_LABELS = ['Datos básicos', 'Habilidades', 'Actitudes', 'Recursos Asignados']

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 10000000,
        color: "#fff",
    }
}));

const validationSchema = yup.object({
    puesto: yup.mixed('Campo requerido').required('Campo requerido'),
    peso_skill: yup.mixed('Campo requerido').required('Campo requerido'),
    peso_will: yup.mixed('Campo requerido').required('Campo requerido'),
});

const PlanForm = (props) => {
    const classes = useStyles();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [resourcesCatalog, setResourcesCatalog] = useState([]);

    const getResources = async () => {
        setLoading(true);
        try {
            const response = await Api.Get('resource');
            setResourcesCatalog(response.data);
        } catch (e) {
        }
        setLoading(false);
    }

    useEffect(() => {
        getResources();
    }, []);

    const onSubmit = async(values) => {
        console.log('values ', values);
        if (step < 4) {
            setStep(step + 1)
        } else {
            setLoading(true);
            try {
                const body = {
                    ...values,
                    fecha: format(new Date(), 'yyyy-MM-dd'),
                    resources: values.resources.map(item => ({responsable: item.responsable, id_recurso: item.resource.id}))
                }
                const response = await Api.Post('plan', body);
                setLoading(false);
                alert('Plan guardado con exito')
                cancelAction();
            } catch (e) {

            }
        }
    }

    const formik = useFormik({
        initialValues: {
            id: null,
            puesto: null,
            peso_skill: 50,
            peso_will: 50,
            objectives: [{ nombre: null, activities: [{nombre: null}]}],
            attitudes: [{ nombre: null, descripcion: null, peso: 0}],
            resources: [{ resource: null, responsable: null}]
        },
        validationSchema: validationSchema,
        onSubmit: onSubmit
    });

    const cancelAction = () => {
        props.history.push('/planes-listar');
    }

    return (
        <Layout title="Crear Plan">
            <Backdrop
                className={classes.backdrop}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Container fixed component={Paper}>
                <Grid container direction='row' justifyContent='flex-start' alignItems='center' style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex' }}>
                            <CircularProgress variant="determinate" value={(step/4) * 100} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '0.5rem' }}>
                            <Typography  variant='h6' color='textSecondary'>
                                {`Paso ${step} de 4`}
                            </Typography>
                            <Typography  variant='body2' color='primary'>
                                {STEP_LABELS[step-1]}
                            </Typography>
                        </div>
                </Grid>

                <Grid container>
                    <form onSubmit={formik.handleSubmit} style={{ padding: '2rem 0', width: '100%' }}>
                        {step == 1 && <StepForm1 formik={formik} cancelAction={cancelAction} />}
                        {step == 2 && <StepForm2 formik={formik} previousStep={() => setStep(step - 1)}/>}
                        {step == 3 && <StepForm3 formik={formik} previousStep={() => setStep(step - 1)}/>}
                        {step == 4 && <StepForm4 formik={formik} resourcesCatalog={resourcesCatalog} previousStep={() => setStep(step - 1)}/>}
                    </form>
                </Grid>
            </Container>
        </Layout>
    )
}

export default withRouter(PlanForm);
