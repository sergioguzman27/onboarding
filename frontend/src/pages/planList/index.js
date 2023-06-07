import React, { useState, useEffect } from 'react';
import { Backdrop, CircularProgress, Container, Paper, makeStyles } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

import Layout from '../../components/layout';
import TableGrid from '../../components/grid';
import FabAddButton from '../../components/buttons/fabAddButton';
import Api from '../../utils/api';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 10000000,
        color: "#fff",
    }
}));

const PlanList = (props) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const getPlans = async () => {
        setLoading(true);
        try {
            const response = await Api.Get('plan');
            setData(response.data);
        } catch (e) {
            alert("Error de servidor")
        }
        setLoading(false);
    }

    useEffect(() => {
        getPlans();
    }, []);

    const navigateForm = (row=null) => {
        props.history.push('/plan-crear');
    }

    const deleteObj = (row) => {}

    return (
        <Layout title="Listado de planes">
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
                            { dataField: "puesto", caption: "Puesto" },
                            // { dataField: "fecha", caption: "Fecha", dataType: "string" },
                            { dataField: "peso_skill", caption: "Peso Skill" },
                            { dataField: "peso_will", caption: "Peso Will" },
                        ]}
                        actions={[
                            { action: "edit", function: navigateForm, text: "Editar" },
                            { action: "delete", function: deleteObj, text: "Eliminar" }
                        ]}
                        actionsWidth='auto'
                    >
                    </TableGrid>
                    <FabAddButton onClick={() => navigateForm()} />
                </Container>
            </Container>
        </Layout>
    )
}

export default withRouter(PlanList);
