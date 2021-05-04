import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import  { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
// import  { useState } from 'react';
import { ListItemAvatar, NativeSelect } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import AddBoxIcon from '@material-ui/icons/AddBox';
import EditIcon from '@material-ui/icons/Edit';
// import AddIcon from '@material-ui/icons/AddIcon';
import Fab from '@material-ui/core/Fab'
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
// import "./types.css";
import { useFormik,Formik } from 'formik';
import * as Yup from 'yup';
import SearchForm from "./searchForm";
// import EditIcon from '@material-ui/icons/Edit';

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



var row = [
  {id:1 , firstName : "alaa" , LastName : "Ahmed" , maritalStatus : "lol"},
  {id:2 , firstName : "Mohamed" , LastName : "Nassif" , maritalStatus : "lol"},
  {id:3 , firstName : "Ola" , LastName : "non" , maritalStatus : "lol"},
]

var id = 0;
var rowsToKeep = [];
var rowsToBeDeleted = [];

class DataGridTable extends Component {
  constructor(props) {
    super(props);
    
    this.state = { 

      searchWord:"",
      list :[]  ,
      openModal1:false,
      result :"",
      id:"",
      filtered : []
          }
        }
        

     
    filterData = (name) =>{
      var firstName = this.state.list.filter(row => row.firstname.includes(name))
      this.setState({list : firstName})
      console.log("pppppp : " , firstName);
    //   this.setState({this.props.f : this.state.list})
      
    }

    getData = async()=>{
        console.log("yyyyesssccccccccc: " , this.props.list)
        // this.setState({filtered : this.props.list})
        
      
    }
  
     handleCloseModal2 = () => {
      this.setState({openModal2 : false})
    };
    refreshAfterDeletion = (id)=>{
     this.setState({
      allergyList: this.state.allergyList.filter(row => row.id !== id)
     })
    }
 

   async componentDidMount(){
   
      await this.getData()
    }
      
    handleopenModal1 = () => {
      this.setState({openModal1 : true})
    };
  
     handleClose = () => {
      this.setState({openModal1 : false})
    };


    componentDidUpdate(){
        console.log("hhhhhhh")
        this.rendering();
    }
    getSearchName = (name) =>{
      this.setState({word:name});   
          this.setState((state) => {
              state.filtered = this.props.students.filter((item) => {
                  console.log(name.toLowerCase())
                  // console.log("$$$$" , item.name.toLowerCase().includes(name.toLowerCase()) )
                  return item.name.toLowerCase().includes(name.toLowerCase())
              })
              return state;
          })  

      
  }

    rendering = () =>{
        return(
          <div className="container gridDataContent mt-5"> 
          
           {/* <input class="form-control border-secondary rounded-pill pr-5" type="search"  id="example-search-input2" onChange={(e)=>{
            this.setState({searchWord : e.target.value})
            this.filterData(e.target.value);
          }}></input> */}
          <div className="row mt-5">
            <div className="col-auto px-2 py-2 text-center rounded  header">
                <span className="">Ellergy Types</span>
            </div>
            <div className="col-10 overflow-hidden ">
                <div className="row justify-content-lg-start">

                </div>
            </div>
          </div>
            <div className = "row gridDataHeader align-items-center" style={{ height: 400, width: '100%' }}>
               <DataGrid className="datagrid bg-light  rounded MuiDataGrid-cellCenter" style={{textAlign:"center"}} rows={this.props.filtered} columns={[
              { field: 'id', headerName: 'id', width: 70 },
              { field: 'firstname', headerName: 'FirstName', width: 200 },
              { field: 'secondName', headerName: 'SecondName', width: 100 },
              { field: 'lastname', headerName: 'LastName', width: 100 },
            
              { 
                field: 'Actions',
                headerName: 'Actions',
                width: 250,
                renderCell: (params) => (
                  <strong>
                    {/* {params.value.getFullYear()} */}
                    <Button
                      variant="contained"
                      color="default"
                      size="small"
                      className={this.props.classes.button}
                      startIcon={<EditIcon />}
                     
                      style={{ marginLeft: 16 }}
                      onClick={()=>{
                        this.handleopenModal1();
                        console.log("lsssssssssssssssssssssssssssssssssssss")
                        this.setState({id : params.row.id})
                        // this.getTypeByID(params.row.id);
                        // this.getData()
                      }
                        
                      }
                    >
                       Edit
                      
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      className={this.props.classes.button , this.props.classes.deleteButton}
                      startIcon={<EditIcon />}
                      style={{ marginLeft: 16 }}
                      onClick={async ()=>{
                         console.log("delete function: " , params.row);
                        //  console.log("hiistory : " , this.props);
                         this.props.history.push(`${this.props.location.pathname}/patientOrders/${params.row.PtID}`)
                       
                      }}
                    >
                      View
                    </Button>
                  </strong>
                ),
              }]} pageSize={5}
                checkboxSelection  onRowSelected={async (row) => {
                  
                   
                  console.log("yes" , this.state.typeId);
                  }} getRowId ={(row) =>{
                      
                  }}
                  onRowClick = {(row)=>{
                      console.log("yyyys" , row);
                
                  }} />
            </div> 
              <div className="row mt-4">
                  
                      </div>
                    </div>
        
        )
    }
    
     fileChangedHandler = (event) => {
    this.setState({result : event.target.value})
      }

      handleUpdate = () =>{
        console.log("state.id : " , this.state.id); 
        var form = new FormData();
        form.append("id", this.state.id);
        form.append("result", this.state.result);

        axios.post('http://localhost:3000/lab/uploadFile' ,form).then( resp => {
          console.log("resp : " ,resp)
       
          // setLabs(resp.data)
          // console.log("resp.data: " , resp.data);
        
        })
      }

    render() { 
      const { classes } = this.props;
        
  return (
    <div className="hero">
        {this.rendering()}
        <Modal
  open={this.state.openModal1}
  onClose={this.handleClose}
  aria-labelledby="simple-modal-title"
  aria-describedby="simple-modal-description"
>
<Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <EditIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Edit
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
          

            <Grid item xs={12}>
            <input
              style={{display:'none'}}
                    accept="*"
                    id="contained-button-file"
                    type="file"
                    onChange={this.fileChangedHandler}
                  />
                  <label htmlFor="contained-button-file">
                    <Button style={{marginLeft:'40%'}} variant="contained" color="primary" component="span">
                      Upload
                    </Button>
                  </label>
            </Grid>
           
            
           
          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={()=>{
          if(parseInt(localStorage.getItem("role") == 2)){
            this.handleUpdate();
          }
          else{
            alert("you Are not Authorized....");
          }
              // this.getData();
              
            }}
          >
           
            Edit
          </Button>

          
        </form>

      </div>
     
    </Container>
</Modal>

    </div>
 
  );
    }
}
 
export default withStyles(useStyles)(DataGridTable); 