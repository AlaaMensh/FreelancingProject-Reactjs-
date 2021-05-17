import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import  { useState } from 'react';
// import "./form.css";
import { useEffect } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
// import { useEffect } from 'react';

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

export default function ChiefComplains({getPatientName,getChiefComplains ,getDiagnosis,  getDD , getNotes , obj} ) {

  const [deseases, setDeases] = useState([]);
  const classes = useStyles();
  useEffect(() => { 
    fetch(`http://localhost:3000/diseases/getAll`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      // body: formBody
    }).then((resp)=>{
      console.log("Getting: " , resp);
      resp.json().then((data)=>{
        console.log("deasess;  " , data)
        setDeases(data);
      })
    }).catch(()=>{
      console.log("errror")
    })
  

  },[])
       // Update the document title using the browser API    document.title = `You clicked ${count} times`;  });


  return (
      <div className="form-hero row">
                 <Container component="main" maxWidth="xs">
             <div className={classes.paper}>
                     
                           <Typography component="h1" variant="h5" className="py-3 text-center">
                             Please Fill These Fields
                           </Typography>
                           <form className={classes.form} noValidate>
                             <Grid container spacing={2}>
                               <Grid item xs={12}>
                                    <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    size="small"
                                    id="chiefComplains"
                                    label="chiefComplains"
                                    name="chiefComplains"
                                    autoComplete="chiefComplains"
                                    defaultValue= {obj.chiefComplains}
                                    onChange = {(event) =>{
                                        getChiefComplains(event.target.value);
                                        console.log("yyyyys" , event.target.value);
                                    }}
                                    // defaultValue={obj.firstName}
                                   
                                    />
                                
                                </Grid>
                              <Grid item xs={12}>
                                    <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    size="small"
                                    id="diagnosis"
                                    label="diagnosis"
                                    type="text"
                                    name="diagnosis"
                                    autoComplete="diagnosis"
                                    defaultValue= {obj.diagnosis}
                                    onChange = {(event) =>{
                                        getDiagnosis(event.target.value);
                                        // console.log("yyyyys" , lastName);
                                    }}
                                    // defaultValue={obj.lastName}
                                 
                                    />
                                
                                </Grid>
                              <Grid item xs={12}>
                                {console.log("name:  " , deseases)}
                                <Autocomplete
                                    multiple
                                    id="tags-standard"
                                    options={deseases}
                                    getOptionLabel={(option) => option.name}
                                    // defaultValue={[top100Films[0]]}
                                    
                                    renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="standard"
                                        label="Differential Diagnosis"
                                        placeholder="Favorites"
                                    />
                                    )}
                                    onChange={(e,value)=>{
                                        getDD(value);
                                    }}
                                />
                                    {/* <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    size="small"
                                    id="DD"
                                    label="DD"
                                    name="DD"
                                    type="text"
                                    autoComplete="DD"
                                    defaultValue= {obj.DD}
                                    onChange = {(event) =>{
                                    getDD(event.target.value);
                                        // console.log("yyyyys" , username);
                                    }}
                                    // defaultValue={obj.email}
                              
                                    /> */}
                                
                                </Grid>
                              <Grid item xs={12}>
                                    <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    size="small"
                                    id="notes"
                                    label="Notes"
                                    name="notes"
                                    type="text"
                                    autoComplete="notes"
                                    defaultValue= {obj.notes}
                                    onChange = {(event) =>{
                                        getNotes(event.target.value);
                                        // console.log("yyyyys" , username);
                                    }}
                                    // defaultValue={obj.address}
                                    
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

const top100Films = [
    { title: 'DD1' },
    { title: 'DD2' },
    { title: 'DD3', year: 1974 },
    { title: 'DD4', year: 2008 },
    { title: 'DD4', year: 1957 },
];