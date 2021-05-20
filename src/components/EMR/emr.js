import React, { Component } from 'react';
class EMR extends Component {
    constructor(props) {
        super(props);
        this.state = {  

        }
    }
    render() { 
        return (
       <>
            <button onClick={()=>{
                console.log("thisprops:" , this.props.history)
                this.props.history.push(`${this.props.history.location.pathname}/search`)
            }}>Search Module</button>
            <button onClick={()=>{
                this.props.history.push(`${this.props.history.location.pathname}/Futureappointements/${"future"}`)
            }}>Future</button>
            <button onClick={()=>{
                this.props.history.push(`${this.props.history.location.pathname}/currentAppointements/${"current"}`)
            }}>Current</button>
       </>
          );
    }
}
 
export default EMR;