import React, { Component } from 'react';
import DataTableExtensions from "react-data-table-component-extensions";
import { ButtonBase } from '@material-ui/core';
import DataTable from 'react-data-table-component';
import "./dataTable.css";
import AddBoxIcon from '@material-ui/icons/AddBox';

class DataTableComp extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    
    render() { 
        const tableData = {
            columns:this.props.columns,
            data :this.props.data
          };
        return ( 
            <DataTableExtensions {...tableData}
            export = {false}
            print = {false}
            style={{width: "90%"}}
            
            >
              

             <DataTable
               title={`All ${this.props.title} Type `}
               columns={this.props.columns}
               data={this.props.data}
               pagination
               highlightOnHover
               responsive={true}
             />
              </DataTableExtensions>
           
         );
    }
}
 
export default DataTableComp;