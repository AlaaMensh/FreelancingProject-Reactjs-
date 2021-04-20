import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
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
// import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import  { useState } from 'react';
import { NativeSelect } from '@material-ui/core';
import axios from 'axios';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import LockIcon from '@material-ui/icons/Lock';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import Info from "./importatntInfo";
import Allergy from "./allergyStep";
import FamilyHistoryStep from "./familyHistoryStep";
import SurgeriesStep from "./surgeriesStep";
import InterventionsStep from "./otherInterventionsStep";
import OnGoingProblemStep from "./onGoingProblemStep";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  marginTopp:{
    marginTop: theme.spacing(11),
    backgroundColor :"yellow"
    // backgroundImage:"url('https://cdn.pixabay.com/photo/2014/02/27/16/10/tree-276014_960_720.jpg')",
  },

}));
const styles = {
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
        // margin: theme.spacing(1),
        backgroundColor:"#385968"
        // backgroundColor: theme.palette.secondary.main,
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        // marginTop: theme.spacing(3),
    
      },
      submit: {
        // margin: theme.spacing(3, 0, 2),
        backgroundColor:"#385968",
        margin:"0 auto"
      },
}

function getSteps() {
  return ['Fill Important Info', 'Allergy Step', 'Family History Step' ,'Surgies Step','Intervetions Step','onGoingProblem' ,'Create an ad'];
}



export default function HorizontalLabelPositionBelowStepper() {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [ birthDate, setbirthDate] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [status, setStatus] = useState();
  const [bloodGroup, setbloodGroup] = useState();
  const [phone, setPhone] = useState();
  const [allergyList, setAllergyList] = useState([]);
  const [familyHistoryList, setFamilyHistoryList] = useState([]);
  const [surgeriesList, setsurgeriesList] = useState([]);
  const [interventionsList, setinterventionsList] = useState([]);
  const [onGoingProblemList, setonGoingProblemList] = useState([]);

    const handleSubmit = () =>{
        console.log("first: " , 
        firstName , "last: " ,
         lastName ,"address : " ,
          address , "phone:  " ,
           phone , "email : " ,
            email , "Family History : " , familyHistoryList
            ,"Allergy  : " , allergyList)
            var details = {
            firstName:firstName,
            lastName:lastName,
            address:address,
            phone:phone,
            email:email,
            birthDate:birthDate,
            status: status,
            BloodGroup : bloodGroup,
            Allergy : allergyList,
            familyHistory : familyHistoryList,
            surgeries : surgeriesList,
            Interventions :interventionsList,
            onGoingProblems : onGoingProblemList,
            
          }

            var formBody = [];
            for (var property in details) {
              var encodedKey = encodeURIComponent(property);
              var encodedValue = encodeURIComponent(details[property]);
              formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
            console.log("formBody:  " , formBody)
    }
const getFirstName  = (name) =>{
    // console.log("fiffffff:   " , name);
    setFirstName(name);
} 
const getLastName  = (name) =>{
    // console.log("fiffffff:   " , name);
    setLastName(name);
} 
const getAddress  = (name) =>{
    // console.log("fiffffff:   " , name);
    setAddress(name);
} 
const getEmail  = (name) =>{
    // console.log("fiffffff:   " , name);
    setEmail(name);
} 
const getPhone  = (name) =>{
    // console.log("fiffffff:   " , name);
    setPhone(name);
} 
const getStatus  = (name) =>{
    // console.log("fiffffff:   " , name);
    setStatus(name);
} 
const getBloodGroup  = (name) =>{
    // console.log("fiffffff:   " , name);
    setbloodGroup(name);
} 
const getBirthDate  = (name) =>{
    // console.log("fiffffff:   " , name);
    setbirthDate(name);
} 
const obj = {
  firstName : firstName,
  lastName : lastName,
  email:email,
  address: address,
  birthDate:birthDate ,
  status : status,
  phone : phone,
  bloodGroup :  bloodGroup
}
const getAllergyList = (List)=>{
console.log("kllllllllllllll:    " , List);
setAllergyList(List);
}
const getfamilyHistoryList = (List)=>{
console.log("Family history:    " , List);
setFamilyHistoryList(List);
}
const getSurgeriesList = (List)=>{
console.log("Family history:    " , List);
setsurgeriesList(List);
}
const getinterventionsList  = (List)=>{
console.log("Family history:    " , List);
setinterventionsList(List);
}
const getonGoingProblemList  = (List)=>{
console.log("onGoing history:    " , List);
setonGoingProblemList(List);
}

    const ptRegistration = (stepIndex ) =>{
       
        // const classes = useStyles();
      switch (stepIndex) {
        case 0:
          return (
            <Info 
            getFirstName = {getFirstName} 
            getEmail ={getEmail} 
            getStatus={getStatus} 
            getLastName = {getLastName} 
            getAddress ={getAddress} 
            getBirthDate ={getBirthDate} 
            getPhone = {getPhone} 
            getBloodGroup={getBloodGroup} 
            obj={obj}
             />
          );
        case 1:
          return (<Allergy 
          getAllergyList = {getAllergyList}
          allergyListHome = {allergyList}
          />);
        case 2:
          return (    
            <FamilyHistoryStep
            getfamilyHistoryList = {getfamilyHistoryList}
            familyHistoryListHome ={familyHistoryList}
            />
          );
        case 3:
          return (
            <SurgeriesStep
            getsurgeriesList  = {getSurgeriesList}
            surgeriesListHome ={surgeriesList}
            />
          );
        case 4:
          return (
            <InterventionsStep
            getinterventionsList   = {getinterventionsList  }
            interventionsListHome ={interventionsList}
            />
          );
        case 5:
          return (
            <OnGoingProblemStep
            getonGoingProblemList  = {getonGoingProblemList  }
            onGoingProblemListHome ={onGoingProblemList}
            />
          );
        default:
          return 'Unknown stepIndex';
      }
    }
    // const [phone, setPhone] = useState();

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
      <div className="container">
          
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{ptRegistration(activeStep)}</Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
            <div className="row ">
            <Button
                type="button"
                size ="small"
                variant="contained"
                // color="primary"
                style={styles.submit}
                onClick={()=>{
                // var obj = {
                //   userName:username,
                //   password:pass,
                //   email:email,
                // }
                // console.log("user: " , obj);
                handleSubmit()
                }}
            >
                Sign Up
            </Button>
            </div>
          </div>
        )}
      </div>
    </div>
      </div>
  );
}
