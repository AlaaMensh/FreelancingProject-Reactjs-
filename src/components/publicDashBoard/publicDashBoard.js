import React, { useEffect, useState } from 'react';
import { Card, Col } from 'react-bootstrap';
import { Route, Switch, useHistory } from "react-router-dom";
import Appointement from '../../pages/newAppointments';
import Appointements from "../EMR/appointements";
import EMR from "../EMR/emr";
import Search from "../EMR/searchModule/search";
import NurseVisit from "../nurseModule/nursemodule";
import PatientsOnVisit from "../nurseModule/patinetsOnVisit";
import AddOrderForm from "../orderGeneration/addOrderForm";
import ptRegistration from '../patientRegistration/ptRegistration';
import Prescription from "../Prescription/Prescription";
import Profile from '../Profile/Profile';
import Visit from "../Visit/visit";
import AcceptOrders from './../orderGeneration/acceptOrders';
import AllOrders from './../orderGeneration/allOrders';
import ChoicePage from "./choice";
import "./Navbar.css";
import PharmacyModule from "../pharmacyModule/pharmacyModule";
import SessionCode from "../sessionCode";



const PublicDashBoard = ({match}) => {
  const history = useHistory();

const [ role , setRole] = useState("");
const MainFunctions = [ // Cards content and its role
    {text: "New Doctor Appointement" , role :["8"]},          //doctor
    {text: "New patient registration" , role :["8" , "6"]},   //doctor and our GP
    {text: "EMR Electronic Medical Records" , role :["8"]},   // doctor
    {text: "Nursing Assessment" , role :["8" , "7"]},         // nurse and doctor
    {text: "Lap Information System" , role :["3"]},           // lab FD
    {text: "Radiology Information System" , role :["4"]},     // radio
    {text: "Path information system" , role :["5"]},         // pathology
    {text: "Electronic procreption ERX" , role :["13" , "8"]}, //doctor or pharmacist
    {text: "System Admin" , role :["admin"]},
    {text: "Document Manegment" , role :["" , ""]},
    
]
const renderBodyForSessionCode = (value, role) =>{
  return (
  
            <Card className="bg-light"  
            style={{height:"15em" ,cursor : value.role.includes(role)?"pointer":"not-allowed" }}
            >
              <Card.Img variant="top" src={window.location.origin + '/images/img1.svg'} />
              <Card.Body className="text-secondary ">
                <Card.Title className="text-center">{value.text}</Card.Title>
              </Card.Body>
            </Card>
            
       
        )
}


  useEffect(()=>{ // set role with localStorage and check if logged in user is patient or not
    var localStorageRole = parseInt(localStorage.getItem("role"));
    setRole(parseInt(localStorageRole))

    if(localStorageRole == 1){ // if it is patient go to unauthorized page
      history.push("/notAuthorized");
    }
    console.log("Role in Public DashBoard" , localStorage.getItem("role"));
    
 },[localStorage.getItem("role")]);

  // Render DashBoar Cards 
   const renderMainCards = ()=>{  
     var role = localStorage.getItem("role"); // to check  the card's authontication by this
     return MainFunctions.map((value,index) => { // Map cards Contents
      if(value.text === "Electronic procreption ERX" && parseInt(role) === 13){
        return(
          <SessionCode buttonValue = "get patient Orders"
          fromComponent={"pharmacy"} 
          history = {history}
          body={renderBodyForSessionCode(value , role)}/>
          )
      }
      else{
        return(   
          <Col xs={10} md={4} lg={3} className="my-4 ">
            <Card className="bg-light"  
            style={{height:"15em" ,cursor : value.role.includes(role)?"pointer":"not-allowed" }}
            onClick={()=>{
              if(value.role.includes(role) && value.text === "New Doctor Appointement"){
                history.push(match.path+"/appoint");
              }
              else if(value.role.includes(role) && value.text == "New patient registration"){
                history.push(match.path+"/ptRegistration");
              }
            
              else if( value.text == "Nursing Assessment" && value.role.includes(role)){
                history.push(match.path+"/patientsOnVisit");
              }
              else if( value.text == "Lap Information System" && value.role.includes(role)){
                history.push(match.path+`/choice/${"lab"}`);
              }
              else if( value.text === "Path information system" && value.role.includes(role)){
                history.push(match.path+`/pathologyChoice/${"pathology"}`);
              }
              else if( value.text == "Radiology Information System" && value.role.includes(role)){
                history.push(match.path+`/acceptOrders/${"radio"}`);
              }
              else if( value.text == "EMR Electronic Medical Records" && value.role.includes(role)){
                history.push(match.path+`/EMR`);
              }
              else if( value.text == "Electronic procreption ERX" && value.role.includes(role)){
                history.push(match.path+`/pharmacyModule`);
              }
            }}
            >
              <Card.Img variant="top" src={window.location.origin + '/images/img1.svg'} />
              <Card.Body className="text-secondary">
                <Card.Title className="text-center">{value.text}</Card.Title>
              </Card.Body>
            </Card>
            
          </Col>
          )
      }
    
      }
     )
   }

  return (

      <div className="container">
        
        {/* Switch the DashBoard Routing */}
          <Switch>  
            <Route exact path={match.path} >
              <div className="row mt-4 justify-content-center">
                {renderMainCards()}
              </div>
            </Route> 

            <Route exact path={match.path+"/appoint"}  component={Appointement}/> 
            <Route exact path={match.path +"/patientsOnVisit"} component = {PatientsOnVisit} />
            <Route exact path={match.path +"/patientsOnVisit/nurseVisit/:id"} component = {NurseVisit} />
            <Route exact path={match.path +"/appoint/visit/:id"} component = {Visit} />
            <Route exact path={match.path +"/appoint/visit/:id/prescription/:visitId"} component = {Prescription} />
            <Route exact path={match.path +"/profile"} component = {Profile} />
          
                                  {/* ***EMR**** */}
            <Route exact path={match.path+"/EMR"}  component={EMR}/> 
            <Route exact path={match.path+"/EMR/search"}  component={Search}/> 
            <Route exact key = {1} path={match.path+"/EMR/Futureappointements/:type"}  component={Appointements}/> 
            <Route exact key = {2}  path={match.path+"/EMR/currentAppointements/:type"}  component={Appointements}/> 
            
            <Route exact path={match.path+"/ptRegistration"} component={ptRegistration}/>
            <Route exact path={match.path+"/nurseVisit"} component={NurseVisit}/>
            <Route  path={match.path+"/appoint/visit"} component={Visit}/>
            
                      {/* choose if you want single patient orders or all lab Orders */}
            <Route key={15} exact path={match.path +"/choice/:type"} component = {ChoicePage} />
            <Route key={5} exact path={match.path +"/pathologyChoice/:type"} component = {ChoicePage} />
            <Route key={25} exact path={match.path +"/radioChoice/:type"} component = {ChoicePage} />
                
                            {/* AcceptOrders */}
            <Route exact path={match.path+"/choice/:type/acceptOrders"} component={AcceptOrders}/>
            <Route exact path={match.path+"/pathologyChoice/:type/acceptPathologyOrders"} component={AcceptOrders}/>
            <Route exact path={match.path+"/radioChoice/:type/acceptRadioChoices"} component={AcceptOrders}/>
            
                          {/* All Orders */}
            <Route key={13} exact path={match.path+"/choice/:type/allLabOrders"} component={AllOrders}/>
            <Route key={14} exact path={match.path+"/pathologyChoice/:type/allPathologyOrders"} component={AllOrders}/>
            <Route key={12} exact path={match.path+"/radioChoice/:type/allRadioChoice"} component={AllOrders}/>
                          
                          {/* Add order Form */}
            <Route key={17}  path={match.path+"/choice/:type/allLabOrders/addOrder"} component={AddOrderForm}/>
            <Route key={18} exact path={match.path+"/pathologyChoice/:type/allPathologyOrders/addOrder"} component={AddOrderForm}/>
            <Route key={19} exact path={match.path+"/radioChoice/:type/allRadioChoice/addOrder"} component={AddOrderForm}/>

              
                            {/* PharmacyModule   */}
            <Route exact  path={match.path+"/pharmacyModule"} component={PharmacyModule}/>        
            <Route exact  path={match.path+"/pharmacyModule/prescription"} component={Prescription}/>        

          
          </Switch>
      </div>
             
  );
}


export default PublicDashBoard;

