import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import DataTableComp from "../typesGenerator/dataTable";
import problemType from "./clinicalDB.json";


class PatientProblems extends Component {
  constructor(props) {
    super(props);
    
    this.state = { 
      pId:25, ///////////*******////////*ToDO: it is fixed you must change it */
      columns:[],
      data:[],
      type:""
          }
        }
    async componentDidMount(){
      ///////////////*****Fixed******//////////////////
      var type = "";  
      console.log("props:  ", this.props);
      if(this.props.type){
        type = this.props.type; 
      }
      else{
        type = this.props.match.params.type; 
      }
      this.setState({type: type})
      this.setState({pId : this.props.id})

      await this.handleDataTableColumns(type);
      await this.getProblems(type);
    }
      
    handleDataTableColumns = (type)=>{ // handle Columns from json file which sent to dataTable
      var temp = [];
      for(var p in problemType[type].columnsTable ){
        temp.push(problemType[type].columnsTable[p]);
      }
      this.setState({columns : temp});

    }
        
    getTypeByID = async(row) => {
        console.log("dkkdkdkdkdkdkdkdkdk:    " , row);
        this.setState({TypeObj : row});          
    }



    getProblems = (type)=>{ // get all Allergy prolems for this patient from DB
      var details = {
        // id:this.props.id /// you should change this to props
        ptId:13 /// you should change this to props
       }
       var formBody = [];

       for (var property in details) {
         var encodedKey = encodeURIComponent(property);
         var encodedValue = encodeURIComponent(details[property]);
         formBody.push(encodedKey + "=" + encodedValue);
       }
       formBody = formBody.join("&");

       fetch(`${problemType[type].getAllergyProblemsForPatient}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
      }).then(async(resp)=>{
        resp.json().then(async(data)=>{
          console.log("Data:  " , data)
          await this.setState({data: data});
      
        })
      }).catch(()=>{
        console.log("error Getting Here")
      })
  }


    rendering = () =>{
        return(
          <Container className="container mt-5"> 
     
                <Row className= "py-3">
                    <Col>
                        {
                          problemType && this.state.type && (
                            <>
                            <h3>{problemType[this.state.type].title}</h3>
                            <div>{problemType[this.state.type].description}</div>
                            </>
                          )
                        }
                    </Col>
              </Row>

      <Row className= "py-3" >
            <div className = "row  align-items-center justify-content-center" >
            <DataTableComp  data = {this.state.data}
                  columns = {this.state.columns}
                  title= ""
            />
            </div> 
      </Row>
                    </Container>
        
        )
    }



    render() { 

            return (
                <div className="">
                    {this.rendering()}
                </div>
            
            );
    }
}
 
export default PatientProblems; 



