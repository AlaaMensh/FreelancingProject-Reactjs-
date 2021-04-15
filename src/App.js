import logo from './logo.svg';
import './App.css';
import SignupForm from './components/Forms/signupform';
import ForgotPasswordForm from './components/Forms/ForgotPasswordForm';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ForgotPasswordCode from './components/Forms/ForgotPasswordCode';
import Allergy from './components/Types/allergy';
import Navbar from './components/Navbar';
import Drug from './components/Types/drug';
import DashBoard from "./pages/DashBoard"
import Appointement from './pages/appointements';
import Error from './pages/error';
import Assistant_signup from './components/Forms/signupform'


function App() {
  return (
    <Router >
      <div className="container--fluid ">
        <div className="row">
        <Switch>
      <Route exact path="/" component={SignupForm}></Route>
      <Route exact path="/forgetPassword" component={ForgotPasswordForm}></Route>
      <Route exact path="/forgetPasswordCode" component={ForgotPasswordCode}></Route>
      <Route exact path="/allergy" component={Allergy}></Route>
      <Route exact path="/drug" component={Drug}></Route>
      <Route exact path="/" component={Assistant_signup}></Route>
      <Route exact path="/DashBoard" component={Navbar}></Route>
      <Route exact path="/appointement" component={Appointement}></Route>
      {/* <Route exact path="/drug" component={Drug}></Route> */}
      <Route exact path="/DashBoard" component={DashBoard}></Route>
      <Route exact path="**" component={Error}></Route>
    </Switch>
        </div>
        <div className="row">
          
        </div>
      </div>
  
  </Router>

  );
}
//asd
export default App;
