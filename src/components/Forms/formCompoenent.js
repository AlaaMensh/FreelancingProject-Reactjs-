import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
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
import  { useState , useEffect } from 'react';
import { NativeSelect } from '@material-ui/core';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';

const useStyles = (theme) => ({
  marginTopp:{
    // marginTop: theme.spacing(11),
    // backgroundColor :"yellow"
    // backgroundImage:"url('https://cdn.pixabay.com/photo/2014/02/27/16/10/tree-276014_960_720.jpg')",
  },
  paper: {
    // marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor:"#e7f0f4",
    border:"1px solid #fff",
    boxShadow:"4px 3px 16px 1px #fff",
    // backgroundImage:"url('https://cdn.pixabay.com/photo/2014/02/27/16/10/tree-276014_960_720.jpg')",
    padding:"1em",
    borderRadius:"1em"

  },
  iconsColor:{
    color:"#385968"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor:"#385968",
    textAlign:"center",
    margin :"0.5em auto",
    
    // backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    // marginTop: theme.spacing(3),

  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor:"#385968",
  },
});




class FormGenerator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      }
  }
   handleSignup = async()=>{

    var details = {
      'firstName':this.state.firstName,
       'lastName': this.state.lastName, 
       'Date': this.state.Date,
       'degree' : this.state.Degree,
       'userName': this.state.userName,
      'password': this.state.password,
      'Email': this.state.Email,
      'phone' : this.state.phone,
      'Address': this.state.Address,
    
  };
  console.log("your obj: " ,details);
  
  
  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  console.log("formBodu : " , formBody)
  fetch(`http://localhost:3000/${this.state.rootPath}/${this.state.relativePath}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: formBody
  }).then((resp)=>{
    console.log("it is inserted", resp.text());
  }).catch(()=>{
    console.log("errror")
  })
  // history.push("/login")

}
componentDidMount(){
  var newState = {};

  for (var property in this.props.formObj) {
    console.log("property : " , property)  
    newState[property] = this.props.formObj[property]
  }
  
  this.setState(newState);
  }

  handleChange = (evt) =>{
    const value = evt.target.value;
    this.setState({
      [evt.target.name]: value
    });
  }


  render() { 
    console.log("state:  " , this.state)

    const { classes } = this.props;

    return (
      <div className="row align-items-center justify-content-center" style={{
        padding:"0" , margin:"0" , height:"100%"}} >
              <Container component="main" maxWidth="xs" style={{height:"100% !important"}}>
        <div className={classes.paper}>
                      <Typography className={classes.backgroundHeader}>
                      <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                      </Avatar>
                      <Typography component="h1" variant="h5">
                        ADD {this.state.role}
                      </Typography>
                      </Typography>
                      <form className={classes.form} noValidate>
            <Grid container spacing={4}>
            <Grid item xs={6}>
                <TextField
                 size="small"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="FirstName"
                  name="firstName"
                  autoComplete="firstName"
                  onChange = {(event) =>{
                    this.handleChange(event)
                    // setFrestname(event.target.value);
                    // console.log("mmmmmm" , firstname);
                  }}
                  ///vbvghv
                />
              </Grid>
              
              <Grid item xs={6}>
                <TextField
                 size="small"
                  variant="outlined"
                  required
                  fullWidth
                  id="lastname"
                  label="LastName"
                  name="lastName"
                  autoComplete="lastname"
                  onChange = {(event) =>{
                    this.handleChange(event)
                    // setlastName(event.target.value);
                    // console.log("mmmmmm" , lastName);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
            <TextField
             size="small"
             id="date"
            label="Birthday"
            type="date"
            name="Date"
           defaultValue="2021-01-01"
           className={classes.textField}
          InputLabelProps={{
          shrink: true,
        }}
        onChange = {(event) =>{
          this.handleChange(event)
          // setBirthdate(event.target.value);
          // console.log("mmmmmm" , lastName);
        }}
           />
           </Grid>
     
        <Grid item xs={6}>
                <TextField
                 size="small"
                  variant="outlined"
                  required
                  fullWidth
                  id="degree"
                  label="Degree"
                  name="Degree"
                  autoComplete="Degree"
                  onChange = {(event) =>{
                    this.handleChange(event)
                    // setDegree(event.target.value);
                    // console.log("mmmmmm" , degree);
                  }}
                />
              </Grid>
    
              <Grid item xs={6}>
                <TextField
                 size="small"
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="UserName"
                  name="userName"
                  autoComplete="username"
                  onChange = {(event) =>{
                    this.handleChange(event)
                    // setUsername(event.target.value);
                    // console.log("mmmmmm" , username);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                 size="small"
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange = {(event) =>{
                    this.handleChange(event)
                    // setPass(event.target.value);
                    // console.log("password" , pass);
                  }}
                  
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                 size="small"
                  variant="outlined"
                  required
                  fullWidth
                  name="Email"
                  label="Email"
                  type="email"
                  id="email"
                  // autoComplete="current-password"
                  onChange = {(event) =>{
                    this.handleChange(event)
                    // setEmail(event.target.value);
                    // console.log("email" , email);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  size="small"
                  name="phone"
                  label="Phone"
                  type="phone"
                  id="phone"
                  onChange = {(event) =>{
                    this.handleChange(event)
                    // setPhone(event.target.value);
                    // console.log("phone" , phone);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                 size="small"
                  variant="outlined"
                  required
                  fullWidth
                  name="Address"
                  label="Address"
                  type="address"
                  id="address"
                  onChange = {(event) =>{
                    this.handleChange(event)
                    // setAddress(event.target.value);
                    // console.log("address" , address);
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
            
                this.handleSignup()
              }}
            >
              Sign Up
              </Button>
                        <Grid container justify="flex-end">
                          <Grid item>
                            <Link href="#" variant="body2">
                              Already have an account? Sign in
                            </Link>
                            <Link href="#" variant="body2">
                              Forgot Password
                            </Link>
                          </Grid>
                        </Grid>
                      </form>
                    </div>
           
          </Container>
          </div>
         
          
    
    
    
    );
  }
}
 
export default withStyles(useStyles)(FormGenerator); 