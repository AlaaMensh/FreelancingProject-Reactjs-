import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class FormModal extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    componentDidMount(){
        console.log("//////////******************/////////")
    }
    render() {  
        return (
            <Form>
                <Row>
                        <Col sm={10} className="pl-5">
                                {this.props.ModalInputs.map((input) => (
                                        <Row className="p">
                                            <Form.Group controlId={input.name}>
                                                 <Form.Label>{input.name}</Form.Label>
                                                      <Form.Control type={input.type} name={input.name} placeholder={this.props.formType === "edit" ?this.props.updatedTypeObj[input.name] : ""}  onChange={(e)=>{
                                                                this.props.handleChange(e)}

                                                            }/>
                                                            </Form.Group>
    

                                        </Row>
                            
                            ))}
                                </Col>
                          
                  

                              
                            </Row>
                    </Form>
          );
    }
}
 
export default FormModal;