import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
// import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Spinner from '../../shared/Spinner';
// import EditIcon from '@material-ui/icons/Edit';
import emrFile from "../emrDB.json";
import DataGridTable from "./dataGrid";
import SearchForm from "./searchForm";




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



var id = 0;
var rowsToKeep = [];
var rowsToBeDeleted = [];

class Search extends Component {
  constructor(props) {
    super(props);
    
    this.state = { 

      searchWord:"",
      list :[]  ,
      openModal1:false,
      loading:false,
      result :"",
      id:"",
      filtered : []
          }
        }
        


    getData = async()=>{
      var type = "Search";
      await this.setState({loading:true})
      var details = {
        drId:localStorage.getItem("userId")
      }
      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }

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

      await this.setState({loading:false})
     
      
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
            <Row className="mt-5 justify-content-center">
                  <SearchForm  getSearchName = {this.getSearchName} />
            </Row>
          <Row>


                    {
                        this.state.list && this.state.list.length>0 &&
                        <DataGridTable location={this.props.location} 
                          filtered={this.state.filtered.length>0 ? this.state.filtered: this.state.list} 
                          history={this.props.history}
                          list={this.state.list}
                        />
                    }

          </Row>
           
        </Container>
        
        )
    }
    




    render() { 
      const { classes } = this.props;
        
  return (
    <div className="hero">
            <Spinner loading={this.state.loading}/>

        {this.rendering()}
       

    </div>
 
  );
    }
}
 
export default withStyles(useStyles)(Search); 