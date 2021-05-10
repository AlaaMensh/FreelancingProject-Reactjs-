import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';



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
                                    {
                                        input.type !== "select" ? (
                                            <TextField size="small"  id="filled-basic"  variant="filled" label={input.name}
                                                name={input.name}
                                                type={input.type}
                                                defaultValue={this.props.formType === "edit" ?this.props.updatedTypeObj[input.name] : ""}
                                                onChange={(e)=>{
                                                   
                                                    this.props.handleChange(e)}
                                                }
                                                
                                    />
                                        ):(<>
                                            <InputLabel htmlFor="age-native-helper">Age</InputLabel>
                                            {console.log("options: " , input.options)}
                                            <NativeSelect
                                            // value={state.age}
                                            onChange={this.props.handleChange}
                                            >
                                            {
                                                input.options.map((option)=>{
                                                    return <option value={option.value}>{option.text}</option>
                                                })
                                            }
                                            {/* <option aria-label="" value="" />
                                            <option value={10}>Ten</option>
                                            <option value={20}>Twenty</option>
                                            <option value={30}>Thirty</option> */}
                                            </NativeSelect>
                                            </>
                                            
                                        )
                                    }

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