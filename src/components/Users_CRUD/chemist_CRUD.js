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
import pathologist from './pathologist';

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
  },
  input2 :{
    height:"10px"
  },
  iconPlus:{
    margin: "auto",
    textAlign:"center"
  }
});



var id = 0;
var rowsToKeep = [];
var rowsToBeDeleted = [];

class Chemist extends Component {
  constructor(props) {
    super(props);
    
    this.state = { 
      chemistList : [],
      typeId:0,
      openModal1:false,
      openModal2:false,
      TypeObj : {},
      username:"",
      name: "",
      email :"",
      phone: ""  
          }
        }
        
        getTypeByID = async(id) => {
          console.log("heeereeeee" , id);
          let response = await fetch(`http://localhost:2400/chemist/${id}`);
          var payload = await response.json();
          console.log( " kkkkkkkkkkkkkkkkkkkkkkkkkkkkk" , payload);
          this.setState({
            TypeObj:payload
          })
        }
        getChemistTypesList = (chemistList) =>{
        for(var type in chemistList){
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
      await axios.get(' http://localhost:2400/chemist').then(async resp => {
        // return resp.data;
         this.setState({
            chemistList : resp.data
        })
      })
    }
  
     handleCloseModal2 = () => {
      this.setState({openModal2 : false})
    };
    refreshAfterDeletion = (id)=>{
     this.setState({
     chemistList: this.state.chemistList.filter(row => row.id !== id)
     })
    }
 
    handleDelete= async(id)=>{
        await axios.delete(`http://localhost:2400/chemist/${id}`)
        .then(res => {
          console.log(res);
          console.log(res.data);
        })
        .catch(err=>{console.log("nooooo")})

         
    }
   async componentDidMount(){
      this.getData()
    }
    handleUpdate = ()=>{
      var obj = {
        id:this.state.TypeObj.id,
        username: this.state.username,
        name: this.state.name,
        email : this.state.email,
        phone : this.state.phone,
      }
      if(!obj.username){
        obj.username = this.state.TypeObj.username
      }
      if(!obj.name){
        obj.name = this.state.TypeObj.name
      }
      if(!obj.email){
        obj.email = this.state.TypeObj.email
      }
      if(!obj.phone){
        obj.phone = this.state.TypeObj.phone
      }
      console.log("type: ", obj);
      axios.put(`http://localhost:2400/chemist/${id}` , obj)
         .then(res => {
           console.log(res);
           console.log(res.data);
         })
         this.getData()
    }

    componentDidUpdate(){
        console.log("hhhhhhh")
        this.rendering();
    }

    rendering = () =>{
        return(
        <div>
            <div style={{ height: 400, width: '100%' }}>
               <DataGrid rows={this.state.allergyList} columns={[{ field: 'id', headerName: 'ID', width: 70 },
              { field: 'username', headerName: 'UserName', width: 200 },
              { field: 'name', headerName: 'Name', width: 400 },
              { field: 'email', headerName: 'Email', width: 400 },
              { field: 'phone', headerName: 'Phone', width: 200 },              {
                field: 'Actions',
                headerName: 'Actions',
                width: 550,
                renderCell: (params) => (
                  <strong>
                    {/* {params.value.getFullYear()} */}
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                     
                      style={{ marginLeft: 16 }}
                      onClick={()=>{
                        this.handleopenModal1();
                        this.getTypeByID(params.row.id);
                        this.getData()
                      }
                        
                      }
                    >
                      edit
                    </Button>
                    
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
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
      var obj = {
        username: this.state.username,
        name: this.state.name,
        email : this.state.email,
        phone : this.state.phone,

      }

      console.log("type: ", obj);
      axios.post(`http://localhost:2400/chemist`,  obj )
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      this.getData();
    }


    render() { 
      const { classes } = this.props;
        
  return (
    <div>
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
            <Grid item xs={12}>
              <TextField
               InputProps={{ classes: { input: this.props.classes.input2 } }}
                variant="outlined"
                required
                fullWidth
                id="username"
                // label="Name"
                name="username" 
                type="text"
                autoComplete="UserName"
                placeholder={this.state.TypeObj.username}
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
                name="email"
                // label="description"
                type="text"
                id="email"
                autoComplete="email"
                placeholder={this.state.TypeObj.email}
                onChange = {(event) =>{
                  // console.log('hhhhhhhhhhhhhhhhhh' , event.target.value)
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
                name="role"
                // label="description"
                type="text"
                id="role"
                autoComplete="role"
                placeholder={this.state.TypeObj.email}
                onChange = {(event) =>{
                  // console.log('hhhhhhhhhhhhhhhhhh' , event.target.value)
                  this.setState({role : event.target.value});
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

<Fab color="primary" aria-label="add" className ={classes.iconPlus} onClick = {()=>{
  this.handleopenModal2()
}} >
  <AddIcon  />
</Fab>
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
                name="name"
                label="name"
                type="text"
                id="name"
                autoComplete="name"
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
 
export default withStyles(useStyles)(pathologist); 