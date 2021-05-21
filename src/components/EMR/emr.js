import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Card ,Button , Container} from 'react-bootstrap';

class EMR extends Component {
    constructor(props) {
        super(props);
        this.state = {  

        }
    }
    render() { 
        return (
       
       <Container >
           <Row className="mt-5 justify-content-center">
               <Col sm={6} md={4} >
                 <Card style={{height : "15em" , cursor:"pointer"}} 
                        onClick={()=>{
                                this.props.history.push(`${this.props.history.location.pathname}/search`)
                        }}>
                        <Card.Img variant="top" style={{cursor:"pointer"}} src={window.location.origin + '/images/img1.svg'} />
                                <Card.Body className="text-light mt-2 mx-auto">
                                <Card.Text className="text-light">
                                 Your Patients
                                </Card.Text>
                                </Card.Body>
                    </Card>
               </Col>
               <Col md={4}  className="mt-3 mt-md-0">
                 <Card style={{height : "15em" , cursor:"pointer"}}className="bg-light"
                        onClick={()=>{
                            this.props.history.push(`${this.props.history.location.pathname}/Futureappointements/${"future"}`)
                        }}>
                        <Card.Img variant="top" style={{cursor:"pointer"}} src={window.location.origin + '/images/img1.svg'} />
                                <Card.Body className="text-secondary mt-2 mx-auto">
                                <Card.Text className="text-secondary">
                                  Get all your Future Appointements
                                </Card.Text>
                                </Card.Body>
                    </Card>
               </Col>
               <Col md={4}  className="mt-3 mt-md-0">
                 <Card style={{height : "15em" , cursor:"pointer"}}
                        onClick={()=>{
                            this.props.history.push(`${this.props.history.location.pathname}/currentAppointements/${"current"}`)
                        }}>
                        <Card.Img variant="top" style={{cursor:"pointer"}} src={window.location.origin + '/images/img1.svg'} />
                                <Card.Body className="text-light mt-2 mx-auto">
                                <Card.Text className="text-light">
                                Get all your Current Appointements
                                </Card.Text>
                                </Card.Body>
                    </Card>
               </Col>
               
           </Row>
       </Container>
            
       
          );
    }
}
 
export default EMR;