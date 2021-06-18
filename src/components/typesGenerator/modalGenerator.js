import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import FormModal from "./formModal";

class ModalComp extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    componentDidMount(){
        // console.log("////////////////%%%%%%%%%%%%%%%%%%%%%%////////////")
        // console.log("props: " , this.props , "formType : " , this.props.formType)
    }
    renderForm = ()=>{
       return (
                this.props.ModalInputs.map((input)=>{
                    return(
                        <input type={input.type} name={input.name} />
                    )
                    }
                )
          
       )
    }


    render() { 
        return ( 
            <>
            {/* <h1>llll</h1> */}
            <Modal show={this.props.show} onHide={this.props.onHide} style={{marginTop:"3em"}}>
                <Modal.Header closeButton>
                <Modal.Title>{this.props.formType} Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* {console.log("hhhhhhheeeree   ",this.props.ModalInputs)} */}
                    <FormModal ModalInputs = {this.props.ModalInputs} 
                          updatedTypeObj = {this.props.updatedTypeObj}
                          handleChange = {this.props.handleChange}
                          formType={this.props.formType}
                        
                    />
                   
                </Modal.Body>
                <Modal.Footer>
                    {
                        this.props.formType === "edit" || this.props.formType === "uploadResult" ? (
                            
                            <Button variant="warning"   value="Edit" onClick={()=>{
                                this.props.handleUpdate()
                                      }} >Edit</Button>
                        ):
                        (
                            <Button variant="primary"  value={this.props.value || "Add"} onClick={()=>{
                                this.props.handleAdding()
                            }} >Add</Button>
                        )
                    }
                <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
            </>
         );
        }
    }
    
export default ModalComp;
