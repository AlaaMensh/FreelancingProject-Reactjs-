import React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { useState } from "react";
import PatientProblems from "./problems";
import UserInfo from "./userInfo";
import PatientAppointement from "./patientAppointements";
import Visit from "../Visit/visit";
import Prescription from "../Prescription/Prescription";
import AllOrders from "../orderGeneration/allOrders";
import Row from "react-bootstrap/Row";
import AddOrderForm from "../orderGeneration/addOrderForm";
import { ListGroup } from "react-bootstrap";
const ClinicalDashBoard = ({ match }) => {
  const history = useHistory();
  const [ptId, setPtId] = useState(41);

  useEffect(() => {
    console.log("herree dashBoard:", match.params.id);
    setPtId(match.params.id);
  });

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-4 col-md-4 col-lg-3 ">
          <div class="wrapper">
            {/* Bootstrap SideBar */}
            <nav id="sidebar">
              <div className="sidebar-header"></div>

              <ListGroup>
                <ListGroup.Item>
                  {parseInt(localStorage.getItem("role")) === 8 ? (
                    <Link
                      to={match.url + `/clinicalDashBoard`}
                      style={{ cursor: "pointer" }}
                    >
                      Clinical DashBoard
                    </Link>
                  ) : (
                    <Link to="#" style={{ cursor: "not-allowed" }}>
                      Clinical DashBoard
                    </Link>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Link to={match.url + `/patientAppointement`}>
                    Patient Appointement
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Link
                    to={
                      match.url + `/patientOnGoingProblems/${"onGoingProblems"}`
                    }
                  >
                    On Going Problems
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Link to={match.url + `/patientAllergyproblems/${"allergy"}`}>
                    Allergy Problems
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Link to={match.url + `/allLabOrders/${"lab"}`}>
                    Lab Orders
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Link to={match.url + `/allPathologyOrders/${"pathology"}`}>
                    Pathology Orders
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Link to={match.url + `/allRadioOrders/${"radio"}`}>
                    radio Orders
                  </Link>
                </ListGroup.Item>
              </ListGroup>
            </nav>
          </div>
        </div>
        <div className="col-8 col-md-8 col-lg-9  ">
          <Row>
            <UserInfo id={match.params.id} />
          </Row>
          <Switch>
            <Route exact path={match.url + `/clinicalDashBoard`}>
              <PatientProblems type={"allergy"} id={match.params.id} />
              <PatientProblems type={"onGoingProblems"} id={match.params.id} />
            </Route>
            <Route
              exact
              key={4}
              path={match.path + "/patientAllergyproblems/:type"}
              component={PatientProblems}
            />
            <Route
              exact
              key={5}
              path={match.path + "/patientOnGoingproblems/:type"}
              component={PatientProblems}
            />
            <Route
              exact
              path={match.path + "/patientAppointement"}
              component={PatientAppointement}
            />
            {/* <Route exact path={match.path+"/patientAppointement/visit"}  component={Visit}/>  */}

            <Route
              exact
              key={1}
              path={match.path + "/allLabOrders/:type"}
              component={AllOrders}
            />
            {/* <Route exact  path={match.path+"/allLabOrders/:type/:id/allOrders"}  component={AllOrders}/>  */}

            <Route
              exact
              key={11}
              path={match.path + "/allLabOrders/:type"}
              component={AllOrders}
            />
            <Route
              exact
              key={2}
              path={match.path + "/allPathologyOrders/:type"}
              component={AllOrders}
            />
            <Route
              exact
              key={3}
              path={match.path + "/allRadioOrders/:type"}
              component={AllOrders}
            />

            <Route
              exact
              path={match.path + "/allLabOrders/:type/addOrder"}
              component={AddOrderForm}
            />
            <Route
              exact
              key={2}
              path={match.path + "/allPathologyOrders/:type/addOrder"}
              component={AddOrderForm}
            />
            <Route
              exact
              key={7}
              path={match.path + "/allRadioOrders/:type/addOrder"}
              component={AddOrderForm}
            />

            <Route
              exact
              path={match.path + "/patientAppointement/visit"}
              component={Visit}
            />
            <Route
              exact
              path={
                match.path + "/patientAppointement/visit/prescription/:visitId"
              }
              component={Prescription}
            />
            <Route
              exact
              path={match.path + "/profile"}
              component={Prescription}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default ClinicalDashBoard;
