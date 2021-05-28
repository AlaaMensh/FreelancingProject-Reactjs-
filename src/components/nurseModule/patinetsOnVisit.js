import React, { useState, useEffect } from 'react';
import  { Component } from 'react';
import nurseModule from "../nurseDB.json";
import DataTableComp from "../typesGenerator/dataTable";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



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
   
      //  await fetch(`${nurseModule[type].getAll}`, {
       await fetch(`https://localhost:8080/session/getSessionByDate`, {
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


    rendering = () =>{
        return(
          <Container>
          <Row className= "py-3">
              <Col>
                  {
                      <>
                        <h3>All Patients on Active Visit</h3>
                        <div>You will see here all patients on visits....</div>
                      </>
                    
                  }
              </Col>
          </Row>
            {
        this.state.patientsOnVisit &&(
          <DataTableComp data={this.state.patientsOnVisit}
          columns = {this.state.columns} 
          title= ""/>

        )
      }
            </Container> 
            
                    
        
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