import React from 'react';
import { Container, Typography } from '@material-ui/core';
import Layout from "../../components/layout";

const Home = (props) => (
    <Layout title="Home">
        <Container maxWidth="lg">
            <Typography variant="h4" style={{ textAlign: "center", marginBottom: 15 }}>
                Proceso de Onboarding
            </Typography>
        </Container>
        <br />
        <Container maxWidth="sm">
            <img src={'./logo.png'} style={{ width: "100%" }} />
            <Typography>Este es un cambio implementado por CI/CD</Typography>
        </Container>
    </Layout>
)

export default Home;