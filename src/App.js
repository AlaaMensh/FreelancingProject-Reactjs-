import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import './App.css';
import ClinicalDashBoard from './components/ClinicalDashBoard/clinicalDashBoard';
import Login from './components/Forms/login';
import SignupList1 from './components/Forms/signUp/signUp';
import NavBar from "./components/NavBar/navBar";
import AddOrderForm from "./components/orderGeneration/addOrderForm";
import Profile from './components/Profile/Profile';
import PublicDashBoard from './components/publicDashBoard/publicDashBoard';
import TypesGenerator from "./components/typesGenerator/typesGenerator";
import UserCrud from './components/userCrud/userCrud';
import ProtecteRoute from './guards/ProtectedRoute';
import Appointement from './pages/appointements';
import ChangePassword from "./components/Forms/changePassword";
import ForgotPasswordForm from './components/Forms/ForgotPasswordForm';
import ForgotPasswordCode from './components/Forms/ForgotPasswordCode';
import ErrorHandeling from "./components/ErrorHandling/errorHandeling";
import ptRegistration from "./components/patientRegistration/ptRegistration";
import AllOrders from "./components/orderGeneration/addOrderForm";
import UserWelcomePage from "./pages/newAppointments";





function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("role"));
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
    const history = useHistory();

    useEffect (()=>{
      if(localStorage.getItem("role")){
        setLoggedIn(true);
      }
        else{
          setLoggedIn(false);
        }

    },[localStorage.getItem("role")])
  const isLoggedIn = ()=>{
    return localStorage.getItem("userId")?true:false
  }  
  const getAuthorization = (value , userName) =>{
console.log("value from App: " , value)
    setLoggedIn(value);
  } 
  const logout = (value) =>{

    setLoggedIn(false)
  }
  console.log("App: " , history)

  return (

    <Router>
      <div className="container--fluid">
        <NavBar isAuth={loggedIn} logout={logout}/>
      </div>
      <Switch>
      <Route exact path="/typesGenerator" component={TypesGenerator}  ></Route>
      <Route exact path="/addOrderForm" component={AddOrderForm}  ></Route>
      <Route exact path="/AddOrderForm" component={AddOrderForm}></Route>
      <Route exact path="/Appointement" component={Appointement}></Route>
      {/* <Route  path="/clinicalDashBoard" component={ClinicalDashBoard}></Route> */}
      <ProtecteRoute Guard={isLoggedIn()} path="/clinicalDashBoard/:id" component={ClinicalDashBoard}/>
      {/* <Route   path="/publicDashBoard" component={PublicDashBoard}></Route> */}
      <Route exact path="/login">
        <Login getAuthorization={getAuthorization} history={history}/>
      </Route>
      <ProtecteRoute Guard={isLoggedIn()} path="/publicDashBoard" component={PublicDashBoard}/>
      <ProtecteRoute Guard={isLoggedIn()} path="/profile" component={Profile}/>
      <Route exact  path="/signUp/:type" component={SignupList1}></Route>
      <Route  path="/userCrud/:type" component={UserCrud}></Route>

      <Route exact path="/forgetPassword" component={ForgotPasswordForm}></Route>
      <Route exact path="/forgetPasswordCode" component={ForgotPasswordCode}></Route>
      <Route exact path="/changePassword" component={ChangePassword}></Route>
      
      <Route exact path="/errorHandeling" component={ErrorHandeling}></Route>
      
      <Route exact path="/ptRegistration" component={ptRegistration}></Route>
      
      
      <Route exact path="/AllOrders" component={AllOrders}></Route>
      
      
      <Route exact path="/welcomePage" component={UserWelcomePage}></Route>

      {/* <Route  path="/profile" component={Profile}></Route> */}
      {/* <Route exact path="**" component={Error}></Route> */}
    </Switch>
  
  </Router>


  );
}

export default App;

