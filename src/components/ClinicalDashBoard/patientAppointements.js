import React, { Component } from 'react';
import appointements from '../appointements.json';
import ModalComp from "../typesGenerator/modalGenerator";
import axios from 'axios';
import DataTableComp from "../typesGenerator/dataTable";
import AddIcon from '@material-ui/icons/Add';
import SessionCode from "../sessionCode";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
class UserCrud extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      columns:[] ,
      openModal:false,
      ModalInputs : [] ,
      data:[],
      temp:[],
      typeObj : {},
      type:"",
      formType:"add",
      addingUserObject : {},
      updateAppointementObject : {},
      validRole:false, // if false ==> not Doctor or DoctorFD , if true ==> Doctor OR DoctorFD
      check : "", //which send to back ==>drId OR ==> drFDId,
      past :[], //for past appointements
      future:[], // for Future appointements
     }
  }

  handleClose = () => {
    this.setState({openModal : false})
  };
  handleopenModal = () => {
    this.setState({openModal : true})
  };

  setUpdatedObj = (id)=>{
    var obj =  this.state.data.find(row => row.id === id)
    // console.log("obj: " , obj);
    this.setState({typeObj : obj});
  }

  handleUpdate = async()=>{

    var details = {}

    for(var property in  this.state.updateAppointementObject){ 
      details[property] = this.state[property] || this.state.typeObj[property]; 
    }
    console.log("details on update : " ,  details)
    details["id"] = localStorage.getItem("userId");
    details["appId"] = this.state.typeObj.id;
    details["check"] = this.state.check;


    
    var formBody = [];
    // property is already declared so ??
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

          console.log("formBody: ",formBody)
          await fetch(`${appointements[this.state.type].updateAppointements}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody
          }).then(()=>{
            console.log("it is inserted");
          }).catch(()=>{
            console.log("errror")
          })
             this.getData(this.state.type)
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
    // formBody = formBody.join("&");
    
    fetch(`${appointements[this.state.type].deleteAppointements}`, {
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
      data: this.state.data.filter(row => row.id !== id)
     })
      
  }
  handleAdding = async()=>{
   
    var details = {}
    for(var p in this.state.addingUserObject ){ // for Addition Form Inputs
      details[p] = this.state[p]
    } 
    console.log("details on update : " ,  details)
    console.log("detilaas : " , details)

    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    // console.log("formging:     " , formBody)
    
await fetch(`${appointements[this.state.type].addAppointement}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    }).then(()=>{
      console.log("it is inserted");
    }).catch(()=>{
      console.log("errror")
    })
    this.getData(this.state.type);
  }
  getData = async(type)=>{

    await axios.post(`${appointements[type].getAllAppointements}`,{
       ptId:this.props.match.params.id
    }).then(async resp => {
              var dateNow1 = new Date();

          var d = new Date(dateNow1),
          mnth = ("0" + (dateNow1.getMonth() + 1)).slice(-2),
          day = ("0" + dateNow1.getDate()).slice(-2);
          var dateNow2 = [dateNow1.getFullYear(), mnth, day].join("-");

        var res = resp.data.filter(element => {
          if(element.date < dateNow2){
            return element;
          }
        });

        await this.setState({past : res})
        console.log("reeessssssssssssssss: " , res);

        var future = resp.data.filter(element => {
          if(element.date > dateNow2){
            return element;
          }
        });
        this.setState({future : future});
        console.log("reeessssssssssssssss: " , future);
       this.setState({  
          data : resp.data,
      })
      console.log("resp.data: " , resp.data);
    
    })
    
  }
  checkRole = () =>{
    if(parseInt(localStorage.getItem("role")) != 8 && parseInt(localStorage.getItem("role")) != 2){
      this.setState({validRole : true});
     }
     else{
      console.log("jjjjjjjjjjjjjj") 
       this.setState({validRole: false})
     }
     if(parseInt(localStorage.getItem("role")) == 8){
       this.setState({check : "drId"});
     }
     else{
      this.setState({check : "drFDId"});
     }

  }

  async componentDidMount(){
  var type="ForPatient";
    await this.checkRole()
    this.setState({type});
    var temp = [];
    
    for(var p in appointements[type].columnsTable ){ // for Adding actions Buttons to DataTable
      if(p === "actions"){
        appointements[type].columnsTable[p]["cell"] =  (row) =>{ return(
        <Row>
          <Col sm={10}>
            <Button  variant="primary"
              // hidden={this.compareTimeForEditButton(row.date,row.startDate )}
              style={{display :this.compareTimeForEditButton(row.date,row.startDate) ?"none" : "block" }}
              onClick={async () => {  
                // console.log("rooooow : " , row)
                  // cnsole.log("id:  " , row)
                  await this.setUpdatedObj(row.id);
                  this.setState({formType :"edit"})
                  this.handleopenModal()
                }}>Update</Button>
          </Col>
        <Col>
        <Button  variant="btn-danger"
              onClick={() => {
                  this.handleDelete(row.id)
                }}>Delete
        </Button>
        </Col>
        <Col>

        <SessionCode hidden={this.compareTimeForEditButton(row.date,row.startDate)}
        buttonValue="Make Visit" fromComponent="appointement"/>
        </Col>
        
        </Row>
        )
        }
        temp.push(appointements[type].columnsTable[p])
      }
      else{

        temp.push(appointements[type].columnsTable[p])
      }
    }
    this.setState({columns : temp})
    temp = []

////////////////////////////////// / * ForAddition *////////////////////////////
var details = {}
    for(var p in appointements[type].modalAdditionForms ){ // for Addition Form Inputs
      temp.push(appointements[type].modalAdditionForms[p])
      console.log("here: " ,appointements[type].modalAdditionForms[p]["name"] )
  
      details[appointements[type].modalAdditionForms[p]["name"]] = ""
    } 
    this.setState({
      ModalAddtionInputs : temp,
      addingUserObject : details
    })
    console.log("details for Addition: " , details)
    
    

    
// ////////////////////////////////// / * ForUpdate *////////////////////////////
    temp = [];
      details = {}
    for(var p in appointements[type].modalUpdateForms ){  // for Update Form Inputs
      temp.push(appointements[type].modalUpdateForms[p])
      details[appointements[type].modalUpdateForms[p]["name"]] = ""
    } 
    this.setState({
      ModalInputs : temp,
      updateAppointementObject : details
    })
    console.log("details for updating: " , details)


////////////////////////////////// / * setNew State With user attributes *////////////////////////////
    var newState = this.state;
    for(var property in appointements[type].state ){ // to put user attributes in Component's state
      newState[property] = "" 
    }
    
    await this.getData(type);
  }


      compareTimeForEditButton = (date , startTime ) =>{
     
      var appDate2 = date;
      var dateNow1 = new Date();
    
      var d = new Date(dateNow1),
          mnth = ("0" + (dateNow1.getMonth() + 1)).slice(-2),
          day = ("0" + dateNow1.getDate()).slice(-2);
          var dateNow2 = [dateNow1.getFullYear(), mnth, day].join("-");

      
        if (appDate2 === dateNow2)
        {
          var time2 = dateNow1.getHours() +":" + dateNow1.getMinutes() +":"+ dateNow1.getSeconds()
          console.log("time1 " , time2 , "time2: " , startTime);
          if(startTime > time2){
            console.log("not Accepted....");
            return true
          }

        }
        else if (appDate2 < dateNow2){
          return true
        }
        else{
          return false;
        }

    }

  handleChange = (evt) =>{
    const value = evt.target.value;
    this.setState({
      [evt.target.name]: value
    });
  }
  render() { 
    const tableData = {
      columns:this.state.columns,
      data :this.state.data
    };
 
    return (
      < Container>
        {console.log("updateObject: " , this.state.updateUserObject)}
        {console.log("additionObject: " , this.addingUserObject)}
        <Row className=" align-items-center"  style={{margin:"auto"}}>
          <Button className="col-auto" variant="primary" aria-label="add"  onClick = {()=>{
                   this.setState({formType :"add"})
                  this.handleopenModal();
                }}>
                  <AddIcon />
            </Button> 
        <DataTableComp   data = {this.state.data}
                  columns = {this.state.columns}
                  tableData = {tableData}
                  title= {this.state.type === "ForPatient" ?"All Patient Appointements" :""}
         />
         </Row>
         <Row calssName="mt-5">
        <DataTableComp   data = {this.state.past}
                  columns = {this.state.columns}
                  tableData = {tableData}
                  title= {this.state.type === "ForPatient" ?"All Past Appointements" :""}
         />
         </Row>
         <Row calssName="mt-5">
        <DataTableComp   data = {this.state.future}
                  columns = {this.state.columns}
                  tableData = {tableData}
                  title= {this.state.type === "ForPatient" ?"All Future Appointements" :""}
         />
      </Row>
     {  
      this.state.formType === "add" && this.state.ModalAddtionInputs &&this.state.ModalAddtionInputs.length > 0 ?(
        <ModalComp show={this.state.openModal}
        onHide={this.handleClose}
        ModalInputs={this.state.ModalAddtionInputs}
        updatedTypeObj = {this.state.typeObj}
        handleChange = {this.handleChange}
        handleUpdate = {this.handleUpdate}
        handleAdding={this.handleAdding}
        formType = {this.state.formType}
       />
       ):(
        <ModalComp show={this.state.openModal}
        onHide={this.handleClose}
        ModalInputs={this.state.ModalInputs}
        updatedTypeObj = {this.state.typeObj}
        handleChange = {this.handleChange}
        handleUpdate = {this.handleUpdate}
        handleAdding={this.handleAdding}
        formType = {this.state.formType}
       />
       )
     }
      </ Container>
    );
  }
}
 
export default UserCrud;