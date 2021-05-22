import React, { Component } from 'react';
import loginUser from "../loginDB.json";
import FormGenerator from "./formGeneration";
import axios from 'axios';

//todo 1- link forgoten pwd 2- add image 
//log in page 

class Login extends Component { //for Doctor - nurse - pathologist - chemist
    constructor(props) {
        super(props);
     
        this.state = { 
            formInputs : [],
            type:"",
            addingUserObject : {},


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
        console.log("temp : "  , temp)
        this.setState({formInputs : temp})

    }


    handleChange = (evt) =>{
        console.log("evnet " , evt.target.value)
        const value = evt.target.value;
        console.log("kkkkkkkk: ",  [evt.target.name])
        this.setState({
          [evt.target.name]: value
        });
      }

    handleSignup = async()=>{
        var details = {};

      for(var property in loginUser.state ){
        details[property] = this.state[property]; 
        
      }
      console.log("details : " , details)
      // details["password"]= this.state[property].toString();
      // console.log("passwordType:" , typeof(details["password"]));
      
       
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
        resp.json().then((data)=>{
          console.log("data:  " , data);
          localStorage.setItem('role', data.role);
          localStorage.setItem('userId', data.userId);
          this.props.getAuthorization(true);
          // this.props.history.push("/publicDashBoard")
          if(parseInt(data.role) > 2 ){
            this.props.history.push("/publicDashBoard")
          }
          // if(parseInt(data.role) == 1){
          //   this.props.history.push("/welcomePage");
          // }
          if(parseInt(data.role) == 2){
            console.log("heeereeeee")
            axios.post('http://localhost:3000/lab/getLabByUser' ,{
              userId: data.userId
            } ,{
            } ).then(async resp => {
              console.log("resppppppp : " ,resp);
              localStorage.setItem('labId', resp.data.labId);
             
              // this.props.history.push("/publicDashBoard")
           
              // setLabs(resp.data)
              // console.log("resp.data: " , resp.data);
            
            })
          }
        //   if(data.role == "done"){
        //     history.push("/welcomePage");
        //     console.log("heeereeeee")
            
        //   }
      
        })
          // resp.json();
          
        }).catch(()=>{
         console.log("errror")
       })
    //    this.props.history.push("")
     
     }


    render() { 
        return (
          <div className="container-fluid" style={{height:'100%' }}>
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
            <div className="col-8 bg-primary"style={{height:'100%' }}></div>
            </div>
            </div>
         );
    }
}
 
export default Login;