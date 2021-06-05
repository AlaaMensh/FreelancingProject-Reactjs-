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
  // change Form Button with update and add or upload
  renderFormButton = () => {
    switch (this.props.formType) {
      case "add": {
        return (
          <Button
            block
            variant="primary"
            onClick={() => {
              this.props.handleAdding();
            }}
          >
            Add
          </Button>
        );
      }
      case "edit": {
        return (
          <Button
            block
            variant="primary"
            onClick={() => {
              this.props.handleUpdate();
            }}
          >
            update
          </Button>
        );
      }
      case "upload": {
        return (
          <Button
            block
            variant="primary"
            onClick={() => {
              this.props.handleUpdate();
            }}
          >
            upload
          </Button>
        );
      }
    }
  };

  render() {
    return (
      <Form>
        <Col sm={12}>
          <Row>
            <Col sm={12}>
              {this.props.ModalInputs.map((input) => (
                <div className="py-2 justify-content-center">
                  {/* if the input type not select type */}
                  {input.type !== "select" ? (
                    <Form.Group controlId={input.name}>
                      <Form.Label>{input.name}</Form.Label>
                      <Form.Control
                        type={input.type}
                        name={input.name}
                        placeholder={
                          this.props.formType === "edit"
                            ? this.props.updatedTypeObj[input.name]
                            : ""
                        }
                        onChange={(e) => {
                          this.props.handleChange(e);
                        }}
                      />
                    </Form.Group>
                  ) : (
                    <>
                      {/* if the input type select type */}
                      <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Label>{input.name}</Form.Label>
                        {console.log("input: ", input)}
                        <Form.Control
                          as="select"
                          name={input.name}
                          onChange={(e) => {
                            console.log("e: ", e);
                            this.props.handleChange(e);
                          }}
                          custom
                        >
                          <option>Choose your option</option>
                          {input.options
                            ? input.options.map((option) => {
                                {
                                  /* if this component have not options in props but have it jsonFile */
                                }
                                // return <option value={option.value} >{option.text}</option>
                                return (
                                  <option value={option.value}>
                                    {option.text}
                                  </option>
                                );
                              })
                            : this.props.options.map((option) => {
                                {
                                  /* if this component have options in props */
                                }
                                return (
                                  <>
                                    <option value={option.value}>
                                      {option.text}
                                    </option>
                                  </>
                                );
                              })}
                        </Form.Control>
                      </Form.Group>
                    </>
                  )}
                </div>
              ))}
            </Col>
          </Row>
          <Row className=" justify-content-end">
            <Col sm={12}>{this.renderFormButton()}</Col>
          </Row>
          <Row></Row>
        </Col>
      </Form>
    );
  }
}

export default FormGenerator;
