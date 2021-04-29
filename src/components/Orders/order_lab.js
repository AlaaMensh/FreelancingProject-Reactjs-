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
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import LockIcon from '@material-ui/icons/Lock';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
//import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import { useHistory } from "react-router-dom";
// import "./form.css";


const useStyles = makeStyles((theme) => ({
  marginTopp:{
    marginTop: theme.spacing(11),
    backgroundColor :"yellow"
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor:"#e7f0f4",
    border:"1px solid #fff",
    boxShadow:"4px 3px 16px 1px #fff",
    padding:"1em",
    borderRadius:"1em"

  },
  iconsColor:{
    color:"#385968"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor:"#385968"
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),

  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor:"#385968",
  },

}));

export default function LabOrder() {
  const history = useHistory();
  const [investigation_type, setInvestigation_type] = useState();
  const [date, setDate] = useState();
  const [comments, setComments] = useState();
  const [status, setStatus] = useState();
  const [PtId, setPtId] = useState(1);
  const [drId, setDrId] = useState(1);
  const classes = useStyles();


  const handleSubmit = async()=>{

    var details = {
      'investigation_type':investigation_type,
      'date': date,
      'comments': comments,
      'status' : status,
      'ptId': PtId,
      'drId': drId
      
  };
  console.log("details", details)
  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  console.log("formBodu : " , formBody)
  fetch('http://localhost:3000/lab/addOrder', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: formBody
  }).then((resp)=>{
    console.log("resp: " , resp);
    resp.text().then((msg)=>{
      console.log("successfully added....." , msg);
      if(msg == "1 record added"){
        history.push("/radioOrderForm");
      }
      else{
        alert("something wrong ....")
      }
    }).catch(()=>{
      alert("something wrong ....")
    });


   
  })
  .catch(()=>{
    console.log("eror")
  })


  
  }
  return (
      <div className="form-hero row" >
            <Container component="main" maxWidth="xs" >
    <div className={classes.paper}>
                 
                  <Typography component="h1" variant="h5">
                   LabOrder
                  </Typography>
                  <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          size="small"
                          id="investigation_type"
                          label="Investigation_type"
                          name="investigation_type"
                          autoComplete="investigation_type"
                          onChange = {(event) =>{
                            setInvestigation_type (event.target.value);
                            console.log("investigation_type" , investigation_type);
                          }}
                         
                        />
                        
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          size="small"
                          name="date"
                          // label="Date"
                          type="date"
                          id="date"
                          autoComplete="current-password"
                          onChange = {(event) =>{
                            setDate (event.target.value);
                            console.log("date" , date);
                          }}
                         
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          size="small"
                          name="comments "
                          label="comments "
                          type="comments "
                          id="comments"
                          onChange = {(event) =>{
                            setComments(event.target.value);
                            console.log("comments" , comments );
                          }}
                            />

                      </Grid>
                      <InputLabel htmlFor="">Status</InputLabel>
                    <Select
                    native
               //   value={state.age}
               onChange = {(event) =>{
                setStatus(event.target.value);
                console.log("status" , event.target.value );
              }}                                                     
                 
               >
          <option aria-label="None" value="" />
          <option value= "choice1">choice1</option>
          <option value="choice2">choice2</option>
          <option value="choice3">choice3</option>
          
        </Select>
                    </Grid>
                    <Button
                      type="button"
                      fullWidth
                      variant="contained"
                      className={classes.submit}
                      onClick={()=>{
                        handleSubmit()
                      
                      }}
                    >
                      Submit
                    </Button>
                  


                  </form>
                </div>
       
       
      </Container>
      </div>
   
  );
}