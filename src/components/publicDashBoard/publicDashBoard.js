import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Route, Switch,Link } from "react-router-dom";
import { useEffect ,useState} from 'react';
import { useHistory } from "react-router-dom";
import Appointement from '../../pages/newAppointments';
import ptRegistration from '../patientRegistration/ptRegistration';
import NurseVisit from "../nurseModule/nursemodule";
import Visit from "../Visit/visit";
import Profile from '../Profile/Profile';
import Prescription from "../Prescription/Prescription";
import PatientsOnVisit from "../nurseModule/patinetsOnVisit";
import AcceptOrders from './../orderGeneration/acceptOrders';
import AddOrderForm from "../orderGeneration/addOrderForm";
import AllOrders from './../orderGeneration/allOrders';
import { Col } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import ChoicePage from "./choice";
import EMR from "../EMR/emr";
import React from 'react';
import "./Navbar.css";
import Search from "../EMR/searchModule/search";
import Appointements from "../EMR/appointements";


const PublicDashBoard = ({match}) => {
  const history = useHistory();

const [ role , setRole] = useState("");
const MainFunctions = [ // Cards content and its role
    {text: "New Doctor Appointement" , role :["8"]},
    {text: "New patient registration" , role :["8" , "6"]},
    {text: "EMR Electronic Medical Records" , role :["8"]},
    {text: "Nursing Assessment" , role :["8" , "7"]},
    {text: "Lap Information System" , role :["2"]},
    {text: "Radiology Information System" , role :["3"]},
    {text: "Path information system " , role :["4"]},
    {text: "Electronic procreption ERX" , role :["13" , ""]},
    {text: "System Admin" , role :["admin"]},
    {text: "Document Manegment" , role :["" , ""]},
    
]


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
            else if( value.text == "Path Information System" && value.role.includes(role)){
              history.push(match.path+`/acceptOrders/${"pathology"}`);
            }
            else if( value.text == "Radiology Information System" && value.role.includes(role)){
              history.push(match.path+`/acceptOrders/${"radio"}`);
            }
            else if( value.text == "EMR Electronic Medical Records" && value.role.includes(role)){
              history.push(match.path+`/EMR`);
            }
          }}
          >
            <Card.Img variant="top" src={window.location.origin + '/images/img1.svg'} />
            <Card.Body className="text-secondary ">
              <Card.Title className="text-center">{value.text}</Card.Title>
            </Card.Body>
          </Card>
          
        </Col>
        )
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
            <Route exact path={match.path +"/choice/:type"} component = {ChoicePage} />
                
                            {/* AcceptOrders */}
            <Route exact path={match.path+"/choice/:type/acceptOrders"} component={AcceptOrders}/>
            
                          {/* All Orders */}
            <Route exact path={match.path+"/choice/:type/allLabOrders"} component={AllOrders}/>
            
                          {/* Add order Form */}
            <Route exact  path={match.path+"/acceptOrders/:type/choice/addOrder"} component={AddOrderForm}/>        

          
          </Switch>
      </div>
             
  );
}


export default PublicDashBoard;

