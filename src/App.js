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






function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("role"));
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
  const getAuthorization = (value) =>{
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
      <Route  path="/clinicalDashBoard" component={ClinicalDashBoard}></Route>
      {/* <Route   path="/publicDashBoard" component={PublicDashBoard}></Route> */}
      <Route exact path="/login">
        <Login getAuthorization={getAuthorization} history={history}/>
      </Route>
      <ProtecteRoute Guard={isLoggedIn()} path="/publicDashBoard" component={PublicDashBoard}/>
      <Route exact  path="/signUp/:type" component={SignupList1}></Route>
      <Route  path="/userCrud/:type" component={UserCrud}></Route>
      <Route  path="/profile" component={Profile}></Route>
      {/* <Route exact path="**" component={Error}></Route> */}
    </Switch>
  
  </Router>


  );
}

export default App;

