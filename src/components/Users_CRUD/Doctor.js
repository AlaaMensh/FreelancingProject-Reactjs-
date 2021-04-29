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
import { NativeSelect } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import AddBoxIcon from '@material-ui/icons/AddBox';
import EditIcon from '@material-ui/icons/Edit';
// import AddIcon from '@material-ui/icons/AddIcon';
import Fab from '@material-ui/core/Fab'
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import "./types.css";
// import EditIcon from '@material-ui/icons/Edit';

const useStyles = (theme) => ({
  paper: {
    // marginTop: theme.spacing(8),
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



var id = 0;
var rowsToKeep = [];
var rowsToBeDeleted = [];

class Doctor extends Component {
  constructor(props) {
    super(props);
    
    this.state = { 
      assistantList : [],
      typeId:0,
      openModal1:false,
      openModal2:false,
      TypeObj : {},
      
      userName:"",
      firstName: "",
      lastName :"",
      password :"",
      email :"",
      phone :"",
      address: "" ,
      date: "" ,
      degree: "" ,
      
          }
        }
        
        getTypeByID = async(id) => {
          console.log("heeereeeee" , id);
          // let response = await fetch(`http://localhost:3000/assistant/getAssistant`);
          var details = {
            id:id
          }
          var formBody = [];
          for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
          }
          
          fetch(`http://localhost:3000/doctor/getDoctor`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody
          }).then((result)=>{
            result.json().then((data)=>{
              console.log("data: " , data[0])
              this.setState({TypeObj : data[0]})

            })
            console.log("Getting: " , result);
          }).catch((e)=>{
            console.log("error here erroer idkdkdkdkdk" , e)
          })
        }
        getAssistantTypesList = (assistqntList) =>{
        for(var type in this.state.assistantList){
            console.log("type: ", type.name);
        }
    }
    handleopenModal1 = () => {
      this.setState({openModal1 : true})
    };
  
     handleClose = () => {
      this.setState({openModal1 : false})
    };
    handleopenModal2 = () => {
      this.setState({openModal2 : true})
    };
    getData = async()=>{
      await axios.get('http://localhost:3000/doctor/getAll').then(async resp => {
        // return resp.data;
        // resp.json().then((data)=>{
        //   console.log("data:  " , data);
        // })
        console.log("resp.data: " , resp.data);

         this.setState({
            assistantList : resp.data
        })
      })
    }
  
     handleCloseModal2 = () => {
      this.setState({openModal2 : false})
    };
    refreshAfterDeletion = (id)=>{
     this.setState({
      assistantList: this.state.assistantList.filter(row => row.id !== id)
     })
    }
 
    handleDelete= async(id)=>{
      var details = {
        id:id
      }
      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      // formBody = formBody.join("&");
      
      fetch('http://localhost:3000/doctor/deleteDoctor', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
      }).then(()=>{
        console.log("it is deleted");
      }).catch(()=>{
        console.log("errror")
      })
      
         
    }
   async componentDidMount(){
      this.getData()
    }
    handleUpdate = ()=>{
      var details = {
        id:this.state.TypeObj.id,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        userName: this.state.userName,
        password : this.state.password,
        phone: this.state.phone,
        address: this.state.address,
        degree: this.state.degree,
        date : this.state.date,
        email : this.state.email,
      }
      if(!details.firstName){
        details.firstName = this.state.TypeObj.firstName
      }
      if(!details.lastName){
        details.lastName = this.state.TypeObj.lastName
      }
      if(!details.userName){
        details.userName = this.state.TypeObj.userName
      }
      if(!details.password){
        details.password = this.state.TypeObj.password
      }
      if(!details.phone){
        details.phone = this.state.TypeObj.phone
      }
      if(!details.address){
        details.address = this.state.TypeObj.address
      }
      if(!details.degree){
        details.degree = this.state.TypeObj.degree
      }
      if(!details.date){
        details.date = this.state.TypeObj.Date
      }
      if(!details.email){
        details.email = this.state.TypeObj.Email
      }

      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");

   console.log("form :    "  , formBody);
      fetch('http://localhost:3000/doctor/updateDoctor', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
      }).then(()=>{
        console.log("it is inserted");
      }).catch(()=>{
        console.log("errror")
      })
        //  this.getData()
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
                <span className="">Chemist Data</span>
            </div>
            <div className="col-10 overflow-hidden ">
                <div className="row justify-content-lg-start">

                </div>
            </div>
          </div>
            <div className = "row gridDataHeader align-items-center" style={{ height: 400, width: '100%' }}>
               <DataGrid className="datagrid bg-light  rounded MuiDataGrid-cellCenter" style={{textAlign:"center"}} rows={this.state.assistantList} columns={[
              { field: 'firstName', headerName: 'firstName', width: 200 },
              { field: 'lastName', headerName: 'lastName', width: 200 },
              { field: 'userName', headerName: 'username', width: 200 },              
              { field: 'Email', headerName: 'Email', width: 200 },                            
              { field: 'phone', headerName: 'Phone', width: 200 },                    
              { field: 'address', headerName: 'Address', width: 200 },              
              { field: 'Date', headerName: 'Date', width: 200 },              
                {field: 'Actions',  
                headerName: 'Actions',
                width: 550,
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
                      this.getTypeByID(params.row.id);
                      this.getData()
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
                         console.log("delete function: " , params.row.id);
                        this.handleDelete(params.row.id);
                        this.refreshAfterDeletion(params.row.id);
                      }}
                    >
                      delete
                    </Button>
                  </strong>
                ),
              },]} pageSize={5}
                checkboxSelection  onRowSelected={async (row) => {
                  console.log("yes" , this.state.typeId);
                  }} getRowId ={(row) =>{
                  }}
                  onRowClick = {(row)=>{
                      console.log("yyyys" , row);
                      id = row.row.id;
                      this.setState({typeId : row.row.id});
                  }} />
            </div>  
        </div>
        )
    }
    handleAdding = () =>{
      var details = {
        firstName: this.state.username,
        lastName: this.state.name,
        Email : this.state.email,
        address : this.state.phone,
        address : this.state.phone,
        address : this.state.phone,
        address : this.state.phone,
        address : this.state.phone,
        address : this.state.phone,

      }

      // console.log("type: ", obj);
      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      console.log("formging:     " , formBody)
      
      fetch('http://localhost:3000/allergy/addAssisrant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
      }).then(()=>{
        console.log("it is inserted");
      }).catch(()=>{
        console.log("errror")
      })
      this.getData();
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
      {/* <CssBaseline /> */}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <EditIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Edit
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
               InputProps={{ classes: { input: this.props.classes.input2 } }}
                variant="outlined"
                required
                fullWidth
                id="firstName"
                // label="Name"
                name="firstName" 
                type="text"
                autoComplete="firstName"
                placeholder={this.state.TypeObj.firstName}
                // placeholder="hhel"
                onChange = {(event) =>{
                  this.setState({firstName : event.target.value});
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
               InputProps={{ classes: { input: this.props.classes.input2 } }}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                // label="lastName"
                name="lastName" 
                type="text"
                autoComplete="lastName"
                placeholder={this.state.TypeObj.lastName}
                // defaultValue={this.state.TypeObj.lastName}
                onChange = {(event) =>{
                  this.setState({lastName : event.target.value});
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
               InputProps={{ classes: { input: this.props.classes.input2 } }}
                variant="outlined"
                required
                fullWidth
                id="userName"
                // label="Name"
                name="userName" 
                type="text"
                autoComplete="userName"
                placeholder={this.state.TypeObj.userName}
                onChange = {(event) =>{
                  this.setState({userName : event.target.value});
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
               InputProps={{ classes: { input: this.props.classes.input2 } }}
                variant="outlined"
                required
                fullWidth
                id="email"
                // label="Name"
                name="email" 
                type="text"
                autoComplete="Email"
                placeholder={this.state.TypeObj.Email}
                onChange = {(event) =>{
                  this.setState({email : event.target.value});
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
               InputProps={{ classes: { input: this.props.classes.input2 } }}
                variant="outlined"
                required
                fullWidth
                id="phone"
                name="phone" 
                type="text"
                autoComplete="Phone"
                placeholder={this.state.TypeObj.phone}
                onChange = {(event) =>{
                  this.setState({phone : event.target.value});
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
              InputProps={{ classes: { input: this.props.classes.input2 } }}
                variant="outlined"
                required
                fullWidth
                name="address"
                // label="description"
                type="text"
                id="address"
                autoComplete="address"
                placeholder={this.state.TypeObj.address}
                onChange = {(event) =>{
                  // console.log('hhhhhhhhhhhhhhhhhh' , event.target.value)
                  this.setState({address : event.target.value});
                }}
                
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
              InputProps={{ classes: { input: this.props.classes.input2 } }}
                variant="outlined"
                required
                fullWidth
                name="password"
                type="text"
                id="password"
                autoComplete="password"
                placeholder={this.state.TypeObj.password}
                onChange = {(event) =>{
                  this.setState({password : event.target.value});
                }}
                
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
              InputProps={{ classes: { input: this.props.classes.input2 } }}
                variant="outlined"
                required
                fullWidth
                name="date"
                type="date"
                id="date"
                autoComplete="date"
                placeholder={this.state.TypeObj.Date}
                onChange = {(event) =>{
                  console.log("dateeee:   " , event.target.value);
                  this.setState({date : event.target.value});
                }}
                
              />
            </Grid>  
            <Grid item xs={6}>
              <TextField
              InputProps={{ classes: { input: this.props.classes.input2 } }}
                variant="outlined"
                required
                fullWidth
                name="degree"
                type="text"
                id="degree"
                autoComplete="degree"
                placeholder={this.state.TypeObj.degree}
                onChange = {(event) =>{
                  this.setState({degree : event.target.value});
                }}
                
              />
            </Grid>  
          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={()=>{
              this.handleUpdate();
              this.getData();
              
            }}
          >
            Edit
          </Button>
          
        </form>
      </div>
      {/* <Box mt={5}>
        <Copyright />
      </Box> */}
    </Container>
</Modal>

{/* <Fab color="primary" aria-label="add" className ={classes.iconPlus} onClick = {()=>{
  this.handleopenModal2()
}} >
  <AddIcon  />
</Fab> */}
<Modal
key="1"
  open={this.state.openModal2}
  onClose={this.handleCloseModal2}
  aria-labelledby="simple-modal-title1"
  aria-describedby="simple-modal-description2"
>
<Container component="main" maxWidth="xs">
      {/* <CssBaseline /> */}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AddBoxIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
              InputProps={{ classes: { input: this.props.classes.input2 } }}
                variant="outlined"
                required
                fullWidth
                id="username"
                label="UserName"
                name="username" 
                type="text"
                autoComplete="UserName"
                onChange = {(event) =>{
                  this.setState({username : event.target.value});
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
              InputProps={{ classes: { input: this.props.classes.input2 } }}
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                name="name" 
                type="text"
                autoComplete="Name"
                onChange = {(event) =>{
                  this.setState({name : event.target.value});
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
              InputProps={{ classes: { input: this.props.classes.input2 } }}
                variant="outlined"
                required
                fullWidth
                name="email"
                label="email"
                type="text"
                id="email"
                autoComplete="email"
                onChange = {(event) =>{
                  this.setState({email : event.target.value});
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
              InputProps={{ classes: { input: this.props.classes.input2 } }}
                variant="outlined"
                required
                fullWidth
                name="phone"
                label="phone"
                type="text"
                id="phone"
                autoComplete="phone"
                onChange = {(event) =>{
                  this.setState({phone : event.target.value});
                }}
                
              />
            </Grid>
           
          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={()=>{
              this.handleAdding();
              this.getData();
            }}
          >
            Add
          </Button>
          
        </form>
      </div>
      {/* <Box mt={5}>
        <Copyright />
      </Box> */}
    </Container>
</Modal>
    </div>
 
  );
    }
}
 
export default withStyles(useStyles)(Doctor); 