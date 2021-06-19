import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Card, Button, Container } from "react-bootstrap";

class EMR extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Container>
        <Row className="mt-5 justify-content-center">
          <Col
            sm={6}
            md={4}
            style={{ cursor: "pointer" }}
            onClick={() => {
              this.props.history.push(
                `${this.props.history.location.pathname}/${"search"}`
              );
            }}
          >
            <div class="icon-box">
              <div class="icon">
                <img
                  src="https://cdn2.iconfinder.com/data/icons/coronavirus-10/512/cough-sneeze-illness-sick-healthcare-512.png"
                  style={{ size: "60px", height: "60px" }}
                />
              </div>
              <h1>
                <a>Your Patients</a>
              </h1>

              <p> View all patients you are curruntly treating.</p>
            </div>
          </Col>
          <Col
            sm={6}
            md={4}
            style={{ cursor: "pointer" }}
            onClick={() => {
              this.props.history.push(
                `${
                  this.props.history.location.pathname
                }/Futureappointements/${"future"}`
              );
            }}
          >
            <div class="icon-box">
              <div class="icon">
                <img
                  src="https://cdn4.iconfinder.com/data/icons/modern-education-and-knowledge-power-1/512/493_calendar_day_date_education-512.png"
                  style={{ size: "60px", height: "60px" }}
                />
              </div>
              <h1>
                <a>Future Appointements</a>
              </h1>

              <p> Get all your Future appointements details.</p>
            </div>
          </Col>
          <Col
            sm={6}
            md={4}
            style={{ cursor: "pointer" }}
            onClick={() => {
              this.props.history.push(
                `${
                  this.props.history.location.pathname
                }/currentAppointements/${"current"}`
              );
            }}
          >
            <div class="icon-box">
              <div class="icon">
                <img
                  src="https://cdn0.iconfinder.com/data/icons/football-filled-line-3/32/football_-32-512.png"
                  style={{ size: "60px", height: "60px" }}
                />
              </div>
              <h1>
                <a>Current Appointements</a>
              </h1>

              <p>Get all your current appointements details.</p>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default EMR;
