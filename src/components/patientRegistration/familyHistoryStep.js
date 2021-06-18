import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";
import { Component } from "react";
import Modal from "@material-ui/core/Modal";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import AddBoxIcon from "@material-ui/icons/AddBox";
import EditIcon from "@material-ui/icons/Edit";
import Fab from "@material-ui/core/Fab";
import { withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";

var object = {};
const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    padding: "1em",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    fontSize: "1.1em",
    fontFamily: "Dosis",
  },
  input2: {
    height: "10px",
  },
  iconPlus: {
    margin: "auto",
    textAlign: "center",
    // float:"right",
  },
  button: {
    margin: theme.spacing(1),
    fontFamily: "Roboto Slab",
  },
  deleteButton: {
    backgroundColor: "#c94c4c",
  },
  editButton: {
    backgroundColor: "#c94c4c",
  },
});

var id = 0;
var rowsToKeep = [];
var rowsToBeDeleted = [];

class FamilyHistoryStep extends Component {
  constructor(props) {
    super(props);

    this.state = {
      familyHistoryList: [
        //   {
        //       id:"",
        //       type:"" ,
        //       status:"",
        //       reaction:"",
        //       notes:""
        // }
      ],
      typeId: 0,
      openModal1: false,
      openModal2: false,
      TypeObj: {},
      type: "",
      status: "",
      reaction: "",
      notes: "",
      relation: "",
      notes: "",
      problem: "",
      dateOfDiagnosis: "",
      key: 1,
    };
  }

  getTypeByID = async (row) => {
    console.log("dkkdkdkdkdkdkdkdkdk:    ", row);
    this.setState({ TypeObj: row });
  };

  handleopenModal1 = () => {
    this.setState({ openModal1: true });
  };

  handleClose = () => {
    this.setState({ openModal1: false });
  };
  handleopenModal2 = () => {
    this.setState({ openModal2: true });
  };
  getData = async () => {};

  handleCloseModal2 = () => {
    this.setState({ openModal2: false });
  };

  handleDelete = async (id) => {
    this.setState({
      familyHistoryList: this.state.familyHistoryList.filter(
        (row) => row.id !== id
      ),
    });
  };
  async componentDidMount() {
    if (
      this.props.familyHistoryListHome.length > 0 &&
      this.props.familyHistoryListHome.length
    ) {
      this.setState({
        familyHistoryList: this.props.familyHistoryListHome,
        key: this.props.familyHistoryListHome.length + 1,
      });
    }
    // this.getData()
  }
  handleUpdate = () => {
    var details = {
      id: this.state.TypeObj.id,
      relation: this.state.relation,
      problem: this.state.problem,
      dateOfDiagnosis: this.state.dateOfDiagnosis,
      notes: this.state.notes,
    };

    if (!details.relation) {
      details.relation = this.state.TypeObj.relation;
    }
    if (!details.problem) {
      details.problem = this.state.TypeObj.problem;
    }
    if (!details.dateOfDiagnosis) {
      details.dateOfDiagnosis = this.state.TypeObj.dateOfDiagnosis;
    }
    if (!details.notes) {
      details.notes = this.state.TypeObj.notes;
    }

    const items = this.state.familyHistoryList.map((item) =>
      item.id === this.state.TypeObj.id ? details : item
    );

    this.setState({ familyHistoryList: items });
  };

  componentDidUpdate() {
    // console.log("hhhhhhh")
    this.rendering();
    this.props.getfamilyHistoryList(this.state.familyHistoryList);
  }

  rendering = () => {
    return (
      <div className="container gridDataContent mt-5">
        <div
          className="row gridDataHeader align-items-center"
          style={{ height: 400, width: "100%" }}
        >
          <DataGrid
            className="datagrid bg-light  rounded MuiDataGrid-cellCenter"
            style={{ textAlign: "center" }}
            rows={this.state.familyHistoryList}
            columns={[
              { field: "id", headerName: "id", width: 70 },
              { field: "relation", headerName: "Relation", width: 200 },
              { field: "problem", headerName: "Problem", width: 200 },
              { field: "date", headerName: "dateOfDiagnosis", width: 200 },
              { field: "notes", headerName: "Notes", width: 400 },

              {
                field: "Actions",
                headerName: "Actions",
                width: 250,
                renderCell: (params) => (
                  <strong>
                    {/* {params.value.getFullYear()} */}
                    <Button
                      variant="contained"
                      color="default"
                      size="small"
                      className={this.props.classes.button}
                      startIcon={<EditIcon />}
                      style={{ marginLeft: 16 }}
                      onClick={() => {
                        this.handleopenModal1();
                        console.log("lsssssssssssssssssssssssssssssssssssss");
                        this.getTypeByID(params.row);
                        // this.getData()
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      className={
                        (this.props.classes.button,
                        this.props.classes.deleteButton)
                      }
                      startIcon={<EditIcon />}
                      style={{ marginLeft: 16 }}
                      onClick={async () => {
                        console.log("delete function: ", params.row.id);
                        this.handleDelete(params.row.id);
                      }}
                    >
                      delete
                    </Button>
                  </strong>
                ),
              },
            ]}
            pageSize={5}
            checkboxSelection
            onRowSelected={async (row) => {
              console.log("yes", this.state.typeId);
            }}
            getRowId={(row) => {}}
            onRowClick={(row) => {
              console.log("yyyys", row);
              id = row.row.id;
              this.setState({ typeId: row.row.id });
            }}
          />
        </div>
        <div className="row mt-4">
          <Fab
            color="primary"
            aria-label="add"
            className={this.props.classes.iconPlus}
            onClick={() => {
              this.handleopenModal2();
            }}
          >
            <AddIcon />
          </Fab>
        </div>
      </div>
    );
  };
  handleAdding = () => {
    var details = {
      id: this.state.key,
      relation: this.state.relation,
      problem: this.state.problem,
      date: this.state.dateOfDiagnosis,
      notes: this.state.notes,
    };

    this.setState({});
    console.log("detilaas : ", details);
    var joined = this.state.familyHistoryList.concat(details);
    this.setState({ familyHistoryList: joined });
    this.setState({ key: this.state.key + 1 });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className="hero">
        {this.rendering()}

        <Modal
          open={this.state.openModal1}
          onClose={this.handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <Container component="main" maxWidth="xs">
            {/* <CssBaseline /> */}
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <EditIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Edit
              </Typography>
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      InputProps={{
                        classes: { input: this.props.classes.input2 },
                      }}
                      variant="outlined"
                      required
                      fullWidth
                      id="relation"
                      // label="Name"
                      name="relation"
                      type="text"
                      autoComplete="Relation"
                      placeholder={this.state.TypeObj.relation}
                      onChange={(event) => {
                        // console.log("kkkk;   ", this.state.TypeObj.type)
                        this.setState({ relation: event.target.value });
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      InputProps={{
                        classes: { input: this.props.classes.input2 },
                      }}
                      variant="outlined"
                      required
                      fullWidth
                      id="problem"
                      // label="Name"
                      name="problem"
                      type="text"
                      autoComplete="problem"
                      placeholder={this.state.TypeObj.problem}
                      onChange={(event) => {
                        // console.log("kkkk;   ", this.state.TypeObj.name)
                        this.setState({ problem: event.target.value });
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      InputProps={{
                        classes: { input: this.props.classes.input2 },
                      }}
                      variant="outlined"
                      required
                      fullWidth
                      id="dateOfDiagnosis"
                      // label="Name"
                      name="dateOfDiagnosis"
                      type="date"
                      autoComplete="dateOfDiagnosis"
                      placeholder={this.state.TypeObj.dateOfDiagnosis}
                      onChange={(event) => {
                        // console.log("kkkk;   ", this.state.TypeObj.dateOfDiagnosis)
                        this.setState({ dateOfDiagnosis: event.target.value });
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      InputProps={{
                        classes: { input: this.props.classes.input2 },
                      }}
                      variant="outlined"
                      required
                      fullWidth
                      id="notes"
                      // label="Name"
                      name="notes"
                      type="text"
                      autoComplete="Notes"
                      placeholder={this.state.TypeObj.notes}
                      onChange={(event) => {
                        // console.log("kkkk;   ", this.state.TypeObj.notes)
                        this.setState({ notes: event.target.value });
                      }}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={() => {
                    this.handleUpdate();
                    this.getData();
                    // console.log("user: " , obj);
                    // handleSignup()
                  }}
                >
                  Edit
                </Button>
              </form>
            </div>
            {/* <Box mt={5}>
                    <Copyright />
                </Box> */}
          </Container>
        </Modal>

        <Modal
          key="1"
          open={this.state.openModal2}
          onClose={this.handleCloseModal2}
          aria-labelledby="simple-modal-title1"
          aria-describedby="simple-modal-description2"
        >
          <Container component="main" maxWidth="xs">
            {/* <CssBaseline /> */}
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <AddBoxIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Add
              </Typography>
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      InputProps={{
                        classes: { input: this.props.classes.input2 },
                      }}
                      variant="outlined"
                      required
                      fullWidth
                      id="relation"
                      label="relation"
                      name="relation"
                      type="text"
                      autoComplete="relation"
                      // placeholder={this.state.TypeObj.name}
                      onChange={(event) => {
                        this.setState({ relation: event.target.value });
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      InputProps={{
                        classes: { input: this.props.classes.input2 },
                      }}
                      variant="outlined"
                      required
                      fullWidth
                      id="problem"
                      label="Problem"
                      name="problem"
                      type="text"
                      autoComplete="problem"
                      // placeholder={this.state.TypeObj.name}
                      onChange={(event) => {
                        this.setState({ problem: event.target.value });
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      InputProps={{
                        classes: { input: this.props.classes.input2 },
                      }}
                      variant="outlined"
                      required
                      fullWidth
                      id="dateOfDiagnosis"
                      // label="Date Of Diagnosis"
                      name="dateOfDiagnosis"
                      type="date"
                      autoComplete="dateOfDiagnosis"
                      // placeholder={this.state.TypeObj.name}
                      onChange={(event) => {
                        this.setState({ dateOfDiagnosis: event.target.value });
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      InputProps={{
                        classes: { input: this.props.classes.input2 },
                      }}
                      variant="outlined"
                      required
                      fullWidth
                      name="notes"
                      label="Notes"
                      type="text"
                      id="notes"
                      autoComplete="notes"
                      // placeholder={this.state.TypeObj.description}
                      onChange={(event) => {
                        // console.log('hhhhhhhhhhhhhhhhhh' , event.target.value)
                        this.setState({ notes: event.target.value });
                      }}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="button"
                  variant="contained"
                  fullWidth
                  color="primary"
                  className={classes.submit}
                  onClick={() => {
                    this.handleAdding();
                    this.getData();
                    // console.log("user: " , obj);
                    // handleSignup()
                  }}
                >
                  Add
                </Button>
              </form>
            </div>
            {/* <Box mt={5}>
                    <Copyright />
                </Box> */}
          </Container>
        </Modal>
      </div>
    );
  }
}

export default withStyles(useStyles)(FamilyHistoryStep);
