import React, { Component } from 'react';
import pharmacyModule from "../pharmacyModuleDB.json";
import DataTableComp from "../typesGenerator/dataTable";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ModalForView from './modalForView';
import {  Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
// import { Worker } from '@react-pdf-viewer/core';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { Document } from 'react-pdf/dist/esm/entry.webpack';
import samplePDF from "./Alaa_El-Menshawy.pdf";
import MyPdfViewer from "./singlePage";
pdfjs.GlobalWorkerOptions.workerSrc = 'pdf.worker.min.js';


const row = [
    {created_date : "one" , notes:"one" , duration:"one"},
    {created_date : "two" , notes:"two" , duration:"two"},
]
class PharmacyModuleForDoctor extends Component { // this Component to View All The Not Accepted Orders in our System
    constructor(props) {
        super(props);
        this.state = { 
            type:"",
            columns:[],
            Drugs:[], // this will be viewed in DataTable Component
            openModal:false,
            numPages:null,
         }
    }
    async componentDidMount(){
        this.setState({type: "pharmacyModule"});
        var type = "pharmacyModule";
              //**** */ for Doctor to get PrescriptionData for this Doctor
        await this.handleDataTableColumnsForDoctor(type);
        await this.getDataForDoctorPrescriptions(type)
  
    }
    onDocumentLoadSuccess({ numPages }) {
      this.setState(numPages);
    }
    handleClose = () => {
      this.setState({openModal : false})
    };

    handleopenModal = () => {
      this.setState({openModal : true})
    };


    handleDataTableColumnsForDoctor = (type) =>{
        console.log("type: " , type ,"  ,,,,,,," ,)
        var temp = []
        for(var p in pharmacyModule[type].columnsTableForDoctor ){
            if(p === "actions"){
              pharmacyModule[type].columnsTableForDoctor[p]["cell"] =  (row) =>{ return(
              <div className = "row">
                <div className="col-auto">
                  <button  className="btn btn-primary"
                    onClick={() => {  
                        console.log("id:  " , row)
                        this.handleopenModal()
                      }}>Show Prescription</button>
                      {/* <SessionCode  buttonValue={"Accept"}/> */}
                </div>
              
              </div>
              )
              }
              temp.push(pharmacyModule[type].columnsTableForDoctor[p])
            }
            else{
              temp.push(pharmacyModule[type].columnsTableForDoctor[p])
            }     
        }
        this.setState({columns : temp})
        temp = []
        var newState = this.state;
        for(var property in pharmacyModule[type].state ){
          newState[property] = "" 
        }
        this.setState({newState})
    }
    getDataForDoctorPrescriptions = () =>{ // getData for Doctor Prescriptions
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
      
        
      fetch(`${pharmacyModule["pharmacyModule"].getLastTenPrescription}/${localStorage.getItem("userId")}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          }
        
        }).then((resp)=>{
          resp.json().then((data)=>{
            console.log("All Incomming Data;  " , data)
            this.setState({ 
              Drugs:data
            })
      
          })
        }).catch(()=>{
          console.log("errror")
        })
    }
    renderModalBody = ()=>{
      return (
        <>
         {/* <MyPdfViewer /> */}
        {/* <Document
          // file={"D:/back-End/Project_v2/public/labs"+this.state.fileResult}
          file="./Alaa_El-Menshawy.pdf"
          onLoadSuccess={this.onDocumentLoadSuccess}
        >
          <Page pageNumber={this.state.pageNumber} />
        </Document>
        <p>Page {this.state.pageNumber} of {this.state.numPages}</p> */}
          <iframe src="./test.pdf" height="200" width="300" title="Iframe Example"></iframe>
        {/* <embed src='./test.pdf' type="application/pdf"/>  */}
      </>
      )
    }
  
    render() { 
        return (     
         
        <Container fluid>
            
            <Row className= "py-3">
                <Col>
                    <h3>All Doctor Prescriptions</h3>
                    <div>Get your Doctor Prescriptions...</div>
                </Col>
            </Row>
            <Row className= "py-3">
                <Col sm={10}></Col>
                    <Col sm={2}><Button variant="success"  onClick = {()=>{
                   this.props.history.push({
                       pathname:`${this.props.history.location.pathname}/prescription`,
                       state:{}
                   })
                    }}>Add New</Button>{' '}</Col>
            </Row>

            <Row className= "py-3">
               <Col>
                <DataTableComp  data = {row} //change it to Drugs
                  columns = {this.state.columns}
                  title=""
                  />
               </Col> 
           
         </Row>
         {
              
                <ModalForView show={this.state.openModal} onHide={this.handleClose} body={this.renderModalBody()}  />
              
            }
         </Container>
        
         );
    }
}
 
export default PharmacyModuleForDoctor;