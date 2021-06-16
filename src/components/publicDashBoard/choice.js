import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import SessionCode from "../sessionCode";
class ChoicePage extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    renderBody = ()=>{
        return (
            <Card style={{ width: '18rem', height:"15em" ,  }} className="bg-dark">
            <Card.Img variant="top" src={window.location.origin + '/images/img1.svg'} />
            <Card.Body className="text-secodary mt-2 mx-auto">
                <Card.Text>
                    Enter the code to get patient Orders
                </Card.Text>
            </Card.Body>
            </Card>
        )
    }
    render() { 
        return (  
           
                <div className="row mt-5 justify-content-center align-items-center">
                    <div className="col-10 col-md-4">
                            <Card style={{ width: '18rem',height:"15em" }} className="bg-light text-secondary" 
                            onClick={()=>{
                                console.log("history: " , this.props);
                                if(this.props.match.params.type === "lab"){
                                    this.props.history.push(`${this.props.location.pathname}/allLabOrders`)
                                }
                                else if(this.props.match.params.type === "pathology"){
                                    console.log("yes");
                                    this.props.history.push(`${this.props.location.pathname}/allPathologyOrders`)
                                }
                                else if(this.props.match.params.type === "radio"){
                                    console.log("yes");
                                    this.props.history.push(`${this.props.location.pathname}/allRadioChoice`)
                                }
                            }}>
                                <Card.Img variant="top" style={{cursor:"pointer"}} src={window.location.origin + '/images/img1.svg'} />
                                <Card.Body className="text-secondary mt-2 mx-auto">
                                <Card.Text className="text-secondary">
                                  Get all Accepted orders
                                </Card.Text>
                                </Card.Body>
                                </Card>

                    </div>
                        {/* results start */}

                    <div className="col-10 col-md-4 mt-5 mt-md-0">
                        <Card
                        onClick={()=>{
                            this.props.history.push(`${this.props.location.pathname}/allResults`)

                        }}>
                            <Card.Img variant="top" style={{cursor:"pointer"}} src={window.location.origin + '/images/img1.svg'} />
                            <Card.Body className="text-secondary mt-2 mx-auto">
                            <Card.Text className="text-secondary">
                                  Get all Results
                            </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                        {/* results end */}

                    <div className="col-10 col-md-4 mt-5 mt-md-0">
                                    <SessionCode buttonValue = "get patient Orders"
                                        fromComponent={"choice"} 
                                        orderType={this.props.match.params.type}
                                        history = {this.props.history}
                                        body={this.renderBody()}/>
                          
                    </div>
                </div>

           
        );
    }
}
 
export default ChoicePage;