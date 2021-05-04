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

import { useFormik,Formik } from 'formik';
import * as Yup from 'yup';

const useStyles = makeStyles((theme) => ({
  marginTopp:{
    // marginTop: theme.spacing(11),
    // backgroundColor :"yellow"
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

const validationSchema = Yup.object({
  username: Yup
  .string('UserName ')
  .required('UserName is required')
        .max(20, 'UserName should be of maxmum 20 characters length')
        .min(2,'UserName should be of minimum 2 characters length')
        ,

  email: Yup
  .string('Enter your email')
  .required('Email is required')
    .email('Enter a valid email')
    ,
  pass: Yup
  .string('Enter your password')
  .required('Password is required')
    .min(8, 'Password should be of minimum 8 characters length')
   ,
  phone: Yup
  .number()
  .required('phone is required')
    .min(8, 'Phone number should be of minimum 8 numbers length')
   
   ,
   address: Yup
   .string('Enter your address')
   .required('address is required')
    ,

    establishment_name: Yup
    .string ('establishment_name ')
    .required('establishment_name is required')
      .max(20, 'establishment_name should be of maxmum 20 characters length')
      .min(2,'establishment_name should be of minimum 2 characters length')
      ,

      contact_lab: Yup
  .number('contact_lab ')
  .required('contact_lab is required')
     .min(2,'contact_lab should be of minimum 2 characters length')
     ,
     labName: Yup
     .string('Enter your address')
  .required('contact_lab is required')
   
     ,
});
export default function LabFDSignUp() {
  //const [username, setUsername] = useState();
  //const [pass, setPass] = useState();
  //const [email, setEmail] = useState();
  const [labs, setLabs] = useState();
  //const [address, setAddress] = useState();
  //const [establishment_name, setEstablishment_name] = useState();
  //const [contact_pathology, setContact_pathology] = useState();
  const classes = useStyles();

  const handleSignup = async(values)=>{
    console.log("lllllllll")
    // alert(values)
    var details = {
      'userName':values.username,
      'password': values.pass,
      'Email': values.email,
      'phone' : values.phone,
      'address': values.address,
      'establishment': values.establishment_name,
      'contactperson' : values.contact_lab,
      'labId':values.labName
    
  };

  
  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  console.log("formBodu : " , formBody)
  fetch('http://localhost:3000/lFrontDisk/addPerson', {
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
  useEffect(()=>{
     axios.get('http://localhost:3000/labs/getAll' ,{
    } ).then(async resp => {
      console.log("resp : " ,resp)
   
      setLabs(resp.data)
      // console.log("resp.data: " , resp.data);
    
    })
  },[])
return (
  <div className="row align-items-center justify-content-center" style={{
    padding:"0" , margin:"0" , height:"100%"}} >
          <Container component="main" maxWidth="xs" style={{height:"100% !important"}}>
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
      ADD Lab FD
      </Typography>
      <Formik 
                  initialValues={{username:'',degree:'',pass:'',email:'',phone:'',address:'', establishment_name:'',contact_lab:'',labName:''}}
                  validationSchema={validationSchema}
                  onSubmit={(values,actions)=>{
                    console.log("lllllllllllllllllllllllll",values)
                    handleSignup(values)
                    actions.resetForm()
                  }}
                  >
                    {(formikprops)=>(
                  <form >
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
              onChange = {formikprops.handleChange('username')}
              onBlur = {formikprops.handleBlur('username')}
              value = {formikprops.values.username}
              error={formikprops.touched.username && formikprops.errors.username}
              helperText={formikprops.touched.username && formikprops.errors.username}
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
              onChange = {formikprops.handleChange('pass')}
              onBlur = {formikprops.handleBlur('pass')}
              value = {formikprops.values.pass}
              error={formikprops.touched.pass && formikprops.errors.pass}
              helperText={formikprops.touched.pass && formikprops.errors.pass}
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
              onChange = {formikprops.handleChange('email')}
              onBlur = {formikprops.handleBlur('email')}
              value = {formikprops.values.email}
              error={formikprops.touched.email && formikprops.errors.email}
              helperText={formikprops.touched.email && formikprops.errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="phone"
              label="Phone"
              type="phone"
              id="phone"
              onChange = {formikprops.handleChange('phone')}
              onBlur = {formikprops.handleBlur('phone')}
              value = {formikprops.values.phone}
              error={formikprops.touched.phone && formikprops.errors.phone}
              helperText={formikprops.touched.phone && formikprops.errors.phone}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="address"
              label="Address"
              type="address"
              id="address"
              onChange = {formikprops.handleChange('address')}
              onBlur = {formikprops.handleBlur('address')}
              value = {formikprops.values.address}
              error={formikprops.touched.address && formikprops.errors.address}
              helperText={formikprops.touched.address && formikprops.errors.address}/>
       
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="establishment_name"
              label="Establishment_name"
              type="establishment_name"
              id="establishment_name"
              onChange = {formikprops.handleChange('establishment_name')}
              onBlur = {formikprops.handleBlur('establishment_name')}
              value = {formikprops.values.establishment_name}
              error={formikprops.touched.establishment_name && formikprops.errors.establishment_name}
              helperText={formikprops.touched.establishment_name && formikprops.errors.establishment_name}/>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="contact_lab"
              label="contact_lab"
              type="contact_lab"
              id="contact_lab"
              onChange = {formikprops.handleChange('contact_lab')}
              onBlur = {formikprops.handleBlur('contact_lab')}
              value = {formikprops.values.contact_lab}
              error={formikprops.touched.contact_lab && formikprops.errors.contact_lab}
              helperText={formikprops.touched.contact_lab && formikprops.errors.contact_lab}/>
          </Grid>
          <Grid item xs={12}>
          <Select
                
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formikprops.values.labName}
                onChange={formikprops.handleChange('labName')}
                onBlur={formikprops.handleBlur('labName')}
                error={(formikprops.touched.labName && formikprops.errors.labName)?true:false}
                >
                  {labs && labs.length >0 && labs.map(lab=><MenuItem key={lab.id} value={lab.id}>{lab.name}</MenuItem>)}
                </Select>
          </Grid>
        </Grid>

        <Button
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={formikprops.handleSubmit}

        >
         Signup
                    </Button>
                    <Grid container justify="flex-end">
                      <Grid item>
                        <Link href="#" variant="body2">
                          Already have an account? Sign in
                        </Link>
                    
                      </Grid>
                    </Grid>
                    </form>
                   )}
                   </Formik>
 
                </div>
       
      </Container>
      </div>

);
}