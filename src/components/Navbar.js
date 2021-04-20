
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
import "./Navbar.css";
import CardMedia from '@material-ui/core/CardMedia';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DashBoard from "../pages/DashBoard"
import Appointement from '../pages/appointements';
import DashBoardComp from "./dashboardComp";
import { BrowserRouter } from 'react-router-dom';
import Signup from './Forms/signUpForm';
import {useRoutes} from 'hookrouter';
// import DashBoardComp from "./dashboardComp";
// import Navbar from './Navbar';
// import DashBoard from './../pages/DashBoard';
import { useState } from 'react';
import LoginForm from './Forms/loginform';
import { connect } from "react-redux";
import { bindActionCreators } from "redux"; 
import {handleChangeOpen,setChangeOpen } from "../actions";
import { useSelector } from 'react-redux'

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

const Navbar = ({match}) => {
  const history = useHistory();
  const [spacing, setSpacing] = React.useState(2);
  const [logged, setlogged] = React.useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const routess = [  
    { path: '/', component: DashBoard },  
    { path: '/com', component: DashBoardComp },  
    // { path: '/employee',  component: employee },  
    // { path: '/addemployee',  component: addemployee },  
    // { path: '/profile',  component: profile },  
    // { path: '/editemployee/:id', exact: true,  component: editemployee }, 
    // { component:notfound }
];  
  
const [ appBarList , setAppBarList] = useState(["index1" , "index2" , "index3" , "index4"]);
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
  const routes = {
    '/': () => <DashBoard />,
    '/com': () => <DashBoardComp  />,
    // '/products': () => <ProductOverview props={yourProps} />,
    // '/products/:id': ({id}) => <ProductDetails id={id} />
};
  


  useEffect(()=>{
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
            Persistent drawer
          </Typography>
          <Typography  component="div" style={{marginLeft :"auto"}}>
          {
            logged ? (
              <Button variant="contained" className={classes.loginLogoutButton}  onClick= {()=>{
                setlogged(false);
              }}>
              LogOut
            </Button>
            ):(
              <Button className ={classes.loginLogoutButton} variant="contained"  onClick= {()=>{
                setlogged(true);
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
          // onChange = {handleChange}
          // inputProps = {{
          //   name: 'age',
          //   id: 'age-native-simple',
          // }}
        >
        {
          dropDownFunctions.map((item)=>{
            return(<option  onClick= {()=>{
           
                   switch(item){
                     case "Dr.DahshBoard":{
                      console.log("yes")
                      history.push({
                        pathname: match.path,
                        state: { }
                      });
                      break;
                     }
                      
                     case "appointments":
                      history.push({
                        pathname: match.path+"/appoint",
                        state: {}
                      });
                      break;
                   }
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
              // history.push("/")
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
      
      <Switch> 
      <Route exact path={match.path+"/appoint"}  component={Appointement}/> 
      <Route exact path={match.path}  component={DashBoardComp}/> 
      <Route exact path={match.path+"/com"} component={Signup}/>
      <Route exact path={match.path+"/login"} component={LoginForm}/>

      
      </Switch>
      
      {/* routes */}
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
const mapactiontoprops = (disptch) =>{
  return bindActionCreators({setChangeOpen } ,disptch);
}
const mapstatetoprops = (state) =>{
  console.log("lllllllllllllll",state);
  return {msg : state.Drawer}
}

export default connect(mapstatetoprops , mapactiontoprops)(Navbar);


{/* <Switch>
{/* <Route path="/">
  <Signup />
</Route>
<Route path="/com">
  <DashBoardComp/>
</Route> 
 <Route exact path="/singup" component={Signup}></Route>
<Route exact path="/com" component={DashBoardComp}></Route>
{/* <Route exact path="/PathologistSignup" component={PathologistSignup}></Route> 

</Switch> */}