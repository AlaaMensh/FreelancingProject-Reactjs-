import './App.css';
// import Error from './pages/error';
// import logo from './logo.svg';

import {BrowserRouter as Router, Route, Switch } from "react-router-dom";


import {Provider} from "react-redux";


import TypesGenerator from "./components/typesGenerator/typesGenerator";
import AcceptOrders from "./components/orderGeneration/acceptOrders";
import AddOrderForm from "./components/orderGeneration/addOrderForm";
import ClinicalDashBoard from './components/ClinicalDashBoard/clinicalDashBoard';
import PublicDashBoard from './components/publicDashBoard/publicDashBoard';




function App() {

  // const createStoreWithMDW = applyMiddleware(promiseMW)(createStore)
  
  return (

    <Router>

      
      <Switch>
      <Route exact path="/AcceptOrders" component={AcceptOrders}></Route>
      <Route exact path="/typesGenerator" component={TypesGenerator}></Route>
      <Route exact path="/AddOrderForm" component={AddOrderForm}></Route>
      <Route  path="/clinicalDashBoard" component={ClinicalDashBoard}></Route>
      <Route  path="/publicDashBoard" component={PublicDashBoard}></Route>
      {/* <Route exact path="**" component={Error}></Route> */}
    </Switch>
  
  </Router>


  );
}

export default App;
