import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import DataTableComp from "../typesGenerator/dataTable";
import problemType from "./clinicalDB.json";


class PatientProblems extends Component {
  constructor(props) {
    super(props);
    
    this.state = { 
      pId:25, ///////////*******////////***it is fixed you must change it */
      columns:[],
      data:[],
      type:""
          }
        }
      
    handleDataTableColumns = (type)=>{ // handle Columns from json file which sent to dataTable
      var temp = [];
      for(var p in problemType[type].columnsTable ){
        temp.push(problemType[type].columnsTable[p]);
      }
      this.setState({columns : temp});

    }
        
    getTypeByID = async(row) => {
        console.log("dkkdkdkdkdkdkdkdkdk:    " , row);
        this.setState({TypeObj : row});       
        
    }
    async componentDidMount(){
      ///////////////*****Fixed******//////////////////
      var type = "";  
      console.log("props:  ", this.props);
      if(this.props.type){
        type = this.props.type; 
      }
      else{
        type = this.props.match.params.type; 
      }
      this.setState({type: type})
      

      await this.handleDataTableColumns(type);
      await this.getProblems(type);
    }


    getProblems = (type)=>{ // get all Allergy prolems for this patient from DB
      var details = {
        id:this.state.pId /// you should change this to props
       }
       var formBody = [];

       for (var property in details) {
         var encodedKey = encodeURIComponent(property);
         var encodedValue = encodeURIComponent(details[property]);
         formBody.push(encodedKey + "=" + encodedValue);
       }
       formBody = formBody.join("&");

       fetch(`${problemType[type].getAllergyProblemsForPatient}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
      }).then(async(resp)=>{
        resp.json().then(async(data)=>{
          console.log("Data:  " , data)
          await this.setState({data: data});
      
        })
      }).catch(()=>{
        console.log("error Getting Here")
      })
  }


    rendering = () =>{
        return(
          <div className="container mt-5"> 
            {this.state.type && (
              <h4 className="text-info">{this.state.type} Problems</h4>
            )}
            <div className = "row gridDataHeader align-items-center" style={{ height: 400, width: '100%' }}>
            <DataTableComp  data = {this.state.data}
                  columns = {this.state.columns}
                  title= {`All patient ${this.state.type} Problems`}
            />
            </div> 
              <div className="row mt-4">
                   
                      </div>
                    </div>
        
        )
    }



    render() { 

            return (
                <div className="">
                    {this.rendering()}
                </div>
            
            );
    }
}
 
export default PatientProblems; 



