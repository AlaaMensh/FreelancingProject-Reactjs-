import { Modal } from 'react-bootstrap'
// import Modal from '@material-ui/core/Modal';
import React, { Component } from 'react';

import Form from "./formModal"

class ModalComp extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    componentDidMount(){
        console.log("////////////////%%%%%%%%%%%%%%%%%%%%%%////////////")
        console.log("props: " , this.props , "formType : " , this.props.formType)
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
                    <Form ModalInputs = {this.props.ModalInputs} 
                          updatedTypeObj = {this.props.updatedTypeObj}
                          handleChange = {this.props.handleChange}
                          formType={this.props.formType}
                        
                    />
                   
                </Modal.Body>
                <Modal.Footer>
                    {
                        this.props.formType === "edit" || this.props.formType === "uploadResult" ? (
                            <input type="button" className="btn btn-danger" value="Edit" onClick={()=>{
                                this.props.handleUpdate()
                                      }} />
                        ):
                        (
                            <input type="button" className="btn btn-primary" value={this.props.value || "add"} onClick={()=>{
                                this.props.handleAdding()
                                      }} />
                        )
                    }
                <button onClick={this.props.onHide}>Close</button>
                </Modal.Footer>
            </Modal>
            </>
         );
        }
    }
    
export default ModalComp;

// import React from 'react';
// const ModalComp = ({show , onHide}) => {
//     return (  
//         <>
//         {/* <Modal
//         open={open}
//         onClose={onClose}
     
//       >
//       </Modal> */}
//       <Modal show={show} onHide={onHide}>
//         <Modal.Header closeButton>
//           <Modal.Title>Login Form</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <></>
//         </Modal.Body>
//         <Modal.Footer>
//           <button onClick={onHide}>Close Modal</button>
//         </Modal.Footer>
//       </Modal>
//         </>
//     );
// }
 