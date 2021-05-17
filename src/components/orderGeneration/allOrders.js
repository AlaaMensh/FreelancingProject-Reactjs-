import React, { useState, useEffect } from 'react';
import  { Component } from 'react';
import DataTableComp from '../typesGenerator/dataTable';
import orderType from "../ordersdb.json";
import ModalComp from "../typesGenerator/modalGenerator";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

var object  = {}

class AllOrders extends Component {
  constructor(props) {
    super(props);
    
    this.state = { 
      orderlabList : [],
      orderType : 0,
      type:"",
      flagCompoenentType : true, // for patientID ==> false //***OR***//  for LabID ==>true
      modalUploadResultInputs :[],
      openModal:false,
      typeObj:{},
      formType:"uploadResult"

          }
        }
        
        getTypeByID = async(id) => { // to set object which will be updated
          console.log("dkkdkdkdkdkdkdkdkdk:    ")
        
          const labObj = this.state.orderlabList.filter(lab => lab.id === id);
          console.log("typeObj : " , labObj[0])
          this.setState({
            typeObj:labObj[0]
          })
        }
  
  
     handleClose = () => {
      this.setState({openModal : false})
    };
    handleopenModal = () => {
      this.setState({openModal : true})
    };

    getData = async (flag ,type) => {
      var endPoint = "";
      console.log("orderType: " , type)
      if(!flag){ // for PatientID and only Accepted Orders
        console.log("yessssssssssssssssssssss");
        var details = {
          ptId:this.props.match.params.id,
          type:this.state.orderType,
          labId : localStorage.getItem("labId")
         }
         endPoint = `${orderType[type].getAllOrdersByPtID}`;
      }
      else{ // for LabId
        console.log("hhhhhhhhhhhhhhhhhhhhhhhh")
        endPoint = `${orderType[type].getAllOrdersByLabId}`
        var details = {
          labId:localStorage.getItem("labId")
         }

      }

       var formBody = [];
       for (var property in details) {
         var encodedKey = encodeURIComponent(property);
         var encodedValue = encodeURIComponent(details[property]);
         formBody.push(encodedKey + "=" + encodedValue);
       }
       formBody = formBody.join("&");
   
   
       await fetch(`${endPoint}`, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
         },
         body: formBody
       }).then(async(resp)=>{
         resp.json().then(async(data)=>{
           console.log("DataList :  " , data)
            this.setState({orderlabList: data});
       
         })
       }).catch(()=>{
         console.log("error Getting Here")
       })
      
    }
 
    handleDelete= async(id)=>{
      var details = {
        id:id
      }
      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      
      fetch(`${orderType[this.state.type].deleteOrder}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
      }).then(()=>{
        console.log("it is deleted");
      }).catch(()=>{
        console.log("errror")
      })
      this.setState({
        orderlabList: this.state.orderlabList.filter(row => row.id !== id)
       })
        
    }

   async componentDidMount(){

    var flag = false;
     console.log("propsppppppppppp:  " , this.props.match.params.id)
     
     this.setState({type : this.props.match.params.type});
     
     
     
     if(this.props.match.params.id){ // for PatientId
      console.log("yes here is it ")
      this.setState({flagCompoenentType : false});
      flag = false;
      this.setState({ptId : this.props.match.params.id});
    }
    else{
      console.log("no it it is not")
      this.setState({flagCompoenentType : true});
      flag = true;
    }
    var Object = ""
    if(flag){
      object = "columnsTable"; // to get Data with First Name and lastName of the patient for all orders of LabId
    }
    else{
      object = "columnsTableForPatientOrders";// to get Data without First Name and lastName for PatientId
    }
    this.handleTableColumnsForAllAcceptedOrders(this.props.match.params.type , object)
     
     this.setState({drId : localStorage.getItem("userId")});
     
     
     if(this.props.match.params.type != "lab"){
      this.setState({labID : 1})
     }


      this.setState({type : this.props.match.params.type});
     switch(this.props.match.params.type){
         case "lab":
             this.setState({orderType : 0})
             break;
         case "radio":
             this.setState({orderType : 1})
             break;
         case "pathology":
             this.setState({orderType : 2})
             break;
     }

    await this.getData(flag , this.props.match.params.type)

    }
  
    handleUpdate = async ()=>{  // Upload files Using updateOrder function

      var details = {} ;
      for(var p in orderType[this.state.type].state){
        details[p] = this.state.typeObj[p];
      }
      details["id"] = this.state.typeObj["id"];
      details["drId"] = this.state.typeObj["drId"];
      details["ptId"] = this.state.typeObj["ptId"];

      var Form = new FormData();
      for(var p in details){
        Form.append(p , details[p])
      }

      Form.append("result" ,this.state.result )
      
      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");

      console.log("formBody: ", details)
      await fetch(`http://localhost:3000/${this.state.type}/updateOrder`, {
        method: 'POST',
        body: Form
      }).then((resp)=>{
        console.log("Getting: " , resp);
        resp.json().then((data)=>{
        })
      }).catch(()=>{
        console.log("errror")
      })
      // //  var allergyObj = this.state.orderlabList.filter(row => row.id === this.state.TypeObj.id);
      // this.getData(this.state.flagCompoenentType , this.props.match.params.type )
         
    }


    // type(lab - pathology - radio)
    // object for columns for patient orders **OR**  for all Orders by LabId 
    // and this object from OrdersDB.json
    
    handleTableColumnsForAllAcceptedOrders = (type , object) => { 
      
      var temp = []
      for(var p in orderType[type][object] ){
        if(p === "actions"){
          orderType[type].columnsTable[p]["cell"] =  (row) =>{ return(
          <div className = "row">
            <div className="col-auto">
              <button  className="btn btn-primary"
                onClick={() => {  
                  console.log("rooooow : " , row)
                    console.log("id:  " , row)
                    this.handleopenModal();
                    this.getTypeByID(row.id);
                  }}>
                    Upload Result
                    </button>
              <button className="ml-2 btn btn-danger"
                  onClick = {() => {  
                    // console.log("rooooow : " , row)
                      console.log("id:  " , row)
                      this.handleDelete(row.id);
                    }}>
                      Delete
                      </button>
            </div>
          
          </div>
          )
          }
          temp.push(orderType[type].columnsTable[p])
        }
        else{
  
          temp.push(orderType[type].columnsTable[p])
        }
      }
      this.setState({columns : temp})
      temp = []
      var newState = this.state;
      for(var property in orderType[type].state ){
        newState[property] = "" 
      }
      this.setState({newState})
  
      // if the page Will Contain modal
      for(var p in orderType[type].uploadResultForm ){
        temp.push(orderType[type].uploadResultForm[p])
      } 
      // // console.log("temp : "  , temp)
      this.setState({modalUploadResultInputs : temp})
  

  }

   

    rendering = () => {
        return(

<Container fluid>

<Row className= "py-3">
    <Col>
        <h3>{this.state.type} Orders</h3>
        <div>From here you can see and update all of the accepted orders</div>
    </Col>
</Row>

<Row className= "py-3" >
   <Col>
                <DataTableComp  data = {this.state.orderlabList}
                  columns = {this.state.columns}
                  title= "All Accepted Orders for Your Lab" 
                />
                {console.log("inputs: " , this.state.formType)}
            </Col> 
            {
              this.state.modalUploadResultInputs && this.state.modalUploadResultInputs.length > 0 &&(
                <ModalComp show={this.state.openModal}
                  onHide={this.handleClose}
                  ModalInputs={this.state.modalUploadResultInputs}
                  updatedTypeObj = {this.state.typeObj}
                  handleChange = {this.handleChange}
                  handleUpdate = {this.handleUpdate}
                  handleAdding={this.handleAdding}
                  formType = {this.state.formType}
                />
              ) 
            }
            {/* for Plus Icon */}
            {/* if We Want to Add Order */}
              <div className="row mt-4">
                    {/* <Fab color="primary" aria-label="add" className ={this.props.classes.iconPlus} onClick = {()=>{
                       console.log("hhhhhhhh:  " , this.props.location.pathname)
                       this.props.history.push(`${this.props.location.pathname}/addOrder`)
                        }}>
                          <AddIcon  />
                        </Fab>                       */}
                      </div>
                    </Row>
        
    </Container>
        )
    }


    handleChange = (e) => {
      console.log("value : " , e.target.files[0])
      this.setState({result: e.target.files[0]});

    }


    render() { 
      const { classes } = this.props;
        
  return (
    <div className="hero">
        {this.rendering()}
    </div>
 
  );
    }
}
 
export default AllOrders; 