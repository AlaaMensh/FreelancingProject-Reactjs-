import React, { Component } from 'react';
import pharmacyModule from "../pharmacyModuleDB.json";
import DataTableComp from "../typesGenerator/dataTable";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


const row = [
    {quantity : "one" , drug :"one" , notes:"one" , duration:"one"},
    {quantity : "two" , drug :"two" , notes:"two" , duration:"two"},
]
class PharmacyModuleForPharmacist extends Component { // this Component to View All The Not Accepted Orders in our System
    constructor(props) {
        super(props);
        this.state = { 
            type:"",
            columns:[],
            Drugs:[] // this will be viewed in DataTable Component
         }
    }
    async componentDidMount(){
        this.setState({type: "pharmacyModule"});
        var type = "pharmacyModule";
        console.log("props: " , this.props)
     // for Pharmacist to get PatientData with code
            await this.getDataForPatientPrescriptions();
            await this.handleDataTableColumnsForPharmacist(type)
      
       
        // await this.getData(type)
    }



    handleAccept = async (id) =>{
      console.log("Accepted IDS:  " , this.state.acceptedIds )
      var details = {
        id : id,
        labFDId : localStorage.getItem("labId"),
        // labId: localStorage.getItem("labId")
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
      
  await fetch(`${pharmacyModule[this.state.type].acceptOrder}`, {
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
   
    }   

    getDataForPatientPrescriptions = async(type)=>{  // *****Change it with end point get last 10 prescription
    var details = {     
        ptCode : this.props.history.location.state,
    }
    var formBody = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    
        
    fetch(`${pharmacyModule["pharmacyModule"].getLastTenPrescription}`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
    }).then((resp)=>{
        resp.json().then((data)=>{
        console.log("All Incomming Data;  " , data)


        this.setState({ 
            allNotAcceptedOrders:data
        })
    
        })
    }).catch(()=>{
        console.log("errror")
    })
    
    }

    handleDataTableColumnsForPharmacist = (type) => {
        
        var temp = []
        for(var p in pharmacyModule[type].columnsTable ){
          if(p === "actions"){
            pharmacyModule[type].columnsTable[p]["cell"] =  (row) =>{ return(
            <div className = "row">
              <div className="col-auto">
                <button  className="btn btn-primary"
                  onClick={() => {  
                      console.log("id:  " , row)
                      this.handleAccept(row.id)
                    }}>delivered</button>
                    {/* <SessionCode  buttonValue={"Accept"}/> */}
              </div>
            
            </div>
            )
            }
            temp.push(pharmacyModule[type].columnsTable[p])
          }
          else{
    
            temp.push(pharmacyModule[type].columnsTable[p])
          }
        }
        this.setState({columns : temp})
        temp = []
        var newState = this.state;
        for(var property in pharmacyModule[type].state ){
          newState[property] = "" 
        }
        this.setState({newState})
    
        // if the page Will Contain modal
        
        // for(var p in columns[type].modalForms ){
        //   // console.log("p : " , columns[type].modalForms[p]);
        //   temp.push(columns[type].modalForms[p])
        // } 
        // // console.log("temp : "  , temp)
        // this.setState({ModalInputs : temp})
    

    }
  
    render() { 
        return (     
         
        <Container fluid>
            
            <Row className= "py-3">
                <Col>
                    <h3>All patient Drugs</h3>
                    <div>Get All Patient Drugs...</div>
                </Col>
            </Row>
            <Row className= "py-3" >
                <Col sm={10}></Col>
                    <Col sm={2}><Button variant="success"  onClick = {()=>{
                        // this.setState({formType :"add"})
                        console.log("this.props.history : " , this.props)
                   this.props.history.push({
                       pathname:`${this.props.history.location.pathname}/prescription`,
                       state:{}
                   })
                    }}>Add New</Button>{' '}</Col>
            </Row>

            <Row className= "py-3">
               <Col>
                {console.log(this.state.columns)}
                <DataTableComp  data = {row} //change it to Drugs
                  columns = {this.state.columns}
                  title=""
                  />
               </Col> 
           
         </Row>
         </Container>
         



         );
    }
}
 
export default PharmacyModuleForPharmacist;