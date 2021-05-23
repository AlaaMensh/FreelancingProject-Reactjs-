
import React from 'react';
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
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import LockIcon from '@material-ui/icons/Lock';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
// import "./form.css";

import { useHistory ,useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  marginTopp:{
    marginTop: theme.spacing(11),
    backgroundColor :"yellow"
    // backgroundImage:"url('https://cdn.pixabay.com/photo/2014/02/27/16/10/tree-276014_960_720.jpg')",
  },
  paper: {
    marginTop: theme.spacing(8),
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
    backgroundColor:"#385968"
    // backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),

  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor:"#385968",
    color:"white"
  },

}));

const ForgotPasswordCode = ()=>{


    const [code , setCode] = useState();
    const [email , setEmail] = useState();
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    useEffect((props)=>{
      setEmail(location.state.email);
    },[])
  
    const handleSubmit = async () =>{

        console.log("email : " , code);
        var formBody = [];
        var details = {
            code : code,
            email: email
        }
        for (var property in details) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        
        await fetch('http://localhost:3000/authenticate/getCode', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
          body: formBody
        }).then(()=>{
         
        }).catch(()=>{
          console.log("no");
        })
     
        history.push({
          pathname:"/changePassword",
          state:{email : email}
        })
    }
  return (
      <div className="form-hero row" >
            <Container component="main" maxWidth="xs" >
    <div className={classes.paper}>
                  <Avatar className={classes.avatar}>
                    
                  </Avatar>
                  <Typography component="h6" variant="h6">
                    Please Enter your the code we sent
                  </Typography>
              <form className={classes.form} noValidate>
           <Grid container spacing={2} justify="center">
             <Grid item xs={6}>
               <TextField
                variant="outlined"
                required
                size="small"
                id="code"
                label="Code"
                name="code"
                autoComplete="Eamil"
                onChange = {(event) =>{
                    setCode(event.target.value);
                }}
              />
            </Grid>
        </Grid>
      <div className="row justify-content-center">
      <Button variant="contained" className={classes.submit} onClick ={() =>{
               handleSubmit()
           }}>Verify</Button>
      </div>
           
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
  
      </Container>
      </div>
   
  );
}
export default ForgotPasswordCode;