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
});
    class UserProfile extends Component {
        constructor(props) {
          super(props);
          
          this.state = { 
            user_profileList : [],
            typeId:0,
            openModal1:false,
            openModal2:false,
            TypeObj : {},
            username:"",
            name: "",
            email :"",
            phone: ""  
                }
              }
              
              getTypeByID = async(id) => {
                console.log("heeereeeee" , id);
                let response = await fetch(`http://localhost:2400/user_profile/${id}`);
                var payload = await response.json();
                console.log( " kkkkkkkkkkkkkkkkkkkkkkkkkkkkk" , payload);
                this.setState({
                  TypeObj:payload
                })
              }
              getUserProfileTypesList = (fd_pathologist) =>{
              for(var type in fd_pathologistList){
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
            await axios.get(' http://localhost:2400/user_profile').then(async resp => {
               this.setState({
                 user_profileList : resp.data
            })
            })
          }
        
           handleCloseModal2 = () => {
            this.setState({openModal2 : false})
          };
    }