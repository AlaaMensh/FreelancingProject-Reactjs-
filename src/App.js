import logo from './logo.svg';
import './App.css';
import SignupForm from './components/Forms/signupform';
import ForgotPasswordForm from './components/Forms/ForgotPasswordForm';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ForgotPasswordCode from './components/Forms/ForgotPasswordCode';
import Allergy from './components/Types/allergy';
import Navbar from './components/Navbar';
<<<<<<< HEAD
import Drug from './components/Types/drug';
=======
import DashBoard from "./pages/DashBoard"
import Appointement from './pages/appointements';
import Error from './pages/error';
>>>>>>> e3570cdb6037ca1f2af0660d836a984e72c31c5c


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
<<<<<<< HEAD
      <Route exact path="/drug" component={Drug}></Route>
      <Route exact path="/DashBoard" component={Navbar}></Route>
=======
      <Route exact path="/appointement" component={Appointement}></Route>
      {/* <Route exact path="/drug" component={Drug}></Route> */}
      <Route exact path="/DashBoard" component={DashBoard}></Route>
      <Route exact path="**" component={Error}></Route>
>>>>>>> e3570cdb6037ca1f2af0660d836a984e72c31c5c
    </Switch>
        </div>
        <div className="row">
          
        </div>
      </div>
  
  </Router>

  );
}

export default App;
