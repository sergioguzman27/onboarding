import React from 'react';
import 'devextreme/dist/css/dx.light.css';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { Visibility, Edit, Delete, Add } from '@material-ui/icons';
import { Tooltip } from '@material-ui/core';
import DataGrid, {
  Column,
  ColumnChooser,
  Editing,
  Export,
  FilterRow,
  Format,
  Grouping,
  GroupItem,
  GroupPanel,
  HeaderFilter,
  Pager,
  Paging,
  SearchPanel,
  Summary
} from 'devextreme-react/data-grid';

const pageSizes = [10, 25, 50, 100];

const cellAction = (rowInfo, action) => {
  if (action.action === 'edit')
    return (
      <Tooltip title="Editar">
        <Edit onClick={() => {
          action.function(rowInfo.data)
        }}>{action.text}</Edit></Tooltip>
    )

  if (action.action === 'delete')
    return (
      <Tooltip title="Eliminar">
        <Delete onClick={() => {
          action.function(rowInfo.data)
        }}>{action.text}</Delete></Tooltip>
    )

  if (action.action === 'add' && !rowInfo.data.onboarding)
    return (
      <Tooltip title="Agregar">
        <Add onClick={() => {
          action.function(rowInfo.data)
        }}>{action.text}</Add></Tooltip>
    )

  if (action.action === 'evaluate' && rowInfo.data.onboarding && (!rowInfo.data.onboarding.fecha_evaluacion1 || !rowInfo.data.onboarding.fecha_evaluacion2))
    return (
      <Tooltip title="Evaluar">
        <Edit onClick={() => {
          action.function(rowInfo.data)
        }}>{action.text}</Edit></Tooltip>
    )

  if (action.action === 'report' && rowInfo.data.onboarding && (rowInfo.data.onboarding.fecha_evaluacion1 || rowInfo.data.onboarding.fecha_evaluacion2))
    return (
      <Tooltip title="Ver">
        <Visibility onClick={() => {
          action.function(rowInfo.data)
        }}>{action.text}</Visibility></Tooltip>
    )

  if (action.action === 'detail')
    return (
      <Tooltip title="Ver">
        <Visibility onClick={() => {
          action.function(rowInfo.data)
        }}>{action.text}</Visibility></Tooltip>
    )

  return (<div />)
}

class TableGrid extends React.Component {
  constructor(props) {
    super(props);
    console.log('-----------------------------')
    console.log(props.data);
    console.log(props.actions)
    this.state = {
      collapsed: false
    };
    this.onContentReady = this.onContentReady.bind(this);
    this.excelName = props.excelName
  }
  onExporting(e, excelName) {
    console.log("excel")
    console.log(excelName)
    if (excelName !== undefined) {

      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet('Hoja 1');
      exportDataGrid({
        component: e.component,
        worksheet: worksheet,
        customizeCell: function (options) {
          const excelCell = options;
          excelCell.font = { name: 'Arial', size: 12 };
          excelCell.alignment = { horizontal: 'left' };
        }
      }).then(function () {
        workbook.xlsx.writeBuffer()
          .then(function (buffer) {
            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), `${excelName}.xlsx`);
          });
      });
    }
    e.cancel = true;
  }
  render() {
    return (
      <DataGrid
        id={this.props.id}
        dataSource={this.props.data}
        allowColumnReordering={true}
        showBorders={true}
        onExporting={(e) => this.onExporting(e, this.props.excelName)}
        onContentReady={this.onContentReady}
        autoExpandAll={true}
        columnAutoWidth={this.props.columnAutoWidth || false}
        style={this.props.columnAutoWidth ? { overflowX: 'auto' } : {}}
      >
        {console.log(this.props.excelName)}
        <Export enabled={true} />
        <HeaderFilter visible={true} />
        <GroupPanel visible={true}
          autoExpandAll={true}
          expandMode="rowClick"
          allowCollapsing={false}
        />
        <FilterRow visible={true} />
        <SearchPanel visible={true} highlightCaseSensitive={true} />
        <Grouping autoExpandAll={false} />
        <ColumnChooser
          enabled={true}
          mode="dragAndDrop"
        />
        {
          this.props.info === undefined ?
            null :
            this.props.info.map(h =>
              <Column
                dataField={h.dataField}
                dataType={h.dataType}
                cellRender={h.cellRender}
                groupIndex={h.group}
                visible={h.visible}
                printable={h.printable}
                type={h.type}
                alignment={h.alignment || "left"}
                format={h.dataType === 'date' ? 'dd/MM/yyyy' : h.format}
                caption={h.caption}
                width={h.width}>{h.type ? null : <Format type={h.type} precision={h.precision} />}</Column>)
        }
        <Editing
          useIcons={true}
        />
        {/* {
          this.props.actions === undefined ? null : (
            this.props.actions.map(a =>
              <Column cellRender={(info) => cellAction(info, a)} width={a.width} />)
          )
        } */}
        {
          this.props.actions === undefined ? null : (
            <Column cellRender={info => (
              <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                {this.props.actions.map(a => cellAction(info, a))}
              </div>
            )}
              width={this.props.actionsWidth} />
          )
        }
        {
          this.props.cellRender === undefined ? null :
            <Column cellRender={(info) => this.props.cellRender(info)} width={this.props.actionsWidth} />
        }
        {
          this.props.info === undefined ?
            null :
            (
              <Summary>
                {
                  this.props.info.filter(i => i.summaryType !== undefined).map(item => (
                    <GroupItem
                      column={item.dataField}
                      summaryType={item.summaryType}
                      displayFormat={item.displayFormat}
                    />)
                  )
                }
              </Summary>
            )
        }
        <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
        <Paging defaultPageSize={this.props.defaultPageSize === undefined ? 10 : this.props.defaultPageSize} />
      </DataGrid>
    );
  }

  onContentReady(e) {
    if (!this.state.collapsed) {
      e.component.expandRow(['EnviroCare']);
      this.setState({
        collapsed: true
      });
    }
  }
}

export class TableGridCustom extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
    this.onContentReady = this.onContentReady.bind(this);
    this.excelName = props.excelName
  }

  onExporting(e, excelName) {
    console.log("excel")
    console.log(excelName)
    if (excelName !== undefined) {

      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet('Hoja 1');
      exportDataGrid({
        component: e.component,
        worksheet: worksheet,
        customizeCell: function (options) {
          const excelCell = options;
          excelCell.font = { name: 'Arial', size: 12 };
          excelCell.alignment = { horizontal: 'left' };
        }
      }).then(function () {
        workbook.xlsx.writeBuffer()
          .then(function (buffer) {
            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), `${excelName}.xlsx`);
          });
      });
    }
    e.cancel = true;
  }

  render() {
    return (
      <DataGrid
        id={this.props.id}
        dataSource={this.props.data}
        allowColumnReordering={true}
        showBorders={true}
        onExporting={(e) => this.onExporting(e, this.props.excelName)}
        onContentReady={this.onContentReady}
        onOptionChanged={this.props.onOptionChanged}
        columnAutoWidth={this.props.columnAutoWidth || false}
        style={this.props.columnAutoWidth ? { overflowX: 'auto' } : {}}
        autoExpandAll={true}
      >
        <Export enabled={true} />
        <HeaderFilter visible={this.props.noHeaderFilter ? false : true} />
        <GroupPanel visible={this.props.noGroupPanel ? false : true}
          autoExpandAll={true}
        />
        <FilterRow visible={this.props.noSearchPanel ? false : true} />
        <SearchPanel visible={this.props.noSearchPanel ? false : true} highlightCaseSensitive={true} />
        <Grouping autoExpandAll={true} />
        <ColumnChooser
          enabled={true}
          mode="dragAndDrop"
        />
        {this.props.children}
        <Pager allowedPageSizes={pageSizes} showPageSizeSelector={this.props.noShowPagination ? false : true} />
        <Paging enabled={!this.props.noShowPagination} defaultPageSize={this.props.defaultPageSize === undefined ? 10 : this.props.defaultPageSize} />
      </DataGrid>
    );
  }

  onContentReady(e) {
    if (this.props.dataChanges)
      this.props.dataChanges(e.component.getDataSource().items());
    if (!this.state.collapsed) {
      e.component.expandRow(['EnviroCare']);
      this.setState({
        collapsed: true
      });
    }
  }
}

export default TableGrid;
