import React, { useState, useEffect } from 'react';
import Checkbox from '@material-ui/core/Checkbox';

import TableGrid from '../../components/grid';

const SkillsTab = ({ activitiesEmployee, plan, levels }) => {

    const cellObjetiveName = (row) => {
        const value = row.value;
        const activity = plan.activities.find(i => i.id == value);
        const objective = plan.objectives.find(i => i.id == activity?.id_objetivo);
        return objective?.nombre
    }
    
    const cellActivityName = (row) => {
        const value = row.value
        const activity = plan.activities.find(i => i.id == value);
        return activity?.nombre
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
            { dataField: "id", caption: "Id", width: "auto" },
            { dataField: "id_actividad", caption: "Objetivo", cellRender: cellObjetiveName },
            { dataField: "id_actividad", caption: "Actividad", cellRender: cellActivityName },
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
            data={activitiesEmployee}
            info={getColumns()}
        >
        </TableGrid>
    )
}

export default SkillsTab;
