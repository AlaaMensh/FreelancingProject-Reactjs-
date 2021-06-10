import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// this file will genrate the basic form groups to be loaded into a <form> element.

class FormGenerator extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Form>
                <Col sm={12}>
                    <Row>
                        <Col sm={12}>
                            {this.props.ModalInputs.map((input) => (
                                <div className="py-2 justify-content-center">
                                    {input.type !== "select" ? (
                                        <Form.Group controlId={input.name}>
                                            <Form.Label>
                                                {input.name}
                                            </Form.Label>
                                            <Form.Control
                                                type={input.type}
                                                name={input.name}
                                                placeholder={
                                                    this.props.formType ===
                                                    "edit"
                                                        ? this.props
                                                              .updatedTypeObj[
                                                              input.name
                                                          ]
                                                        : ""
                                                }
                                                onChange={(e) => {
                                                    this.props.handleChange(e);
                                                }}
                                            />
                                        </Form.Group>
                                    ) : (
                                        <>
                                            <Form.Group controlId="exampleForm.SelectCustom">
                                                <Form.Label>
                                                    {input.name}
                                                </Form.Label>
                                                {console.log("input: ", input)}
                                                <Form.Control
                                                    as="select"
                                                    name={input.name}
                                                    onChange={(e) => {
                                                        console.log("e: ", e);
                                                        this.props.handleChange(
                                                            e
                                                        );
                                                    }}
                                                    custom
                                                >
                                                    <option>
                                                        Choose your option
                                                    </option>
                                                    {input.options
                                                        ? input.options.map(
                                                              (option) => {
                                                                  // return <option value={option.value} >{option.text}</option>
                                                                  return (
                                                                      <option
                                                                          value={
                                                                              option.value
                                                                          }
                                                                      >
                                                                          {
                                                                              option.text
                                                                          }
                                                                      </option>
                                                                  );
                                                              }
                                                          )
                                                        : this.props.options.map(
                                                              (option) => {
                                                                  return (
                                                                      <>
                                                                          <option
                                                                              value={
                                                                                  option.value
                                                                              }
                                                                          >
                                                                              {
                                                                                  option.text
                                                                              }
                                                                          </option>
                                                                      </>
                                                                  );
                                                              }
                                                          )}
                                                </Form.Control>
                                            </Form.Group>
                                        </>
                                    )}
                                </div>
                            ))}
                        </Col>
                    </Row>
                    <Row className=" justify-content-end">
                        <Col sm={12}>
                            <Button
                                block
                                variant="primary"
                                value={this.props.buttonTitle || "Add "}
                                onClick={() => {
                                    this.props.handleSubmit();
                                }}
                            >
                                {this.props.buttonTitle || "Add "}
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        {/* <input type="button" value="Submit" onClick={()=>{
                        this.props.handleUpdate()
                            }} /> */}
                    </Row>
                </Col>
            </Form>
        );
    }
}

export default FormGenerator;
