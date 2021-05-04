import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import  { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Fab from '@material-ui/core/Fab'
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from "react-router-dom";
import "./orders.css";
import UserInfo from "../ClinicalDashBoard/userInfo";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
var object  = {}
const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor : "white",
    padding:"1em",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    fontSize:"1.1em",
    fontFamily:"Dosis"
  },
  input2 :{
    height:"10px"
  },
  iconPlus:{
    margin: "auto",
    textAlign:"center"
  },
  button: {
    margin: theme.spacing(1),
    fontFamily: 'Roboto Slab'
  },
 
 
});



var id = 0;
var rowsToKeep = [];
const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

class PatientLabOrders extends Component {
  constructor(props) {
    super(props);
    
    this.state = { 

      typeId:0,
      openModal1:false,
      openModal2:false,
      TypeObj : {},
      investigation_type:"",
      date :""  ,
      comments: "cc",
      status: "sc",
      doctor_name: "sa",
      userObj:{},
      ptId:1,
      labs:[],
      acceptedIds:[],
      labId:1,
      userName:""

          }
        }
       async componentDidMount(){
         console.log("kkkkk: ",this.props.match.params.ptId);
         this.setState({ptId : this.props.match.params.ptId})
         this.setState({acceptedIds:[]});
        await this.getLabsByPId();
           this.getPatientDetails()
        }
        getPatientDetails = ()=>{
          var details = {
            type:0,
            id:this.state.ptId,
            labId:localStorage.getItem("labId"),
           }
           var formBody = [];
           for (var property in details) {
             var encodedKey = encodeURIComponent(property);
             var encodedValue = encodeURIComponent(details[property]);
             formBody.push(encodedKey + "=" + encodedValue);
           }
           formBody = formBody.join("&");
           fetch(`http://localhost:3000/pt/getPtById`, {
             method: 'POST',
             headers: {
               'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
             },
             body: formBody
           }).then((resp)=>{
             resp.json().then((data)=>{
               console.log("Patient ;  " , data)
               this.setState({userObj: data[0]});
           
             })
           }).catch(()=>{
             console.log("error Getting Here")
           })
        }

        getLabsByPId = async ()=> {
          var details = {
           type:0,
           ptId:this.props.match.params.ptId,
           labId : localStorage.getItem("labId")
          }
          var formBody = [];
          for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
          }
          formBody = formBody.join("&");
      
      
          await fetch(`http://localhost:3000/lab/getOrderByPtId`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody
          }).then(async(resp)=>{
            resp.json().then(async(data)=>{
              console.log("Patient Labs Order;  " , data)
              await this.setState({labs: data});
          
            })
          }).catch(()=>{
            console.log("error Getting Here")
          })
      
        }
        
        getTypeByID = async(id) => {
          console.log("cdxg:    ")
      
          var details = {
            id:id
          }
          var formBody = [];
          for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
          }
          
          fetch(`http://localhost:3000/radio/getAll`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody
          }).then((resp)=>{
            console.log("Getting: " , resp);
            resp.json().then((data)=>{
              console.log("dedd;  " , data[0])
              this.setState({
                TypeObj:data[0]
              })
              object = data
            })
          }).catch(()=>{
            console.log("errror")
          })
        }
        getRadioOrderTypesList = (radio_orderList) =>{
        for(var type in radio_orderList){
            console.log("type: ", type.name);
        }
    }
    handleopenModal1 = () => {
      this.setState({openModal1 : true})
    };
  
     handleClose = () => {
      this.setState({openModal1 : false})
    };
    handleopenModal2 = () => {
      this.setState({openModal2 : true})
    };
  //  'http://localhost:3000/radio/getAll
    getData = async()=>{
      await axios.post('http://localhost:3000/lab/getOrderByPtId' ,{
        ptId : this.state.userName
      } ).then(async resp => {
        console.log("resp : " ,)
         this.setState({
            labs : resp.data
        })
        // console.log("resp.data: " , resp.data);
      
      })
      
    }
  componentDidUpdate(){
    this.rendering()
  }
     handleCloseModal2 = () => {
      this.setState({openModal2 : false})
    };
    
    
 

    rendering = () =>{
      const { todos } = this.state;
        return(
          
          <div className="container gridDataContent " style={{marginTop : "10em"}}>
            

            <div className="row justify-content-center align-items-center borderedGrid  ">
              <div className="col-8 mt-5">
                <UserInfo  id = {this.props.match.params.ptId}/>
                {/* {
                  this.state.userName && 
                  <UserInfo  id = {this.state.userName}/>
                  
                } */}
                {/* <div className="row text-center">
                  <div className="col-12 col-md-6 headerSpan">
                    <span className="leftSide">Patient Name: </span>
                  </div>
                  <div className="col-12 col-md-6 headerSpan">
                    <span className="rightSide">{this.state.userObj.firstName} {this.state.userObj.lastName}</span>
                  </div>
                </div>
                <div className="row text-center">
                  <div className="col-12 col-md-6 headerSpan">
                    <span className="leftSide">Patient Phone</span>
                  </div>
                  <div className="col-12 col-md-6 headerSpan">
                  <span className="rightSide">{this.state.userObj.phone}</span>
                  </div>
                </div>
                <div className="row text-center">
                  <div className="col-12 col-md-6 headerSpan">
                    <span className='leftSide'>Patient Address</span>
                  </div>
                  <div className="col-12 col-md-6 headerSpan">
                  <span className="rightSide">{this.state.userObj.address}</span>
                  </div>
                </div> */}

                </div>
                <div className="col-10 mt-5 ">
                <div className = "row  justify-content-center align-items-center" style={{ height: 400}}>
                  {/* {console.log("errror : " , this.state.labs)} */}
               
                 
                 <DataGrid className="datagrid bg-light  rounded " style={{textAlign:"center"}}
                  rows={this.state.labs} columns={[
                  { field: 'id', headerName: 'ID', width: 70 },
                  { field: 'result', headerName: 'Result', width: 130 },
                  { field: 'date', headerName: 'Date', width: 130 },
                  { field: 'comments', headerName: 'Comments', width: 200 },
                  { field: 'status', headerName: 'Status', width: 130 },
                  { 
                    field: 'Accepted',
                    headerName: 'Accepted',
                    width: 250,
                    renderCell: (params) => (
                      <>
                        {/* {console.log("params",params)} */}
                        
                        
                        { 
                        params.row.LfDId ?(
                       <div className="row justify-content-center align-content-center" >
                            <CheckCircleOutlineIcon style={{color : "#395c6b"}}/>
                          <h5>Accepted</h5>

                       </div>
                        ):(
                          <div className="row justify-content-center align-content-center" >
                          <HighlightOffIcon style={{color : "#395c6b"}}/>
                        <h5>Not Accepted</h5>

                     </div>
                      )

                        }
                      </>
                    ),
                  }
            
                    ]} pageSize={4} autoHeight="true"
                      checkboxSelection  onRowSelected={async (row) => {
                 
                        }} getRowId ={(row) =>{
                            
                        }}
                        onSelectionModelChange ={(row)=>{
                          console.log("yes " , row.selectionModel);
                          this.setState({acceptedIds : row.selectionModel})
                        }}
                        onRowClick = {(row)=>{
                            console.log("yyyys" , row);
                            id = row.row.id;
                            this.setState({typeId : row.row.id});
                        }}
                         />

               
            </div>
            <div className="row justify-content-center mt-3 py-3">
                      <Button
                          variant="contained"
                        
                          size="small"
                          
                          className={this.props.classes.button , this.props.classes.deleteButton}
                          
                          style={{ marginLeft: 16 , backgroundColor :"#395c6b" , color:"white" }}
                          onClick={async ()=>{
                            //  console.log("delete function: " , params.row.id);
                            this.handleAccept();
                            // this.refreshAfterDeletion(params.row.id);
                          }}
                        >
                          Accept
                      </Button>
              </div> 
                </div>
              
                </div>    
            
            
              <div className="row mt-4 justify-content-center">
              
                      </div>
                    </div>
        
        )
    }
    handleAccept = () =>{
      console.log("Accepted IDS:  " , this.state.acceptedIds )
      var details = {
        acceptedIds : this.state.acceptedIds,
        labFdId : localStorage.getItem("userId"),
        labId: localStorage.getItem("userId")
      }

      
      console.log("detilaas : " , details)

      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      console.log("formging:     " , formBody)
      console.log("formging:     " , JSON.stringify(details))
      
  fetch('http://localhost:3000/lab/setAccept', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
      }).then((resp)=>{
        console.log("Getting: " , resp);
        resp.json().then((data)=>{
          console.log("ddddddddddddddddd;  " , data[0])
          this.setState({
            TypeObj:data[0]
          })
          // object = data
        })
      }).catch(()=>{
        console.log("errror")
      })
      this.props.history.push("./orderLabList");
      // this.getData();
    }


    render() { 
      const { classes } = this.props;
      const { todos } = this.state;
        
  return (
    <div className="hero">
      
        {this.rendering()}
        {/* <input type="text"   name ="userName" onChange={(e)=>{
          this.setState({userName: e.target.value})
          
        }}/>
        <button className="btn btn-primary" onClick={()=>{
          this.getData();
        }}>Search</button> */}

<Modal
  open={this.state.openModal1}
  onClose={this.handleClose}
  aria-labelledby="simple-modal-title"
  aria-describedby="simple-modal-description"
>

</Modal>


<Modal
key="1"
  open={this.state.openModal2}
  onClose={this.handleCloseModal2}
  aria-labelledby="simple-modal-title1"
  aria-describedby="simple-modal-description2"
>
<Container component="main" maxWidth="xs">
      {}
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
              InputProps={{ classes: { input: this.props.classes.input2 } }}
                variant="outlined"
                required
                fullWidth
                id="investigation_type"
                label="investigation_type"
                name="investigation_type" 
                type="text"
                autoComplete="investigation_type"
                onChange = {(event) =>{
                  this.setState({investigation_type : event.target.value});
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
              InputProps={{ classes: { input: this.props.classes.input2 } }}
                variant="outlined"
                required
                fullWidth
                name="date"
                label="date"
                type="text"
                id="date"
                autoComplete="current-password"
                onChange = {(event) =>{
                  this.setState({date : event.target.value});
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
              InputProps={{ classes: { input: this.props.classes.input2 } }}
                variant="outlined"
                required
                fullWidth
                id="comments"
                label="comments"
                name="comments" 
                type="text"
                autoComplete="comments"
                onChange = {(event) =>{
                  this.setState({comments : event.target.value});
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
              InputProps={{ classes: { input: this.props.classes.input2 } }}
                variant="outlined"
                required
                fullWidth
                id="status"
                label="status"
                name="status" 
                type="text"
                autoComplete="status"
                onChange = {(event) =>{
                  this.setState({status : event.target.value});
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
              InputProps={{ classes: { input: this.props.classes.input2 } }}
                variant="outlined"
                required
                fullWidth
                id="doctor_name"
                label="doctor_name"
                name="doctor_name" 
                type="text"
                autoComplete="doctor_name"
                onChange = {(event) =>{
                  this.setState({doctor_name : event.target.value});
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="button"
            variant="contained"
            color="primary"
            fullWidth
            className={classes.submit}
            onClick={()=>{
              this.handleAccept();
              this.getData();
            
            }}
          >
            Accept
          </Button>
          
        </form>
      </div>
   
    </Container>
</Modal>
    </div>
 
  );
    }
}
 
export default withStyles(useStyles)(PatientLabOrders); 