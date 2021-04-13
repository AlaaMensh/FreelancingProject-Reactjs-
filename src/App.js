import logo from './logo.svg';
import './App.css';
import SignupForm from './components/Forms/signupform';
import ForgotPasswordForm from './components/Forms/ForgotPasswordForm';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ForgotPasswordCode from './components/Forms/ForgotPasswordCode';
import Allergy from './components/Types/allergy';
import Navbar from './components/Navbar';
import drug from './components/Types/drug';


function App() {
  return (
    <Router>
   <div className="">
    <Switch>
      <Route exact path="/" component={SignupForm}></Route>
      <Route exact path="/forgetPassword" component={ForgotPasswordForm}></Route>
      <Route exact path="/forgetPasswordCode" component={ForgotPasswordCode}></Route>
      <Route exact path="/allergy" component={Allergy}></Route>
      <Route exact path="/drug" component={drug}></Route>
      <Route exact path="/DashBoard" component={Navbar}></Route>
    </Switch>
   </div>
   <div>
   <div className="App">
      {/* <SignupForm /> */}
      {/* <ForgotPassword /> */}
    </div>
   </div>
  </Router>

  );
}

export default App;
