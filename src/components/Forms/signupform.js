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
import  { useState } from 'react';
import { NativeSelect } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  marginTopp:{
    marginTop: theme.spacing(11),
    // backgroundImage:"url('https://cdn.pixabay.com/photo/2014/02/27/16/10/tree-276014_960_720.jpg')",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    
    backgroundImage:"url('https://cdn.pixabay.com/photo/2014/02/27/16/10/tree-276014_960_720.jpg')",
    padding:"1em",
    borderRadius:"1em"

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

export default function Signup() {
  const [username, setUsername] = useState();
  const [pass, setPass] = useState();
  const [email, setEmail] = useState();
  const classes = useStyles();

  const handleSignup = async()=>{

    var details = {
      'userName':username,
      'Password': pass,
      'Email': email
  };
  
  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  console.log("formBodu : " , formBody)
  fetch('http://localhost:3000/authenticate/signup', {
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


//     const params = new URLSearchParams()
// params.append('userName', username);
// params.append('password', pass);
// params.append('Email', email);
// // params.append('description', 'birthdate=25-12-1989&favourite=coding%20coding%20and%20coding&company=Nextzy%20Technologies&website=http://www.akexorcist.com/')
// // params.append('awesome', true)
// const config = {
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded'
//   }
// }

// const url = "localhost:3000/authenticate/signup";
// axios.post(url, params, config)
//   .then((result) => {
//     console.log("result:         ",result);
//     // Do somthing
//   })
//   .catch((err) => {
//     // Do somthing
//   })





  //   // console.log("lllllllllllllllllllll");
  //   var formData = new FormData();
  //   formData.append("userName", username);
  //   formData.append("Email", email);
  //   formData.append("Password", pass);

  //   for(var pair of formData.entries()) {
  //     console.log(pair);
  //  }
  //   var obj = {
  //         userName:username,
  //         password:pass,
  //         email:email,
  //       }
  //     var json = JSON.stringify(obj);
  //    const url = "localhost:3000/authenticate/signup";
  //   //  const url = "  http://localhost:2400/users";

  //     // const url = "https://still-bayou-18877.herokuapp.com/";
  //     // try{
  //     //   axios({
  //     //     method: 'post',
  //     //     url: url,
  //     //     data: obj
  //     // })
  //     // .then(function (response) {
  //     //     console.log(response);
  //     // })
  //     // .catch(function (error) {
  //     //     console.log(error);
  //     // });

  //     // }catch(e){
  //     //   console.log("something wrong....")
  //     // }
  //     // const response = await fetch(url, {
  //     //   method: 'POST', // *GET, POST, PUT, DELETE, etc.
  //     //   mode:'cors',
  //     //   // redirect: 'follow', // manual, *follow, error
  //     //   referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  //     //   body: json // body data type must match "Content-Type" header
  //     // }).then(data => {
  //     //   console.log(data); // JSON data parsed by `data.json()` call
  //     // });

  
  }
  return (
    <Grid container direction="row"
    justify="center"
    alignItems="center" className={classes.borderedDiv}>
          
            <Grid container xs={6} sm={4} spacing={1}>
 
  <div className={classes.paper}>
                  <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Sign up
                  </Typography>
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
                            setUsername(event.target.value);
                            console.log("yyyyys" , username);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          autoComplete="current-password"
                          onChange = {(event) =>{
                            setPass(event.target.value);
                            console.log("password" , pass);
                          }}
                          
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          name="email"
                          label="Email"
                          type="email"
                          id="email"
                          // autoComplete="current-password"
                          onChange = {(event) =>{
                            setEmail(event.target.value);
                            console.log("email" , email);
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
                        // var obj = {
                        //   userName:username,
                        //   password:pass,
                        //   email:email,
                        // }
                        // console.log("user: " , obj);
                        handleSignup()
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
  </Grid>
  {/* <Grid container item xs={4} className={classes.marginTopp} spacing={0} style={{width:"100%" ,height:"auto"  }} >
                      
  </Grid> */}
 
</Grid>
  
   
  );
}