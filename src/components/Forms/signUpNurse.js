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
// import { useFormik,Formik } from 'formik';
// import * as Yup from 'yup';
// import yup from 'yup';

const useStyles = makeStyles((theme) => ({
  marginTopp:{
    // marginTop: theme.spacing(11),
    backgroundColor :"yellow"
    // backgroundImage:"url('https://cdn.pixabay.com/photo/2014/02/27/16/10/tree-276014_960_720.jpg')",
  },
  paper: {
    // marginTop: theme.spacing(4),
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

}));

// const validationSchema = Yup.object({


//   firstname: Yup
//   .string ('firstname ')
//   .required('firstname is required')
//     .max(20, 'firstname should be of maxmum 20 characters length')
//     .min(2,'firstname should be of minimum 2 characters length')
//     ,

//    lastName: Yup
//    .string('lastName ')
//    .required('lastName is required')
//       .max(20, 'lastName should be of maxmum 20 characters length')
//       .min(2,'lastName should be of minimum 2 characters length')
//       ,
//   username: Yup
//   .string('UserName ')
//   .required('UserName is required')
//         .max(20, 'UserName should be of maxmum 20 characters length')
//         .min(2,'UserName should be of minimum 2 characters length')
//         ,

//   birthdate: Yup
//   .string('birthday')
//     .required('birthday is required'),
//     degree: Yup
//     .string('Enter your degree')
//     .required('degree is required')
//     ,
//   email: Yup
//   .string('Enter your email')
//   .required('Email is required')
//     .email('Enter a valid email')
//     ,
//   pass: Yup
//   .string('Enter your password')
//   .required('Password is required')
//     .min(8, 'Password should be of minimum 8 characters length')
//    ,
//   phone: Yup
//   .number()
//   .required('phone is required')
//     .min(8, 'Phone number should be of minimum 8 numbers length')
//     .max(20,'Phone number should be of maxmum 8 numbers length')
//    ,
//    address: Yup
//    .string('Enter your address')
//    .required('address is required')
//     ,
// });

export default function NurseSignup() {
  const [firstname, setFrestname] = useState();
  const [secondName, setSecondName] = useState();
  const [lastName, setlastName] = useState();
  const [ birthdate, setBirthdate] = useState();
  const [ degree, setDegree] = useState();
  const [username, setUsername] = useState();
  const [pass, setPass] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const classes = useStyles();
  
  const handleSignup = async()=>{

    var details = {
      'firstName':firstname,
       'lastName': lastName, 
       'Date': birthdate,
       'degree' : degree,
       'userName': username,
      'password': pass,
      'Email': email,
      'phone' : phone,
      'address': address,
    
  };
  
  
  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  console.log("formBodu : " , formBody)
  fetch('http://localhost:3000/nurse/addNurse', {
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

}
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
                   Add Nurse
                  </Typography>
                  </Typography>
                  {/* <Formik 
                  initialValues={{firstName:'', lastName:'',username:'', birthdate:'',degree:'',pass:'',email:'',phone:'',address:'',}}
                  validationSchema={validationSchema}
                  onSubmit={(values,actions)=>{
                    handleSignup(values)
                    actions.resetForm()
                  }}
                  > */}
                  {/* {(formikprops)=>( */}
                  <form className={classes.form} noValidate>
        <Grid container spacing={4}>
        <Grid item xs={6}>
            <TextField
             size="small"
              variant="outlined"
              required
              fullWidth
              id="firstname"
              label="FirstName"
              name="firstName"
              autoComplete="firstname"
              onChange = {(event) =>{
                setFrestname(event.target.value);
                // console.log("mmmmmm" , firstname);
              }}
              ///vbvghv
            />
          </Grid>
          {/* <Grid item xs={6}>
            <TextField
             size="small"
              variant="outlined"
              required
              fullWidth
              id="secondname"
              label="SecondName"
              name="secondName"
              autoComplete="secondname"
              onChange = {(event) =>{
                setSecondName(event.target.value);
                // console.log("mmmmmm" , secondname);
              }}
            />
          </Grid> */}
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
                setlastName(event.target.value);
                console.log("mmmmmm" , lastName);
              }}
            />
          </Grid>
          <Grid item xs={12}>
        <TextField
         fullWidth
         id="date"
        label="Birthday"
        type="date"
       defaultValue="2021-01-01"
       className={classes.textField}
      InputLabelProps={{
      shrink: true,
    }}
    onChange = {(event) =>{
      setBirthdate(event.target.value);
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
                setDegree(event.target.value);
                console.log("mmmmmm" , degree);
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
                setUsername(event.target.value);
                console.log("mmmmmm" , username);
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
                setPass(event.target.value);
                console.log("password" , pass);
              }}
              
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
             size="small"
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
                setPhone(event.target.value);
                console.log("phone" , phone);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
             size="small"
              variant="outlined"
              required
              fullWidth
              name="address"
              label="Address"
              type="address"
              id="address"
              onChange = {(event) =>{
                setAddress(event.target.value);
                console.log("address" , address);
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
                  {/* // )} */}
                   {/* </Formik> */}
                </div>
       
      </Container>
      </div>
     
      



);
}