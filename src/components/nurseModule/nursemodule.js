import React, { Component } from 'react';
import "./nursemodule.css";
import nurseModule from "../nurseDB.json";
import DataTableComp from "../typesGenerator/dataTable";
import ModalComp from "../typesGenerator/modalGenerator";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ModalGenerator from './../ModalGeneration/modalGeneration';
import AdditionVital from './additionVitalForm';
import axios from "axios";




class NurseVisit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeDate:[],
            openModal:false ,
            pId:"",
            columns:[],
            ModalAddtionInputs :[],
            type : "", //from JsonFile in nurseModule json File
            options :[] 
          }
    }
    loadSelectInputData = async(type) => {
      var temp = [];
      await axios.get(`${nurseModule[type].getAllData}` ,{
      } ).then(async resp => {
        console.log("resp : " ,resp)
        console.log("AllData: " , resp.data);
        this.setState({options : resp.data});
        
      temp =  resp.data;
      })
      return temp
    }
    async componentDidMount(){
      var type = "nurseVitals";
      this.setState({type});
      console.log("parmas.:   ",  this.props.match.params.id)
      this.setState({pId : this.props.match.params.id}); // set here the patientId from the url 
      this.handleDataTableColumns(type);
      var optionsList = await this.loadSelectInputData(type);
      console.log("optionsList: " , optionsList)

      this.handleFormModuleInput(type , optionsList);
      this.handleState(type);
      await this.getLastVisits(type);
     
    }
    handleState = (type) =>{
      var newState = this.state;
      for(var property in nurseModule[type].state ){ // to put nurseVisit attributes in Component's state
        newState[property] = "" 
      }
    }
    handleChange = (evt)=>{
      if(evt.text && evt.text === "autoComplete" ){   
        this.setState({
          [evt.input]: evt.newValue.value,
        });
      }
      else{
        if(evt.target){
          console.log("evt.target.name: " , evt.target.name)
          const value = evt.target.value;
          this.setState({
            [evt.target.name]: value,
          });
        }
      }
    }
    handleDataTableColumns = (type) =>{
      var temp = [];
      for(var p in nurseModule[type].columnsTable ){ // for Adding actions Buttons to DataTable
        if(p === "actions"){
          nurseModule[type].columnsTable[p]["cell"] =  (row) =>{ return(
          <div className = "row">
            <div className="col-auto">
              <button  className="btn btn-danger"
                onClick={async () => {  
                  this.handleDelete(row.id);
                  }}>Delete</button>
            </div>
          
          </div>
          )
          }
          temp.push(nurseModule[type].columnsTable[p])
        }
        else if(p === "time"){
          nurseModule[type].columnsTable[p]["cell"] =  (row) =>{ return(
          <div className = "row">
            <div className="col-auto">
            <p className="span">{row.date}</p>
               <p className="span">{row.time}</p>
            </div>
          
          </div>
          )
          }
          temp.push(nurseModule[type].columnsTable[p])
        }
        else if(p === "systolic"){
          nurseModule[type].columnsTable[p]["cell"] =  (row) =>{ return(
          <div className = "row">
            {console.log("rooowowwww:  " , row)}
            <div className="col-auto">
              {/* <h1>hhhh</h1> */}
              {/* { row.systolic } */}
            {row.systolic }<span>/</span>
               {row.systolic }
            </div>
          
          </div>
          )
          }
          temp.push(nurseModule[type].columnsTable[p])
        }
        else{
  
          temp.push(nurseModule[type].columnsTable[p])
        }
      }
      this.setState({columns : temp})
      temp = []
    }
    handleFormModuleInput = (type , optionsList) =>{
      var temp = [];

    
      for(var p in nurseModule[type].modalAdditionForm ){ // for Adding actions Buttons to DataTable
        var temp2 = [];
        if (p === "takenBy") { // adding all
          for(var nurse of optionsList){
            var obj =null;
            obj = {value : nurse.id , firstName : nurse.firstName  ,  secondName : nurse.secondName ,  lastName : nurse.lastName }
            temp2.push(obj);
          }
          console.log("options : " , temp2)
          this.setState({options : temp2})
          temp2=[]
        }
        temp.push(nurseModule[type].modalAdditionForm[p]);
  
      }
      this.setState({ModalAddtionInputs : temp})
    }
    handleDelete =(id) =>{
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
      
      fetch(`${nurseModule[this.state.type].deleteVital}`, {
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
        timeDate: this.state.timeDate.filter(row => row.id !== id)
       })
    }

    func2=()=>{
      var d = new Date();
      var time = d.getHours()+":"+(d.getMinutes()+1)
            var obj2 = {
            id:0,
            date:this.getDate(),
            time :time,
            temp:"",
            pulse:"" , 
            // bloodPressure: "",
            systolic : "" ,
            diastolic:"",
            OXSat:"" ,
            takenBy:localStorage.getItem("userId"),
            bloodGlucose :""
        }
        var joined = this.state.timeDate.concat(obj2);
        this.setState({ timeDate: joined });
    }
 
    sorting =()=>{
      var Temp = []
      this.state.timeDate.map((time, index)=>{
        
        if(time.id == 0 )
          {
            console.log("yes" , time)
            var obj = {
              id : 0,
              date : time.date,
              time : time.time,
              temp : time.temp,
              pulse : time.pulse, 
              // bloodPressure:time.systolic +"/"+time.diastolic,
              systolic  : time.systolic  ,
              diastolic : time.diastolic ,
              OXSat : time.OXSat,
              takenBy:localStorage.getItem("userId"),
              bloodGlucose : time.bloodGlucose
         }
          }
        if(time.id == -1 )
          {
            console.log("yes" , time)
            var obj = {
              id : 1,
              date : time.date,
              time : time.time,
              temp : time.temp,
              pulse : time.pulse, 
              // bloodPressure: time.systolic + "/"+ time.diastolic,
              systolic  : time.systolic  ,
              diastolic : time.diastolic ,
              OXSat : time.OXSat,
              takenBy:localStorage.getItem("userId"),
              bloodGlucose:time.bloodGlucose
         }
          }
         if(time.id >= 1){
            console.log("yes" , time)
                var obj = {
                id : index+2,
                date : time.date,
                time : time.time,
                temp : time.temp,
                pulse : time.pulse, 
                // bloodPressure :  time.systolic +"/" + time.diastolic,
                systolic  : time.systolic  ,
                diastolic : time.diastolic ,
                OXSat : time.OXSat,
                takenBy:localStorage.getItem("userId"),
                bloodGlucose:time.bloodGlucose 
           }         
         }
         time = obj
         Temp.push(time)
      })
      this.setState({timeDate : Temp})
    }
    getTime = () =>{
      var d = new Date();
      var time = d.getHours()+":"+d.getMinutes()
      return (time);
    }
    getLastVisits = async(type)=>{
      var details = {
        ptId : this.props.match.params.id
      }
      var formBody = [];
          for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
          }
          formBody = formBody.join("&");
         
         await fetch(`${nurseModule[type].getPatientLastVisits}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            
            body: formBody
          }).then((resp)=>{
            console.log("Getting: " , resp);
            resp.json().then((data)=>{
              console.log("ddddddddddddddddd;  " , data)
              var d = new Date();
              var time = d.getHours()+":"+(d.getMinutes()+1)
              var obj2 = {
                id:0,
                date:this.getDate(),
                time : time,
                temp:"",
                pulse:"" , 
                // bloodPressure:"",
                systolic :"",
                diastolic :"",
                respiratoryRate: "" ,
                OXSat:"" ,
                height:"" , 
                weight:"" ,
                BMI :"" ,
                pain:"",
                smokingStatus: "" ,
                headC : "",
                takenBy:""

            }
            var joined = data.concat(obj2);
            // this.setState({ timeDate: joined });
            console.log("joined: " , joined)

              this.setState({
                timeDate:joined
              })
              
              // object = data
            })
          }).catch(()=>{
            console.log("errror")
          })
    }
    handleAddition = async()=>{
          var details = {
            date: this.getDate(),
            time: this.getTime(),
            // systolic :this.state.systolic ,
            // diastolic :this.state.diastolic,
            pulse: this.state.pulse,
            temperature:this.state.temp,
            oxygenSaturation: this.state.OXSat,
            bloodGlucoseLevel:this.state.bloodGlucose,
            nurseId:localStorage.getItem("userId"),
            ptId:this.state.pId,
            bloodPressure : this.state.systolic + "/" +this.state.diastolic 
            // takenBy : this.state.takenBy 
          }

          console.log("details On Adding : " , details)
          var formBody = [];
          for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
          }
          formBody = formBody.join("&");
         
          await fetch(`${nurseModule[this.state.type].addVital}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody
          }).then((resp)=>{
            console.log("Getting: " , resp);
            resp.json().then((data)=>{
              console.log("ddddddddddddddddd;  " , data[0])
        
            })
          }).catch(()=>{
            console.log("errror")
          })
        const items = await this.state.timeDate.map(
            (item ) => item.id === 0 ? {
            id:-1,
            date: this.getDate(),
            time: this.getTime(),
            temp:this.state.temp,
            pulse: this.state.pulse,
            systolic : this.state.systolic ,
            diastolic: this.state.diastolic,
            OXSat: this.state.OXSat,
            takenBy:this.state.takenBy,
            bloodGlucose:this.state.bloodGlucose,
            // bloodPressure : this.state.systolic +"/"+ this.state.diastolic
            }: item
          );
          // console.log("obj: " , obj);
          this.setState({timeDate : items});
          await this.func2()
          await this.sorting();
          // await this.sortAfterAdding();

    }

    handleopenModal = () => {
        this.setState({openModal : true})
      };
    
    handleClose = () => {
    this.setState({openModal : false})
  };
  

  getDate = ()=>{
    var d = new Date();
    var date = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
    return date
    }


    rendering = () => {
      return(
        <Container >
        <Row className= "py-3">
         {console.log("timeDateeee :" , this.state.timeDate)} 
        <Col>
            {
              nurseModule && this.state.type && (
                <>
                  <h3>{nurseModule[this.state.type].title}</h3>
                  <div>{nurseModule[this.state.type].description}</div>
                </>
              )
            }
        </Col>
    </Row>
    <Row className= "py-3" >
      <Col sm={10}></Col>
          <Col sm={2}><Button variant="success"  onClick = {()=>{
             this.setState({formType :"add"})
            this.handleopenModal();
          }}>Add New</Button>{' '}</Col>
      </Row>
      <Row>
        <Col>
        <DataTableComp data = {this.state.timeDate} 
        columns={this.state.columns}
        title = ""
        /></Col>

      </Row>
        </Container>
        
      )
    }
 
    render() { 
   
        return (
    <div className="container" style={{ height: 400, width: '100%' }}>
      {console.log("hereeeee : ",this.state.columns)}
      {console.log("state : ",this.state)}
          {this.rendering()}
       {/* <Fab color="primary" aria-label="add"  onClick = {()=>{
                          this.handleopenModal()
                        }} >
            <AddIcon  />
        </Fab>  */}
        {
       this.state.ModalAddtionInputs &&this.state.ModalAddtionInputs.length > 0 && (
        <ModalGenerator  onHide={this.handleClose} show={this.state.openModal}   formType={this.state.formType}> 
          <AdditionVital 
          ModalInputs={this.state.ModalAddtionInputs}
          handleChange={this.handleChange}
          handleUpdate={this.handleUpdate}
          handleAdding={this.handleAddition}
          formType={this.state.formType} 
          options = {this.state.options}
          from = "nurseModule" />
       
        </ModalGenerator>
      //   <ModalComp show={this.state.openModal}
      //   onHide={this.handleClose}
      //   ModalInputs={this.state.ModalAddtionInputs}
      //   updatedTypeObj = {this.state.typeObj}
      //   handleChange = {this.handleChange}
      //   handleUpdate = {this.handleUpdate}
      //   handleAdding={this.handleAddition}
      //   formType = {this.state.formType}
      //  />
       )
     }
    </div>
          );
    }
}
 
export default NurseVisit;
