import React, { Component } from 'react';
import orderType from "../ordersdb.json";
import DataTableComp from "../typesGenerator/dataTable";
import axios from 'axios';

const data1 = [
    {id:"1",firstName :"ali" , lastName:"Ahmed" , date:"12/4/2020" , result:"undefiened" , status:"status"},
    {firstName :"ali" , lastName:"Ahmed" , date:"12/4/2020" , result:"undefiened" , status:"status"},
    {firstName :"ali" , lastName:"Ahmed" , date:"12/4/2020" , result:"undefiened" , status:"status"},
    {firstName :"ali" , lastName:"Ahmed" , date:"12/4/2020" , result:"undefiened" , status:"status"},
]//
const data2 =[
    {id:"1",firstName :"Alaa" , lastName:"Ahmed" , date:"12/4/2020" , result:"undefiened" , status:"status"},
    {firstName :"Alaa" , lastName:"Ahmed" , date:"12/4/2020" , result:"undefiened" , status:"status"},
    {firstName :"Alaa" , lastName:"Ahmed" , date:"12/4/2020" , result:"undefiened" , status:"status"},
    {firstName :"Alaa" , lastName:"Ahmed" , date:"12/4/2020" , result:"undefiened" , status:"status"},
]

class AcceptOrders extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            type:"",
            columns:[],
            data:[]
         }
    }
    async componentDidMount(){
        await this.handleDataTableColumns()
    }


    handleAccept = (id) =>{
        var details = {
          acceptedIds : this.state.acceptedIds,
          labFdId : localStorage.getItem("userId"),
          labId: localStorage.getItem("userId")
        }
  
        
        console.log("detilaas : " , details)
  
        var formBody = [];
        for (var property in details) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        console.log("formging:     " , formBody)
        console.log("formging:     " , JSON.stringify(details))
        
    fetch('http://localhost:3000/lab/setAccept', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
          body: formBody
        }).then((resp)=>{
          console.log("Getting: " , resp);
          resp.json().then((data)=>{
            console.log("ddddddddddddddddd;  " , data[0])
            this.setState({
              TypeObj:data[0]
            })
            // object = data
          })
        }).catch(()=>{
          console.log("errror")
        })
        this.props.history.push("./orderLabList");
        // this.getData();
      }

      getData = async(type)=>{
        await axios.get(`${orderType[type].getNotAcceptedOrders}` ,{
        //   ptId : this.state.userName
        } ).then(async resp => {
          console.log("resp : " ,)
           this.setState({
            data : resp.data
          })
          // console.log("resp.data: " , resp.data);
        
        })
        
      }

    handleDataTableColumns = () => {
        var type = this.props.match.params.type;

        this.setState({type});
        
        var temp = []
        for(var p in orderType[type].columnsTable ){
          if(p === "actions"){
            orderType[type].columnsTable[p]["cell"] =  (row) =>{ return(
            <div className = "row">
              <div className="col-auto">
                <button  className="btn btn-primary"
                  onClick={() => {  
                    console.log("rooooow : " , row)
                      console.log("id:  " , row)
                    }}>Accept</button>
              </div>
            
            </div>
            )
            }
            temp.push(orderType[type].columnsTable[p])
          }
          else{
    
            temp.push(orderType[type].columnsTable[p])
          }
        }
        this.setState({columns : temp})
        temp = []
        var newState = this.state;
        for(var property in orderType[type].state ){
          // console.log("propertyyyy :  " , property)
          newState[property] = "" 
        }
        this.setState({newState})
    
        // if the page Will Contain modal
        
        // for(var p in columns[type].modalForms ){
        //   // console.log("p : " , columns[type].modalForms[p]);
        //   temp.push(columns[type].modalForms[p])
        // } 
        // // console.log("temp : "  , temp)
        // this.setState({ModalInputs : temp})
    

    }

    render() { 
        return (     
            <div>
                {console.log(this.state.columns)}
                <DataTableComp  data = {data1}
                  columns = {this.state.columns}
                  title= "Allergy" />
                  <div className="row justify-content-center mt-5">
                    <button className="btn btn-primary" onClick={()=>{
                      console.log("historyL:::: " , this.props.history)
                      this.props.history.push(`${this.props.history.location.pathname}/allLabOrders`)
                    }}>Get All Accepted Orders</button>
                  </div>
            </div>
         );
    }
}
 
export default AcceptOrders;