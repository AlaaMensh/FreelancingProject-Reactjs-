import axios from "axios";
import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import FormGenerator from "../Forms/formGenerationNew";
import Spinner from '../shared/Spinner';
import DataTableComp from "../typesGenerator/dataTable";
import ModalGenerator from "./../ModalGeneration/modalGeneration";
import clinicalDB from "./clinicalDB.json";

const optionsInput = [
  { id: 1, name: "alaa" },
  { id: 2, name: "lol" },
];
class FamilyHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      openModal: false,
      loading : false,
      ModalAddtionInputs: [],
      ModalUpdateInputs: [],
      data: [],
      status : '',
      added_type : '',
      allergy : '',
      temp: [],
      typeObj: {},
      type: "",
      formType: "add",
      addingUserObject: {},
      updateUserObject: {},
      options: [],
    };
  }
  handleDataTable = (type) => {
    var temp = [];
    var temp2 = [];
    for (var p in clinicalDB[type].columnsTable) {
      // for Adding actions Buttons to DataTable
      if (p === "actions") {
        clinicalDB[type].columnsTable[p]["cell"] = (row) => {
         
        };
        temp.push(clinicalDB[type].columnsTable[p]);
      } else {
        temp.push(clinicalDB[type].columnsTable[p]);
      }
    }
    this.setState({ columns: temp });
    temp = [];
  };
  ///***  to handle Form Inputs***
  handleFormInputs = (type, optionsList) => {
    var details = {};
    var temp2 = [];
    var temp = [];
    // for Addition Form Inputs
    for (var p in clinicalDB[type].modalAdditionForms) {
      for (var disease of optionsList) {
        var obj = {
          value: disease.id,
          text: disease.name + " (" + disease.abbreviation + " )",
        };
        temp2.push(obj);
      }
      console.log("options : ", temp2);
      this.setState({ options: temp2 });
      temp2 = [];

      temp.push(clinicalDB[type].modalAdditionForms[p]);
      details[clinicalDB[type].modalAdditionForms[p]["name"]] = "";
    }
    this.setState({
      ModalAddtionInputs: temp,
    });
    console.log("details for Addition: ", details);
  };

  async componentDidMount() {
    var type = this.props.type;
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!, " ,this.props.id)
    this.setState({ type });
    // put the options Inputs in options which got from jsonFile
    if(type === "familyHistory" || type === "surgeries" || type === "onGoingProblems" || type === "activeMedication"){
      var optionsList = await this.loadSelectInputData(type); 
      this.handleFormInputs(type, optionsList);
    }else{
      this.handleFormInputs(type, []);
    }
    if(type === 'allergy'){
      await this.getAllAlergies()
    }
    await this.handleDataTable(type);

    ////////////////////////////////// / * For Modal Forms Inputs *////////////////////////////
    ////////////////////////////////// / * setNew State With user attributes *////////////////////////////

    // to put user attributes in Component's state
    var newState = this.state;
    for (var property in clinicalDB[type].state) {
      newState[property] = "";
    }
    await this.getData(type);
  }

  handleClose = () => {
    this.setState({ openModal: false });
  };
  handleopenModal = () => {
    this.setState({ openModal: true });
  };
  // to set the Updated Object to get the old Value from thisa
  setUpdatedObj = (id) => {
    var obj = this.state.data.find((row) => row.id === id);
    this.setState({ typeObj: obj });
  };

  handleUpdate = async () => { // **** Change the EndPoint with the New One
    var details = {};

    for (var property in clinicalDB[this.state.type].state) {
      details[property] = this.state[property] || this.state.typeObj[property];
    }
    details["id"] = this.state.typeObj.id;

    console.log("details on update : ", details);

    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    console.log("formBody: ", formBody);
    await fetch(`${clinicalDB[this.state.type].updateUser}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: formBody,
    })
      .then(() => {})
      .catch(() => {
        console.log("errror");
      });

    this.getData(this.state.type);
  };
  handleDelete = async (id) => {
    var details = {
      id: id,
    };
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    await this.setState({loading:true})
    fetch(`${clinicalDB[this.state.type].deleteUser}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: formBody,
    })
      .then(() => {
        console.log("it is deleted");
      })
      .catch(() => {
        console.log("errror");
      });

    this.setState({
      loading:false,
      data: this.state.data.filter((row) => row.id !== id),
    });
  };
  // load data into Select input from DB
  loadSelectInputData = async (type) => {
    var temp = [];
    await axios
      .get(`${clinicalDB[type].getAllDiseases}`, {})
      .then(async (resp) => {
        console.log("resp : ", resp);
        console.log("AllData: ", resp.data);
        this.setState({ options: resp.data });

        temp = resp.data;
      });
    return temp;
  };
  getAllAlergies = async() => {
    let type = this.props.type
    let temp = [];
    for(var p in clinicalDB[type].modalAdditionForms ){
      temp.push(clinicalDB[type].modalAdditionForms[p])
    } 
    try {
      const {data} = await axios.get(`${clinicalDB[type].getAllergies}`)
      let options = []
      data.map(row=>{
        options.push({
          text : row.name,
          value : row.name
        })
      })
      temp.push({
        type : 'select',
        name : 'allergy',
        label : 'Allergy',
        options : options
      })
      await this.setState({ModalAddtionInputs:[...temp]})
    } catch (error) {
      alert(error)
    }
  }

  handleAdding = async () => { // **** Change the EndPoint with the New One
    var details = {};
    // for Addition Form Inputs
    for (var p in clinicalDB[this.state.type].state) {
      details[p] = this.state[p];
    }
    await this.setState({loading:true})

    details["ptId"] = this.props.id;
    console.log("details on Adding : ", details);
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    await fetch(`${clinicalDB[this.state.type].adding}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: formBody,
    })
      .then((resp) => {
        resp.json().then((data) => {
          console.log("Message From BackEnd: ", data);
        });
      })
      .catch(() => {
        console.log("errror");
      });
    await this.setState({loading:false})

    this.getData(this.state.type);
  };
  getData = async (type) => {

    await this.setState({loading:true})

    console.log("UserEndpoint: ", clinicalDB[type].getAll , this.props.id);
    await axios.post(`${clinicalDB[type].getAll}` , {
      ptId: this.props.id
    }).then(async (resp) => {
      this.setState({
        data: resp.data,
        temp: resp.data,
      });
      console.log("All Incoming Data in GetData Funciton : ", resp.data);
    });
    await this.setState({loading:false})

  };

  handleChange = (evt) => {
    // if it is autoComplete the Object will change it will contain the newValue 
    if (
      evt.text &&
      evt.text === "autoComplete" &&
      evt.newValue &&
      evt.newValue.value
    ) {
      console.log("evt: ", evt, "  Value :");
      this.setState({
        [evt.input]: evt.newValue.value,
      });
    } else {
      if (evt.target) { // to handle after deletion the choice from autoComplete input
        const value = evt.target.value;
        this.setState({
          [evt.target.name]: value,
        });
      }
    }
  };
componentWillUnmount(){
  this.setState({data :[]})
  this.setState({type : ""})
}
  render() {
    const tableData = {
      columns: this.state.columns,
      data: this.state.data,
    };

    return (
      <Container>
        <Spinner loading={this.state.loading}/>

        {console.log("modalAdditionInputs : " , this.state.ModalAddtionInputs)}


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

        <Row className = "py-3">
          <Col sm={12} className="py-3">
            <DataTableComp
              data={this.state.data}
              columns={this.state.columns}
              tableData={tableData}
              title=""
            />
          </Col>
        </Row>

        {this.state.formType === "add" &&
        this.state.ModalAddtionInputs &&
        this.state.ModalAddtionInputs.length > 0 ? (
          <ModalGenerator
            onHide={this.handleClose}
            show={this.state.openModal}
            formType={this.state.formType}
          > 
          {/*  for Addition Modal */}
            <FormGenerator
              ModalInputs={this.state.ModalAddtionInputs}
              handleChange={this.handleChange}
              handleUpdate={this.handleUpdate}
              handleAdding={this.handleAdding}
              options={this.state.options}
              formType={this.state.formType}
            />
          </ModalGenerator>
        ) : (
          // for Update
          <ModalGenerator
            onHide={this.handleClose}
            show={this.state.openModal}
            formType={this.state.formType}
          >
                  {/*  for Updating Modal */}
            <FormGenerator
              updatedTypeObj={this.state.typeObj}
              ModalInputs={this.state.ModalAddtionInputs}
              handleChange={this.handleChange}
              handleUpdate={this.handleUpdate}
              handleAdding={this.handleAdding}
              options={[]}
              formType={this.state.formType}
            />
          </ModalGenerator>
        )}
      </Container>
    );
  }
}

export default FamilyHistory;
