import React, { useState, useEffect } from 'react';
import  { Component } from 'react';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import { useFormik,Formik } from 'formik';
import * as Yup from 'yup';
import SearchForm from "./searchForm";
import DataGridTable from "./dataGrid"
import emrFile from "../emrDB.json";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';




var object  = {}
const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor : "white",
    padding:"1em",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    fontSize:"1.1em",
    fontFamily:"Dosis"
  },
  input2 :{
    height:"10px"
  },
  iconPlus:{
    margin: "auto",
    textAlign:"center"
    // float:"right",
  },
  button: {
    margin: theme.spacing(1),
    fontFamily: 'Roboto Slab'
  },
  deleteButton: {
    backgroundColor:"#c94c4c"
  },
  editButton: {
    backgroundColor:"#c94c4c"
  }
});



var row = [
  {id:1 , firstName : "alaa" , LastName : "Ahmed" , maritalStatus : "lol"},
  {id:2 , firstName : "Mohamed" , LastName : "Nassif" , maritalStatus : "lol"},
  {id:3 , firstName : "Ola" , LastName : "non" , maritalStatus : "lol"},
]


class Search extends Component {
  constructor(props) {
    super(props);
    
    this.state = { 
      searchWord:"",
      list :[]  ,
      openModal1:false,
      result :"",
      id:"",
      filtered : []
          }
        }
        


    getData = async()=>{
      var type = "Search";
      this.setState({list: row});

      var details = {
        drId:localStorage.getItem("userId")
      }
      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      console.log("///////////////////////// , " , emrFile["Search"].getAllDoctorPatients)
      await fetch(`${emrFile["Search"].getAllDoctorPatients}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
      }).then((resp)=>{
        resp.json().then((data)=>{
          console.log("resp.data: " , data);
          this.setState({list: data})
          this.setState({filtered:data})
        })
      }).catch(()=>{
        console.log("errror")
      })

      // await axios.post(`${emrFile["Search"].getAllDoctorPatients}` ,{ // get All patients of this doctor
      //   drId : localStorage.getItem("userId")
      // }).then(async resp => {
      //   console.log("resp.data: " , resp.data);
      //   this.setState({list: resp.data})
      //   this.setState({filtered:resp.data})
        
      // })
    //  this.setState({list:row})
     
      
    }


   async componentDidMount(){
     await this.getData()
     this.setState({filtered:this.state.list})
    }




    getSearchName = (name) =>{
      console.log("name : " , name);
      this.setState({searchWord:name});   
          this.setState((state) => {
              state.filtered = this.state.list.filter((item) => {
                  console.log(name.toLowerCase())
                  var searchWordWithoutSpaces = name.split(' ').join('');
                  var itemFirstLastSecond = item.firstName+item.secondName+item.LastName
                  // console.log("$$$$" , item.name.toLowerCase().includes(name.toLowerCase()) )
                  return itemFirstLastSecond.toLowerCase().includes(searchWordWithoutSpaces.toLowerCase())
              })
              return state;
          })  

      
  }

    rendering = () =>{
        return(
        <Container>
        <Row className= "py-3">
              <Col>
                  {
                    emrFile  && (
                      <>
                        <h3>{emrFile["Search"].title}</h3>
                        <div>{emrFile["Search"].description}</div>
                      </>
                    )
                  }
              </Col>
          </Row>
            <Row className="mt-5 justify-content-center">
                  <SearchForm  getSearchName = {this.getSearchName} />
            </Row>
            
          <Row className="mt-5">
            <Col>
                <Row>
                  <Col>
                    {
                        this.state.list && this.state.list.length>0 &&
                        <DataGridTable location={this.props.location} 
                          filtered={this.state.filtered.length>0 ? this.state.filtered: this.state.list} 
                          history={this.props.history}
                          list={this.state.list}
                        />
                    }
                  </Col>
                </Row>
            </Col>
          </Row>
           
        </Container>
        
        )
    }
    




    render() { 
      const { classes } = this.props;
        
  return (
    <div className="hero">
        {this.rendering()}
       

    </div>
 
  );
    }
}
 
export default withStyles(useStyles)(Search); 