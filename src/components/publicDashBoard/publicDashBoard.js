
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
import Appointement from '../../pages/appointements';
import DashBoardComp from "./dashboardComp";
import { BrowserRouter } from 'react-router-dom';
// import Signup from './Forms/signUpForm';
import { useState } from 'react';
// import LoginForm from './Forms/loginform';
import { connect } from "react-redux";
import { bindActionCreators } from "redux"; 

import { useSelector } from 'react-redux'
// import PaientRegistration from './patientRegistration/importatntInfo';
import ptRegistration from '../patientRegistration/ptRegistration';
import NurseVisit from "../nurseModule/nursemodule";
import Visit from "../Visit/visit";
import Prescription from "../Prescription/Prescription";
import PatientsOnVisit from "../nurseModule/patinetsOnVisit";
import { BrowserRouter as Router, Route, Switch,Link } from "react-router-dom";
import Profile from '../Profile/Profile';

import AcceptOrders from './../orderGeneration/acceptOrders';
import AllOrders from './../orderGeneration/allOrders';
import AddOrderForm from "../orderGeneration/addOrderForm";



const drawerWidth = 250;

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
    padding:"1em",
   
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
  notAllowed:{
    cursor:"not-allowed"
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

const PublicDashBoard = ({match}) => {
  const history = useHistory();
  const [spacing, setSpacing] = React.useState(2);
  const [logged, setlogged] = React.useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [flag, setFlag] = React.useState(false);
  
  
const [ appBarList , setAppBarList] = useState(["Patient Registration" , "index2" , "index3" , "index4"]);
const [ role , setRole] = useState("doctor");
const [ isLogin , setisLogin] = useState(false);
const [ dropDownFunctions , setdropDownFunctions] = useState(["Dr.DahshBoard" 
                , "appointments" ,"Profile" ,"trash"]);
// var appBarList = ["Alaa" , "Ahmed" , "Mohamed" , "lol"];
const MainFunctions = [
    {text: "New Doctor Appointement" , role :["8"]},
    {text: "New patient registration" , role :["8" , "6"]},
    {text: "EMR Electronic Medical Records" , role :["8"]},
    {text: "Nursing Assessment" , role :["8" , "7"]},
    {text: "Lap Information System" , role :["2"]},
    {text: "Radiology Information System" , role :["3"]},
    {text: "Path information system " , role :["4"]},
    {text: "Electronic procreption ERX" , role :["13" , ""]},
    {text: "System Admin" , role :["admin"]},
    {text: "Document Manegment" , role :["" , ""]},
    // {text: "New Doctor Appointement" , role :"doctor"},
]



  useEffect(()=>{
    console.log("herree dashBoard:" , localStorage.getItem("role"));
    var localStorageRole = parseInt(localStorage.getItem("role"));
  
    if(localStorageRole == 1){
      history.push("/notAuthorized");
    }
    else{
      console.log("mmmmmmmmmmmmmmmmmmmmmm")
    }
    if(localStorage.getItem("role")){ // for Change the login and logout button in navBar
      setRole(localStorage.getItem("role"));
      // console.log("yes")
      setlogged(true);  // make it logout
    }
    else{
      // console.log("no")
      setlogged(false); // make it login
    }

 },[]);
 
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  

  const handleDrawerClose = () => {
    setOpen(false);
  };
   const renderMainCards = ()=>{
    
     
     return MainFunctions.map((value,index) => {
       
      return(   
      <Grid key={index} item xs={12} sm={4} md={3} >
      <Card className={classes.cardStyle} style={{
        cursor : value.role.includes(role)?"pointer":"not-allowed" 
        }} onClick = {()=>{
          console.log("llooooooo")
        }}>
      <CardMedia
        className={classes.media}
        style={{padding:"3em"}}
        image="images/img1.svg"
        title="Contemplative Reptile"
      />
      <CardContent className={classes.cardContentHeight}>
        <Typography color="" className="text-center text-secondary" gutterBottom>
          {value.text}
        </Typography>
      </CardContent>
      <CardActions className="row justify-content-center ">
        <Button className={classes.learnMoreBtn} size="small" style={{
        cursor : value.role.includes(role)?"pointer":"not-allowed" 
        }} 
        onClick={()=>{
          if(value.role.includes(role) && value.text === "New Doctor Appointement"){
         
            history.push(match.path+"/appoint");
          }
          else if(value.role.includes(role) && value.text == "New patient registration"){
           
            history.push(match.path+"/ptRegistration");
          }
         
          else if( value.text == "Nursing Assessment" && value.role.includes(role)){
            // console.log("patient Register");
            history.push(match.path+"/patientsOnVisit");
          }
          else if( value.text == "Lap Information System" && value.role.includes(role)){
            // console.log("patient Register");
            history.push(match.path+`/acceptOrders/${"lab"}`);
          }
          else if( value.text == "Path Information System" && value.role.includes(role)){
            // console.log("patient Register");
            history.push(match.path+`/acceptOrders/${"pathology"}`);
          }
          else if( value.text == "Radiology Information System" && value.role.includes(role)){
            // console.log("patient Register");
            history.push(match.path+`/acceptOrders/${"radio"}`);
          }
          
        }}>
          Learn More</Button>
      </CardActions>
      </Card>
          </Grid>
        )
      }
     )
   }

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
            Our DahsBoard
          </Typography>
          <Typography  component="div" style={{marginLeft :"auto"}}>
          {
            logged ? (
              <Button variant="contained" className={classes.loginLogoutButton}  onClick= {()=>{
                localStorage.removeItem("userId");
                localStorage.removeItem("role");
                localStorage.removeItem("labId");
                setlogged(false);
                history.push("/login")
              }}>
              LogOut
            </Button>
            ):(
              <Button className ={classes.loginLogoutButton} variant="contained"  onClick= {()=>{
                // setlogged(true);
                history.push("/login");
              }}>
              LogIn
            </Button>
            )
          }
                 <FormControl className={classes.formControl}>
        {/* <InputLabel htmlFor="age-native-simple">Age</InputLabel> */}
        <Select
          native
          style = {{marginLeft : "1.4em" , width:"10em", textAlign:"center" }}
          className = "bg-light rounded"
          // value = {state.age}
          onChange = {(e)=>{
            console.log(e.target.value);
             if(e.target.value == "Dr.DahshBoard" && parseInt(role) > 1 ){
              history.push(`${match.path}`);
            }
            else if(e.target.value == "appointments" && (parseInt(role) == 8 || parseInt(role) == 2)){
             console.log("heeskskkskkkkkkkkkkkkkkkk:  ")
              history.push(match.path+"/appoint");
            }
            else if(e.target.value == "Profile" ){
             console.log("heeskskkskkkkkkkkkkkkkkkk:  ")
            history.push(match.path+"/profile");
            }
          }}
          // inputProps = {{
          //   name: 'age',
          //   id: 'age-native-simple',
          // }}
        >
        {
          dropDownFunctions.map((item)=>{
            
            return(<option   onClick= {()=>{
            }}
               value={item}>{item}</option>)
          })
        }
        {/* <Select
          native
          style ={{marginLeft : "0.8em"}}
          // value={state.age}
          // onChange={handleChange}
          // inputProps={{
          //   name: 'age',
          //   id: 'age-native-simple',
          // }}
        >
          <option value={10}>Appointements</option>
          <option value={20}>Appointements</option>
          <option value={30}>Appointements</option> */}
        </Select>
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
              if(text === "Patient Registration"){
                history.push(`${match.path}/ptRegistration`)
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
      <div className="container">
      <div className="row" style={{marginTop:"5em"}}>
      <Switch> 
      <Route exact path={match.path+"/appoint"}  component={Appointement}/> 
      {/* <Route exact path={match.path+"/search"}  component={Search}/>  */}
      {/* <Route exact path={match.path +"/search/patientOrders/:ptId"} component = {PatientLabOrders} /> */}
      <Route exact path={match.path +"/patientsOnVisit"} component = {PatientsOnVisit} />
      <Route exact path={match.path +"/patientsOnVisit/nurseVisit/:id"} component = {NurseVisit} />
      <Route exact path={match.path +"/appoint/visit/:id"} component = {Visit} />
      <Route exact path={match.path +"/appoint/visit/:id/prescription/:visitId"} component = {Prescription} />
      <Route exact path={match.path +"/profile"} component = {Profile} />
            
      <Route exact path={match.path} >
      <div className={classes.root}>
      <main
      className={clsx(classes.content, {
        [classes.contentShift]: open,
      })}
      >

      <div className={classes.drawerHeader} />
      <Typography className="row">
      <Grid container justify="center" className="ml-2 " spacing = {4}>
        {renderMainCards()}
      </Grid>

      </Typography>

 </main>

     </div>
      </Route> 
      {/* <Route exact path={match.path+"/com"} component={Signup}/>
      <Route exact path={match.path+"/login"} component={LoginForm}/> */}
      <Route exact path={match.path+"/ptRegistration"} component={ptRegistration}/>
      <Route exact path={match.path+"/nurseVisit"} component={NurseVisit}/>
      <Route  path={match.path+"/appoint/visit"} component={Visit}/>
      
      

                      {/* AcceptOrders */}
      <Route exact path={match.path+"/acceptOrders/:type"} component={AcceptOrders}/>
      
                    {/* All Orders */}
      <Route exact path={match.path+"/acceptOrders/:type/allLabOrders"} component={AllOrders}/>
      
                    {/* Add order Form */}
      <Route exact  path={match.path+"/acceptOrders/:type/allLabOrders/addOrder"} component={AddOrderForm}/>        

      
      </Switch>
      </div>
      
      </div>
  
      {/* <h1 className="mt-5">dddd</h1> */}
           {/* <main
className={clsx(classes.content, {
  [classes.contentShift]: open,
})}
>

<div className={classes.drawerHeader} />
<Typography className="row">
<Grid container justify="center" className="ml-2 " spacing = {4}>
  {MainFunctions.map(value => (
<Grid key={value} item xs={12} sm={4} md={3} >
<Card className={classes.cardStyle}>

 <CardMedia
  className={classes.media}
  style={{padding:"3em"}}
  image="images/img1.svg"
  title="Contemplative Reptile"
/>
<CardContent className={classes.cardContentHeight}>
  <Typography color="" className="text-center text-secondary" gutterBottom>
    {value.text}
  </Typography>
</CardContent>
<CardActions className="row justify-content-center ">
  <Button className={classes.learnMoreBtn} size="small" 
  onClick={()=>{
    if(value.role === "doctor" && value.text === "New Doctor Appointement"){
      history.push("/appointement");
    }
    if(value.role==="patient" && value.text ==="New patient Registration"){
      history.push("/");
    }
    // if(value.role==="doctor" && value.text ==="New Doctor Appointement"){
    //   history.push("/");
    // }
    // if(value.role==="doctor" && value.text ==="New Doctor Appointement"){
    //   history.push("/");
    // }
    // if(value.role==="doctor" && value.text ==="New Doctor Appointement"){
    //   history.push("/");
    // }
    // if(value.role==="doctor" && value.text ==="New Doctor Appointement"){
    //   history.push("/");
    // }
    // if(value.role==="doctor" && value.text ==="New Doctor Appointement"){
    //   history.push("/");
    // }
  }}>Learn More</Button>
</CardActions>
</Card>
    </Grid>
  ))}
</Grid>

</Typography>

</main> */}
    </div>
 
          
  );
}


export default PublicDashBoard;

