import React, { useState, useEffect } from 'react';
import { Backdrop, CircularProgress, Container, Paper, Grid, Button, Tooltip, makeStyles } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import WarningIcon from '@material-ui/icons/Warning';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

import Layout from '../../components/layout';
import TableGrid from '../../components/grid';
import Modal from '../../components/modal';
import Api from '../../utils/api';
import { SelectInput, TextInput } from '../../components/inputs';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 10000000,
        color: "#fff",
    }
}));

const Employees = (props) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [employee, setEmployee] = useState(null);
    const [plan, setPlan] = useState(null);
    const [plans, setPlans] = useState([]);
    const [data, setData] = useState([]);

    const getEmployees = async () => {
        setLoading(true);
        try {
            const response = await Api.Get('employee');
            setData(response.data);
        } catch (e) {
            alert("Error de servidor")
        }
        setLoading(false);
    }

    const getPlans = async () => {
        setLoading(true);
        try {
            const response = await Api.Get('plan');
            setPlans(response.data);
        } catch (e) {
        }
        setLoading(false);
    }

    useEffect(() => {
        getEmployees();
    }, []);

    const navigateTest = (row) => {
        props.history.push(`/evaluar/${row.id}`);
    }

    const onboardingProcessCell = (row) => {
        const value = row.value
        return (
            <div style={{ display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {value == null && (
                    <Tooltip title="Sin onboarding asignado">
                        <WarningIcon color='error' />
                    </Tooltip>
                )}
                {(value && value.fecha_evaluacion1 == null) && (
                    <Tooltip title="Sin evaluacion">
                        <AssignmentLateIcon color='action' />
                    </Tooltip>
                )}
                {(value && value.fecha_evaluacion1) && (
                    (value.resultado_skill1 >= 90 && value.resultado_will1 >= 90) ? (
                        <Tooltip title="Primera evaluación Onboarding">
                            <CheckCircleIcon color='primary' />
                        </Tooltip>
                    ) : (
                        <React.Fragment>
                            <Tooltip title="Primera evaluación sin Onboarding">
                                <CancelIcon color='action' />
                            </Tooltip>
                            {(value.fecha_evaluacion2 == null) ? (
                                <Tooltip title="Sin segunda evaluación">
                                    <AssignmentLateIcon color='action' />
                                </Tooltip>
                            ) : (
                                (value.resultado_skill2 >= 90 && value.resultado_will2 >= 90) ? (
                                    <Tooltip title="Segunda evaluación Onboarding">
                                        <CheckCircleIcon color='primary' />
                                    </Tooltip>
                                ) : (
                                    <Tooltip title="Segunda evaluación sin Onboarding">
                                        <CancelIcon color='action' />
                                    </Tooltip>
                                )
                            )}
                        </React.Fragment>
                    )
                )}
            </div>
        )
    }

    const assingPlan = async (row) => {
        await getPlans();
        setEmployee(row);
        setModal(true);
    }

    const closeModal = () => {
        setModal(false);
        setEmployee(null);
        setPlan(null);
    }

    const onSubmitAssingPlan = async() => {
        try {
            if (plan?.id) {
                const body = {id_plan: plan.id, id_colaborador: employee.id};
                const response = await Api.Post('employee-onboarding', body);
                alert("Plan de onboarding asignado correctamente");
                closeModal();
                getEmployees();
            } else {
                alert("Seleccione un plan")
            }

        } catch (e) {
            alert("Error de servidor")
        }
    }

    return (
        <Layout title="Colaboradores">
            <Backdrop
                className={classes.backdrop}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Container fixed component={Paper}>
                <Container fixed style={{ padding: '2rem 1rem' }}>
                    <TableGrid
                        defaultPageSize={25}
                        excelName='Recursos'
                        id="Recursos-grid"
                        data={data}
                        info={[
                            { dataField: "id", caption: "Id", width: "auto" },
                            { dataField: "codigo", caption: "Código", width: "auto" },
                            { dataField: "nombre", caption: "Nombre" },
                            { dataField: "puesto", caption: "Puesto" },
                            { dataField: "fecha_alta", caption: "Fecha de alta", dataType: "date", width: "auto" },
                            { dataField: "onboarding", caption: "Proceso Onboarding", cellRender: onboardingProcessCell },
                        ]}
                        actions={[
                            { action: "add", function: assingPlan, text: "Agregar Plan" },
                            { action: "evaluate", function: navigateTest, text: "Evaluar" },
                            { action: "report", function: navigateTest, text: "Reporte de evaluación" },
                        ]}
                        actionsWidth='auto'
                    >
                    </TableGrid>
                </Container>
            </Container>
            <Modal
                open={modal}
                onClose={closeModal}
                title={'Asignar plan a colaborador'}
                noActions
            >
                <Grid container direction="column" alignItems="center">
                    <Grid container>
                        <TextInput
                            id={'Colaborador'}
                            label='Colaborador'
                            value={employee ? `${employee.codigo} - ${employee.nombre}` : null}
                            disabled
                        />
                    </Grid>
                    <Grid container>
                        <TextInput
                            id={'Puesto'}
                            label='Puesto Colaborador'
                            value={employee ? employee.puesto : null}
                            disabled
                        />
                    </Grid>
                    <Grid container>
                        <SelectInput
                            id={'Plan'}
                            options={plans}
                            label='Plan'
                            value={plan}
                            getOptionLabel={(option) => `Plan id:${option.id} puesto: ${option.puesto}`}
                            onChange={(e, v) => setPlan(v)}
                        />
                    </Grid>
                </Grid>
                <Grid style={{ marginTop: 2 }} container direction="row" spacing={1} justifyContent="center">
                    <Grid item xs={12} sm={3} >
                        <Button
                            variant="contained"
                            color="secondary"
                            fullWidth
                            onClick={closeModal}
                        >
                            Cancelar
                        </Button>
                    </Grid >
                    <Grid item xs={12} sm={3}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={onSubmitAssingPlan}
                            fullWidth
                        >
                            Guardar
                        </Button>
                    </Grid>
                </Grid>
            </Modal>
        </Layout>
    )
}

export default withRouter(Employees);
