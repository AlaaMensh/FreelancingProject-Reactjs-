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
import DoctorSignup from './components/Forms/signUpDoctor';
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
// import AssistantSignup from './components/Forms/AssistantSignup';
// import Navbar from './components/Navbar';



//import PathologySignup from './components/Forms/signup_pathology_FD';
// import AssistantSignup from './../../../react-freelance-project/src/components/Forms/assistant_signup';



function App() {
  const createStoreWithMDW = applyMiddleware(promiseMW)(createStore)
  
  return (
    <Provider store = {createStoreWithMDW(reducers)}>
    <Router >
      
        <Switch>
      <Route exact path="/forgetPassword" component={ForgotPasswordForm}></Route>
      <Route exact path="/forgetPasswordCode" component={ForgotPasswordCode}></Route>
      
      <Route exact path="/allergy" component={Allergy}></Route>
      <Route exact path="/disease" component={Disease}></Route>
      <Route exact path="/drug" component={Drug}></Route>
{/*       
      <Route exact path="/dashBoard" component={DashBoard}></Route> */}
      <Route  path="/dashBoard" component={Navbar}></Route>
      <Route exact path="/appointement" component={Appointement}></Route>
      {/* <Route exact path="/drug" component={Drug}></Route> */}
      {/* <Route exact path="/DashBoard" component={DashBoard}></Route> */}
      {/* <Route exact path="/Assistant" component={Assistant}></Route> */}
      <Route exact path="/Assistant" component={Assistant}></Route>
      <Route exact path="/chimest" component={Chimest}></Route>
      <Route exact path="/doctor" component={Doctor}></Route>
      {/* <Route exact path="/doctorFD" component={}></Route> */}
      
      <Route exact path="/SignupRadioFD" component={RadioFDSignUp}></Route>
      <Route exact path="/SignupPathologyFD" component={PathologyFDSignUp}></Route>
      <Route exact path="/SignupLabFD" component={LabFDSignUp}></Route>
      <Route exact path="/SignupDoctorFD" component={DoctorFDSignUp}></Route>
      <Route exact path="/SignupRadiogist" component={RadiogistSignup}></Route>
      <Route exact path="/SignupPathologist" component={PathologistSignUp}></Route>
      <Route exact path="/NurseSignup" component={NurseSignup}></Route>
      <Route exact path="/DoctorSignup" component={DoctorSignup}></Route>
      <Route exact path="/ChemistSignup" component={ChemistSignup}></Route>
      <Route exact path="/AssistantSignup" component={AssistantSignup}></Route>
      <Route exact path="/" component={SignupForm}></Route>
      
      <Route exact path="/login" component={LoginForm}></Route>
      {/* <Route exact path="/pathologySignup" component={PathologistSignup}></Route> */}
      <Route exact path="/loginPrivate" component={Private_Login_Form}></Route>
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
      
      
      
      <Route exact path="/ptRegistration" component={ptRegistration}></Route>
      <Route exact path="**" component={Error}></Route>
    </Switch>
  
  </Router>
  </Provider>

  );
}

export default App;
