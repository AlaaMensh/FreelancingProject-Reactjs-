import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import  { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
// import  { useState } from 'react';
import { NativeSelect } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import AddBoxIcon from '@material-ui/icons/AddBox';
import EditIcon from '@material-ui/icons/Edit';
// import AddIcon from '@material-ui/icons/AddIcon';
import Fab from '@material-ui/core/Fab'
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from "react-router-dom";
// import "./types.css";
// import EditIcon from '@material-ui/icons/Edit';

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
    // float:"right",
  },
  button: {
    margin: theme.spacing(1),
    fontFamily: 'Roboto Slab'
  },
  deleteButton: {
    backgroundColor:"#c94c4c"
  },
  editButton: {
    backgroundColor:"#c94c4c"
  }
});



var id = 0;
var rowsToKeep = [];
var rowsToBeDeleted = [];

class OrderGeneration extends Component {
  constructor(props) {
    super(props);
    
    this.state = { 
      orderlabList : [],
      typeId:0,
      openModal1:false,
      openModal2:false,
      TypeObj : {},
      investigation_type:"",
      date :""  ,
      comments: "cc",
      status: "sc",
     result:"",
      PTname: "",
      labId:1,
      ptId:"",
      file:"",
      orderType:"",
      type:"",
      base64URL:""
          }
        }
        
        getTypeByID = async(id) => {
          console.log("dkkdkdkdkdkdkdkdkdk:    ")
        
          const labObj = this.state.orderlabList.filter(lab => lab.id === id);
          console.log("typeObj : " , labObj[0])
          this.setState({
            TypeObj:labObj[0]
          })
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
    componentDidUpdate (){
      this.getData()
    }
    getData = async()=>{
      
      var details = {
        ptId:this.props.match.params.ptId,
        type:this.props.match.params.type,
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
           console.log("Data:  " , data)
           await this.setState({orderlabList: data});
       
         })
       }).catch(()=>{
         console.log("error Getting Here")
       })
      
    }
  
     handleCloseModal2 = () => {
      this.setState({openModal2 : false})
    };
    refreshAfterDeletion = (id)=>{
     this.setState({
        orderlabList: this.state.orderlabList.filter(row => row.id !== id)
     })
    }
 
    handleDelete= async(id)=>{
      var details = {
        id:id
      }
      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      
      fetch(`http://localhost:3000/${this.state.orderType}/deleteOrder`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
      }).then(()=>{
        console.log("it is deleted");
      }).catch(()=>{
        console.log("errror")
      })
        
    }
   async componentDidMount(){
     console.log("propsppppppppppp:  " , this.props.match.params.type)
     await this.setState({ptId : this.props.match.params.id});
     await this.setState({drId : localStorage.getItem("userId")});

     if(this.props.match.params.type != "lab"){
       console.log("noooooooooo");
      this.setState({labID : 1})
      // this.setState({ptId : 1})
     }

   
     await this.setState({orderType : this.props.match.params.type});
     switch(this.props.match.params.type){
         case "lab":
             this.setState({type : 0})
             break;
         case "radio":
             this.setState({type : 1})
             break;
         case "pathology":
             console.log("pathology yesss")
             this.setState({type : 2})
             break;

     }
    await this.getData()
    }
  
    handleUpdate = async ()=>{
      var details = {
        id:this.state.TypeObj.id,
        ptId:this.state.ptId,
        drId:this.state.drId,
        date: this.state.date,
        comments : this.state.comments,
        status: this.state.status,
        result: this.state.result,
      }

      // if(!details.result){
      //   details.result = this.state.TypeObj.result
      // }
      if(!details.date){
        details.date = this.state.TypeObj.date
      }
      if(!details.comments){
          details.comments =this.state.TypeObj.comments
      }
      if(!details.status){
          details.status = this.state.TypeObj.status
      }

      var Form = new FormData();
      Form.append("id" , details.id)
      Form.append("ptId" , details.ptId)
      Form.append("drId" , details.drId)
      Form.append("date" , details.date)
      Form.append("comments" , details.comments)
      Form.append("status" , details.status)
      Form.append("result" , details.result)

      console.log("details: " , details);

      for(var pair of Form.entries()) {
        console.log(pair[0]+ ', '+ pair[1]);
     }

      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");

      console.log("formBody: ", formBody)
      await fetch(`http://localhost:3000/${this.state.orderType}/updateOrder`, {
        method: 'POST',
        body: Form
      }).then((resp)=>{
        console.log("Getting: " , resp);
        resp.json().then((data)=>{
   
       
          // object = data
        })
      }).catch(()=>{
        console.log("errror")
      })
      //  var allergyObj = this.state.orderlabList.filter(row => row.id === this.state.TypeObj.id);
      this.getData()
         
    }

    componentDidUpdate(){
        console.log("hhhhhhh")
        this.rendering();
    }

    rendering = () =>{
        return(
          <div className="container gridDataContent mt-5"> 
          <div className="row">
            <div className="col-auto px-2 py-2 text-center rounded  header">
                <span className="">All Your {this.state.type} Orders</span>
            </div>
            <div className="col-10 overflow-hidden ">
                <div className="row justify-content-lg-start">

                </div>
            </div>
          </div>
            <div className = "row gridDataHeader align-items-center" style={{ height: 400, width: '100%' }}>
               <DataGrid className="datagrid bg-light  rounded MuiDataGrid-cellCenter" style={{textAlign:"center"}} rows={this.state.orderlabList} columns={[
                  { field: 'id', headerName: 'id', width: 70 },
                  { field: 'date', headerName: 'date', width: 150 },
                  { field: 'comments', headerName: 'comments', width: 150 },
                  { field: 'status', headerName: 'Status', width: 200 },              
                  { field: 'result', headerName: 'Result', width: 200 },              
              { 
                field: 'Actions',
                headerName: 'Actions',
                width: 230,
                renderCell: (params) => (
                  <strong>
                    {/* {params.value.getFullYear()} */}
                    {/* <Button
                      variant="contained"
                      color="default"
                      size="small"
                      className={this.props.classes.button}
                      startIcon={<EditIcon />}
                     
                      style={{ marginLeft: 16 }}
                      onClick={()=>{
                        this.handleopenModal1();
                        console.log("lsssssssssssssssssssssssssssssssssssss")
                        this.getTypeByID(params.row.id);
                        this.getData()
                      }
                        
                      }
                    >
                       Edit
                      
                    </Button> */}
                    {/* <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      className={this.props.classes.button , this.props.classes.deleteButton}
                      startIcon={<EditIcon />}
                      style={{ marginLeft: 16 }}
                      onClick={async ()=>{
                         console.log("delete function: " , params.row.id);
                        this.handleDelete(params.row.id);
                        this.refreshAfterDeletion(params.row.id);
                      }}
                    >
                      delete
                    </Button> */}
                  </strong>
                ),
              }]} pageSize={5}
                checkboxSelection  onRowSelected={async (row) => {
                  
                   
                  console.log("yes" , this.state.typeId);
                  }} getRowId ={(row) =>{
                      
                  }}
                  onRowClick = {(row)=>{
                      console.log("yyyys" , row);
                      id = row.row.id;
                      this.setState({typeId : row.row.id});
                  }} />
            </div> 
              <div className="row mt-4">
                    <Fab color="primary" aria-label="add" className ={this.props.classes.iconPlus} onClick = {()=>{
                       console.log("hhhhhhhh:  " , this.props.location.pathname)
                       this.props.history.push(`${this.props.location.pathname}/additionOrderForm`)
                        }}>
                          <AddIcon  />
                        </Fab>                      
                      </div>
                    </div>
        
        )
    }
    getBase64 = file => {
      return new Promise(resolve => {
        let fileInfo;
        let baseURL = "";
        // Make new FileReader
        let reader = new FileReader();
  
        // Convert the file to base64 text
        reader.readAsDataURL(file);
  
        // on reader load somthing...
        reader.onload = () => {
          // Make a fileInfo Object
          console.log("Called", reader);
          baseURL = reader.result;
          console.log(baseURL);
          resolve(baseURL);
        };
        console.log(fileInfo);
      });
    };


    handleChange =(e)=>{
      // console.log('yes' , e.target.files[0]);
      // this.setState({result: e.target.files[0]});
      // file = e.target.files[0];
      let { result } = this.state;
      result = e.target.files[0];
      this.getBase64(result)
        .then(res => {
          result["base64"] = res;
          console.log("File Is", result);
          this.setState({
            base64URL: res,
            result
          });
        })
        .catch(err => {
          console.log(err);
        });
  
      this.setState({
        file: e.target.files[0]
      });
    }
     fileChangedHandler = (event) => {
    this.setState({result : event.target.files[0]})  
      }

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
            <Select
                native
                label = "Marital Status"
               
                onChange = {(event) =>{
                this.setState({status : event.target.value});
                console.log("status" , event.target.value );
              }}                                                     
               
               >
          <option aria-label="None" value="" />
          <option value= "choice1">choice1</option>
          <option value="choice2">choice2</option>
          <option value="choice3">choice3</option>
          
        </Select>
              {/* <TextField
              InputProps={{ classes: { input: this.props.classes.input2 } }}
                variant="outlined"
                required
                fullWidth
                name="status"
                type="text"
                label="Marital status"
                id="status"
                autoComplete="status"
                defaultValue={this.state.TypeObj.status}
                // placeholder={this.state.TypeObj.investigation_type}
                onChange = {(event) =>{
                  this.setState({status : event.target.value});
                }}
                
              /> */}
            </Grid>
            <Grid item xs={12}>
              <TextField
               InputProps={{ classes: { input: this.props.classes.input2 } }}
                variant="outlined"
                required
                fullWidth
                id="date"
                name="date" 
                type="date"
                label="Date"
                autoComplete="date"
                defaultValue={this.state.TypeObj.date}
                onChange = {(event) =>{
                  console.log("kkkk;   ", this.state.TypeObj.date)
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
                name="comments"
                label="comments" 
                type="text"
                autoComplete="comments"
                defaultValue={this.state.TypeObj.comments}
                onChange = {(event) =>{
                  console.log("kkkk;   ", this.state.TypeObj.comments)
                  this.setState({comments : event.target.value});
                }}
              />
            </Grid>
            <Grid item xs={12}>
              {/* <input type="file" name="file" onChange={this.handleChange}/> */}
              <input
        style={{display:'none'}}
        accept="*"
        id="contained-button-file"
        type="file"
        onChange={(e)=>{
          this.fileChangedHandler(e)
        }}
      />
      <label htmlFor="contained-button-file">
        <Button style={{marginLeft:'40%'}} variant="contained" color="primary" component="span">
          Upload
        </Button>
      </label>
            </Grid>
            
           
          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={()=>{
              this.handleUpdate();
              this.getData();
            }}
          >
           
            Edit
          </Button>

          
        </form>

      </div>
     
    </Container>
</Modal>


    </div>
 
  );
    }
}
 
export default withStyles(useStyles)(OrderGeneration); 