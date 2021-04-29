
import Button from '@material-ui/core/Button';

import MenuItem from '@material-ui/core/MenuItem';

import Select from '@material-ui/core/Select';

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
import "./Navbar.css";
import CardMedia from '@material-ui/core/CardMedia';
import { connect } from "react-redux";
import { bindActionCreators } from "redux"; 
import {handleChangeOpen} from "../actions";
// import Navbar from './Navbar';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ptRegistration from './patientRegistration/ptRegistration';
import Appointement from '../pages/appointements';

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
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
    padding:"3em 2em"
  },
  cardContentHeight:{
    height: 60,
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

const DashBoardComp = ({match}) => {
  const dispatch = useDispatch()
  const history = useHistory();
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();
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
  // const [logged, setlogged] = React.useState(isLogin);
  // const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  // const [open]


  useEffect(()=>{
    // dispatch({ type: 'getOpen', payload: true });
    // var o = props.handleChangeOpen().then(()=>{
    //   // console.log("open: " , )
    // });
    // setOpen(open);
    // console.log("openHere : " , open)
    // setOpen(props.location.state.open);
    // setOpen(props.location.state.open);
    // console.log("‘hello’" , name , appBarList , role , dropDownFunctions ,isLogin , MainFunctions);
    // setTimeout( ()=>{ alert(‘hello’); }, 2000);
 });
 
  

  return (
<h1>kkkk</h1>
  );
      }
const mapactiontoprops = (disptch) =>{
  return bindActionCreators({handleChangeOpen } ,disptch);
}
const mapstatetoprops = (state) =>{
  // console.log("lllllllllllllll",state);
  return {open : state.open}
}

export default connect(mapstatetoprops , mapactiontoprops)(DashBoardComp);


{/* <Switch> 
<Route exact path={match.path+"/appoint"}  component={Appointement}/> 
<Route exact path={match.path}  component={DashBoardComp}/> 
<Route exact path={match.path+"/ptRegistration"} component={ptRegistration}/>


</Switch> */}