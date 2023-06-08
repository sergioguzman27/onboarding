import React, { useState, useEffect } from 'react';
import { Backdrop, Box, Button, CircularProgress, Typography } from '@material-ui/core';
import { Container, Grid, Link, Paper, makeStyles } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withRouter } from 'react-router-dom';
import { Person, Filter9Plus, BusinessCenter, Today, Assignment } from '@material-ui/icons'

import Layout from '../../components/layout';
import Api from '../../utils/api';
import { levelTypes } from '../../utils/constants';
import { TabPanel } from '../../components/tabs';
import ResourcesTab from './resourcesTab';
import SkillsTab from './skillsTab';
import WillsTab from './willsTab';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 10000000,
        color: "#fff",
    }
}));

const PlanEvaluate = (props) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [onBoarding, setOnBoarding] = useState(null);
    const [plan, setPlan] = useState(null);
    const [resources, setResources] = useState([]);
    const [levels, setLevels] = useState([]);
    const [tab, setTab] = React.useState(0);
    const { id } = useParams()

    const getOnboarding = async () => {
        setLoading(true);
        try {
            const response = await Api.Get(`employee-onboarding/${id}`);
            setOnBoarding(response.data);
            getPlan(response.data.id_plan)
        } catch (e) {
            alert("Error al obtener el plan")
        }
        setLoading(false);
    }
    
    const getPlan = async (_id) => {
        try {
            const response = await Api.Get(`plan/${_id}`);
            setPlan(response.data);
        } catch (e) {
            alert("Error al obtener el plan")
        }
    }
    
    const getResources = async () => {
        try {
            const response = await Api.Get('resource');
            setResources(response.data);
        } catch (e) {
            alert("Error al obtener el plan")
        }
    }
    
    const getLevels = async () => {
        try {
            const response = await Api.Get('level');
            setLevels(response.data);
        } catch (e) {
            alert("Error al obtener el plan")
        }
    }

    useEffect(() => {
        getOnboarding();
        getResources();
        getLevels();
    }, []);

    const getMetric = (skill, will, first = true) => {
        if (skill >= 90 && will >= 90)
            return 'Onboarding'
        if (skill >= 70 && will >= 70)
            return 'Retroalimentación'
        if (skill >= 50 && will >= 50 && first)
            return 'Retroalimentación'
        if (skill >= 50 && will >= 50 && !first)
            return 'Desvincular'
        return 'Desvincular'
    }

    const getResultOnboarding = (first) => {
        if (!first && onBoarding?.fecha_evaluacion2) {
            return getMetric(onBoarding?.resultado_skill2, onBoarding?.resultado_will2, false)
        } else if (first && onBoarding?.fecha_evaluacion1) {
            return getMetric(onBoarding?.resultado_skill1, onBoarding?.resultado_will1, true)
        }
        return 'NA'
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
                <Grid container direction='row'>
                    <Grid container item md={6}>
                        <ListItem>
                            <ListItemAvatar>
                                <Filter9Plus />
                            </ListItemAvatar>
                            <ListItemText primary={onBoarding?.employee?.codigo} secondary="Codigo Colaborador" />
                        </ListItem>
                    </Grid>
                    <Grid container item md={6}>
                        <ListItem>
                            <ListItemAvatar>
                                <Person />
                            </ListItemAvatar>
                            <ListItemText primary={onBoarding?.employee?.nombre} secondary="Nombre Colaborador" />
                        </ListItem>
                    </Grid>
                </Grid>
                <Grid container direction='row'>
                    <Grid container item md={6}>
                        <ListItem>
                            <ListItemAvatar>
                                <BusinessCenter />
                            </ListItemAvatar>
                            <ListItemText primary={onBoarding?.employee?.puesto} secondary="Puesto Colaborador" />
                        </ListItem>
                    </Grid>
                    <Grid container item md={6}>
                        <ListItem>
                            <ListItemAvatar>
                                <Today />
                            </ListItemAvatar>
                            <ListItemText primary={onBoarding?.employee?.fecha_alta} secondary="Fecha alta" />
                        </ListItem>
                    </Grid>
                </Grid>
                <Grid container direction='row'>
                    <Grid container item md={6}>
                        <ListItem>
                            <ListItemAvatar>
                                <Assignment />
                            </ListItemAvatar>
                            <ListItemText
                                primary={onBoarding?.fecha_evaluacion2 ? 'Segunda Evaluacion' : 'Primera Evaluación'}
                                secondary="Evaluacion" />
                        </ListItem>
                    </Grid>
                    <Grid container item md={6}>
                        <ListItem>
                            <ListItemAvatar>
                                <Today />
                            </ListItemAvatar>
                            <ListItemText primary={onBoarding?.fecha_evaluacion1 || onBoarding?.fecha_evaluacion2} secondary="Fecha Evaluación" />
                        </ListItem>
                    </Grid>
                </Grid>
                <Grid container direction='row'>
                    <Grid container item md={6}>
                        <ListItem>
                            <ListItemAvatar>
                                <Assignment />
                            </ListItemAvatar>
                            <ListItemText
                                primary={getResultOnboarding(true)}
                                secondary="Nota primera evaluación" />
                        </ListItem>
                    </Grid>
                    <Grid container item md={6}>
                        <ListItem>
                            <ListItemAvatar>
                                <Assignment />
                            </ListItemAvatar>
                            <ListItemText
                                primary={getResultOnboarding(false)}
                                secondary="Nota segunda evaluación" />
                        </ListItem>
                    </Grid>
                </Grid>
            </Container>
            <Container fixed style={{ display: 'flex', flex: 1 }}>
                <Tabs
                    value={tab}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={(event, newValue) => setTab(newValue)}
                    aria-label="disabled tabs example"
                >
                    <Tab label="Recursos" />
                    <Tab label="Habilidades" />
                    <Tab label="Aptitudes" />
                    <Tab label="Resumen" disabled />
                </Tabs>
            </Container>
            <Container fixed component={Paper} style={{ marginTop: '1rem' }}>
                <TabPanel value={tab} index={0}>
                    <ResourcesTab
                        resources_employee={onBoarding ? onBoarding.resources : []}
                        resources={resources}
                    />
                </TabPanel>
                <TabPanel value={tab} index={1}>
                    <SkillsTab
                        activitiesEmployee={onBoarding ? onBoarding.activities : []}
                        levels={levels ? levels.filter(i => i.tipo == 1) : []}
                        plan={plan}
                    />
                </TabPanel>
                <TabPanel value={tab} index={2}>
                    <WillsTab
                        attitudesEmployee={onBoarding ? onBoarding.attitudes : []}
                        levels={levels ? levels.filter(i => i.tipo == 1) : []}
                        plan={plan}
                    />
                </TabPanel>
                <TabPanel value={tab} index={3}>
                    Item 4
                </TabPanel>
            </Container>
        </Layout>
    )
}

export default withRouter(PlanEvaluate)
