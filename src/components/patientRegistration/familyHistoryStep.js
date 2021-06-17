import React, { useState, useEffect } from "react";
import { Component } from "react";
import axios from "axios";
import steps from "./patientRegistrationDB.json";
import DataTableComp from "../typesGenerator/dataTable";
import ModalGenerator from "./../ModalGeneration/modalGeneration";
import FormGenerator from "../Forms/formGenerationNew";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

class FamilyHistoryStep extends Component {
  constructor(props) {
    super(props);

    this.state = {
      familyHistory: [], // to load data with it in table
      openModal: false,
      TypeObj: {},

      key: 1, // ** remove it if you don't use in another lists

      allergyTypes: [], // from DB ,
      activeStatus: true, // for Changing
      activeStatusText: "Active", // for the value of changing
      columns: [], // to handle Columns of the table
      formInputs: [], // to handle Form Inputs the addition or update
      formType: "", // edit or add
      stepType: "", // if it is allergy or onGoingproblems or surgeries or interventions
    };
  }
  //** to get the row which will updated */
  getTypeByID = async (row) => {
    console.log("UpdatedObject: ", row);
    this.setState({ TypeObj: row });
  };
  // for Modal
  handleopenModal = () => {
    this.setState({ openModal: true });
  };

  handleClose = () => {
    this.setState({ openModal: false });
  };

  // ***delete from table
  handleDelete = async (row) => {
    this.setState({
      familyHistory: this.state.familyHistory.filter((row) => row !== row),
    });
  };

  // ** handle Inputs of forms (addition or update) from Json file
  handleFormInputs = (type) => {
    var temp = [];
    for (var property in steps[type].modalForms) {
      temp.push(steps[type].modalForms[property]);
    }
    this.setState({ formInputs: temp });
  };
  // this for Navigation if you go to another step the information still at it is
  setfamilyHistoryWithHomeList = (type) => {
    if (
      this.props.familyHistoryListHome &&
      this.props.familyHistoryListHome.length > 0
    ) {
      this.setState({
        familyHistory: this.props.familyHistoryListHome,
        key: this.props.familyHistoryListHome.length + 1,
      });
    }
  };
  async componentDidMount() {
    var type = this.props.type; // change it with steptype props
    await this.setfamilyHistoryWithHomeList(type);

    this.setState({ stepType: type });
    await this.handleDataTable(type);
    await this.handleFormInputs(type);
    var newState = this.state;
    if (
      type === "surgeries" ||
      type === "familyHistory" ||
      type === "onGoingProblems"
    ) {
      this.getTypesFromDB();
    }

    // *** to fill the state of this stepType component
    for (var property in steps[type].state) {
      newState[property] = steps[type].state[property];
    }
  }
  // update DataTable
  handleUpdate = () => {
    var details = {};
    // for Update Form Inputs

    for (var p in steps[this.state.stepType].state) {
      details[p] = this.state[p] || this.state.TypeObj[p];
    }
    // var obj = this.state.familyHistory.find((item) => item == this.state.TypeObj);

    const items = this.state.familyHistory.map((item) =>
      item == this.state.TypeObj ? details : item
    );
    console.log("iteeeeems: ", items);

    this.setState({ familyHistory: items });
  };

  componentDidUpdate() {
    this.props.getfamilyHistoryList(this.state.familyHistory);
  }

  handleDataTable = (type) => {
    var temp = [];
    for (var property in steps[type].columnsTable) {
      // for Adding actions Buttons to DataTable
      if (property === "actions") {
        steps[type].columnsTable[property]["cell"] = (row) => {
          return (
            <div className="row">
              <div className="col-auto">
                <button
                  className="btn btn-primary"
                  onClick={async () => {
                    // console.log("rooooow : " , row)
                    // console.log("id:  " , row)
                    this.getTypeByID(row);
                    this.setState({ formType: "edit" }); // to get the modal of edit
                    this.handleopenModal();
                  }}
                >
                  Update
                </button>
              </div>
              <div className="col-auto">
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    this.handleDelete(row);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        };
        temp.push(steps[type].columnsTable[property]);
      } else {
        temp.push(steps[type].columnsTable[property]);
      }
    }
    this.setState({ columns: temp });
  };
  //** this function used when loading data from DB in dropDown list */
  getTypesFromDB = async () => {
    var temp2 = [];
    await axios
      .get(`${steps[this.state.stepType].getProblemsFromDB}`, {})
      .then(async (resp) => {
        console.log("AllIncomingData: ", resp.data);

        //********* Here You should search by abbreviation or name and the value will be the name  */
        for (var place of resp.data) {
          var obj = {
            value: place.name,
            text: place.name + " (" + place.abbreviation + " )",
          };
          temp2.push(obj);
        }
        this.setState({ options: temp2 });
        temp2 = [];
      });
  };
  handleAdding = () => {
    var details = {};
    // for Addition Form Inputs
    for (var p in steps[this.state.stepType].state) {
      details[p] = this.state[p];
    }
    details["id"] = this.state.key;

    this.setState({});
    console.log("Addition Object : ", details);
    var joined = this.state.familyHistory.concat(details);
    this.setState({ familyHistory: joined });
    this.setState({ key: this.state.key + 1 });
  };

  // used on props of the form component to handle the values of all variables
  handleChange = (evt) => {
    if (evt.text && evt.text === "autoComplete" && evt.newValue.text) {
      console.log("evt: ", evt, "  Value :");
      this.setState({
        [evt.input]: evt.newValue.value, //// **** Here the value after choosing from dropDown will be the name without abbreviation
      });
    } else {
      const value = evt.target.value;
      this.setState({
        [evt.target.name]: value,
      });
    }
  };

  render() {
    return (
      <Container>
        {console.log(
          "columns : ",
          this.state.columns,
          " FomInputs: ",
          this.state.formInputs,
          " state: ",
          this.state
        )}

        <Row className="py-3">
          <Col sm={10}></Col>
          <Col sm={2}>
            <Button
              variant="success"
              onClick={() => {
                this.setState({ formType: "add" });
                this.handleopenModal();
              }}
            >
              Add New
            </Button>{" "}
          </Col>
        </Row>
        <Row className="py-3">
          <Col sm={12} className="py-3">
            {console.log("list: ", this.state.familyHistory)}
            <DataTableComp
              data={this.state.familyHistory}
              columns={this.state.columns}
              title=""
            />
          </Col>
        </Row>
        <div className="row mt-4"></div>

        {this.state.formInputs && (
          <ModalGenerator onHide={this.handleClose} show={this.state.openModal} formType={this.state.formType}>
            <FormGenerator
              ModalInputs={this.state.formInputs}
              updatedTypeObj={this.state.TypeObj}
              handleChange={this.handleChange}
              handleUpdate={this.handleUpdate}
              handleAdding={this.handleAdding}
              options={this.state.options}
              formType={this.state.formType}
            />
          </ModalGenerator>
        )}
      </Container>
    );
  }
}

export default FamilyHistoryStep;
