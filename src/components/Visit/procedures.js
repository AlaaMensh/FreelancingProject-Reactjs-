import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Card, Row, Col, Form } from "react-bootstrap";
// import "./form.css";

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

  //  this Component will handle Surgies and interventions
  return (
    <Row className="justify-content-center">
      <Col md={8} xs={12}>
        <div>
          <Form className="small-labels" noValidate>
            <Row>
              <Col item xs={6}>
                <Form.Label>Surgeries</Form.Label>
                <Form.Control
                  variant="outlined"
                  required
                  fullWidth
                  size="small"
                  id="surgeries"
                  palceholder="Surgeries"
                  type="text"
                  name="surgeries"
                  autoComplete="surgeries"
                  defaultValue={obj.surgeries}
                  onChange={(event) => {
                    getSurgeries(event.target.value);
                  }}
                />
              </Col>
              <Col item xs={6}>
                <Form.Label>Surgery Date</Form.Label>
                <Form.Control
                  variant="outlined"
                  required
                  fullWidth
                  size="small"
                  id="surgeryDate"
                  palceholder="Surgery Date"
                  type="date"
                  name="surgeryDate"
                  autoComplete="surgeryDate"
                  value={obj.surgeryDate}
                  onChange={(event) => {
                    getSurgeryDate(event.target.value);
                    // console.log("yyyyys" , lastName);
                  }}
                />
              </Col>
            </Row>

            <Row>
              <Col item xs={6}>
                <Form.Label>interventions</Form.Label>
                <Form.Control
                  variant="outlined"
                  required
                  fullWidth
                  size="small"
                  id="interventions"
                  placeholder="interventions"
                  name="interventions"
                  type="text"
                  autoComplete="interventions"
                  value={obj.interventions}
                  onChange={(event) => {
                    getInterventions(event.target.value);
                    // console.log("yyyyys" , username);
                  }}
                  // defaultValue={obj.email}
                />
              </Col>
              <Col item xs={6}>
                <Form.Label>Interventions Date</Form.Label>
                <Form.Control
                  variant="outlined"
                  required
                  fullWidth
                  size="small"
                  id="interventionsDate"
                  placeholder="Interventions Date"
                  name="interventionsDate"
                  type="date"
                  autoComplete="interventionsDate"
                  defaultValue={obj.interventionsDate}
                  onChange={(event) => {
                    getInterventionsDate(event.target.value);
                    // console.log("yyyyys" , username);
                  }}
                />
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
