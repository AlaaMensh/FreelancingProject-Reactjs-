import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import  { useState } from 'react';

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

export default function Signup() {
  const [username, setUsername] = useState();
  const [pass, setPass] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [establishment_name, setEstablishment_name] = useState();
  const [contact_radio, setContact_radio] = useState();
  const classes = useStyles();

  const handleSignup = async()=>{

    var details = {
      'userName':username,
      'password': pass,
      'Email': email,
      'Phone' : phone,
      'Address': address,
      'Establishment_name': establishment_name,
      'Contact_person' : contact_radio
    
  };
  
  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  
  fetch('http://localhost:3000/authenticate/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: formBody
  })


}
return (
  <Container component="main" maxWidth="xs">
    {/* <CssBaseline /> */}
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
                console.log("mmmmmm" , username);
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
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
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
          <Grid item xs={12}>
            <TextField
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
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="establishment_name"
              label="Establishment_name"
              type="establishment_name"
              id="establishment_name"
              onChange = {(event) =>{
                setEstablishment_name(event.target.value);
                console.log("establishment_name" , establishment_name);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="contact_lab"
              label="Contact_lab"
              type="contact_lab"
              id="contact_lab"
              onChange = {(event) =>{
                setContact_lab(event.target.value);
                console.log("contact_lab" , contact_lab);
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
          </Grid>
        </Grid>
      </form>
    </div>
    {}
  </Container>
);
}