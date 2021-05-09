
import Button from '@material-ui/core/Button';

import MenuItem from '@material-ui/core/MenuItem';

import Select from '@material-ui/core/Select';
import { useDispatch } from 'react-redux'


import React from 'react';
import clsx from 'clsx';
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import { useEffect } from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { useHistory } from "react-router-dom";
// import "./Navbar.css";
import CardMedia from '@material-ui/core/CardMedia';
import { BrowserRouter as Router, Route, Switch,Link } from "react-router-dom";
// import DashBoard from "../pages/DashBoard"
import Appointement from '../../pages/appointements';
import DashBoardComp from "../dashboardComp";
import { BrowserRouter } from 'react-router-dom';
// import Signup from './Forms/signUpForm';
// import {useRoutes} from 'hookrouter';
// import DashBoardComp from "./dashboardComp";
// import Navbar from './Navbar';
// import DashBoard from './../pages/DashBoard';
import { useState } from 'react';
// import LoginForm from './Forms/loginform';
import { connect } from "react-redux";
import { bindActionCreators } from "redux"; 
import {handleChangeOpen,setChangeOpen } from "../../actions";
import { useSelector } from 'react-redux'
// import PaientRegistration from './patientRegistration/importatntInfo';
// import ptRegistration from './patientRegistration/ptRegistration';
import OnGoingProblemStep from './patientOnGoingProblems';
import "./index.css";
import AllergyProblems from "./Allergy";
import UserInfo from "./userInfo";
import onGoingProblemStep from '../patientRegistration/onGoingProblemStep';
import DashBoard from './../../pages/DashBoard';
import PatientAppointement from './patientAppointements';
import OrderLabListForPt from '../OrdersForPatient/orderLabListForPatient';
import OrderPathologyForPatient from '../OrdersForPatient/orderPathologyForPatient';
import OrderRadioListForPt from '../OrdersForPatient/orderRadioForPatient';
// import LabOrder from '../OrdersForPatient/LabOrder';
import LabOrder from './../Orders/order_lab';
import OrderGeneration from '../OrdersForPatient/orderGeneration';
import AdditionOrderForm from '../OrdersForPatient/additionOrderForm';
import Visit from '../Visit/visit';
import Prescription from "../Prescription/Prescription";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width:"100%"
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
      
    }),
    backgroundColor: "#648695",
    // padding: "0.4em",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
   
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  loginLogoutButton : {
    backgroundColor: "transparent",
    border: "1px solid #fff",
    transitions:"all 0.4s",
    color: '#fff',
    '&:hover': {
      backgroundColor: '#9fb8c3',
    
  },
  },
  cardStyle:{
    width:"90%",
    height:"auto",
    borderRadius:"1em",
    padding:"1em"
    // display:"flex",
    // backgroundColor:"yellow"
  },
  media: {
    height: 50,
    margin:"1em",
    padding:"3em 1em"
  },
  cardContentHeight:{
    height: 80,
    // backgroundColor:"yellow"
  },
  button:{  

  },
  learnMoreBtn:{
    padding:"0.5em 2em",
    backgroundColor:"transparent",
    border:"2px solid #9fb8c3",
    boxShadow:"2px 2px 9px #bcb4b4",
    '&:hover': {
      backgroundColor: '#9fb8c3',
  },
  },
  GridSpacing:{
    // padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(1),
    },
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(4),
    },
    [theme.breakpoints.up('lg')]: {
      margin: theme.spacing(1),
    },
  }
  
    
}));

const ClinicalDashBoard = ({match}) => {
  const history = useHistory();
  const [spacing, setSpacing] = React.useState(2);
  const [logged, setlogged] = React.useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [ptId, setPtId] = useState(41);
  
  
  
const [ appBarList , setAppBarList] = useState(["OnGoingProblems" , "index2" , "index3" , "index4"]);
const [ role , setRole] = useState("Doctor");
const [ isLogin , setisLogin] = useState(false);
const [ dropDownFunctions , setdropDownFunctions] = useState(["Dr.DahshBoard" 
                , "appointments" ,"activityLog" ,"trash"]);
// var appBarList = ["Alaa" , "Ahmed" , "Mohamed" , "lol"];
const MainFunctions = [
    {text: "New Doctor Appointement" , role :"doctor"},
    {text: "New patient registration" , role :"doctor"},
    {text: "EMR Electronic Medical Records" , role :"doctor"},
    {text: "Lap Information System" , role :"doctor"},
    {text: "Rediology information system" , role :"doctor"},
    {text: "Path information system " , role :"doctor"},
    {text: "Electronic proception ERX" , role :"doctor"},
    {text: "Document Manegment" , role :"doctor"},
    {text: "System Admin" , role :"doctor"},
    // {text: "New Doctor Appointement" , role :"doctor"},
]

const dispatch = useDispatch();

  


  useEffect(()=>{ 
    console.log("herree dashBoard:" , localStorage.getItem("role"));
    var localStorageRole = parseInt(localStorage.getItem("role"));
  
    // if(localStorageRole !==8 ){
    //   history.push("/notAuthorized");
    // }
    // console.log("‘hello’" ,  appBarList , role , dropDownFunctions ,isLogin , MainFunctions);
    // setTimeout( ()=>{ alert(‘hello’); }, 2000);
 });
 
  const handleDrawerOpen = () => {
    setOpen(true);
    setChangeOpen(true);
    dispatch({ type: 'setOpen', payload: true })
    // console.log("message :" , msg);
  };
  

  const handleDrawerClose = () => {
    setOpen(false);
    setChangeOpen(false);
    dispatch({ type: 'setOpen', payload: false })
  };


  return (
   
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"  
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
          
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Our Clinical DashBoard
          </Typography>
          <Typography  component="div" style={{marginLeft :"auto",    marginRight: "1em" , display:"flex" , alignItems:"center"}}>
          <Button variant="contained" className={classes.loginLogoutButton}  onClick= {()=>{
                 localStorage.removeItem("userId");
                 localStorage.removeItem("role");
                 localStorage.removeItem("labId");
                 setlogged(false);
                 history.push("/login")
              }}>
              LogOut
            </Button>
            <span>
              <AccountCircleIcon style={{fontSize:"2em"}} onClick={()=>{
                history.push(`${match.path}/profile`)
              }}/>
            </span>
     
                 <FormControl className={classes.formControl}>
        {/* <InputLabel htmlFor="age-native-simple">Age</InputLabel> */}
        
      </FormControl>
                </Typography>
        </Toolbar>
      </AppBar>
      <Drawer

        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider/>
        <List>
          {appBarList.map((text, index) => (
            <ListItem button key={text} onClick = {()=>{
              if(text === "OnGoingProblems"){
                history.push(`${match.path}/OnGoingProblems`)
              }
            }}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text}  />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div className={classes.root}>
      <main
      className={clsx(classes.content, {
        [classes.contentShift]: open,
      })}
      >

      <div className={classes.drawerHeader} />

      <Typography className="row">
      <div className="col-4 col-md-4 col-lg-3 ">
      <div class="wrapper">
    
    <nav id="sidebar">
        <div className="sidebar-header">
            
        </div>

        <ul className="list-unstyled components">


            <li>
     
            {
              parseInt(localStorage.getItem("role") == 8)?
              (
                <Link to={match.path+"/clinicalDashBoard"} >
                Clinical DashBoard
                </Link>
              ):(
                <Link to="#" style={{cursor:"not-allowed"}} >
                Clinical DashBoard
                </Link>
              )
            }
            </li>
            <li>
            <Link to={match.path+`/patientAppointement/${ptId}`}>
                       Patient Appointement
            </Link>
            </li>
            <li>
            <Link to={match.path+"/OnGoingProblems"} >
                        On Going Problems
                      </Link>
            </li>
            <li>
            <Link to={match.path+"/Allergy"} >
                        Allergy
            </Link>
            </li>
            {/* <li>
            <Link to={match.path+`/orderGeneration/${ptId}/${"lab"}`} >
                        Lab Orders
            </Link>
            </li> */}
            <li>
            <Link to={match.path+`/labOrders/${ptId}`} >
                        Lab Orders
            </Link>
            </li>
            <li>
            <Link to={match.path+`/pathologyOrders/${ptId}`} >
                        path Orders
            </Link>
            </li>
            <li>
            <Link to={match.path+`/radioOrders/${ptId}`} >
                        radio Orders
            </Link>
            </li>
            {/* <li>
            <Link to={match.path+`/orderGeneration/${ptId}/${"pathology"}`} >
                        Pathology Orders
            </Link>
            </li>
            <li>
            <Link to={match.path+`/orderGeneration/${ptId}/${"radio"}`} >
                        Radiology Orders
            </Link>
            </li> */}
        
           
        </ul>
    </nav>

</div>
      </div>
      <div className="col-8">
      <Typography className="row">
        <UserInfo id="41" />
      </Typography>
      <Switch>  
      <Route exact path={match.path+"/clinicalDashBoard"} >
        <OnGoingProblemStep />
        <AllergyProblems />
        
        </Route> 
      <Route exact path={match.path+"/OnGoingProblems"}  component={OnGoingProblemStep}/> 
      <Route exact path={match.path+"/Allergy"}  component={AllergyProblems}/> 
      <Route exact path={match.path+"/patientAppointement/:id"}  component={PatientAppointement}/> 
      <Route exact path={match.path+"/labOrders/:id"}  component={OrderLabListForPt}/> 
      <Route exact path={match.path+"/pathologyOrders/:id"}  component={OrderPathologyForPatient}/> 
      <Route exact path={match.path+"/radioOrders/:id"}  component={OrderRadioListForPt}/> 
      <Route exact path={match.path+"/labOrders/:id/labOrderForm"}  component={LabOrder}/> 
      <Route exact path={match.path+"/orderGeneration/:id/:type"}  component={OrderGeneration}/> 
      {/* <Route exact path={match.path+"/orderGeneration/:id/:type/additionOrderForm"}  component={AdditionOrderForm}/>  */}
      <Route exact path={match.path+"/radioOrders/:id/additionOrderForm/:type"}  component={AdditionOrderForm}/> 
      <Route exact path={match.path+"/labOrders/:id/additionOrderForm/:type"}  component={AdditionOrderForm}/> 
      <Route exact path={match.path+"/pathologyOrders/:id/additionOrderForm/:type"}  component={AdditionOrderForm}/> 
     
      <Route exact path={match.path+"/patientAppointement/:id/visit"}  component={Visit}/> 
      <Route exact path={match.path+"/patientAppointement/:id/visit/prescription/:visitId"}  component={Prescription}/> 
      <Route exact path={match.path+"/profile"}  component={Prescription}/> 
      {/* <Route exact path={match.path}  component={DashBoardComp}/>  */}
      {/* <Route exact path={match.path+"/com"} component={Signup}/>
      <Route exact path={match.path+"/login"} component={LoginForm}/> */}
      {/* <Route exact path={match.path+"/ptRegistration"} component={ptRegistration}/> */}
    </Switch>
      </div>
    </Typography>

 </main>

     </div>

      
      {/* routes */}
      {/* <h1 className="mt-5">dddd</h1> */}

    </div>
 
          
  );
}
const mapactiontoprops = (disptch) =>{
  return bindActionCreators({setChangeOpen } ,disptch);
}
const mapstatetoprops = (state) =>{
  console.log("lllllllllllllll",state);
  return {msg : state.Drawer}
}

export default connect(mapstatetoprops , mapactiontoprops)(ClinicalDashBoard);

      // <div className="container">
      //       <div className="row" style={{marginTop:"5em" }}>
      //           <div className="col-4">

      //           </div>
      //           <div className="col-8">
      //         {/* <OnGoingProblemStep /> */}
      //       <Switch>  
      //       <Route exact path={match.path+"/OnGoingProblems"}  component={OnGoingProblemStep}/> 
      //       {/* <Route exact path={match.path}  component={DashBoardComp}/>  */}
      //       {/* <Route exact path={match.path+"/com"} component={Signup}/>
      //       <Route exact path={match.path+"/login"} component={LoginForm}/> */}
      //       {/* <Route exact path={match.path+"/ptRegistration"} component={ptRegistration}/> */}
      //       </Switch>
      //           </div>
      //       </div>
      // </div>