import React, { Component } from 'react';
import userType from "../../usersDB.json";
import FormGenerator from "../formGeneration"
import axios from 'axios';
import Container from 'react-bootstrap/Container';

const arr = [
  {id:1 , name:"lab1" , abbreviation:"" ,description:""},
  {id:3 , name:"lab1" , abbreviation:"" ,description:""},
  {id:2 , name:"lab1" , abbreviation:"" ,description:""}
]

class SignupList1 extends Component { //for Doctor - nurse - pathologist - chemist
    constructor(props) {
        super(props);
        this.state = { 
            formInputs : [],
            type:"",
            addingUserObject : {},
            list:[], //for labs or ....
            options:[]


         }
    }
    async componentDidMount(){
      var list = []
      this.setState({type: this.props.match.params.type})
      if(this.props.match.params.type === "labFD"){
         await this.getDataForFD();
      }
      
    }

    handleFormInputs = async (list) => {
      console.log("list: " , this.state.list)
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
        var option ={}
        var temp2=[]
        for(var p in userType[type].modalAdditionForms ){
          console.log("p : " , p);
          temp.push(userType[type].modalAdditionForms[p])
          if(type === "labFD" && p=="labId" ){
            for(var place of this.state.list){
              var obj = {value : place.id , text : place.name}
              temp2.push(obj);
            }
            this.setState({options : temp2})
          
          }
        } 
        this.setState({formInputs : temp})
      

    }


    handleChange = (evt) =>{
        console.log("evnet " , evt.target.value)
        const value = evt.target.value;
        this.setState({
          [evt.target.name]: value
        });
      }
    getLabsName = () =>{
  // var options = {};
  //     for(var p in userType[type].state ){
  //       if(p === "labId"){
  //         console.log("uuuuuuuuuuuuuuuuuuuu" ,p)
  //         columns[type].columnsTable[p]["cell"] =  
  //         temp.push(columns[type].columnsTable[p])
  //       }
  //       else{
  
  //         temp.push(columns[type].columnsTable[p])
  //       }
  //     }
      // fetch(`http://localhost:3000/frontdisk/addLabFrontDisk`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      //   },
      //   body: formBody
      // }).then((resp)=>{
      //    resp.text().then((text)=>{
      //      console.log("text:  " , text)
      //    });
      // }).catch(()=>{
      //   console.log("errror")
      // })

    }
    getDataForFD =()=>{//Ex: get lab names for labFD
      axios.get(`http://localhost:3000/labs/getAll` ,{
      } ).then(async resp => {
        console.log("resp : " ,resp)
     
        this.setState({list : resp.data})
        console.log("resp.data: " , resp.data);
        // return resp.data
       this.handleFormInputs(resp.data);
      
      })
    }
       handleSignup = async()=>{
       
     
        var details = {};

      for(var property in userType[this.state.type].state ){
        // console.log("propertyyyy :  " , property)
        details[property] = this.state[property]; 
      }
     console.log("details: " , details);
      
       
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
          resp.text().then((text)=>{
            console.log("text:  " , text)
          });
       }).catch(()=>{
         console.log("errror")
       })
       this.props.history.push("/login")
     
     }


    render() { 
        return ( 
            <Container>
                {console.log("state: " , this.state)}
                {
                this.state.formInputs && this.state.formInputs.length > 0 && (
                <FormGenerator  ModalInputs = {this.state.formInputs}
                handleChange = {this.handleChange}
                handleSubmit= {this.handleSignup}
                options = {this.state.options}
                buttonTitle = "Signup"/>
                )
                }
            </Container>
         );
    }
}
 
export default SignupList1;