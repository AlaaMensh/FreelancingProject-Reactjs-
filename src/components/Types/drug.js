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
import { useFormik,Formik } from 'formik';
//import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
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

const validationSchema = Yup.object({
  genric_name: Yup
  .string('genric_name ').required()
    .max(20, 'genric_name should be of maxmum 20 characters length')
    .min(2,'genric_name should be of minimum 2 characters length'),

    trade_name: Yup
    .string('trade_name ').required()
      .max(20, 'trade_name should be of maxmum 20 characters length')
      .min(2,'trade_name should be of minimum 2 characters length'),

    form: Yup
    .string('Enter form').required()
    .min(3,'abbreviation should be of minimum 3 characters length'),
    dose: Yup
    .string('Enter does').required()
    .min(3,'dose should be of minimum 3 characters length'),
    family: Yup 
    .string('Enter the family').required()
    .min(3,'family should be of minimum 3 characters length'),


});
const validationSchemaEdit = Yup.object({
  genric_name: Yup
  .string('genric_name ')
    .max(20, 'genric_name should be of maxmum 20 characters length')
    .min(2,'genric_name should be of minimum 2 characters length'),

    trade_name: Yup
    .string('trade_name ')
      .max(20, 'trade_name should be of maxmum 20 characters length')
      .min(2,'trade_name should be of minimum 2 characters length'),

    form: Yup
    .string('Enter form')
    .min(3,'abbreviation should be of minimum 3 characters length'),
    dose: Yup
    .string('Enter does')
    .min(3,'dose should be of minimum 3 characters length'),
    family: Yup 
    .string('Enter the family')
    .min(3,'family should be of minimum 3 characters length'),


});

var id = 0;
var rowsToKeep = [];
var rowsToBeDeleted = [];

class Drug extends Component {
  constructor(props) {
    super(props);
    
    this.state = { 
      drugList : [],
      typeId:0,
      openModal1:false,
      openModal2:false,
      TypeObj : {},
      genric_name: "",
      trade_name:"",
      form:"",
      dose:"",
      family :""  
      

          }
        }
        
        getTypeByID = async(id) => {
          console.log("heeereeeee" , id);
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
          
          fetch(`http://localhost:3000/drug/getById`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody
          }).then((resp)=>{
            console.log("Getting: " , resp);
            resp.json().then((data)=>{
              console.log("ddddddddddddddddd;  " , data[0])
              this.setState({
                TypeObj:data[0]
              })
              // object = data
            })
          }).catch(()=>{
            console.log("errror")
          })
        }
        getDrugTypesList = (drugList) =>{
        for(var type in drugList){
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
    getData = async()=>{
      await axios.get('http://localhost:3000/drug/getAll').then(async resp => {
         this.setState({
            drugList : resp.data
        })
        console.log("resp.data: " , resp.data);
      
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
      
      fetch('http://localhost:3000/drug/deleteDrug', {
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
  
  handleUpdate = async(values)=>{
    alert(values)
      var details = {      
       id:this.state.TypeObj.id,
        genricName: values.genric_name,
        tradeName: values.trade_name,
        form: values.form,
        dose: values.dose,
        family :values.family,
      }
      if(!details.genricName){
        details.genricName = this.state.TypeObj.genricName
      }
      if(!details.tradeName){
        details.tradeName = this.state.TypeObj.tradeName
      }
      if(!details.form){
        details.form = this.state.TypeObj.form
      }
      if(!details.dose){
        details.dose = this.state.TypeObj.dose
      }
      if(!details.family){
        details.family = this.state.TypeObj.family
      }
      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      fetch('http://localhost:3000/drug/updateDrug', {
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
         this.getData()
    }


    componentDidUpdate(){
        console.log("hhhhhhh")
        this.rendering();
    }

    rendering = () =>{
        return(
          <div className="container gridDataContent mt-5"> 
          <div className="row">
            <div className="col-2 text-center py-3 rounded px-4 header">
                <span className="">Drugs Types</span>
            </div>
            <div className="col-10 overflow-hidden ">
                <div className="row justify-content-lg-start">

                </div>
            </div>
          </div>
            <div className = "row gridDataHeader align-items-center" style={{ height: 400, width: '100%' }}>
               <DataGrid className="datagrid bg-light  rounded MuiDataGrid-cellCenter" style={{textAlign:"center"}} rows={this.state.drugList} columns={[
               { field: 'genricName', headerName: 'Genric_Name', width: 200 },
              { field: 'tradeName', headerName: 'Trade_Name', width: 200 },
              { field: 'form', headerName: 'form', width: 400 },
              { field: 'dose', headerName: 'dose', width: 200 },
              { field: 'family', headerName: 'family', width: 200 },
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
                        this.getData();
                        // this.refreshAfterDeletion(params.row.id);
                      }}
                    >
                      delete
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
            <div className="row mt-4">
                      <Fab color="primary" aria-label="add" className ={this.props.classes.iconPlus} onClick = {()=>{
                          this.handleopenModal2()
                        }} >
                          <AddIcon  />
                        </Fab> 
                      </div>
                    </div>
        
        )
    }
        
    handleAdding = async() =>{
      var details = {
        genricName: this.state.genric_name,
        tradeName: this.state.trade_name,
        form: this.state.form,
        dose: this.state.dose,
        family : this.state.family,
      }

      console.log("detilaas : " , details)

      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      console.log("formging:     " , formBody)
      
      await fetch('http://localhost:3000/drug/addDrug', {
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
        <Formik 
                  initialValues={{genric_name:'',trade_name:'',form:'',dose:'',family:''}}
                  validationSchema={validationSchemaEdit}
                  onSubmit={(values,actions)=>{
                    this.handleUpdate(values)
                    actions.resetForm()
                  }}
                  >
                    {(formikprops)=>(
                  <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
               InputProps={{ classes: { input: this.props.classes.input2 } }}
                variant="outlined"
                required
                fullWidth
                id="genric_name"
                // label="Name"
                name="genric_name" 
                type="text"
                autoComplete="Genric_Name"
                 placeholder={this.state.TypeObj.genricName}
                 onChange = {formikprops.handleChange('genric_name')}
                 onBlur = {formikprops.handleBlur('genric_name')}
                 value = {formikprops.values.genric_name}
                 error={formikprops.touched.genric_name && formikprops.errors.genric_name}
                 helperText={formikprops.touched.genric_name && formikprops.errors.genric_name}
               
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                InputProps={{ classes: { input: this.props.classes.input2 } }}
                variant="outlined"
                required
                fullWidth
                id="trade_name"
                // label="Name"
                name="trade_name" 
                type="text"
                autoComplete="Trade_Name"
                placeholder={this.state.TypeObj.tradeName}
                onChange = {formikprops.handleChange('trade_name')}
                onBlur = {formikprops.handleBlur('trade_name')}
                value = {formikprops.values.trade_name}
                error={formikprops.touched.trade_name && formikprops.errors.trade_name}
                helperText={formikprops.touched.trade_name && formikprops.errors.trade_name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
               InputProps={{ classes: { input: this.props.classes.input2 } }}
                variant="outlined"
                required
                fullWidth
                id="form"
                // label="Name"
                name="form" 
                type="text"
                autoComplete="Form"
                placeholder={this.state.TypeObj.form}
                onChange = {formikprops.handleChange('form')}
                onBlur = {formikprops.handleBlur('form')}
                value = {formikprops.values.form}
                error={formikprops.touched.form && formikprops.errors.form}
                helperText={formikprops.touched.form && formikprops.errors.form}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
               InputProps={{ classes: { input: this.props.classes.input2 } }}
                variant="outlined"
                required
                fullWidth
                id="dose"
                // label="Name"
                name="dose" 
                type="text"
                autoComplete="Dose"
                placeholder={this.state.TypeObj.dose}
                onChange = {formikprops.handleChange('dose')}
                onBlur = {formikprops.handleBlur('dose')}
                value = {formikprops.values.dose}
                error={formikprops.touched.form && formikprops.errors.dose}
                helperText={formikprops.touched.dose && formikprops.errors.dose}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
              InputProps={{ classes: { input: this.props.classes.input2 } }}
                variant="outlined"
                required
                fullWidth
                name="family"
                type="text"
                id="family"
                autoComplete="family"
                placeholder={this.state.TypeObj.family}
                onChange = {formikprops.handleChange('family')}
                onBlur = {formikprops.handleBlur('family')}
                value = {formikprops.values.family}
                error={formikprops.touched.family && formikprops.errors.family}
                helperText={formikprops.touched.family && formikprops.errors.family}
                
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
              formikprops.handleSubmit()
              this.getData();
              return ;
            }}
          >
           
            Edit
          </Button>
       
          </form>
)}
                  </Formik>
      </div>
      {/* <Box mt={5}>
        <Copyright />
      </Box> */}
    </Container>
</Modal>

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
        <Formik 
                  initialValues={{genric_name:'',trade_name:'',form:'',dose:'',family:''}}
                  validationSchema={validationSchema}
                  onSubmit={(values,actions)=>{
                    this.handleAdding(values)
                    actions.resetForm()
                  }}
                  >
                    {(formikprops)=>(
                  <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                 InputProps={{ classes: { input: this.props.classes.input2 } }}
                variant="outlined"
                required
                fullWidth
                id="genric_name"
                label="Genric_Name"
                name="genric_name" 
                type="text"
                autoComplete="Genric_Name"
                // placeholder={this.state.TypeObj.name}
                onChange = {formikprops.handleChange('genric_name')}
                 onBlur = {formikprops.handleBlur('genric_name')}
                 value = {formikprops.values.genric_name}
                 error={formikprops.touched.genric_name && formikprops.errors.genric_name}
                 helperText={formikprops.touched.genric_name && formikprops.errors.genric_name}
               
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                InputProps={{ classes: { input: this.props.classes.input2 } }}
                variant="outlined"
                required
                fullWidth
                id="trade_name"
                label="Trade_Name"
                name="trade_name" 
                type="text"
                autoComplete="Trade_Name"
                onChange = {formikprops.handleChange('trade_name')}
                onBlur = {formikprops.handleBlur('trade_name')}
                value = {formikprops.values.trade_name}
                error={formikprops.touched.trade_name && formikprops.errors.trade_name}
                helperText={formikprops.touched.trade_name && formikprops.errors.trade_name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
               InputProps={{ classes: { input: this.props.classes.input2 } }}
                variant="outlined"
                required
                fullWidth
                id="form"
                label="Form"
                name="form" 
                type="text"
                autoComplete="Form"
                onChange = {formikprops.handleChange('form')}
                onBlur = {formikprops.handleBlur('form')}
                value = {formikprops.values.form}
                error={formikprops.touched.form && formikprops.errors.form}
                helperText={formikprops.touched.form && formikprops.errors.form}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
              InputProps={{ classes: { input: this.props.classes.input2 } }}
               variant="outlined"
                required
                fullWidth
                id="dose"
                label="Dose"
                name="dose" 
                type="text"
                autoComplete="Dose"
                onChange = {formikprops.handleChange('dose')}
                onBlur = {formikprops.handleBlur('dose')}
                value = {formikprops.values.dose}
                error={formikprops.touched.form && formikprops.errors.dose}
                helperText={formikprops.touched.dose && formikprops.errors.dose}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                InputProps={{ classes: { input: this.props.classes.input2 } }}
                variant="outlined"
                required
                fullWidth
                name="family"
                label="family"
                type="text"
                id="family"
                autoComplete="family"
                // placeholder={this.state.TypeObj.description}
                onChange = {formikprops.handleChange('family')}
                onBlur = {formikprops.handleBlur('family')}
                value = {formikprops.values.family}
                error={formikprops.touched.family && formikprops.errors.family}
                helperText={formikprops.touched.family && formikprops.errors.family}
                
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
              formikprops.handleSubmit()
              this.getData();
              return ;

            }}
          >
            Add
          </Button>
          
     
          </form>
)}
                  </Formik>
      </div>
      {}
    </Container>
</Modal>
    </div>
 
  );
    }
}
 
export default withStyles(useStyles)(Drug); 