import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
// import "./form.css";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import React from "react";
import { Col, Form, Row } from "react-bootstrap";

const useStyles = makeStyles((theme) => ({
  marginTopp: {
    marginTop: theme.spacing(11),
    backgroundColor: "yellow",
    // backgroundImage:"url('https://cdn.pixabay.com/photo/2014/02/27/16/10/tree-276014_960_720.jpg')",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#e7f0f4",
    border: "1px solid #fff",
    boxShadow: "4px 3px 16px 1px #fff",
    // backgroundImage:"url('https://cdn.pixabay.com/photo/2014/02/27/16/10/tree-276014_960_720.jpg')",
    padding: "1em",
    borderRadius: "1em",
  },
  iconsColor: {
    color: "#385968",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#385968",
    // backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#385968",
  },
}));

export default function Procedures({
  getProcedures,
  getSurgeries,
  getInterventions,
  getInterventionsDate,
  getSurgeryDate,
  obj,
}) {
  const classes = useStyles();
  const [surgys,setSurgys] = React.useState([])
  const [inputValue, setInputValue] = React.useState('');
  const [value, setValue] = React.useState([]);

  const loadAllSurgeries = ()=>{
    axios.get("http://localhost:8080/surgery/getAll").then(res=>{
        setSurgys(res.data)
    }).catch(err=>{
      alert(err)
    })
  }
  React.useEffect(()=>{
    loadAllSurgeries()
  },[])
  //  this Component will handle Surgies and interventions
  return (
    <Row className="justify-content-center">
      <Col md={8} xs={12}>
        <div>
          <Form className="small-labels" noValidate>
            <Row>
              <Col item xs={6}>
                <Form.Label>Surgeries</Form.Label>
                {surgys.length > 0 && <Autocomplete
                multiple
                  onChange={(event, newValue) => {
                    if(newValue)
                    {
                      setValue(newValue);
                      console.log(newValue)

                    }
                  }}
                  filterSelectedOptions
                  getOptionLabel={(option) => option.abbreviation}
                  id="controllable-states-demo"
                  options={surgys}
                  style={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Controllable" variant="outlined" />}
                />}
              </Col>
              
            </Row>


            <Grid container justify="flex-end">
              <Grid item></Grid>
            </Grid>
          </Form>
        </div>
      </Col>
    </Row>
  );
}
