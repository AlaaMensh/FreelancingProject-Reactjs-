import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import  { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import AddBoxIcon from '@material-ui/icons/AddBox';
import EditIcon from '@material-ui/icons/Edit';
import { withStyles } from '@material-ui/core/styles';
import nurseModule from "../nurseDB.json";
import DataTableComp from "../typesGenerator/dataTable"



var object  = {}
const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor : "white",
    padding:"1em",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    fontSize:"1.1em",
    fontFamily:"Dosis"
  },
  input2 :{
    height:"10px"
  },
  iconPlus:{
    margin: "auto",
    textAlign:"center"
    // float:"right",
  },
  button: {
    margin: theme.spacing(1),
    fontFamily: 'Roboto Slab'
  },
  deleteButton: {
    backgroundColor:"#c94c4c"
  },
  editButton: {
    backgroundColor:"#c94c4c"
  }
});





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
            <div className = "row align-items-center" >
            {console.log("columns : "  , this.state.columns)}
            {
        this.state.patientsOnVisit &&(
          <DataTableComp data={this.state.patientsOnVisit}
          columns = {this.state.columns} 
          title= ""/>

        )
      }
            </div> 
              <div className="row mt-4">
                       
                      </div>
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
 
export default withStyles(useStyles)(PatientsOnVisit); 