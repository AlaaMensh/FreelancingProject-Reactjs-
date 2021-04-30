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
import { useHistory } from "react-router-dom";
// import FormGenerator from "./formCompoenent";
import TableComponent from "./tableComponent"

const useStyles = makeStyles((theme) => ({
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

}));

export default function TableGenerator() {
  

  const [formObj, setFormObj] = useState({});
  const history = useHistory();
  // const [, setAddress] = useState();
  const classes = useStyles();
  const [type, setType] = useState("disease");
  

useEffect(()=>{
  if(type === "allergy"){
    console.log("yes")
  }
  else{
    console.log("Noo")
  }
},[])
var obj ={}
if(type === "allergy"){
   obj ={
    type :"Allergy",
    rootPath:"allergy",
    getById :"getById",
    getAll :"getAllergy",
    deleteById:"deleteAllergy",
    updateById: "updateAllergy",
    addType :"addAllergy",
  }
}
else if(type === "disease"){
    obj ={
        name:"",
        code:"",
        abbreviation:"", 
        type :"diseases",
        rootPath:"diseases",
        getById :"getById",
        getAll :"getAll",
        deleteById:"deleteDisease",
        updateById: "updateDiseases"
      }
}
else if(type === "pathologist"){
   obj ={
    role :"pathologist",
    rootPath:"pathologist",
    relativePath :"addPathologist"
  }
}
else if(type === "doctor"){
   obj ={

    role :"nurse",
    rootPath:"nurse",
    relativePath :"addNurse"
  }
}
else if(type === "chemist"){
   obj ={

    role :"chemist",
    rootPath:"chemist",
    relativePath :"addChemist"
  }
}
else if(type === "doctor"){
   obj ={
    role :"assistant",
    rootPath:"assistant",
    relativePath :"addAssistant"
  }
}

return (

  <>
    {
      
        <TableComponent tableObj={obj} />
      
    }
    

      </>
     
      



);
}