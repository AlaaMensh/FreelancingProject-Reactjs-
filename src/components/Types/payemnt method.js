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
});



var id = 0;
var rowsToKeep = [];
var rowsToBeDeleted = [];

class Payemnt_method extends Component {
  constructor(props) {
    super(props);
    
    this.state = { 
    payemnt_methodList : [],
      typeId:0,
      openModal1:false,
      openModal2:false,
      TypeObj : {},
      id:"",
      type:"",
      description :""  

          }
        }
        
        getTypeByID = async(id) => {
          console.log("id" , id);
          let response = await fetch(`http://localhost:2400/payemnt_method/${id}`);
          var payload = await response.json();
          console.log( " kkkkkkkkkkkkkkkkkkkkkkkkkkkkk" , payload);
          this.setState({
            TypeObj:payload
          })
        }
        getPayemnt_methodListTypesList = (payemnt_methodList) =>{
        for(var type in payemnt_methodList){
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
  
     handleCloseModal2 = () => {
      this.setState({openModal2 : false})
    };
    handleDelete= async(id)=>{
        await axios.delete(`http://localhost:2400/payemnt_methodList/${id}`)
        .then(res => {
          console.log(res);
          console.log(res.data);
        })
        .catch(err=>{console.log("nooooo")})

         
    }
   async componentDidMount(){
     axios.get(' http://localhost:2400/payemnt_methodList').then(async resp => {
        // return resp.data;
         this.setState({
          diseaseList : resp.data
        })
        console.log("dkdkkdkdkd:   ",resp.data);    
  });

  
    }
    handleUpdate = ()=>{
      var obj = {
        id:this.state.TypeObj.id,
        id: this.state.id,
        type: this.state.type,
        description : this.state.description ,
        abbreviation : this.state.abbreviation,
      }
      if(!obj.id){
        obj.id = this.state.TypeObj.id
      }
      if(!obj.code){
        obj.type = this.state.TypeObj.type
      }
      if(!obj.description ){
        obj.description  = this.state.TypeObj.description 
      }


      console.log("type: ", obj);
      axios.put(`http://localhost:2400/payemnt_method/${id}` , obj)
         .then(res => {
           console.log(res);
           console.log(res.data);
         })
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
              { field: 'id', headerName: 'id', width: 200 },
              {filed: 'type', headerName: 'type', width: 200},
              { field: 'description ', headerName: 'description ', width: 400 },
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
        id: this.state.id,
        type: this.state.type,
        description  : this.state.description ,
      }

      console.log("type: ", obj);
      axios.post(`http://localhost:2400/payemnt_method`,  obj )
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
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
                variant="outlined"
                required
                fullWidth
                id="id"
                // label="Name"
                name="id" 
                type="text"
                autoComplete="id"
                placeholder={this.state.TypeObj.name}
                onChange = {(event) =>{
                  this.setState({id : event.target.value});
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="type"
                type="text"
                id="type"
                autoComplete="current-password"
                placeholder={this.state.TypeObj.code}
                onChange = {(event) =>{
                  // console.log('hhhhhhhhhhhhhhhhhh' , event.target.value)
                  this.setState({type : event.target.value});
                }}
                
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="description "
                // label="description"
                type="text"
                id="description "
                autoComplete="current-password"
                placeholder={this.state.TypeObj.code}
                onChange = {(event) =>{
                  // console.log('hhhhhhhhhhhhhhhhhh' , event.target.value)
                  this.setState({description  : event.target.value});
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
             
            }}
          >
            Edit
          </Button>
          
        </form>
      </div>
      {}
    </Container>
</Modal>

<Fab color="primary" aria-label="add" >
  <AddIcon  onClick = {()=>{
  this.handleopenModal2()
}}/>
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
                variant="outlined"
                required
                fullWidth
                id="id"
                label="id"
                name="id" 
                type="text"
                autoComplete="id"
                // placeholder={this.state.TypeObj.name}
                onChange = {(event) =>{
                  this.setState({id : event.target.value});
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="type"
                label="type"
                type="text"
                id="type"
                autoComplete="current-password"
                // placeholder={this.state.TypeObj.description}
                onChange = {(event) =>{
                  // console.log('hhhhhhhhhhhhhhhhhh' , event.target.value)
                  this.setState({type : event.target.value});
                }}
                
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="description "
                label="description "
                type="text"
                id="adescription "
                autoComplete="current-password"
                // placeholder={this.state.TypeObj.description}
                onChange = {(event) =>{
                  // console.log('hhhhhhhhhhhhhhhhhh' , event.target.value)
                  this.setState({description  : event.target.value});
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
 
export default withStyles(useStyles)(Payemnt_method); 