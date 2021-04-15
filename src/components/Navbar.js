// import React from 'react';
// import { experimentalStyled as styled, alpha } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Box from '@material-ui/core/Box';
// import Toolbar from '@material-ui/core/Toolbar';
// import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
// import InputBase from '@material-ui/core/InputBase';
// import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
// import Menu from '@material-ui/core/Menu';
// import MenuIcon from '@material-ui/icons/Menu';
// import SearchIcon from '@material-ui/icons/Search';
// import AccountCircle from '@material-ui/icons/AccountCircle';
// import MailIcon from '@material-ui/icons/Mail';
// import NotificationsIcon from '@material-ui/icons/Notifications';
// import MoreIcon from '@material-ui/icons/MoreVert';
import Select from '@material-ui/core/Select';
// import { makeStyles } from '@material-ui/core/styles';
// import Fab from '@material-ui/core/Fab';

// const useStyles = makeStyles((theme) => ({
//   right :{
//     float : "right"
//   }
// }));

// const DashBoard = () => {
//   const classes = useStyles();
//     return ( 
//         <AppBar position="static">
//             <Toolbar variant="dense">
//                 <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
//                 <MenuIcon />
//                 </IconButton>
//                 <Typography variant="h6" color="inherit" component="div">
//                 Photos
//                 </Typography>
//                 <Typography variant="h6" color="inherit" component="div" style={{marginLeft :"auto"}}>
//                 <Button variant="contained" color="primary">
//                   Primary
//                 </Button>
//                 <Select
//                 labelId="demo-simple-select-label"
//                 id="demo-simple-select"
//                 value="0"
//               >
//               <MenuItem value={10}>Ten</MenuItem>
//               <MenuItem value={20}>Twenty</MenuItem>
//               <MenuItem value={30}>Thirty</MenuItem>
//             </Select>
//                 </Typography>
//             </Toolbar>
//         </AppBar>
//      );
// }
 
// export default DashBoard;
// // import * as React from 'react';
// // import { experimentalStyled as styled , alpha } from '@material-ui/core/styles';
// // import AppBar from '@material-ui/core/AppBar';
// // import Box from '@material-ui/core/Box';
// // import Toolbar from '@material-ui/core/Toolbar';
// // import IconButton from '@material-ui/core/IconButton';
// // import Typography from '@material-ui/core/Typography';
// // import InputBase from '@material-ui/core/InputBase';
// // import Badge from '@material-ui/core/Badge';
// // import MenuItem from '@material-ui/core/MenuItem';
// // import Menu from '@material-ui/core/Menu';
// // import MenuIcon from '@material-ui/icons/Menu';
// // import SearchIcon from '@material-ui/icons/Search';
// // import AccountCircle from '@material-ui/icons/AccountCircle';
// // import MailIcon from '@material-ui/icons/Mail';
// // import NotificationsIcon from '@material-ui/icons/Notifications';
// // import MoreIcon from '@material-ui/icons/MoreVert';

// // const Search = styled('div')(({ theme }) => ({
// //   position: 'relative',
// //   borderRadius: theme.shape.borderRadius,
// //   backgroundColor: alpha(theme.palette.common.white, 0.15),
// //   // backgroundColor: alpha(theme.palette.common.white, 0.15),
// //   '&:hover': {
// //     backgroundColor: alpha(theme.palette.common.white, 0.25),
// //   },
// //   marginRight: theme.spacing(2),
// //   marginLeft: 0,
// //   width: '100%',
// //   [theme.breakpoints.up('sm')]: {
// //     marginLeft: theme.spacing(3),
// //     width: 'auto',
// //   },
// // }));

// // const SearchIconWrapper = styled('div')(({ theme }) => ({
// //   padding: theme.spacing(0, 2),
// //   height: '100%',
// //   position: 'absolute',
// //   pointerEvents: 'none',
// //   display: 'flex',
// //   alignItems: 'center',
// //   justifyContent: 'center',
// // }));

// // const StyledInputBase = styled(InputBase)(({ theme }) => ({
// //   color: 'inherit',
// //   '& .MuiInputBase-input': {
// //     padding: theme.spacing(1, 1, 1, 0),
// //     // vertical padding + font size from searchIcon
// //     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
// //     transition: theme.transitions.create('width'),
// //     width: '100%',
// //     [theme.breakpoints.up('md')]: {
// //       width: '20ch',
// //     },
// //   },
// // }));

// // const Navbar =  () => {
// //   const [anchorEl, setAnchorEl] = React.useState(null);
// //   const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

// //   const isMenuOpen = Boolean(anchorEl);
// //   const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

// //   const handleProfileMenuOpen = (event) => {
// //     setAnchorEl(event.currentTarget);
// //   };

// //   const handleMobileMenuClose = () => {
// //     setMobileMoreAnchorEl(null);
// //   };

// //   const handleMenuClose = () => {
// //     setAnchorEl(null);
// //     handleMobileMenuClose();
// //   };

// //   const handleMobileMenuOpen = (event) => {
// //     setMobileMoreAnchorEl(event.currentTarget);
// //   };

// //   const menuId = 'primary-search-account-menu';
// //   const renderMenu = (
// //     <Menu
// //       anchorEl={anchorEl}
// //       anchorOrigin={{
// //         vertical: 'top',
// //         horizontal: 'right',
// //       }}
// //       id={menuId}
// //       keepMounted
// //       transformOrigin={{
// //         vertical: 'top',
// //         horizontal: 'right',
// //       }}
// //       open={isMenuOpen}
// //       onClose={handleMenuClose}
// //     >
// //       <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
// //       <MenuItem onClick={handleMenuClose}>My account</MenuItem>
// //     </Menu>
// //   );

// //   const mobileMenuId = 'primary-search-account-menu-mobile';
// //   const renderMobileMenu = (
// //     <Menu
// //       anchorEl={mobileMoreAnchorEl}
// //       anchorOrigin={{
// //         vertical: 'top',
// //         horizontal: 'right',
// //       }}
// //       id={mobileMenuId}
// //       keepMounted
// //       transformOrigin={{
// //         vertical: 'top',
// //         horizontal: 'right',
// //       }}
// //       open={isMobileMenuOpen}
// //       onClose={handleMobileMenuClose}
// //     >
// //       <MenuItem>
// //         <IconButton aria-label="show 4 new mails" color="inherit">
// //           <Badge badgeContent={4} color="secondary">
// //             <MailIcon />
// //           </Badge>
// //         </IconButton>
// //         <p>Messages</p>
// //       </MenuItem>
// //       <MenuItem>
// //         <IconButton aria-label="show 11 new notifications" color="inherit">
// //           <Badge badgeContent={11} color="secondary">
// //             <NotificationsIcon />
// //           </Badge>
// //         </IconButton>
// //         <p>Notifications</p>
// //       </MenuItem>
// //       <MenuItem onClick={handleProfileMenuOpen}>
// //         <IconButton
// //           aria-label="account of current user"
// //           aria-controls="primary-search-account-menu"
// //           aria-haspopup="true"
// //           color="inherit"
// //         >
// //           <AccountCircle />
// //         </IconButton>
// //         <p>Profile</p>
// //       </MenuItem>
// //     </Menu>
// //   );

// //   return (
// //     <Box sx={{ flexGrow: 1 }}>
// //       <AppBar position="static">
// //         <Toolbar>
// //           <IconButton
// //             edge="start"
// //             color="inherit"
// //             aria-label="open drawer"
// //             sx={{ mr: 2 }}
// //           >
// //             <MenuIcon />
// //           </IconButton>
// //           <Typography
// //             variant="h6"
// //             noWrap
// //             component="div"
// //             sx={{ display: { xs: 'none', sm: 'block' } }}
// //           >
// //             Material-UI
// //           </Typography>
// //           <Search>
// //             <SearchIconWrapper>
// //               <SearchIcon />
// //             </SearchIconWrapper>
// //             <StyledInputBase
// //               placeholder="Search…"
// //               inputProps={{ 'aria-label': 'search' }}
// //             />
// //           </Search>
// //           <Box sx={{ flexGrow: 1 }} />
// //           <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
// //             <IconButton aria-label="show 4 new mails" color="inherit">
// //               <Badge badgeContent={4} color="secondary">
// //                 <MailIcon />
// //               </Badge>
// //             </IconButton>
// //             <IconButton aria-label="show 17 new notifications" color="inherit">
// //               <Badge badgeContent={17} color="secondary">
// //                 <NotificationsIcon />
// //               </Badge>
// //             </IconButton>
// //             <IconButton
// //               edge="end"
// //               aria-label="account of current user"
// //               aria-controls={menuId}
// //               aria-haspopup="true"
// //               onClick={handleProfileMenuOpen}
// //               color="inherit"
// //             >
// //               <AccountCircle />
// //             </IconButton>
// //           </Box>
// //           <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
// //             <IconButton
// //               aria-label="show more"
// //               aria-controls={mobileMenuId}
// //               aria-haspopup="true"
// //               onClick={handleMobileMenuOpen}
// //               color="inherit"
// //             >
// //               <MoreIcon />
// //             </IconButton>
// //           </Box>
// //         </Toolbar>
// //       </AppBar>
// //       {renderMobileMenu}
// //       {renderMenu}
// //     </Box>
// //   );
// // }
// // export default Navbar
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


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
      
    }),
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
}));

const Navbar = ({name , appBarList ,role , dropDownFunctions ,isLogin}) => {
  const history = useHistory();
  const [spacing, setSpacing] = React.useState(2);
  const [logged, setlogged] = React.useState(isLogin);
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  


  useEffect(()=>{
    console.log("‘hello’" , name , appBarList , role , dropDownFunctions ,isLogin);
    // setTimeout( ()=>{ alert(‘hello’); }, 2000);
 });
 
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  

  const handleDrawerClose = () => {
    setOpen(false);
  };
  

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
      color = "inherit"
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
          <Typography  color="inherit" component="div" style={{marginLeft :"auto"}}>
          {
            logged ? (
              <Button variant="contained" color="inherit" onClick= {()=>{
                setlogged(false);
              }}>
              LogOut
            </Button>
            ):(
              <Button variant="contained" color="inherit" onClick= {()=>{
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
          style ={{marginLeft : "0.8em" , width:"8em" }}
          // value={state.age}
          // onChange={handleChange}
          // inputProps={{
          //   name: 'age',
          //   id: 'age-native-simple',
          // }}
        >
        {
          dropDownFunctions.map((item)=>{
            return(<option value={item}>{item}</option>)
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
        <Divider />
        <List>
          {appBarList.map((text, index) => (
            <ListItem button key={text} onClick = {()=>{
              history.push("/")
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
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Typography >
        <Grid container justify="center" spacing={spacing}>
          {[0, 1, 2, 4,5,6 ,7,8,9,10].map(value => (
        <Grid key={value} item xs={12} sm={3}>
        <Card>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            Word of the Day
          </Typography>
          <Typography variant="h5" component="h2">
            foo
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
            </Grid>
          ))}
        </Grid>

        </Typography>
      
      </main>
    </div>
  );
}
export default Navbar