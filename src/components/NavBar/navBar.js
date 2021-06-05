import React, { Component } from "react";
import { Navbar } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Button, Overlay, Popover } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useState, useEffect, useRef } from "react";
import Row from "react-bootstrap/Row";
import "./navbar.css";

const NavBar = (props) => {
    const history = useHistory();
    const [userName, setUserName] = useState(localStorage.getItem("userName"));
    const [target, setTarget] = useState(null);
    const [showProfile, setShowProfile] = useState(false);
    const ref = useRef(null);
    // const [userName , setUserName] = useState("");
    var name = "AlaaMensh";
    const handleClick = (event) => {
        setShowProfile(!showProfile);
        setTarget(event.target);
    };
    return (
        <Navbar style={{ marginBottom: "20px" }} bg="light" expand="md">
            <Navbar.Brand href="#home">Our Logo</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" ref={ref}>
                <Nav className="ml-auto px-2">
                    {/* *************check here on role on every Choice in the DropDown *************/}
                    {props.isAuth && (
                        <NavDropdown
                            title="Our Functions"
                            id="basic-nav-dropdown"
                        >
                            {localStorage.getItem("role") ? (
                                <NavDropdown.Item href="/publicDashBoard">
                                    Dr.DashBoard
                                </NavDropdown.Item>
                            ) : (
                                <NavDropdown.Item
                                    href="#"
                                    style={{ cursor: "not-allowed" }}
                                >
                                    Dr.DashBoard
                                </NavDropdown.Item>
                            )}
                            {parseInt(localStorage.getItem("role")) == 8 ? (
                                <NavDropdown.Item href="/publicDashBoard/appoint">
                                    Appointements
                                </NavDropdown.Item>
                            ) : (
                                <NavDropdown.Item
                                    href="#"
                                    style={{ cursor: "not-allowed" }}
                                >
                                    Appointements
                                </NavDropdown.Item>
                            )}
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                trash
                            </NavDropdown.Item>
                        </NavDropdown>
                    )}
                </Nav>
                {props.isAuth && (
                    <React.Fragment>
                        <Nav.Link
                            onClick={handleClick}
                            className="text-warning pr-4"
                        >
                            <div className="row  align-items-center">
                                <span className="username">
                                    {localStorage.getItem("userName")
                                        ? "Welcome " +
                                          localStorage.getItem("userName")
                                        : ""}
                                </span>
                                <ArrowDropDownIcon
                                    style={{ fontSize: "1.6em" }}
                                />
                            </div>
                        </Nav.Link>
                        <Overlay
                            show={showProfile}
                            target={target}
                            placement="bottom"
                            container={ref.current}
                            containerPadding={20}
                        >
                            <Popover id="popover-contained" className="shadow">
                                <Popover.Content>
                                    <div class="col m-0 p-0 uprofile">
                                        <div class="media p-2">
                                            <img
                                                src="https://imgur.com/yVjnDV8.png"
                                                class="mr-1 align-self-start"
                                            />
                                            <div class="media-body">
                                                <div class="d-flex flex-row justify-content-between">
                                                    <h6 class="mt-2 mb-0">
                                                        {localStorage.getItem(
                                                            "userName"
                                                        )}
                                                    </h6>
                                                    <i class="fas fa-angle-down mr-3 text-muted"></i>
                                                </div>
                                                <p class="text-muted">
                                                    {"Your ID : " +
                                                        localStorage.getItem(
                                                            "userId"
                                                        )}
                                                </p>
                                            </div>
                                        </div>
                                        <ul class="list text-muted mt-3 pl-0">
                                            {/*                                            <li class="danger text-danger">
                                                <i class="far fa-building mr-3 ml-2"></i>
                                                Change Password
                                            </li>*/}
                                            <li
                                                onClick={(e) => {
                                                    handleClick(e);
                                                    localStorage.removeItem(
                                                        "role"
                                                    );
                                                    localStorage.removeItem(
                                                        "labId"
                                                    );
                                                    localStorage.removeItem(
                                                        "pathoId"
                                                    );
                                                    localStorage.removeItem(
                                                        "radioId"
                                                    );
                                                    localStorage.removeItem(
                                                        "userId"
                                                    );
                                                    localStorage.removeItem(
                                                        "userName"
                                                    );
                                                    history.push("/login");
                                                    props.logout(false);
                                                }}
                                            >
                                                <i class="fas fa-wallet mr-3 ml-2"></i>
                                                Logout
                                            </li>
                                        </ul>
                                    </div>
                                </Popover.Content>
                            </Popover>
                        </Overlay>
                    </React.Fragment>
                )}
                {console.log("props.auth: ", props.isAuth)}

                {props.isAuth ? (
                    ""
                ) : (
                    <Button
                        className="nav-btn"
                        onClick={() => {
                            history.push("/login");
                        }}
                    >
                        login
                    </Button>
                )}
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;
