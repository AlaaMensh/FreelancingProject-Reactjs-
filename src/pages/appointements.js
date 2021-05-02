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
// import DatePicker from '@material-ui/lab/DatePicker';
// import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
// import LocalizaitonProvider from '@material-ui/lab/LocalizationProvider';
// import StaticDatePicker from '@material-ui/lab/StaticDatePicker';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker
} from '@material-ui/pickers';  
import "./appointments.css";



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

class Appointement extends Component {
  constructor(props) {
    super(props);
    
    this.state = { 
      allergyList : [],
      appointements : [],
      typeId:0,
      openModal1:false,
      openModal2:false,
      TypeObj : {},
      name:"",
      description :"",
      patientName : "",
      reason :"",
      date:"",
      time :"",
      duration : "" ,
      FD : 1,
      userID : 1 ,
      date:"",
      startDime:"",
      endDime:"",
      flag:true, 
      check:"",
          }
        }
        
        getTypeByID = async(id) => {
          var details = {
            id:id
          }
          var formBody = [];
          for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
          }
          formBody = formBody.join("&");
          
          fetch(`http://localhost:3000/appointment/getById`, {
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
      console.log("hhhhhhhoekehgogg      ");
      
      var details = {
        'date':this.state.date,
        check: this.state.check,
        id:this.state.FD
    };
    
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    console.log("formBodu : " , formBody)
    await fetch(`http://localhost:3000/appointment/getAppointment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body:formBody
    }) .then(response => response.json())
    .then(
      data => {
        this.setState({appointements : data})
      }
    )
    .catch((e)=>{
      console.log("errror" ,e)
    })
    }
  
     handleCloseModal2 = () => {
      this.setState({openModal2 : false})
    };
    refreshAfterDeletion = (id)=>{
     this.setState({
      appointements: this.state.appointements.filter(row => row.id !== id)
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
      fetch("http://localhost:3000/appointment/deleteAppoinment", {
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
     if(parseInt(localStorage.getItem("role")) != 8 && parseInt(localStorage.getItem("role")) != 2){
      console.log("jjjjjjjjjjjjjj") 
      this.setState({flag : true});
     }
     else{
      console.log("jjjjjjjjjjjjjj") 
       this.setState({flag: false})
     }
     if(parseInt(localStorage.getItem("role") == 8)){
       this.setState({check : "drId"});
     }
     else{
      this.setState({check : "drFDId"});
     }
     this.setState({FD: localStorage.getItem("userId")});
     this.setState({userID : localStorage.getItem("userId")});
      // this.getData()
    }
    handleUpdate = ()=>{
      var obj = {
        appId:this.state.TypeObj.id,
        patientName: this.state.patientName,
        reason: this.state.reason,
        date: this.state.date,
        time: this.state.time,
        duration : this.state.duration,
        check:this.state.check,
        id : this.state.FD
      }
      if(!obj.patientName){
        obj.patientName = this.state.TypeObj.patientName
      }
      if(!obj.reason){
        obj.reason = this.state.TypeObj.reason
      }
      if(!obj.date){
        obj.date = this.state.TypeObj.date
      }
      if(!obj.startDate){
        obj.startDate = this.state.TypeObj.startDate
      }
      if(!obj.endDate){
        obj.endDate = this.state.TypeObj.endDate
      }
      console.log("type: ", obj);

    var formBody = [];
    for (var property in obj) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(obj[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    console.log("formBodu : " , formBody)
     fetch(`http://localhost:3000/appointment/updateAppointment`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body:formBody
    }) .then(response => response.json())
    .then(
      data => {
        console.log("dataaaaaaaaaaaaaaa: " , data)
        // this.setState({appointements : data})
      }
    )
    .catch((e)=>{
      console.log("errror" ,e)
    })
    }

    componentDidUpdate(){
        console.log("hhhhhhh")
        this.rendering();
    }
     convert = (str) => {
        var date = new Date(str),
          mnth = ("0" + (date.getMonth() + 1)).slice(-2),
          day = ("0" + date.getDate()).slice(-2);
          var d = [date.getFullYear(), mnth, day].join("-");
          this.setState({date : d});
        console.log([date.getFullYear(), mnth, day].join("-"));
      }
      
     handleDateChange = async(date) => {
        console.log("kkkkkk: ",date);
       await this.convert(date);
        this.getData();
       
      }

    rendering = () =>{
        return(
        <div className="mt-5"  >
            <div className="row justify-content-center">
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                      label="Material Date Picker"
                      // value={selectedDate}
                      format="MM/dd/yyyy"
                      onChange={this.handleDateChange}
                      />
                  </MuiPickersUtilsProvider>
            </div>
            <div className="mt-5" style = {{height: 400, width: '100%' }}>
             <DataGrid rows={this.state.appointements} columns={[{ field: 'id', headerName: 'ID', width: 70 },
              { field: 'patientName',
                // hide:(this.state.flag)?true:false,
              headerName: 'patientName',  width: 150 },
              { field: 'reason', headerName: 'Reason', width: 300 },
              { field: 'startDate', headerName: 'startTime', width: 150 },
              { field: 'endDate', headerName: 'endTime', width: 150 },
              // { field: 'drFDId', headerName: 'drFDId', width: 200 },
              { field: 'date', headerName: 'date', width: 200 },
              // { field: <button>Hi</button>, headerName: 'description', width: 400 },
              {
                field: 'Actions',
                headerName: 'Actions',
                width: 400,
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
                    <Button
                    hidden={this.state.flag}
                      variant="contained"
                      color="primary"
                      size="small"
                      style={{ marginLeft: 16 }}
                      onClick={async ()=>{
                        console.log("herie   function: " , params.row);
                        console.log("herooo ",this.props)
                       this.props.history.push({
                         pathname :`${this.props.match.path}/visit`,
                         state:{ptId :""}
                       })
                      }}
                    >
                      Make Visit
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
    handleAdding = async() => {
      var details = {
        patientName: this.state.patientName,
        reason : this.state.reason,
        startTime : this.state.startTime,
        duration : this.state.duration,
        date: this.state.date,
        check : this.state.check,
         id : this.state.FD
        // reason : this.state.reason,
      }
      console.log("details:  ", details)

    
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    console.log("formBodu : " , formBody)
     fetch(`http://localhost:3000/appointment/addApointment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body:formBody
    }) .then(response => response.json())
    .then(
      data => {
        console.log("dataaaaaaaaaaaaaaa: " , data)
        // this.setState({appointements : data})
      }
    )
    .catch((e)=>{
      console.log("errror" ,e)
    })

      // console.log("type: ", obj);
      // axios.post(`http://localhost:3000/appointment/addApointment`, obj )
      // .then(res => {
      //   console.log(res);
      //   console.log(res.data);
      // })
      this.getData();
    }


    render() { 
      const { classes } = this.props;
        
  return (
    <div className ="container">
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
                id="patientName"
                // label="Name"
                name="patientName" 
                type="text"
                autoComplete="Name"
                placeholder={this.state.TypeObj.patientName}
                onChange = {(event) =>{
                  this.setState({patientName : event.target.value});
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
               InputProps={{ classes: { input: this.props.classes.input2 } }}
                variant="outlined"
                required
                fullWidth
                id="reason"
                // label="Name"
                name="reason" 
                type="text"
                autoComplete="Reason"
                placeholder={this.state.TypeObj.reason}
                onChange = {(event) =>{
                  this.setState({reason : event.target.value});
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
               InputProps={{ classes: { input: this.props.classes.input2 } }}
                variant="outlined"
                required
                fullWidth
                id="date"
                // label="Name"
                name="date" 
                type="text"
                autoComplete="Date"
                placeholder={this.state.TypeObj.date}
                onChange = {(event) =>{
                  this.setState({date : event.target.value});
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
               InputProps={{ classes: { input: this.props.classes.input2 } }}
                variant="outlined"
                required
                fullWidth
                id="time"
                // label="Name"
                name="time" 
                type="text"
                autoComplete="Time"
                placeholder={this.state.TypeObj.startDate}
                onChange = {(event) =>{
                  console.log("time: ", event.target.value)
                  this.setState({startDate : event.target.value});
                }}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <TextField
               InputProps={{ classes: { input: this.props.classes.input2 } }}
                variant="outlined"
                required
                fullWidth
                id="fd"
                label="FD"
                name="fd" 
                type="text"
                autoComplete="fd"
                placeholder={this.state.TypeObj.FD}
                onChange = {(event) =>{
                  this.setState({FD : event.target.value});
                }}
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
              InputProps={{ classes: { input: this.props.classes.input2 } }}
                variant="outlined"
                required
                fullWidth
                name="duration"
                // label="description"
                type="text"
                id="duration"
                autoComplete="current-password"
                placeholder={this.state.TypeObj.endDate}
                onChange = {(event) =>{
                  // console.log('hhhhhhhhhhhhhhhhhh' , event.target.value)
                  this.setState({endDate : event.target.value});
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
            {/* <Grid item xs={12}>  
              <TextField
              InputProps={{ classes: { input: this.props.classes.input2 } }}
                variant="outlined"
                required
                fullWidth
                id="patientName"
                label="Patient"
                name="patientName" 
                type="text"
                autoComplete="patientName"
                // placeholder={this.state.TypeObj.name}
                onChange = {(event) =>{
                  this.setState({patientName : event.target.value});
                }}
              />
            </Grid>
            <Grid item xs={12}> // for FD Name
              <TextField
              InputProps={{ classes: { input: this.props.classes.input2 } }}
                variant="outlined"
                required
                fullWidth
                id="patientName"
                label="Patient"
                name="patientName" 
                type="text"
                autoComplete="patientName"
                // placeholder={this.state.TypeObj.name}
                onChange = {(event) =>{
                  this.setState({patientName : event.target.value});
                }}
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
              InputProps={{ classes: { input: this.props.classes.input2 } }}
                variant="outlined"
                required
                fullWidth
                id="patientName"
                label="Patient"
                name="patientName" 
                type="text"
                autoComplete="patientName"
                // placeholder={this.state.TypeObj.name}
                onChange = {(event) =>{
                  this.setState({patientName : event.target.value});
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
              InputProps={{ classes: { input: this.props.classes.input2 } }}
                variant="outlined"
                required
                fullWidth
                id="reason"
                label="Reason"
                name="reason" 
                type="text"
                autoComplete="reason"
                // placeholder={this.state.TypeObj.name}
                onChange = {(event) =>{
                  this.setState({reason : event.target.value});
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
              InputProps={{ classes: { input: this.props.classes.input2 } }}
                variant="outlined"
                required
                fullWidth
                id="date"
                // label="date"
                name="date" 
                type="date"
                // autoComplete="Name"
                // placeholder={this.state.TypeObj.name}
                onChange = {(event) =>{
                  console.log(event.target.value)
                  this.setState({date : event.target.value});
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
              InputProps={{ classes: { input: this.props.classes.input2 } }}
                variant="outlined"
                required
                fullWidth
                id="time"
                // label="Time"
                name="time" 
                type="time"
                autoComplete="time"
                // placeholder={this.state.TypeObj.name}
                onChange = {(event) =>{
                    console.log("kkkkkkkkkkkkkkkkkkkk:  ",event.target.value);
                    this.setState({startTime : event.target.value});
                  }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
              InputProps={{ classes: { input: this.props.classes.input2 } }}
                variant="outlined"
                required
                fullWidth
                id="duration"
                label="Duration"
                name="duration" 
                type="text"
                autoComplete="duration"
                // placeholder={this.state.TypeObj.name}
                onChange = {(event) =>{
                  this.setState({duration : event.target.value});
                }}
              />
            </Grid> 
            {/* <Grid item xs={12}>
              <TextField
              InputProps={{ classes: { input: this.props.classes.input2 } }}
                variant="outlined"
                required
                fullWidth
                id="FD"
                label="FD"
                name="FD" 
                type="text"
                autoComplete="FD"
                // placeholder={this.state.TypeObj.name}
                onChange = {(event) =>{
                  this.setState({FD : event.target.value});
                }}
              />
            </Grid>  */}
          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={()=>{
              this.handleAdding();
              // this.getData();
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
 
export default withStyles(useStyles)(Appointement); 

