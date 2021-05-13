import React, { Component } from 'react';
import ModalComp from "./typesGenerator/modalGenerator";
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
    if(this.props.fromComponent === "choice"){
      this.handleSubmitForChoice()
    }
    else{
      this.handleSubmitForVisit()
    }

  }
  //from public DashBoard ==> choice page
  handleSubmitForChoice = () =>{ ///*** Edit the Endpoint when Abdo Finish it */
    console.log("submittttteeedddd" , this.props) ;
    this.props.history.push(this.props.history.location.pathname+`/acceptOrders`)
    // var details = {
    //   ptId: id,
    //   userId : this.state.userID 
    //   }
   

    // console.log("formBody:  " , details)

    // var formBody = [];
    // for (var property in details) {
    //   var encodedKey = encodeURIComponent(property);
    //   var encodedValue = encodeURIComponent(details[property]);
    //   formBody.push(encodedKey + "=" + encodedValue);
    // }
    // formBody = formBody.join("&");
    // console.log("formBody:  " , formBody)

    // fetch('http://localhost:3000/session/addSession', {
    //   method: 'POST',
    //    headers: {
    //      'Content-Type': 'application/json'
    //    },
    //   body: JSON.stringify(details)
    // }).then((resp)=>{
    //   resp.json().then((data)=>{
    //     // if(data == true){
    //     //   history.push("/")
    //     // }
    //   })
    // }).catch(()=>{
    //   console.log("errror")
    // }) 
  }
  // from Visit component
  handleSubmitForVisit = () =>{ ///*** edit it when adding sessionCode in Visit Module */

    // var details = {
    //   ptId: id,
    //   userId : this.state.userID 
    //   }
   

    // console.log("formBody:  " , details)

    // var formBody = [];
    // for (var property in details) {
    //   var encodedKey = encodeURIComponent(property);
    //   var encodedValue = encodeURIComponent(details[property]);
    //   formBody.push(encodedKey + "=" + encodedValue);
    // }
    // formBody = formBody.join("&");
    // console.log("formBody:  " , formBody)

    // fetch('http://localhost:3000/session/addSession', {
    //   method: 'POST',
    //    headers: {
    //      'Content-Type': 'application/json'
    //    },
    //   body: JSON.stringify(details)
    // }).then((resp)=>{
    //   resp.json().then((data)=>{
    //     // if(data == true){
    //     //   history.push("/")
    //     // }
    //   })
    // }).catch(()=>{
    //   console.log("errror")
    // })
  }

  render() { 
    const tableData = {
      columns:this.state.columns,
      data :this.state.data
    };
 
    return (
      <>
        {
          this.props.body ?(
            <div style={{cursor:"pointer"}} onClick={()=>{
              this.handleopenModal()
            }}>
            {this.props.body}
            </div>
          ):(
            <button  className="btn btn-primary" hidden={this.props.hidden} style={{display: this.props.hidden ? "none" :"block"}}
            onClick={() => {  
                  this.handleopenModal()
              }}>{this.props.buttonValue}</button>
          )
        }
     

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