import React, { Component } from 'react';
import axios from 'axios';
class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pId:1,
            user:{}
          }
    }
    async componentDidMount(){
      console.log("id: " , this.props.id)
    //  await this.setState({pId : this.props.id});
        await this.getUserObj()
    }
    getUserObj = async()=>{
      console.log("idddd: " , this.state.pId)
        var details = {
            id:this.state.pId
           }
           var formBody = [];
           for (var property in details) {
             var encodedKey = encodeURIComponent(property);
             var encodedValue = encodeURIComponent(details[property]);
             formBody.push(encodedKey + "=" + encodedValue);
           }
           formBody = formBody.join("&");
           await axios.post(`http://localhost:8080/pt/findPt`,formBody).then(async resp => {
            // return resp.data;
            await this.setState({user: resp.data[0]});
            console.log("resp.data: " , resp.data);
          })

    }
     convertDate(inputFormat) {
      function pad(s) { return (s < 10) ? '0' + s : s; }
      var d = new Date(inputFormat)
      return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
    }
    rendering = ()=>{
        const {stat} = this.state
        const us = this.state.user
        return(
            <div className="row">
            {
            console.log("user: " , this.state.user)
            }
            <div className="col-8 col-md-4 col-lg-3 ">
                <img style={{width:"100%"}} src="https://www.shareicon.net/data/512x512/2016/09/01/822711_user_512x512.png" />
            </div>
            {
              this.state.user && (
                <div className="col-12 col-md-12 col-lg-9 border">
                <div className="row  text-secondary p-2 text-center">
                    <div className="col-6 border-right">
                        Patient Name : {this.state.user.firstName} {this.state.user.lastName}
                    </div>
                    <div className="col-6">
                      Patient Email :{this.state.user.email}
                    </div>
                </div>
                <div className="row  text-secondary py-2  text-center">
                    <div className="col-6 border-right">
                    Patient Address :{this.state.user.address}
                    </div>
                    <div className="col-6">
                    Patient Blood Group :{this.state.user.bloodGroup}
                    </div>
                </div>
                <div className="row text-secondary py-2 text-center ">
                    <div className="col-6 border-right">
                    Patient Email :{this.state.user.phone}
                    </div>
                    <div className="col-6">
                        Patient BirthDate : {this.convertDate(this.state.user.birthDate)}
                    </div>
                </div>
                <div className="row text-secondary py-2 text-center">
                    <div className="col-12">
                    Marital Status :{this.state.user.maritalStatus}
                    </div>
              
                </div>
            </div>
              )
            }

        </div>
        )
    }
    componentDidUpdate(){
        this.rendering()
    }
    render() { 
        return (
        <div>
               {this.rendering()}
        </div>
          );
    }
}
 
export default UserInfo;