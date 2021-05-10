import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

class FormGenerator extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (  
            <div>
                <form className="row justify-content-center">
            <div className="col-10 align-items-center">
                <div className="row">
                    <div className="col-10">
                    {this.props.ModalInputs.map((input) => (
                            <div className="row py-2 justify-content-center">
                                    <TextField size="small"  id="filled-basic"  variant="filled" label={input.name}
                                                name={input.name}
                                                type={input.type}
                                                defaultValue={this.props.formType === "edit" ?this.props.updatedTypeObj[input.name] : ""}
                                                onChange={(e)=>{
                                                    this.props.handleChange(e)}
                                                }
                                                
                                    />

                            </div>
                
                ))}
                <input type="button" value={this.props.buttonTitle || "Add Order"} className="btn-primary btn" 
                onClick={()=>{
                    this.props.handleSubmit()
                }}/>
                    </div>
                
        
                    </div>
                    <div className="row">
                    {/* <input type="button" value="Submit" onClick={()=>{
                        this.props.handleUpdate()
                            }} /> */}
                
                    </div>
                </div>

                    </form>
            </div>
        );
    }
}
 
export default FormGenerator;