import React, { useState, useEffect } from 'react';
import Checkbox from '@material-ui/core/Checkbox';

import TableGrid from '../../components/grid';

const ResourcesTab = ({ resources_employee, resources }) => {

    const cellResourceName = (row) => {
        const value = row.value
        const resource = resources.find(i => i.id == value);
        return resource?.descripcion
    }

    const cellCheck = (row) => {
        return (
            <Checkbox
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />
        )
    }

    return (
        <TableGrid
            defaultPageSize={25}
            excelName='Recursos'
            id="Recursos-grid"
            data={resources_employee}
            info={[
                { dataField: "id", caption: "Id", width: "auto" },
                { dataField: "id_recurso", caption: "Recurso", cellRender: cellResourceName },
                { dataField: "entregado", caption: "Entregado", cellRender: cellCheck },
                { dataField: "fecha_entregado", caption: "Fecha Entregado" },
            ]}
        >
        </TableGrid>
    )
}

export default ResourcesTab;
