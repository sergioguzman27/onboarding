import React, { useState, useEffect } from 'react';
import Checkbox from '@material-ui/core/Checkbox';

import TableGrid from '../../components/grid';

const WillsTab = ({ attitudesEmployee, plan, levels }) => {

    const cellAttitudName = (row) => {
        const value = row.value;
        const attitude = plan.attitudes.find(i => i.id == value);
        return attitude?.nombre
    }
    
    const cellAttitudDescription = (row) => {
        const value = row.value;
        const attitude = plan.attitudes.find(i => i.id == value);
        return attitude?.descripcion
    }
    
    const cellAttitudWeight = (row) => {
        const value = row.value;
        const attitude = plan.attitudes.find(i => i.id == value);
        return attitude?.peso
    }

    const cellCheck = (row) => {
        return (
            <Checkbox
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />
        )
    }

    const getColumns = () => {
        console.log('levels ', levels)
        const columns = [
            { dataField: "id_actitud", caption: "Actitud", cellRender: cellAttitudName },
            { dataField: "id_actitud", caption: "Descripcion", cellRender: cellAttitudDescription },
            { dataField: "id_actitud", caption: "Peso", cellRender: cellAttitudWeight, width: "auto" },
        ];

        levels.forEach(item => {
            columns.push({ dataField: "etiqueta", caption: `${item.etiqueta} (${item.porcentaje}%)`, cellRender: cellCheck, width: "auto" })
        });

        return columns;
    }

    return (
        <TableGrid
            defaultPageSize={25}
            excelName='Recursos'
            id="Recursos-grid"
            data={attitudesEmployee}
            info={getColumns()}
        >
        </TableGrid>
    )
}

export default WillsTab;
