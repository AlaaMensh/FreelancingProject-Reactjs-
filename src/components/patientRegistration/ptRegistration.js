import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import { Form, Col, Row, Button } from "react-bootstrap";
import Typography from "@material-ui/core/Typography";
import { useState } from "react";
import Info from "./importatntInfo";
import AllergyStep from "./allergyStep";
import FamilyHistoryStep from "./familyHistoryStep";
import SurgeriesStep from "./surgeriesStep";
import InterventionsStep from "./otherInterventionsStep";
import OnGoingProblemStep from "./onGoingProblemStep";
// import ListStep from "./listStep"; // Put it if you solve the one component Problem

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  marginTopp: {
    marginTop: theme.spacing(11),
    backgroundColor: "yellow",
    // backgroundImage:"url('https://cdn.pixabay.com/photo/2014/02/27/16/10/tree-276014_960_720.jpg')",
  },
}));
const styles = {
  paper: {
    // marginTop: theme.spacing(8),
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
    // margin: theme.spacing(1),
    backgroundColor: "#385968",
    // backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    // marginTop: theme.spacing(3),
  },
  submit: {
    // margin: theme.spacing(3, 0, 2),
    backgroundColor: "rgb(115 149 165)",
    margin: "0 auto",
    padding: "1em 2em",
    color: "white",
  },
};

function getSteps() {
  return [
    "Fill Important Info",
    "Allergy Step",
    "Family History ",
    "Surgical History ",
    "Intervetions ",
    "onGoingProblem",
    "Finished",
  ];
}

export default function HorizontalLabelPositionBelowStepper() {
  const [firstName, setFirstName] = useState();
  const [secondName, setSecondName] = useState();
  const [lastName, setLastName] = useState();
  const [birthDate, setbirthDate] = useState();
  const [userName, setuserName] = useState();
  const [address, setAddress] = useState();
  const [status, setStatus] = useState();
  const [bloodGroup, setbloodGroup] = useState();
  const [phone, setPhone] = useState();
  const [allergyList, setAllergyList] = useState([]);
  const [familyHistoryList, setFamilyHistoryList] = useState([]);
  const [surgeriesList, setsurgeriesList] = useState([]);
  const [interventionsList, setinterventionsList] = useState([]);
  const [onGoingProblemList, setonGoingProblemList] = useState([]);
  const [gender, setGender] = useState("");

  const handleSubmit = () => {
    console.log(
      "gender: ",
      gender,
      "first: ",
      firstName,
      "last: ",
      lastName,
      "address : ",
      address,
      "phone:  ",
      phone,
      "userName : ",
      userName,
      "Family History : ",
      familyHistoryList,
      "Allergy  : ",
      allergyList
    );
    console.log("onGoingproblems : ", onGoingProblemList);
    var result = JSON.stringify(familyHistoryList);
    var json = JSON.parse(result);

    // this object will be sent to back to add patient
    var details = {
      firstName: firstName,
      lastName: lastName,
      secondName: secondName,
      address: address,
      phone: phone,
      gender : gender,
      userName: userName,
      birthDate: birthDate,
      status: status,
      BloodGroup: bloodGroup,
      Allergy: allergyList,
      familyHistory: familyHistoryList,
      surgeries: surgeriesList,
      Interventions: interventionsList,
      onGoingProblems: onGoingProblemList,
    };
    console.log("Details To Add:  ", details);

    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    console.log("formBody:  ", formBody);

    fetch("http://localhost:8080/pt/addPT", {
      //** this will add patient */
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    })
      .then((resp) => {
        resp.text().then((data) => {
          console.log("Message: ", data);
          if (data === "done") {
            alert("added sucssessfully....");
          }
        });
      })
      .catch(() => {
        console.log("errror");
      });
  };
  // these function to get the value from Children in this parent to handleSubmit here
  const getFirstName = (name) => {
    setFirstName(name);
  };
  const getSecondName = (name) => {
    setSecondName(name);
  };
  const getGender = (name) => {
    setGender(name);
  };
  const getLastName = (name) => {
    setLastName(name);
  };
  const getAddress = (name) => {
    setAddress(name);
  };
  const getuserName = (name) => {
    setuserName(name);
  };
  const getPhone = (name) => {
    setPhone(name);
  };
  const getStatus = (name) => {
    setStatus(name);
  };
  const getBloodGroup = (name) => {
    setbloodGroup(name);
  };
  const getBirthDate = (name) => {
    setbirthDate(name);
  };
  const obj = {
    gender: gender,
    firstName: firstName,
    lastName: lastName,
    secondName: secondName,
    userName: userName,
    address: address,
    birthDate: birthDate,
    status: status,
    phone: phone,
    bloodGroup: bloodGroup,
  };
  const getAllergyList = (List) => {
    console.log("allergyListInHome: ", List);
    setAllergyList(List);
  };
  const getfamilyHistoryList = (List) => {
    console.log("Familty HistoryListInHome: ", List);
    setFamilyHistoryList(List);
  };
  const getSurgeriesList = (List) => {
    setsurgeriesList(List);
  };
  const getinterventionsList = (List) => {
    setinterventionsList(List);
  };
  const getonGoingProblemList = (List) => {
    setonGoingProblemList(List);
  };

  const ptRegistration = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <Info
            getGender={getGender}
            getFirstName={getFirstName}
            getSecondName={getSecondName}
            getuserName={getuserName}
            getStatus={getStatus}
            getLastName={getLastName}
            getAddress={getAddress}
            getBirthDate={getBirthDate}
            getPhone={getPhone}
            getBloodGroup={getBloodGroup}
            obj={obj}
          />
        );
      case 1:
        return (
          <AllergyStep
            getAllergyList={getAllergyList}
            allergyListHome={allergyList}
            type="allergyStep"
          />
        );
      case 2:
        return (
          <FamilyHistoryStep
            getfamilyHistoryList={getfamilyHistoryList}
            familyHistoryListHome={familyHistoryList}
            type="familyHistory"
          />
        );
      case 3:
        return (
          <SurgeriesStep
            getsurgeriesList={getSurgeriesList}
            surgeriesListHome={surgeriesList}
            type="surgeries"
          />
        );
      case 4:
        return (
          <InterventionsStep
            getinterventionsList={getinterventionsList}
            interventionsListHome={interventionsList}
            type="interventionsStep"
          />
        );
      case 5:
        return (
          <OnGoingProblemStep
            getonGoingProblemList={getonGoingProblemList}
            onGoingProblemListHome={onGoingProblemList}
            type="onGoingProblems"
          />
        );
      default:
        return "Unknown stepIndex";
    }
  };
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
      <Row>
        <Col>
          {activeStep === steps.length - 1 ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed
              </Typography>
              <div className="row ">
                <Button
                  type="button"
                  size="small"
                  variant="contained"
                  style={styles.submit}
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Save
                </Button>
              </div>
              <Button onClick={handleReset}>Reset</Button>
            </div>
          ) : (
            <div>
              <Typography className={classes.instructions}>
                {ptRegistration(activeStep)}
              </Typography>
            </div>
          )}
        </Col>
        <Col sm={2} md="2">
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            orientation="vertical"
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Col>
      </Row>
      <div>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          className={classes.backButton}
        >
          Back
        </Button>
        <Button variant="contained" color="primary" onClick={handleNext}>
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </div>
    </div>
  );
}
