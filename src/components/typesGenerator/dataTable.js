import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
import "./dataTable.css";

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
          <div>
             <DataTable
               title={` ${this.props.title}`}
               columns={this.props.columns}
               data={this.props.data}
               pagination
               highlightOnHover
               
             />
           </div>
         );
    }
}
 
export default DataTableComp;