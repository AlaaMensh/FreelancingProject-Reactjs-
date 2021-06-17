import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Autocomplete } from '@material-ui/lab';
import { Input, TextField } from '@material-ui/core';

// this file will genrate the basic form groups to be loaded into a <form> element.

class FormGenerator extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  // change Form Button with update and add or upload
  renderFormButton = () => {
    // eslint-disable-next-line default-case
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
  renderInputType = (input) =>{
    switch(input.type){
      case "select":{
        return (
          <Form.Group controlId="exampleForm.SelectCustom">
          <Form.Label>{input.label || input.name}</Form.Label>
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
            <option>{input.placeHolder}</option>
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
        )
      }
      case "dataList":{
        return(
          <>
          <input list="browsers" name="browser" id="browser" onChange ={(e) =>{
            console.log("eeeeee: " , e.target.value)
          }}/>  
          <datalist id="browsers">
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
                    console.log("input : " , option)
                    /* if this component have options in props */
                  }
                  return (
                    <>
                      <option label = "Владивосток">
                          {option.text}
                      </option>
                    </>
                  );
                })}
          </datalist>
          </>
        )
      }
      case "autoComplete" :{
        console.log("input: " , input)
        return (
          <>
            <Form.Label>{input.label || input.name} </Form.Label>
            {input.options ? (
         
            <Autocomplete
            id="combo-box-demo"
            options={input.options}
            onChange = {(event, newValue) =>{
              console.log("e: " , newValue , input)
              var e = {
                text : "autoComplete",
                newValue : newValue ,
                input : input.name
              }
              this.props.handleChange(e)
            }}
            getOptionLabel={(option) => option.text}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label={input.placeHolder || `Choose Your ${input.label}`} variant="outlined" />}
          />
          
        ):(
            <Autocomplete
            id="combo-box-demo"
            options={this.props.options}
            onChange = {(event, newValue) =>{
              console.log("e: " , newValue , input)
              var e = {
                text : "autoComplete",
                newValue : newValue ,
                input : input.name
              }
              this.props.handleChange(e)
            }}
            getOptionLabel={(option) => option.text}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label={input.placeHolder || "Choose Your frontDisk"} variant="outlined" />}
          />
          
        )}
        </>
        )
     

      }
      default :{
        return(
          <Form.Group controlId={input.name}>
          {/* <Form.Label>{input.label || input.name} </Form.Label> */}
          <Form.Label>{input.label || input.name} </Form.Label>
          <Form.Control
            type={input.type}
            name={input.name}
            placeholder={
              this.props.formType === "edit"
                ? this.props.updatedTypeObj[input.name]
                : input.placeHolder || ""
            }
            onChange={(e) => {
              this.props.handleChange(e);
            }}
          />
        </Form.Group>
        )
      }
    }
  }

  render() {
    return (
      <Form>
        <Col sm={12}>
          <Row>
            <Col sm={12}>
              {this.props.ModalInputs.map((input) => (
                <div className="py-2 justify-content-center">
                  {/* if the input type not select type */}
                  {this.renderInputType(input)}
                 
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
