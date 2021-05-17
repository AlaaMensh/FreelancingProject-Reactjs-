import './App.css';

import {BrowserRouter as Router , Route, Switch } from "react-router-dom";

import {Provider} from "react-redux";


import TypesGenerator from "./components/typesGenerator/typesGenerator";
import AcceptOrders from "./components/orderGeneration/acceptOrders";
import AddOrderForm from "./components/orderGeneration/addOrderForm";
import ClinicalDashBoard from './components/ClinicalDashBoard/clinicalDashBoard';
import PublicDashBoard from './components/publicDashBoard/publicDashBoard';
import SignupList1 from './components/Forms/signUp/signUp';
import UserCrud from './components/userCrud/userCrud';
import Login from './components/Forms/login';
import Container from 'react-bootstrap/Container';
import NavBar from "./components/NavBar/navBar";
import {useState , useEffect} from "react";
import {useHistory} from "react-router-dom";
import Appointement from './pages/appointements';
import Profile from './components/Profile/Profile';



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
    
  const getAuthorization = (value) =>{

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
      <Route exact path="/AddOrderForm" component={AddOrderForm}></Route>
      <Route exact path="/Appointement" component={Appointement}></Route>
      <Route  path="/clinicalDashBoard" component={ClinicalDashBoard}></Route>
      <Route   path="/publicDashBoard" component={PublicDashBoard}></Route>
      <Route exact  path="/signUp/:type" component={SignupList1}></Route>
      <Route  path="/userCrud/:type" component={UserCrud}></Route>
      <Route  path="/profile" component={Profile}></Route>
      <Route path="/login">
        <Login getAuthorization={getAuthorization} history={history}/>
      </Route>
      {/* <Route exact path="**" component={Error}></Route> */}
    </Switch>
  
  </Router>


  );
}

export default App;

