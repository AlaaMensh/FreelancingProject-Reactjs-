import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import SessionCode from "../sessionCode";
class ChoicePage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    renderBody = () => {
        return (
            <div class="icon-box">
                <div class="icon">
                    <img
                        src="https://cdn2.iconfinder.com/data/icons/free-simple-line-mix/48/5-Credit_Card-512.png"
                        style={{ size: "60px", height: "60px" }}
                    />
                </div>
                <h1>
                    <a>Patient Orders</a>
                </h1>

                <p>Enter the code to get patient Orders</p>
            </div>
        );
    };
    render() {
        // https://cdn2.iconfinder.com/data/icons/free-simple-line-mix/48/6-File-Document-check-512.png
        return (
            <div className="row mt-5 justify-content-center align-items-center">
                <div
                    className="col-10 col-md-4"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                        console.log("history: ", this.props);
                        if (this.props.match.params.type === "lab") {
                            this.props.history.push(
                                `${this.props.location.pathname}/allLabOrders`
                            );
                        } else if (
                            this.props.match.params.type === "pathology"
                        ) {
                            console.log("yes");
                            this.props.history.push(
                                `${this.props.location.pathname}/allPathologyOrders`
                            );
                        } else if (this.props.match.params.type === "radio") {
                            console.log("yes");
                            this.props.history.push(
                                `${this.props.location.pathname}/allRadioChoice`
                            );
                        }
                    }}
                >
                    <div class="icon-box">
                        <div class="icon">
                            <img
                                src="https://cdn2.iconfinder.com/data/icons/free-simple-line-mix/48/6-File-Document-check-512.png"
                                style={{ size: "60px", height: "60px" }}
                            />
                        </div>
                        <h1>
                            <a>Accepted orders</a>
                        </h1>

                        <p>Get all orders marked as accepted.</p>
                    </div>
                </div>
                {/* results start */}
                {/*https://cdn2.iconfinder.com/data/icons/free-simple-line-mix/48/45-File-Document-share-512.png*/}
                <div
                    className="col-10 col-md-4 mt-5 mt-md-0"
                    onClick={() => {
                        this.props.history.push(
                            `${this.props.location.pathname}/allResults`
                        );
                    }}
                    style={{ cursor: "pointer" }}
                >
                    <div class="icon-box">
                        <div class="icon">
                            <img
                                src="https://cdn2.iconfinder.com/data/icons/free-simple-line-mix/48/45-File-Document-share-512.png"
                                style={{ size: "60px", height: "60px" }}
                            />
                        </div>
                        <h1>
                            <a>Get all Results</a>
                        </h1>

                        <p>See all orders.</p>
                    </div>
                </div>
                {/* results end */}

                <div className="col-10 col-md-4 mt-5 mt-md-0">
                    <SessionCode
                        buttonValue="get patient Orders"
                        fromComponent={"choice"}
                        orderType={this.props.match.params.type}
                        history={this.props.history}
                        body={this.renderBody()}
                    />
                </div>
            </div>
        );
    }
}

export default ChoicePage;
