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
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import LockIcon from '@material-ui/icons/Lock';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
// import "./form.css";
import { useEffect } from 'react';

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
  },

}));

export default function Procedures({getProcedures ,getSurgeries,  getInterventions,getInterventionsDate,getSurgeryDate , obj} ) {
  const classes = useStyles();


  return (
      <div className="form-hero row">
                 <Container component="main" maxWidth="xs">
             <div className={classes.paper}>
                     
                           <Typography component="h1" variant="h5" className="py-3 text-center">
                             Please Fill These Fields
                           </Typography>
                           <form className={classes.form} noValidate>
                             <Grid container spacing={2}>
                              <Grid item xs={6}>
                                    <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    size="small"
                                    id="surgeries"
                                    label="Surgeries"
                                    type="text"
                                    name="surgeries"
                                    autoComplete="surgeries"
                                    defaultValue= {obj.surgeries}
                                    onChange = {(event) =>{
                                        getSurgeries(event.target.value);
                                        console.log("yyyyys" , event.target.value);
                                    }}
                                    // defaultValue={obj.lastName}
                                 
                                    />
                                </Grid>
                              <Grid item xs={6}>
                                    <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    size="small"
                                    id="surgeryDate"
                                    // label="Surgery Date"
                                    type="date"
                                    name="surgeryDate"
                                    autoComplete="surgeryDate"
                                    value= {obj.surgeryDate}
                                    onChange = {(event) =>{
                                        getSurgeryDate(event.target.value);
                                        // console.log("yyyyys" , lastName);
                                    }}
                                    />
                                </Grid>
                              <Grid item xs={6}>

                                    <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    size="small"
                                    id="interventions"
                                    label="interventions"
                                    name="interventions"
                                    type="text"
                                    autoComplete="interventions"
                                    value= {obj.interventions}
                                    onChange = {(event) =>{
                                    getInterventions(event.target.value);
                                        // console.log("yyyyys" , username);
                                    }}
                                    // defaultValue={obj.email}
                              
                                    />
                                
                                </Grid>
                              <Grid item xs={6}>
                                    <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    size="small"
                                    id="interventionsDate"
                                    // label="Interventions Date"
                                    name="interventionsDate"
                                    type="date"
                                    autoComplete="interventionsDate"
                                    defaultValue= {obj.interventionsDate}
                                    onChange = {(event) =>{
                                      getInterventionsDate(event.target.value);
                                        // console.log("yyyyys" , username);
                                    }}
                                    />
                                </Grid>
                             
                              
                            </Grid>
                           
                            <Grid container justify="flex-end">
                              <Grid item>
                                
                                {/* <Link href="#" variant="body2">
                                  Forgot Password
                                </Link> */}
                              </Grid>
                            </Grid>
                          </form>
                        </div>
               
              </Container>
      </div>
   
  );
}