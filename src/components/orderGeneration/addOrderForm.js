import axios from 'axios';
import React, { Component } from 'react';
import FormGenerator from "../Forms/formGeneration";
import inputs from "../ordersdb.json";




class AddOrderForm extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      formInputs : [],
      type:"",
      drId:"",
      ptId:"",
      drFdId:"",
      labId:""

     }
  }
  async componentDidMount(){
    var type = this.props.match.params.type;
    console.log("hhhhhhhhhhhhhhhhhhh: " , this.props.history.location.state)
    // var type = "lab";
    await this.setState({type});
    this.setState();
    if(this.props.match.params.id){
     this.setState({ptId: "2"});
    }

    var temp = []

    for(var p in inputs[type].modalForms ){
      temp.push(inputs[type].modalForms[p])
    } 
    console.log("temp : "  , temp)
    var options = []


    console.log("options")
    console.log(options)

    if(this.state.type == "lab")
    {
      await axios.get("http://localhost:8080/lab/getAll").then(res=>{
        res.data.map(row=>{
          options.push({
            "value" : row.id,
            "text" : row.name
          })
        })
      }).catch(err=>{
        alert(err)
      })
      temp.push({
      
        "type" : "select",
        "name" : "labId",
        "options" : options
      }

    )

    }else if(this.state.type == "radio")
    {
      await axios.get("http://localhost:8080/radio/getAll").then(res=>{
        res.data.map(row=>{
          options.push({
            "value" : row.id,
            "text" : row.name
          })
        })
      }).catch(err=>{
        alert(err)
      })
      temp.push({
      
        "type" : "select",
        "name" : "radioId",
        "options" : options
      }

    )

    }
    else
    {
      await axios.get("http://localhost:8080/patho/getAll").then(res=>{
        res.data.map(row=>{
          options.push({
            "value" : row.id,
            "text" : row.name
          })
        })
      }).catch(err=>{
        alert(err)
      })
      temp.push({
      
        "type" : "select",
        "name" : "pathoId",
        "options" : options
      }

    )

    }


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
    if(evt.target.name == "labId")
    {
      alert(value)
    }
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
  

    // switch(this.state.type){
    //   case "lab":{
    //     details["labId"] = localStorage.getItem("labId") ;
    //     break;
    //   }
    //   case "pathology":{
    //     details["pathoId"] = localStorage.getItem("pathoId");
    //     break;
    //   }
    //   case "radio":{
    //     details["radioId"] = localStorage.getItem("radioId");
    //     break;
    //   }
    // }


  console.log("details", details)


  // fetch(`${inputs[this.state.type].addOrder}`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  //   },
  //   body: formBody
  // })
  axios.post(`${inputs[this.state.type].addOrder}`, details)
  .then((resp)=>{

    console.log("successfully added....." );
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
























