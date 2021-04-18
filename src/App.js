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
import PathologySignupFD from './components/Forms/signup_pathology_FD';
// import PathologistSignup from './components/Forms/pathologist_signup';
import FDDoctorSignup from './components/Forms/SignupDoctor_FD';
import SignupRadioFD from './components/Forms/Signupradio_FD';
import Assistant from './components/Users_CRUD/assistant.CURD';
import Chimest from './components/Users_CRUD/chemist_CRUD';
import DashBoardComp from './components/dashboardComp';
import {applyMiddleware , createStore } from "redux";
import {Provider} from "react-redux";
import promiseMW from "redux-promise"
import reducers from "./reducers";
import GetPassCatContainer from "./components/userprofile";

import thunk from 'redux-thunk';



function App() {
  const createStoreWithMDW = applyMiddleware(promiseMW)(createStore)
  return (
    <Provider store = {createStoreWithMDW(reducers)}>

    <Router>
          <Switch>
          <Route exact path="/forgetPassword" component={ForgotPasswordForm}></Route>
          <Route exact path="/forgetPasswordCode" component={ForgotPasswordCode}></Route>
          <Route exact path="/allergy" component={Allergy}></Route>
          <Route exact path="/disease" component={Disease}></Route>
          <Route exact path="/drug" component={Drug}></Route>
          <Route exact path="/GetPassCatContainer" component={GetPassCatContainer}></Route>
          <Route  path="/dashBoard" component={Navbar}>
            
               
          {/* <Route path='dashBoard/' component={SignupForm} />
          <Route path='/com' component={DashBoardComp} /> */}
               
              
          </Route>
          {/* <Route exact path="/appointement" component={Appointement}></Route> */}
          {/* <Route exact path="/drug" component={Drug}></Route> */}
          {/* <Route exact path="/DashBoard" component={DashBoard}></Route> */}
          {/* <Route exact path="/" component={SignupForm}></Route> */}
          <Route exact path="/login" component={LoginForm}></Route>
          <Route exact path="/Assistant" component={Assistant}></Route>
          {/* <Route exact path="/Assistant" component={Assistant}></Route> */}
          <Route exact path="/chimest" component={Chimest}></Route>
          <Route exact path="/DoctorSignup" component={DoctorSignup}></Route>
          <Route exact path="/NurseSignup" component={NurseSignup}></Route>
          <Route exact path="/ChemistSignup" component={ChemistSignup}></Route>
          <Route exact path="/pathologySignupFD" component={PathologySignupFD}></Route>
          <Route exact path="/loginPrivate" component={Private_Login_Form}></Route>
          <Route exact path="/AssistantSignup" component={AssistantSignup}></Route>
          <Route exact path="/radiogist_signup" component={RadiogistSignup}></Route>
          {/* <Route exact path="/Private_Login_Form" component={Private_Login_Form}></Route> */}
          <Route exact path="/LabSignup" component={LabSignup}></Route>
          {/* <Route exact path="/PathologySignup" component={PathologySignup}></Route> */}
          <Route exact path="/FDDoctorSignup" component={FDDoctorSignup}></Route>
          <Route exact path="/SignupRadioFD" component={SignupRadioFD}></Route>
          <Route exact path="/PathologistSignup" component={PathologistSignup}></Route>
          {/* <Route exact path="/dashBoard/com" component={DashBoardComp}></Route> */}
          
          
          {/* <Route exact path="/dashBoardCom" component={DashBoardComp}></Route> */}
          <Route exact path="*" component={Error}></Route>
        </Switch>
            
       

  
  </Router>
  </Provider>
  );
}

export default App;
