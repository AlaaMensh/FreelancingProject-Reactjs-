import Allergy from './components/Types/allergy';
import Disease from './components/Types/disease';
import Navbar from './components/Navbar';
import Drug from './components/Types/drug';
import DashBoard from "./pages/DashBoard"
import Appointement from './pages/appointements';
import Error from './pages/error';
import logo from './logo.svg';
import './App.css';
import SignupForm from './components/Forms/signUpForm';
import ChemistSignup from './components/Forms/signUpChimest';
import LoginForm from './components/Forms/loginform';
import NurseSignup from './components/Forms/signUpNurse';
import FormGeneratorList1 from './components/Forms/formGeneratorList1';
import AssistantSignup from './components/Forms/signUpAssistant';
import PathologistFDSignUp from './components/Forms/singUpPathologist';
import RadiogistSignup from './components/Forms/signUpRadiogist';
import Private_Login_Form from './components/Forms/private_login_form';
import ForgotPasswordForm from './components/Forms/ForgotPasswordForm';
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ForgotPasswordCode from './components/Forms/ForgotPasswordCode';
import LabFDSignUp from './components/Forms/signUpLabFD';
import PathologyFDSignUp from './components/Forms/signUpPathologyFD';
import PathologistSignUp from './components/Forms/singUpPathologist';
// import PathologySignup from './components/Forms/pathologist_signup';
import DoctorFDSignUp from './components/Forms/signUpDoctorFD';
import RadioFDSignUp from './components/Forms/signUpRadioFD';
import Assistant from './components/Users_CRUD/Assistant';
import Chimest from './components/Users_CRUD/Chemist';
import Doctors from './components/Users_CRUD/Doctor';
import Pathologist from './components/Users_CRUD/pathologist_CURD';
import Nurse from './components/Users_CRUD/nurse_CRUD';
import Radiogist from './components/Users_CRUD/radiogist_CURD';
import ptRegistration from './components/patientRegistration/ptRegistration';
import {applyMiddleware , createStore } from "redux";
import {Provider} from "react-redux";
import promiseMW from "redux-promise"
import reducers from "./reducers";
import Doctor from './components/Users_CRUD/Doctor';
import Visit from './components/Visit/visit';
import OrderLabList from './components/Orders/orderLabList';
import LabOrder from './components/Orders/order_lab';
import PatientLabOrders from './components/Orders/patientLabsData';
import PathologyOrder from './components/Orders/orderPathology';
import RadioOrder from './components/Orders/orderRadio';
import PatientPathologyData from './components/Orders/patientPathologyData';
import PatientRadioOrders from './components/Orders/patientRadioData';
import OrderPathologyList from './components/Orders/orderPathologyList';
import OrderRadioList from './components/Orders/orderRadioList';
import ClinicalDashBoard from './components/ClinicalDashBoard/clinicalDashBoard';
import NurseVisit from './components/nurseModule/nursemodule';
import ChangePassword from "./components/Forms/changePassword"
import UserWelcomePage from "./pages/newUserWelcomPage";
import NotAuthorized from "./pages/notAuthorized";
import TableGenerator from "./components/Types/tableGenerator";
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useState, useHistory } from 'react';
import DoctorSignup from "./components/Forms/signUpDoctor"
import Prescription from "./components/Prescription/Prescription";
import Profile from "./components/Profile/Profile";
import Search from "./components/searchModule/search";



function App() {

  const createStoreWithMDW = applyMiddleware(promiseMW)(createStore)
  
  return (
    <Provider store = {createStoreWithMDW(reducers)}>
    <Router>

      
        <Switch>
      <Route exact path="/forgetPassword" component={ForgotPasswordForm}></Route>
      <Route exact path="/forgetPasswordCode" component={ForgotPasswordCode}></Route>
      <Route exact path="/changePassword" component={ChangePassword}></Route>
      
      <Route exact path="/allergy" component={Allergy}></Route>
      <Route exact path="/disease" component={Disease}></Route>
      <Route exact path="/drug" component={Drug}></Route>
{/*       
      <Route exact path="/dashBoard" component={DashBoard}></Route> */}
      <Route  path="/dashBoard" component={Navbar}></Route>
      <Route  path="/clinicalDashBoard" component={ClinicalDashBoard}></Route>
      
      <Route exact path="/appointement" component={Appointement}></Route>
      
      <Route exact path="/Assistant" component={Assistant}></Route>
      <Route exact path="/chimest" component={Chimest}></Route>
      <Route exact path="/doctor" component={Doctor}></Route>
      <Route exact path="/nurse" component={Nurse}></Route>
      {/* <Route exact path="/doctorFD" component={}></Route> */}
      
      <Route exact path="/SignupRadioFD" component={RadioFDSignUp}></Route>
      <Route exact path="/SignupPathologyFD" component={PathologyFDSignUp}></Route>
      <Route exact path="/SignupLabFD" component={LabFDSignUp}></Route>
      <Route exact path="/SignupDoctorFD" component={DoctorFDSignUp}></Route>
      
      <Route exact path="/SignupRadiogist" component={RadiogistSignup}></Route>
      <Route exact path="/SignupPathologist" component={PathologistSignUp}></Route>
      <Route exact path="/NurseSignup" component={NurseSignup}></Route>
      {/* form Generator for Doctor..nurse..chemist */}
      {/* <Route exact path="/DoctorSignup" component={FormGeneratorList1}></Route> */}
      <Route exact path="/DoctorSignup" component={DoctorSignup}></Route>
      <Route exact path="/ChemistSignup" component={ChemistSignup}></Route>
      <Route exact path="/AssistantSignup" component={AssistantSignup}></Route>
      <Route exact path="/" component={SignupForm}></Route>
      
      <Route exact path="/login" component={LoginForm}></Route>
      {/* <Route exact path="/pathologySignup" component={PathologistSignup}></Route> */}
      <Route exact path="/loginPrivate" component={Private_Login_Form}></Route>
      
      
      <Route exact path="/welcomePage" component={UserWelcomePage}></Route>
      {/* <Route exact path="/radiologistSignUp" component={RadiogistSignup}></Route> */}
      {/* <Route exact path="/Private_Login_Form" component={Private_Login_Form}></Route> */}
      {/* <Route exact path="/LabSignup" component={LabSignup}></Route> */}
      {/* <Route exact path="/PathologySignup" component={PathologySignup}></Route> */}
      {/* <Route exact path="/FDDoctorSignup" component={FDDoctorSignup}></Route> */}
      {/* <Route exact path="/PathologySignupFD" component={PathologySignupFD}></Route> */}
      <Route exact path="/Doctors" component={Doctors}></Route>
      <Route exact path="/Nurse" component={Nurse}></Route>
      <Route exact path="/Pathologist" component={Pathologist}></Route>
      <Route exact path="/Radiogist" component={Radiogist}></Route>
  
      
      {/* for patient Registration */}
      <Route exact path="/ptRegistration" component={ptRegistration}></Route>
      
      <Route exact path="/visit" component={Visit}></Route>
      <Route exact path="/prescription" component={Prescription}></Route>
     
     {/* for lab orders */}
      <Route exact path="/labOrder" component={LabOrder}></Route>
      <Route exact path="/LabOrderForm" component={PatientLabOrders}></Route>
      <Route exact path="/orderLabList" component={OrderLabList}></Route>
    
    
    {/* for pathology orders */}
      <Route exact path="/pathologyOrder" component={PathologyOrder}></Route>
      <Route exact path="/pathologyOrderForm" component={PatientPathologyData}></Route>
      <Route exact path="/orderPathologyList" component={OrderPathologyList}></Route>
      
      
      {/* for radio orders */}
      <Route exact path="/radioOrder" component={RadioOrder}></Route>
      <Route exact path="/radioOrderForm" component={PatientRadioOrders}></Route>
      <Route exact path="/orderRadioList" component={OrderRadioList}></Route>
     
      <Route exact path="/nurseVisit" component={NurseVisit}></Route>
      <Route exact path="/tableGenerator" component={TableGenerator}></Route>
      
      <Route exact path="/notAuthorized" component={NotAuthorized}></Route>
      
      <Route exact path="/profile" component={Profile}></Route>
      <Route exact path="/search" component={Search}></Route>
      
      <Route exact path="**" component={Error}></Route>
    </Switch>
  
  </Router>
  </Provider>

  );
}

export default App;
