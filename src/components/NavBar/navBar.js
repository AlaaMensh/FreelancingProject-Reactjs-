import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import {useHistory} from "react-router-dom";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {useState , useEffect} from "react";
import Row from 'react-bootstrap/Row'
import "./navbar.css";



const NavBar = (props) => {
    const history = useHistory();
    const [userName , setUserName] = useState(localStorage.getItem("userName"));
    // const [userName , setUserName] = useState("");
    var name = "AlaaMensh";

    
    
    return ( 
        <Navbar className="navbar" expand="lg"  style={{width:"100%"}}>
        <Navbar.Brand href="#home">Our Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto px-2">
            <Nav.Link href="/profile" className="pr-4">
                <div className="row  align-items-center">
                        <AccountCircleIcon  style={{fontSize:"1.6em"}} />
                        <span className="username">{userName||""}</span>
                </div>
            </Nav.Link>
            {/* *************check here on role on every Choice in the DropDown *************/}
            <NavDropdown title="Our Functions" id="basic-nav-dropdown">
{
    localStorage.getItem("role") ? (

        <NavDropdown.Item href="/publicDashBoard">Dr.DashBoard</NavDropdown.Item>
    ) :(
        <NavDropdown.Item href="#" style={{cursor:"not-allowed"}}>Dr.DashBoard</NavDropdown.Item>
    )
}
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
           {console.log("props.auth: " , props.isAuth )}

        {
             props.isAuth  ?(
                <>
                
              
                <Button className="nav-btn" onClick={()=>{
                   
                    localStorage.removeItem("role");
                    localStorage.removeItem("labId");
                    localStorage.removeItem("userId");
                    history.push("/login")
                    props.logout(false)

                }}>
                    logout
                </Button>   
                </>
            ):(
                <Button className="nav-btn" onClick={()=>{
                    history.push("/login")
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