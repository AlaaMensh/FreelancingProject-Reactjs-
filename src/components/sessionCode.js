import React, { Component } from 'react';
import ModalComp from "./typesGenerator/modalGenerator";
import { Card, Col } from 'react-bootstrap';
import axios from 'axios';



class SessionCode extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      columns:[] ,
      openModal:false,
      ModalAddtionInputs : [
          
              {
            "type": "text",
            "name" : "code"
                }
      ] ,
      style:{
        marginTop :"3em"
      }
     }
  }

  handleClose = () => {
    this.setState({openModal : false})
  };
  handleopenModal = () => {
    this.setState({openModal : true})
  };

  async componentDidMount(){}

  handleChange = (evt) =>{

    const value = evt.target.value;
    console.log("value : "  , value)
    this.setState({
      [evt.target.name]: value
    });
  }
  handleSubmit = () =>{
    if(this.props.fromComponent === "choice"){ // from Orders
      this.handleSubmitForChoice()
    }
    else if(this.props.fromComponent==="visit"){
      this.handleSubmitForVisit()
    }
    else if(this.props.fromComponent==="appointement"){
      this.handleSubmitForVisit()
    }
    else{
      this.handleSubmitForpharmacy()
    }

  }
  //from public DashBoard ==> choice page
  handleSubmitForChoice = () =>{ ///*** Edit the Endpoint when Abdo Finish it */
    console.log("submittttteeedddd" , this.props) ;
    if(this.props.orderType === "lab"){
      this.props.history.push({
        pathname : `${this.props.history.location.pathname}/acceptOrders`,
        state: this.state.code
      })
    }
    else if(this.props.orderType === "pathology"){
      this.props.history.push({
        pathname : `${this.props.history.location.pathname}/acceptPathologyOrders`,
        state: this.state.code
      })
    }
    else{
      this.props.history.push({
        pathname : `${this.props.history.location.pathname}/acceptRadioOrders`,
        state: this.state.code
      })
    }
    
  }
  // from Visit component
  handleSubmitForVisit = () =>{ ///*** edit it when adding sessionCode in Visit Module */
    console.log("here: " , this.props);
     axios.post(`https://mvb1.herokuapp.com/autho/getPtId`,{
      ptCode:this.state.code
   }).then(async resp => {
            console.log("resp.data : " , resp.data);
            this.props.history.push({
              pathname : `${this.props.history.location.pathname}/visit`,
              state: resp.data.id
            })
   })



  }
  handleSubmitForpharmacy = () =>{
    this.props.history.push({
      pathname : `${this.props.history.location.pathname}/PharmacistPharmacyModule`,
      state: this.state.code
    })
  }
  rendering = () =>{
    switch(this.props.fromComponent){
      case "appointement":{
        return (
          <button  className="btn btn-primary" hidden={this.props.hidden} style={{display: this.props.hidden ? "none" :"block"}}
          onClick={() => {  
                this.handleopenModal()
            }}>{this.props.buttonValue}</button>
        )
      }
      case "visit" :{
        return (
          <button  className="btn btn-primary" hidden={this.props.hidden} style={{display: this.props.hidden ? "none" :"block"}}
            onClick={() => {  
                  this.handleopenModal()
              }}>{this.props.buttonValue}</button>
        )
      }
      case "pharmacy" :{
        return (
          <Col xs={10} md={4} lg={3} className="my-4" onClick={()=>{
            this.handleopenModal()
          }}>
          {this.props.body}
          </Col>
        )
      }
      case "choice" :{
        return (
          <div  style={{cursor:"pointer"}} onClick={()=>{
            this.handleopenModal()
          }}>
          {this.props.body}
          </div>
        )
      }
    }

  }

  render() { 
    const tableData = {
      columns:this.state.columns,
      data :this.state.data
    };
    
 
    return (
      <>
      {this.rendering()}
      {/* {
        this.props.fromComponent === "pharmacy" && (
          <Col xs={10} md={4} lg={3} className="my-4" onClick={()=>{
            this.handleopenModal()
          }}>
          {this.props.body}
          </Col>
        )
      }
        {
          
          this.props.body && this.props.fromComponent === "appointement" && (
            <div  style={{cursor:"pointer"}} onClick={()=>{
              this.handleopenModal()
            }}>
            {this.props.body}
            </div>
          )
        }
        {
          !this.props.body && this.props.fromComponent !== "pharmacy"(
            <button  className="btn btn-primary" hidden={this.props.hidden} style={{display: this.props.hidden ? "none" :"block"}}
            onClick={() => {  
                  this.handleopenModal()
              }}>{this.props.buttonValue}</button>
          )
        } */}
     

     {
       this.state.ModalAddtionInputs &&this.state.ModalAddtionInputs.length > 0 &&(
        <ModalComp show={this.state.openModal}
        onHide={this.handleClose}
        ModalInputs={this.state.ModalAddtionInputs}
        updatedTypeObj = {this.state.typeObj}
        handleChange = {this.handleChange}
        handleAdding={this.handleSubmit}
        formType = {"Enter Code"}
        value ="Submit"
       
       />
       )
     }
      </>
    );
  }
}
 
export default SessionCode;