import React, { Component } from 'react';
import "./loginform.css";



class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    componentDidUpdate(){
        console.log(";;;;;;;;;;;;;;;;;;;",this.props.word);
    }
    render() { 
        return ( 
    <></>
         );
    }
}
 
export default LoginForm;