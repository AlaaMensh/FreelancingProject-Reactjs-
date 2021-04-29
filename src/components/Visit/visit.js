import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
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
import  { useState , useEffect} from 'react';
import { NativeSelect } from '@material-ui/core';
import axios from 'axios';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import LockIcon from '@material-ui/icons/Lock';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import ChiefComplains from "./chiefComplains";
import Procedures from './procedures';
import Investgation from './investgation';
// import Procedures from "./procedures"

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
        backgroundColor:"rgb(115 149 165)",
        margin:"0 auto",
        padding:"1em 2em",
        color:"white"
      },
}

function getSteps() {
  return ['Fill Important Info', 'Investigation', 'Procedures' ];
}



export default function HorizontalLabelPositionBelowStepper() {
  
  const [ptId, setPId] = useState(1);
  // const [ptId, setPId] = useState(1);
  
  
  
  const [chiefComplains, setChiefComplains] = useState();
  const [diagnosis, setdiagnosis] = useState();
  const [ DD, setDD] = useState();
  const [notes, setNotes] = useState();
  
  const [ procedures, setProcedures] = useState();
  const [ surgeries, setSurgeries] = useState();
  const [ interventions, setInterventions] = useState();
  const [ interventionDate, setInterventionDate] = useState("");
  const [ surgeryDate, setSurgeryDate] = useState("");

  const [ investigation, setInvestigation] = useState();
  const [ labsChoices, setLabsChoices] = useState([]);
  const [ pathologyChoices, setPathologyChoices] = useState([]);
  const [ radioChoices, setRadioChoices] = useState([]);
  
  
  const [ labOrders, setLabOrders] = useState([]);
  const [ pathologyOrders, setPathologyOrders] = useState([]);
  // const [ pathologyOrders, setPathologyOrders] = useState([]);
  const [ radioOrders, setRadioOrders] = useState([]);
  const [ labOrdersHome, setLabOrdersHome] = useState([]);
  const [ pathologyOrdersHome, setPathologyOrdersHome] = useState([]);
  const [ radioOrdersHome, setRadioOrdersHome] = useState([]);
  
  
    useEffect(()=>{

    },[])

    const handleSubmit = () =>{
        console.log("obj:  ", obj);
        console.log("step2obj :  " , objStep2);
        console.log("step3obj :  " , objStep3);

        var details = {
          ptId:ptId,
          chiefComplains : chiefComplains,
          diagnosis : diagnosis,
          surgeries : surgeries,
          surgeryDate : surgeryDate,
          interventions :interventions,
          interventionDate :interventionDate,
          DD : DD,//Deases Type
          labsChoices : labOrders,
          pathologyChoices : pathologyOrders,
          radioChoices : radioOrders, 
        }
       

        console.log("formBody:  " , details)

        var formBody = [];
        for (var property in details) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        console.log("formBody:  " , formBody)

        fetch('http://localhost:3000/visit/addvisit', {
          method: 'POST',
           headers: {
             'Content-Type': 'application/json'
           },
          body: JSON.stringify(details)
        }).then(()=>{
          console.log("it is inserted");
        }).catch(()=>{
          console.log("errror")
        })



            
    }
    const getChiefComplains = (value)=>{
        console.log("value:  ",value);
        setChiefComplains(value);
    }
    const getDiagnosis = (value)=>{
        setdiagnosis(value)
    }
    const getDD = (value)=>{
        setDD(value)
    }
    const getNotes = (value) =>{
        setNotes(value);
    }


    const getSurgeryDate = (list)=>{
      console.log("Home Lab Orders:      " , list);
      setSurgeryDate(list);
    }
    const getInterventionsDate = (list)=>{
      console.log("Home Lab Orders:      " , list);
      setInterventionDate(list);
    }

    const getLabOrders = (list)=>{
      console.log("Home Lab Orders:      " , list);
      setLabOrders(list);
    }

    const getPathologyOrders = (list)=>{
      console.log("Home Pathology Orders:      " , list);
      setPathologyOrders(list);
    }
    const getLabOrdersHome = (list)=>{
      console.log("orderss from hierree:      " , list);
      setLabOrdersHome(list);
    }
  
    const obj = {
        chiefComplains : chiefComplains,
        diagnosis : diagnosis,
        DD : DD,
        notes : notes
    }

    const objStep2 = {
        surgeries : surgeries,
        surgeryDate : surgeryDate,
        interventions : interventions,
        interventionsDate : interventionDate
    }

    const getProcedures = (value) =>{
        setProcedures(value);
    }

    const getSurgeries = (value) =>{
      console.log("surgies: " , value);
        setSurgeries(value);
    }

    const getInterventions = (value) =>{
      console.log("Interventions : " , value);
        setInterventions(value);
    }

    const getInvestigation = (value) =>{
      console.log("invest:   " , value);
        setInvestigation(value);
    }

    const getLabsChoices = (list) =>{
        setLabsChoices(list);
    }

    const getPathologyChoices = (list) =>{
        setPathologyChoices(list);
    }

    const getRadioChoices = (list) =>{
        setRadioChoices(list);
    }
    const getRadioOrders = (list) =>{
        setRadioOrders(list);
    }


 
    const objStep3 = {
      investigation : investigation,
      labsChoices : labsChoices,
      pathologyChoices : pathologyChoices,
      radioChoices : radioChoices,
      radioOrdersHome : radioOrders,
      labOrdersHome : labOrders,
      pathologyOrdersHome : pathologyOrders,
  }


    const ptRegistration = (stepIndex ) =>{
       
        // const classes = useStyles();
      switch (stepIndex) {
        case 0:
          return (
              <ChiefComplains 
                getChiefComplains = {getChiefComplains}
                getDiagnosis = {getDiagnosis}
                getNotes = {getNotes}
                getDD = {getDD}
                obj ={obj}
              />
          );
        case 1:
          return(
            <Investgation 
            getInvestigation = {getInvestigation}
            getLabsChoices = {getLabsChoices}
            getRadioChoices = {getRadioChoices}
            getPathologyChoices  = {getPathologyChoices}
            getLabOrders = {getLabOrders}
            getPathologyOrders = {getPathologyOrders}
            getRadioOrders = {getRadioOrders}
            getLabOrdersHome = {getLabOrdersHome}
            obj = {objStep3}
            /> 
        
          );
        case 2:
          return ( 
            < Procedures
            getProcedures = {getProcedures}
            getSurgeries = {getSurgeries}
            getInterventions = {getInterventions}
            getInterventionsDate = {getInterventionsDate}
            getSurgeryDate = {getSurgeryDate}
            obj = {objStep2}
             />    
          );
        
        default:
          return 'Finished Thanks.....';
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
                variant="contained"
                // color="primary"
                style={styles.submit}
                onClick={()=>{
                handleSubmit()
                }}
            >
                Save
            </Button>
            </div>
          </div>
        )}
      </div>
    </div>
      </div>
  );
}

  


