import React, { useState, useEffect } from 'react';
import  { Component } from 'react';
import nurseModule from "../nurseDB.json";
import DataTableComp from "../typesGenerator/dataTable"





class PatientsOnVisit extends Component {
  constructor(props) {
    super(props);
    
    this.state = { 
      typeId:0,
      patientsOnVisit:[],
      columns:[]
          }
        }
        
 

    
    getData = async()=>{
    var type = "patientsOnVisit"
      var details = {
        date:new Date()
       }
       var formBody = [];
       for (var property in details) {
         var encodedKey = encodeURIComponent(property);
         var encodedValue = encodeURIComponent(details[property]);
         formBody.push(encodedKey + "=" + encodedValue);
       }
       formBody = formBody.join("&");
   console.log("/.........................." ,nurseModule[type] )
   
       await fetch(`${nurseModule[type].getAll}`, {
         method: 'GET',
         headers: {
           'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
         }
         
       }).then(async(resp)=>{
         resp.json().then(async(data)=>{
           console.log("Data:  " , data)
           this.setState({patientsOnVisit : data});
          //  await this.setState({orderlabList: data});
         })
       }).catch(()=>{
         console.log("error Getting Here")
       })
      
    }
  
     handleCloseModal2 = () => {
      this.setState({openModal2 : false})
    };
  
 

   async componentDidMount(){
      this.getData()
      this.handleDataTableColumns()
    }
    handleDataTableColumns = () =>{
      var type = "patientsOnVisit";
      var temp = [];
    
      for(var p in nurseModule[type].columnsTable ){ // for Adding actions Buttons to DataTable
        if(p === "actions"){
          nurseModule[type].columnsTable[p]["cell"] =  (row) =>{ return(
          <div className = "row">
            <div className="col-auto">
              <button  className="btn btn-info"
                onClick={async () => {  
                  console.log("rooooow : " , row)
                  this.props.history.push(`${this.props.location.pathname}/nurseVisit/${row.ptId}`)
                  }}>Fill Vitals</button>
            </div>
          
          </div>
          )
          }
          temp.push(nurseModule[type].columnsTable[p])
        }
        else{
  
          temp.push(nurseModule[type].columnsTable[p])
        }
      }
      this.setState({columns : temp})
      temp = []
    }


    componentDidUpdate(){
        console.log("hhhhhhh")
        this.rendering();
    }

    rendering = () =>{
        return(
          <div className="container gridDataContent mt-5"> 
          <div className="row">
            <div className="col-auto px-2 py-2 text-center rounded  header">
                <span className="">All Patient in Active Visit</span>
            </div>
            <div className="col-10 overflow-hidden ">
                <div className="row justify-content-lg-start">
              
                </div>
            </div>
          </div>
           
            {console.log("columns : "  , this.state.columns)}
            {
        this.state.patientsOnVisit &&(
          <DataTableComp data={this.state.patientsOnVisit}
          columns = {this.state.columns} 
          title= ""/>

        )
      }
            </div> 
            
                    
        
        )
    }



    render() { 
      const { classes } = this.props;
        
  return (
    <div className="hero">
     
        {this.rendering()}

    </div>
 
  );
    }
}
 
export default PatientsOnVisit; 