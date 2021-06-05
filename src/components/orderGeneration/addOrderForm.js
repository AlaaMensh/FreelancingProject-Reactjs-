import React, { Component } from 'react';
import inputs from "../ordersdb.json";
import FormGenerator from "../Forms/formGeneration";




const list = [
  {id:1 , name: "alaa" },
  {id:2 , name: "lolo" },
  {id:3 , name: "iii" }
]
class AddOrderForm extends Component {  
  constructor(props) {
    super(props);
    this.state = { 
      formInputs : [],
      type:"",
      drId:"",
      ptId:"",
      drFdId:"",
      options:""

     }
  }
  componentDidMount(){
    var type = this.props.match.params.type;
    console.log("hhhhhhhhhhhhhhhhhhh: " , this.props.history.location.state)
    // var type = "lab";
    this.setState({type});
    this.setState();
    if(this.props.match.params.id){
     this.setState({ptId: "2"});
    }

    var temp = []
    var option ={}
    var temp2=[]
    for(var p in inputs[type].modalForms ){
      console.log("places: , " , p)
      if( p == "places" ){
        console.log("//////////////////////////////////////")
        for(var place of list){
          // console.log("id: " , place.id , " obj:" , place)
          var obj = {value : place.id , text : place.name }
          temp2.push(obj);
        }
        console.log("options : " , temp2)
        this.setState({options : temp2})
        temp2=[]
      
      }
      // temp.push(inputs[type].modalForms[p])
    } 
    console.log("temp : "  , temp)
    this.setState({formInputs : temp});

    var newState = this.state;
    for(var property in inputs[type].state ){
      console.log("propertyyyy :  " , property)
      newState[property] = "" 
    }
    this.setState({newState})
  }
  handleChange = (evt) =>{
    console.log("evnet " , evt.target.value)
    const value = evt.target.value;
    this.setState({
      [evt.target.name]: value
    });
  }

  handleSubmit = async()=>{
      var details = {
        // 'date': this.state.date,
        // 'comments': this.state.comments,
        // 'status' : this.state.status,
        // 'ptId': this.props.match.params.id,
        // 'drId': localStorage.getItem("userId"),
        // 'labId' : localStorage.getItem("labId") 
    };

    for(var property in  inputs[this.state.type].AdditionObject){ 
      details[property] = this.state[property] ; 
    }
    details["ptId"] = this.props.match.params.id;
    details["drId"] = localStorage.getItem("userId");
  

    switch(this.state.type){
      case "lab":{
        details["labId"] = localStorage.getItem("labId") ;
        break;
      }
      case "pathology":{
        details["pathoId"] = localStorage.getItem("pathoId");
        break;
      }
      case "radio":{
        details["radioId"] = localStorage.getItem("radioId");
        break;
      }
    }


  console.log("details", details)
  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  console.log("formBodu : " , formBody)
  console.log("endpoint: " ,inputs[this.state.type].addOrder )
  fetch(`${inputs[this.state.type].addOrder}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: formBody
  }).then((resp)=>{
    console.log("///////////// , " , this.props.match)
    console.log("resp: " , resp);
    resp.text().then((msg)=>{
      console.log("successfully added....." , msg);
      if(!this.props.history.location.state){
        this.props.history.goBack();
      }
      else{ 
        this.props.history.push(`${this.props.match.url}/allOrdersForDoctor`)
      }
      // if(typeof(msg)==="object"){ //// ****************** Change it when you know the backend message *******/////
      //   this.props.history.goBack();
      // }
    })


   
  })
  .catch(()=>{
    console.log("eror")
  })
  


  
  }

  render() { 
    return (  
      <div>
        {console.log("formInputs : " , this.state.formInputs)}
        
      {
        this.state.formInputs && this.state.formInputs.length > 0 && (
          <FormGenerator  ModalInputs = {this.state.formInputs}
          handleChange = {this.handleChange}
          handleSubmit= {this.handleSubmit}/>
        )
      }
      </div>
    );
  }
}
 
export default AddOrderForm;
























