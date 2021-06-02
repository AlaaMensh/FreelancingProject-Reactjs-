import React, { useEffect, useState } from "react";
import { Card, Col } from "react-bootstrap";
import { Route, Switch, useHistory } from "react-router-dom";
import Appointement from "../../pages/newAppointments";
import Appointements from "../EMR/appointements";
import EMR from "../EMR/emr";
import Search from "../EMR/searchModule/search";
import NurseVisit from "../nurseModule/nursemodule";
import PatientsOnVisit from "../nurseModule/patinetsOnVisit";
import AddOrderForm from "../orderGeneration/addOrderForm";
import ptRegistration from "../patientRegistration/ptRegistration";
import Prescription from "../Prescription/Prescription";
import Profile from "../Profile/Profile";
import Visit from "../Visit/visit";
import AcceptOrders from "./../orderGeneration/acceptOrders";
import AllOrders from "./../orderGeneration/allOrders";
import ChoicePage from "./choice";
import "./Navbar.css";
import PharmacyModuleForDoctor from "../pharmacyModule/pharmacyModuleForDoctor";
import SessionCode from "../sessionCode";
import PharmacyModuleForPharmacist from "../pharmacyModule/pharmacyModuleForPharmacist";
import ChoicePageForDoctor from "../OrdersForDoctor/choice";
import AllOrdersForDoctor from "../OrdersForDoctor/DoctorOrders";

const PublicDashBoard = ({ match }) => {
  const history = useHistory();


  const [role, setRole] = useState("");
  const firstFunctionRow = [
    // Cards content and its role
    {
      text: "Appointement",
      discription: "View and manage your appointments.",
      color: "green",
      role: ["8"],
    }, //doctor
    {
      text: "Patient Registration",
      discription: "Add new client details using our wizard.",
      role: ["8", "6"],
      color: "red",
    }, //doctor and our GP
    {
      text: "EMR",
      discription: " Manage your electronic medical records",
      color: "light-blue",
      role: ["8"],
    }, // doctor
    {
      text: "Nursing",
      discription: "Nurse patient assessment form.",
      role: ["8", "7"],
      color: "purple",
    }, // nurse and doctor
  ];
  const secondFunctionRow = [
    {
      text: "Lab",
      discription: "Laboratory Information System",
      role: ["3", "8"],
    }, // lab FD
    {
      text: "Radiology",
      discription: "Radiology Information System",
      role: ["4", "8"],
    }, // radio
    {
      text: "Pathology",
      discription: "Pathology information system",
      role: ["5", "8"],
    }, // pathology
    {
      text: "ERX",
      discription: "Electronic procreption  system",
      role: ["13", "8"],
    }, //doctor or pharmacist
    { text: "System Admin", role: ["admin"] },
    { text: "Document Manegment", role: ["", ""] },
  ];
  const renderBodyForSessionCode = (value, role) => {
    return (
      <Card
      className={
        (value.color ? value.color : " shadow") + " dashboard-card"
      }
      style={{
        cursor: value.role.includes(role) ? "pointer" : "not-allowed",
      }}
      onClick={() => {
        
      }}
    >

      <Card.Body>
        <Card.Title>{value.text}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {value.discription ? value.discription : ""}
        </Card.Subtitle>
      </Card.Body>
    </Card>
      // <Card
      //   className="bg-light"
      //   style={{
      //     height: "15em",
      //     cursor: value.role.includes(role) ? "pointer" : "not-allowed",
      //   }}
      // >
      //   <Card.Img
      //     variant="top"
      //     src={window.location.origin + "/images/img1.svg"}
      //   />
      //   <Card.Body className="text-secondary ">
      //     <Card.Title className="text-center">{value.text}</Card.Title>
      //   </Card.Body>
      // </Card>
    );
  };


  useEffect(() => {
    // set role with localStorage and check if logged in user is patient or not
    var localStorageRole = parseInt(localStorage.getItem("role"));
    setRole(parseInt(localStorageRole));

    if (localStorageRole == 1) {
      // if it is patient go to unauthorized page
      history.push("/notAuthorized");
    }
    console.log("Role in Public DashBoard", localStorage.getItem("role"));
  }, [localStorage.getItem("role")]);

  // Render DashBoar Cards
  const renderMainCards = (arr) => {
    var role = localStorage.getItem("role"); // to check  the card's authontication by this
    return arr.map((value, index) => {
      // Map cards Contents
      if (
        value.text === "ERX" &&
        parseInt(role) === 13
      ) {
        return (
          <SessionCode
            buttonValue="get patient Orders"
            fromComponent={"pharmacy"}
            history={history}
            body={renderBodyForSessionCode(value, role)}
          />
        );
      } else {
        return (
          <Col xs={10} md={4} lg={3} className="my-4 ">
            <Card
              className={
                (value.color ? value.color : " shadow") + " dashboard-card"
              }
              style={{
                cursor: value.role.includes(role) ? "pointer" : "not-allowed",
              }}
              onClick={() => {
                if (
                  value.role.includes(role) &&
                  value.text === "Appointement"
                ) {
                  history.push(match.path + "/appoint");
                } else if (
                  value.role.includes(role) &&
                  value.text == "Patient Registration"
                ) {
                  history.push(match.path + "/ptRegistration");
                } else if (
                  value.text == "Nursing" &&
                  value.role.includes(role)
                ) {
                  history.push(match.path + "/patientsOnVisit");
                } else if (value.text == "Lab" && parseInt(role) === 3) {
                  // for LabFD Choices
                  history.push(match.path + `/choice/${"lab"}`);
                } else if (value.text === "Lab" && parseInt(role) === 8) {
                  // For Doctors Choices
                  history.push(match.path + `/choiceForDoctor/${"lab"}`);
                } else if (value.text === "Pathology" && parseInt(role) === 5) {
                  // for pathologyFD Choices
                  history.push(match.path + `/pathologyChoice/${"pathology"}`);
                } else if (value.text === "Pathology" && parseInt(role) === 8) {
                  // For Doctors Choices
                  history.push(match.path + `/choiceForDoctor/${"pathology"}`);
                } else if (value.text == "Radiology" && parseInt(role) === 4) {
                  // for RadioFD Choices
                  history.push(match.path + `/radioChoice/${"radio"}`);
                } else if (value.text === "Radiology" && parseInt(role) === 8) {
                  // For Doctors Choices
                  history.push(match.path + `/choiceForDoctor/${"radio"}`);
                } else if (value.text == "EMR" && value.role.includes(role)) {
                  history.push(match.path + `/EMR`);
                } else if (value.text == "ERX" && value.role.includes(role)) {
                  history.push(match.path + `/pharmacyModule`);
                }
              }}
            >

              <Card.Body>
                <Card.Title>{value.text}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {value.discription ? value.discription : ""}
                </Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>
        );
      }
    });
  };

  return (
    <div className="container">
      {/* Switch the DashBoard Routing */}
      <Switch>
        <Route exact path={match.path}>
          <div className="row mt-4">
            <h1>Dashboard</h1>
          </div>
          <div className="row">
            <h5 className="dashboard-section-title">Patient Manegment</h5>
          </div>
          <div className="row mt-1 justify-content-center">
            {renderMainCards(firstFunctionRow)}
          </div>
          <div className="row mt-5">
            <h5 className="dashboard-section-title">Services</h5>
          </div>
          <div className="row mt-1">{renderMainCards(secondFunctionRow)}</div>
        </Route>

        <Route exact path={match.path + "/appoint"} component={Appointement} />
        <Route
          exact
          path={match.path + "/patientsOnVisit"}
          component={PatientsOnVisit}
        />
        <Route
          exact
          path={match.path + "/patientsOnVisit/nurseVisit/:id"}
          component={NurseVisit}
        />
        <Route
          exact
          path={match.path + "/appoint/visit/:id"}
          component={Visit}
        />
        <Route
          exact
          path={match.path + "/appoint/visit/prescription/:visitId"}
          component={Prescription}
        />
        <Route exact path={match.path + "/profile"} component={Profile} />

        {/* ***EMR**** */}
        <Route exact path={match.path + "/EMR"} component={EMR} />
        <Route exact path={match.path + "/EMR/search"} component={Search} />
        <Route
          exact
          key={1}
          path={match.path + "/EMR/Futureappointements/:type"}
          component={Appointements}
        />
        <Route
          exact
          key={2}
          path={match.path + "/EMR/currentAppointements/:type"}
          component={Appointements}
        />

        <Route
          exact
          path={match.path + "/ptRegistration"}
          component={ptRegistration}
        />
        <Route exact path={match.path + "/nurseVisit"} component={NurseVisit} />
        <Route path={match.path + "/appoint/visit"} component={Visit} />
        <Route
          path={match.path + "/appoint/visit/prescription/"}
          component={Visit}
        />

        {/* choose if you want single patient orders or all lab Orders */}
        <Route
          key={15}
          exact
          path={match.path + "/choice/:type"}
          component={ChoicePage}
        />
        <Route
          key={5}
          exact
          path={match.path + "/pathologyChoice/:type"}
          component={ChoicePage}
        />
        <Route
          key={25}
          exact
          path={match.path + "/radioChoice/:type"}
          component={ChoicePage}
        />

        {/* AcceptOrders */}
        <Route
          exact
          path={match.path + "/choice/:type/acceptOrders"}
          component={AcceptOrders}
        />
        <Route
          exact
          path={match.path + "/pathologyChoice/:type/acceptPathologyOrders"}
          component={AcceptOrders}
        />
        <Route
          exact
          path={match.path + "/radioChoice/:type/acceptRadioOrders"}
          component={AcceptOrders}
        />

        {/* All Orders */}
        <Route
          key={13}
          exact
          path={match.path + "/choice/:type/allLabOrders"}
          component={AllOrders}
        />
        <Route
          key={14}
          exact
          path={match.path + "/pathologyChoice/:type/allPathologyOrders"}
          component={AllOrders}
        />
        <Route
          key={12}
          exact
          path={match.path + "/radioChoice/:type/allRadioChoice"}
          component={AllOrders}
        />

        {/* Add order Form in publicDashBoard */}
        <Route
          key={17}
          path={match.path + "/choice/:type/allLabOrders/addOrder"}
          component={AddOrderForm}
        />
        <Route
          key={18}
          exact
          path={
            match.path + "/pathologyChoice/:type/allPathologyOrders/addOrder"
          }
          component={AddOrderForm}
        />
        <Route
          key={19}
          exact
          path={match.path + "/radioChoice/:type/allRadioChoice/addOrder"}
          component={AddOrderForm}
        />

        {/* PharmacyModule   */}
        <Route
          exact
          path={match.path + "/pharmacyModule"}
          component={PharmacyModuleForDoctor}
        />
        <Route
          exact
          path={match.path + "/PharmacistPharmacyModule"}
          component={PharmacyModuleForPharmacist}
        />

        {/* from PharmacyModule To xprescription   */}
        <Route
          exact
          path={match.path + "/pharmacyModule/prescription"}
          component={Prescription}
        />
        <Route
          exact
          path={match.path + "/PharmacistPharmacyModule/prescription"}
          component={Prescription}
        />

        {/* From Future and current Appointements in EMR to Visit */}
        <Route
          exact
          path={match.path + "/EMR/Futureappointements/future/visit"}
          component={Visit}
        />
        <Route
          exact
          path={match.path + "/EMR/Futureappointements/future/visit/prescription/:visitId"}
          component={Prescription}
        />
        <Route
          exact
          path={match.path + "/EMR/currentAppointements/current/visit/prescription/:visitId"}
          component={Prescription}
        />
        <Route
          exact
          path={match.path + "/EMR/currentAppointements/current/visit"}
          component={Visit}
        />

        <Route
          exact
          path={match.path + "/choiceForDoctor/:type"}
          component={AllOrdersForDoctor}
        />
        <Route
          exact
          path={match.path + "/choiceForDoctor/:type/addOrder"}
          component={AddOrderForm}
        />
        <Route
          exact
          path={
            match.path + "/choiceForDoctor/:type/addOrder/allOrdersForDoctor"
          }
          component={AllOrdersForDoctor}
        />
        <Route
          exact
          path={match.path + "/choiceForDoctor/:type/allOrdersForDoctor"}
          component={AllOrdersForDoctor}
        />
      </Switch>
    </div>
  );
};

export default PublicDashBoard;
