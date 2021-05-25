import React, { Component } from 'react';
import loginUser from "../loginDB.json";
import userType from "../usersDB.json";
import FormGenerator from "./formGeneration";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorHandeling from "../ErrorHandling/errorHandeling"

//todo 1- link forgoten pwd 2- add image 
//log in page 

class Login extends Component { //for Doctor - nurse - pathologist - chemist
    constructor(props) {
        super(props);
     
        this.state = { 
            formInputs : [],
            type:"",
            addingUserObject : {},
            errorMessage :""


         }
    }
    async componentDidMount(){
      console.log("propsssss: " , this.props)
        await this.handleDataTableColumns();
    }

    handleDataTableColumns = () => {
        
        var newState = this.state;
        for(var property in loginUser.state ){
            newState[property] = ""; 
        }
        
        
        var temp = []
        for(var p in loginUser.modalAdditionForms ){
          temp.push(loginUser.modalAdditionForms[p])
        } 

        this.setState({formInputs : temp})

    }


    handleChange = (evt) =>{
        const value = evt.target.value;
        this.setState({
          [evt.target.name]: value
        });
      }
      setRoleName =(role)=>{
        switch(role){
          case 2 :{
            return "doctorFD"
          }
          case 3 :{
            return "labFD"
          }
          case 4 :{
            return "radioFD"
          }
          case 5 :{
            return "pathologyFD"
          }
        }
      }

    handleSignup = async()=>{
        var details = {};

      for(var property in loginUser.state ){
        details[property] = this.state[property]; 
        
      }
      console.log("details : " , details)

       var formBody = [];
       for (var property in details) {
         var encodedKey = encodeURIComponent(property);
         var encodedValue = encodeURIComponent(details[property]);
         formBody.push(encodedKey + "=" + encodedValue);
       }
       formBody = formBody.join("&");
       console.log("formBodu : " , formBody);

       fetch(`${loginUser.addUser}`, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
         },
         body: formBody
       }).then((resp)=>{
         console.log("resp.type: " ,typeof(resp) , resp.data)
        resp.json().then((data)=>{
          // setData on LocalStorage
          console.log("data:  " , data);
          localStorage.setItem('role', data.role);
          localStorage.setItem('userId', data.userId);

          this.props.getAuthorization(true); // for App to flip the Login and logout button
          // this.props.history.push("/publicDashBoard")

          // if(parseInt(data.role) == 1){
          //   this.props.history.push("/welcomePage");
          // }


          var roleName = this.setRoleName(data.role); // to get if he is LabFD or pathologyFD or doctorFD or radioFD
          if(parseInt(data.role) == 2 ||  parseInt(data.role) == 3 || parseInt(data.role) == 4 || parseInt(data.role) == 5){
            console.log("heeereeeee" , roleName ," data.role: " , typeof(data.role))
            axios.post(`${userType[roleName].getLabIdInSession}` ,{
              userId: data.userId
            } ,{
            } ).then(async resp => {
              console.log("resppppppp : " ,resp);
              localStorage.setItem('labId', resp.data.labId);
            
            }).catch((e)=>{
              toast('🦄 can not get this FrontDisk Lab....', {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            })
          }

          if(parseInt(data.role) > 2 ){
            this.props.history.push("/publicDashBoard")
          }
        //   if(data.role == "done"){
        //     history.push("/welcomePage");
        //     console.log("heeereeeee")
            
        //   }
      
        })
          // resp.json();
          
        }).catch(()=>{
          this.setState({errorMessage :"SomethingWrong...."})
       })
    //    this.props.history.push("")
     
     }


    render() { 
        return (
          <div className="container-fluid" style={{height:'100%' }}>
        <ToastContainer/>
        <div className="row align-items-center" style={{height:'100%' }}>
            <div className="col-4 justify-content-center no-gutter">
      
               <div className="row">
                 <div className="col justfiy-content-center">

                 <h3>Wellcome Back!</h3>
                 </div>
                 </div>
                {console.log("state: " , this.state)}
                {
                this.state.formInputs && this.state.formInputs.length > 0 && (
                <FormGenerator  ModalInputs = {this.state.formInputs}
                handleChange = {this.handleChange}
                handleSubmit= {this.handleSignup}
                buttonTitle = "Login"/>
                )
                }
              
            </div>
            <div className="col-8"style={{height:'100%', backgroundImage:"url('./images/disk-orginal.jpg') ",  backgroundRepeat: "no-repeat",
  backgroundSize: "cover"}}></div>
            </div>
            { this.state.errorMessage &&(
              <ErrorHandeling errorMessage={this.state.errorMessage}/>
              )
            }
            </div>
         );
    }
}
 
export default Login;