import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import {useHistory} from "react-router-dom";
import { useState, useEffect } from "react";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import "./navbar.css";



const NavBar = (props) => {
    const history = useHistory();
    const [login , setLogin] = useState(props.isAuth ? true : false);
    
    useEffect(()=>{
   
        if(localStorage.getItem("role")){
            setLogin(true)
        }
        else{
            setLogin(false)
        }
    },[props.isAuth])
    return ( 
        <Navbar className="navbar" expand="lg"  style={{width:"100%"}}>
        <Navbar.Brand href="#home">Our Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto px-2">
            <Nav.Link href="/profile">
        <AccountCircleIcon  />
            </Nav.Link>
            <NavDropdown title="Our Functions" id="basic-nav-dropdown">
            <NavDropdown.Item href="/publicDashBoard">Dr.DashBoard</NavDropdown.Item>
           {
               parseInt(localStorage.getItem("role")) == 8 ? (
                <NavDropdown.Item href="/publicDashBoard/appoint" >Appointements</NavDropdown.Item>
               ):(
                <NavDropdown.Item href="#" style={{cursor:"not-allowed"}}>Appointements</NavDropdown.Item>
               )
           }
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">trash</NavDropdown.Item>
            </NavDropdown>
        </Nav>


        {
             props.isAuth  ?(
                <>
              
                <Button className="nav-btn" onClick={()=>{
                   
                    localStorage.removeItem("role");
                    localStorage.removeItem("labId");
                    localStorage.removeItem("userId");
                    history.push("/login")
                    // setLogin(false)
                    props.logout(false)
                    // props.isAuth = false;
                }}>
                    logout
                </Button>   
                </>
            ):(
                <Button className="nav-btn" onClick={()=>{
                    
                }}>
                    login
                </Button>   
            )
        }

        </Navbar.Collapse>
    </Navbar>
     );
}
 
export default NavBar;