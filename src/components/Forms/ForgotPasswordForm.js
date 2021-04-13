import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import  { useState } from 'react';
import { NativeSelect } from '@material-ui/core';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Redirect } from 'react-router';



const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
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
  }));


const ForgotPassword = ()=>{

    const [email , setemail] = useState();
  
    const handleSubmit = async () =>{

        console.log("email : " , email);
        var formBody = [];
        var details = {
            email : email
        }
        for (var property in details) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        
        await fetch('http://localhost:3000/authenticate/forgetpass', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
          body: formBody
        }).then(()=>{
          console.log("yes")
        }).catch(()=>{
          console.log("no");
        })
        this.context.router.push({ //browserHistory.push should also work here
          pathname: "/forgetPasswordCode",
          // state: {yourCalculatedData: data}
        }); 

    }
 
    const classes = useStyles();
        return (
            <div>
              <h1>Forgot Password</h1>
              {/* <form className="profile-form" onSubmit={this.sendEmail}> */}
              
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="UserName"
                name="userName"
                autoComplete="username"
                onChange = {(event) =>{
                    setemail(event.target.value);
                }}
              />
            </Grid>
        </Grid>
           <Button variant="contained" onClick ={() =>{
               handleSubmit()
           }}>Submit</Button>
           
           {/* <Link
            to={{
              pathname: "/forgetPasswordCode",
               // your data array of objects
            }}
          ><Button variant="contained" onClick ={() =>{
               handleSubmit()
           }}>Submit</Button>
           </Link> */}
        </form>
            </div>
          );
    
}
 
export default ForgotPassword;