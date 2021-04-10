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

export default function Private_Login_Form() {
  const [username, setUsername] = useState();
  const [pass, setPass] = useState();
  const [role, setRole] = useState();
  const [defaultCheck, setDefaultCheck] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const classes = useStyles();

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
            <InputLabel htmlFor="select">Role</InputLabel>
          <NativeSelect id="select" onChange ={(event)=>{
            setRole(event.target.value);
            console.log("Role" , role);
          }}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </NativeSelect>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" id="isAdmin" onChange={()=>{
                  var checkbox_isAdmin = document.getElementById("isAdmin");
                  if(checkbox_isAdmin.checked ){
                    console.log("yes is checked");
                    setIsAdmin(true);
                  }
                  else{
                    console.log("Noooooo is checked");
                    setIsAdmin(false);
                  }
                  // console.log("yesdddddddddddd" , isAdmin);
                }}/>}
                label="isAdmin"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" id="defaultCheck" onChange={()=>{
                  var checkbox_defaultCheck = document.getElementById("defaultCheck");
                  if(checkbox_defaultCheck.checked ){
                    console.log("yes is checked");
                    setDefaultCheck(true);
                  }
                  else{
                    console.log("Noooooo is checked");
                    setDefaultCheck(false);
                  }
                  // console.log("yesdddddddddddd" , isAdmin);
                }}
                 />}
                label="default Check"
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
              var obj = {
                userName:username,
                password:pass,
                Role:role,
                defaultCheck:defaultCheck,
                isAdmin:isAdmin,
              }
              console.log("user: " , obj)
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
      {/* <Box mt={5}>
        <Copyright />
      </Box> */}
    </Container>
  );
}