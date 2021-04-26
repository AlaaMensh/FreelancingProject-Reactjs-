import Allergy from './components/Types/allergy';
import Disease from './components/Types/disease';
import Navbar from './components/Navbar';
import Drug from './components/Types/drug';
import DashBoard from "./pages/DashBoard"
import Appointement from './pages/appointements';
import Error from './pages/error';
import logo from './logo.svg';
import './App.css';
import SignupForm from './components/Forms/signupform';
import ChemistSignup from './components/Forms/chemist_signup';
import LoginForm from './components/Forms/loginform';
import NurseSignup from './components/Forms/nurse_signup';
import DoctorSignup from './components/Forms/Doctor_signup';
import AssistantSignup from './components/Forms/assistant_signup';
import PathologistSignup from './components/Forms/pathologist_signup';
import RadiogistSignup from './components/Forms/radiogist_signup';
import Private_Login_Form from './components/Forms/private_login_form';
import ForgotPasswordForm from './components/Forms/ForgotPasswordForm';
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ForgotPasswordCode from './components/Forms/ForgotPasswordCode';
import LabSignup from './components/Forms/Signup_lab_FD';
import PathologySignup from './components/Forms/pathologist_signup';
// import PathologySignup from './components/Forms/pathologist_signup';
import FDDoctorSignup from './components/Forms/SignupDoctor_FD';
import SignupRadioFD from './components/Forms/Signupradio_FD';
import Assistant from './components/Users_CRUD/assistant.CURD';
import Chimest from './components/Users_CRUD/chemist_CRUD';
import Doctors from './components/Users_CRUD/Doctors_CRUD';
import Pathologist from './components/Users_CRUD/pathologist_CURD';
import Nurse from './components/Users_CRUD/nurse_CRUD';
import Radiogist from './components/Users_CRUD/radiogist_CURD';



//import PathologySignup from './components/Forms/signup_pathology_FD';



function App() {
  return (
    <Router >
      <div className="roo container--fluid " style={{paddingBottom:"9em"}} >
        <div className="row" style ={{height : "100%"}}>
        <Switch>
      <Route exact path="/forgetPassword" component={ForgotPasswordForm}></Route>
      <Route exact path="/forgetPasswordCode" component={ForgotPasswordCode}></Route>
      
      <Route exact path="/allergy" component={Allergy}></Route>
      <Route exact path="/disease" component={Disease}></Route>
      <Route exact path="/drug" component={Drug}></Route>
      
      <Route exact path="/dashBoard" component={DashBoard}></Route>
      
      <Route exact path="/appointement" component={Appointement}></Route>
      {/* <Route exact path="/drug" component={Drug}></Route> */}
      {/* <Route exact path="/DashBoard" component={DashBoard}></Route> */}
      {/* <Route exact path="/Assistant" component={Assistant}></Route> */}
      <Route exact path="/Assistant" component={Assistant}></Route>
      <Route exact path="/chimest" component={Chimest}></Route>
      
      <Route exact path="/login" component={LoginForm}></Route>
      <Route exact path="/" component={SignupForm}></Route>
      <Route exact path="/DoctorSignup" component={DoctorSignup}></Route>
      <Route exact path="/NurseSignup" component={NurseSignup}></Route>
      <Route exact path="/ChemistSignup" component={ChemistSignup}></Route>
      <Route exact path="/pathologySignup" component={PathologistSignup}></Route>
      <Route exact path="/loginPrivate" component={Private_Login_Form}></Route>
      <Route exact path="/AssistantSignup" component={AssistantSignup}></Route>
      <Route exact path="/radiogist_signup" component={RadiogistSignup}></Route>
      {/* <Route exact path="/Private_Login_Form" component={Private_Login_Form}></Route> */}
      {/* <Route exact path="/LabSignup" component={LabSignup}></Route> */}
      {/* <Route exact path="/PathologySignup" component={PathologySignup}></Route> */}
      <Route exact path="/FDDoctorSignup" component={FDDoctorSignup}></Route>
      <Route exact path="/SignupRadioFD" component={SignupRadioFD}></Route>
      <Route exact path="/PathologySignup" component={PathologySignup}></Route>
      <Route exact path="/Doctors" component={Doctors}></Route>
      <Route exact path="/Nurse" component={Nurse}></Route>
      <Route exact path="/Pathologist" component={Pathologist}></Route>
      <Route exact path="/Radiogist" component={Radiogist}></Route>
      <Route exact path="/FDLabSignup" component={LabSignup}></Route>
      <Route exact path="**" component={Error}></Route>
    </Switch>
        </div>
        <div className="row aaaaa" style={{height :"100%"}}>
          
        </div>
      </div>
  
  </Router>

  );
}

export default App;
