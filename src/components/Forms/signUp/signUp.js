import React, { Component } from 'react';
import userType from "../../usersDB.json";
import FormGenerator from "../formGeneration"




class SignupList1 extends Component { //for Doctor - nurse - pathologist - chemist
    constructor(props) {
        super(props);
        this.state = { 
            formInputs : [],
            type:"",
            addingUserObject : {},


         }
    }
    async componentDidMount(){
        this.setState({type: this.props.match.params.type})
        await this.handleDataTableColumns();
    }

    handleDataTableColumns = () => {
        var type = this.props.match.params.type;

        this.setState({type});
        
        var temp = []
        console.log("file: ", userType)
    
        var newState = this.state;
        for(var property in userType[type].state ){
          // console.log("propertyyyy :  " , property)
          newState[property] = ""; 
        }
       
    
        // if the page Will Contain modal
        
        for(var p in userType[type].modalAdditionForms ){
          // console.log("p : " , columns[type].modalForms[p]);
          temp.push(userType[type].modalAdditionForms[p])
        } 
        // console.log("temp : "  , temp)
        this.setState({formInputs : temp})
    

    }
    handleChange = (evt) =>{
        console.log("evnet " , evt.target.value)
        const value = evt.target.value;
        this.setState({
          [evt.target.name]: value
        });
      }

       handleSignup = async()=>{
       
     
        var details = {
          // 'firstName':this.state.firstName,
          //  'lastName': this.state.lastName, 
          //  'Date': this.state.Date,
          //  'degree' : this.state.degree,
          //  'userName': this.state.userName,
          // 'password': this.state.password,
          // 'Email': this.state.Email,
          // 'phone' : this.state.phone,
          // 'address': this.state.address,
      };
      for(var property in userType[this.state.type].state ){
        // console.log("propertyyyy :  " , property)
        details[property] = this.state[property]; 
      }
      
       
       var formBody = [];
       for (var property in details) {
         var encodedKey = encodeURIComponent(property);
         var encodedValue = encodeURIComponent(details[property]);
         formBody.push(encodedKey + "=" + encodedValue);
       }
       formBody = formBody.join("&");
       console.log("formBodu : " , formBody)
       fetch(`${userType[this.state.type].addUser}`, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
         },
         body: formBody
       }).then((resp)=>{
         console.log("it is inserted", resp.text());
       }).catch(()=>{
         console.log("errror")
       })
    //    this.props.history.push("")
     
     }


    render() { 
        return ( 
            <div className="container">
                {console.log("state: " , this.state)}
                {
                this.state.formInputs && this.state.formInputs.length > 0 && (
                <FormGenerator  ModalInputs = {this.state.formInputs}
                handleChange = {this.handleChange}
                handleSubmit= {this.handleSignup}
                buttonTitle = "Signup"/>
                )
                }
            </div>
         );
    }
}
 
export default SignupList1;