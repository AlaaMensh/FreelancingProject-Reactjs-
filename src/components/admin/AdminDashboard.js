import React, { useState } from "react";
import { Card, Col } from "react-bootstrap";
import { Route, Switch, useHistory } from "react-router-dom";

function AdminDashboard(props) {
  const [isAdmin, setIsAdmin] = useState(props.isAdmin);
  const userTypes = [
    {
      name: "Doctors",
      discription: "Manage Doctors",
      path: "/userCrud/doctor",
      icon: "",
    },
    {
      name: "Nurses",
      discription: "Manage Nurses",
      path: "/userCrud/nurse",
      icon: "",
    },
    {
      name: "Radiogists",
      discription: "Manage Radiogists",
      path: "/userCrud/radiogist",
      icon: "",
    },

    {
      name: "Radiology FD",
      discription: "Manage Radiology Front Disks",
      path: "/userCrud/radioFD",
      icon: "",
    },
    {
      name: "Pathologists",
      discription: "Manage pathologist",
      path: "/userCrud/pathologist",
      icon: "",
    },
    {
      name: "Pathology FD",
      discription: "Manage Pathology Front Disks",
      path: "/userCrud/pathologyFD",
      icon: "",
    },
    {
      name: "Chemists",
      discription: "Manage Chemists",
      path: "/userCrud/chemist",
      icon: "",
    },
  ];
  const history = useHistory();
  return (
    <div className="container dashboard-container">
      <div class="row">
        {userTypes.map((userType) => {
          return (
            <Col
              xs={10}
              md={4}
              lg={4}
              onClick={() => {
                history.push(userType.path);
              }}
              style={{ marginBottom: "40px", cursor: "pointer" }}
            >
              <div class="icon-box">
                {/*                <div class="icon">
                  <img
                    src={userType.icon ? userType.icon : ""}
                    style={{ size: "60px", height: "60px" }}
                  />
                </div>*/}
                <h1>
                  <a>{userType.name}</a>
                </h1>

                <p> {userType.discription ? userType.discription : ""} </p>
              </div>
            </Col>
          );
        })}
      </div>
    </div>
  );
}

export default AdminDashboard;
