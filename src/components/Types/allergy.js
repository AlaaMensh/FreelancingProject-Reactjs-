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

class Allergy extends Component {
  constructor(props) {
    super(props);
    
    this.state = { 
      allergyList : [],
      typeId:0,
      openModal1:false,
      openModal2:false,
      TypeObj : {},
      name:"",
      description :""  
          }
        }
        
        getTypeByID = async(id) => {
          console.log("heeereeeee" , id);
          let response = await fetch(`http://localhost:2400/allergy/${id}`);
          var payload = await response.json();
          console.log( " kkkkkkkkkkkkkkkkkkkkkkkkkkkkk" , payload);
          this.setState({
            TypeObj:payload
          })
        }
        getAllergyTypesList = (allergyList) =>{
        for(var type in allergyList){
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
      await axios.get(' http://localhost:2400/allergy').then(async resp => {
        // return resp.data;
         this.setState({
            allergyList : resp.data
        })
      })
    }
  
     handleCloseModal2 = () => {
      this.setState({openModal2 : false})
    };
    refreshAfterDeletion = (id)=>{
     this.setState({
      allergyList: this.state.allergyList.filter(row => row.id !== id)
     })
    }
 
    handleDelete= async(id)=>{
        await axios.delete(`http://localhost:2400/allergy/${id}`)
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
        name: this.state.name,
        description : this.state.description,
      }
      if(!obj.name){
        obj.name = this.state.TypeObj.name
      }
      if(!obj.description){
        obj.description = this.state.TypeObj.description
      }


      console.log("type: ", obj);
      axios.put(`http://localhost:2400/allergy/${id}` , obj)
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
              { field: 'name', headerName: 'Name', width: 200 },
              { field: 'description', headerName: 'description', width: 400 },
              // { field: <button>Hi</button>, headerName: 'description', width: 400 },
              {
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
                  // this.handleDelete(row.data.id);
                  // document.getElementById("hide").hidden = true;
                   
                  console.log("yes" , this.state.typeId);
                  }} getRowId ={(row) =>{
                      // console.log("id: " , row.id);
                  }}
                  onRowClick = {(row)=>{
                      console.log("yyyys" , row);
                      id = row.row.id;
                      // this.settypeID(row.row.id);
                      this.setState({typeId : row.row.id});
                  }} />
            </div>  
        </div>
        )
    }
    handleAdding = () =>{
      var obj = {
        name: this.state.name,
        description : this.state.description,
      }

      console.log("type: ", obj);
      axios.post(`http://localhost:2400/allergy`,  obj )
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
                id="name"
                // label="Name"
                name="name" 
                type="text"
                autoComplete="Name"
                placeholder={this.state.TypeObj.name}
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
                name="description"
                // label="description"
                type="text"
                id="description"
                autoComplete="current-password"
                placeholder={this.state.TypeObj.description}
                onChange = {(event) =>{
                  // console.log('hhhhhhhhhhhhhhhhhh' , event.target.value)
                  this.setState({description : event.target.value});
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
              // console.log("user: " , obj);
              // handleSignup()
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
                id="name"
                label="Name"
                name="name" 
                type="text"
                autoComplete="Name"
                // placeholder={this.state.TypeObj.name}
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
                name="description"
                label="description"
                type="text"
                id="description"
                autoComplete="current-password"
                // placeholder={this.state.TypeObj.description}
                onChange = {(event) =>{
                  // console.log('hhhhhhhhhhhhhhhhhh' , event.target.value)
                  this.setState({description : event.target.value});
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
              // console.log("user: " , obj);
              // handleSignup()
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
 
export default withStyles(useStyles)(Allergy); 