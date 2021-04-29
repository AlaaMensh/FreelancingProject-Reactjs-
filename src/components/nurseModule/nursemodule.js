// import * as React from 'react';
import React, { Component } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import "./nursemodule.css";
// import NurseModule from './nursemodule';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab'
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';




var times = [
    {date :"20-4-2021" , time:"5:00" , temp:"37" , pulse:"ll" , bloodPressure: "52" ,pain:"1",
     respiratoryRate: "100" , OXSat:"20%" ,Height:"50" , weight:"30" , BMI :"5" ,smokingStatus: 10 , headC : "10"},
    
    // { date :"20-4-2021" , time:"22:50" , temp:"37" , pulse:"ll" , bloodPressure: "52" ,
    //  respiratoryRate: "100" , OXSat:"20%" ,Height:"50" , weight:"30" , BMI :"5" ,smokingStatus: 10 , headC : "10"},
    
    // { date :"20-4-2021" , time:"22:50" , temp:"37" , pulse:"ll" , bloodPressure: "52" ,
    //  respiratoryRate: "100" , OXSat:"20%" ,Height:"50" , weight:"30" , BMI :"5" ,smokingStatus: 10 , headC : "10"},
    
    // { date :"20-4-2021" , time:"22:50" , temp:"37" , pulse:"ll" , bloodPressure: "52" ,
    //  respiratoryRate: "100" , OXSat:"20%" ,Height:"50" , weight:"30" , BMI :"5" ,smokingStatus: 10 , headC : "10"},
    
]
const sortModel = [
  {
    field: 'time',
    sort: 'asc',
  },
];

const columns = [
//   { field: 'id', headerName: 'ID', width: 70 },
{ 
    field: 'date',
    
    headerName: 'Date',
    width: 250,
    sort: 'asc',
   
    renderCell: (params) => (       
     <>
          {/* {console.log("parammmmms:    " , params.row.date)} */}
          {/* {console.log("parammmmms:    " , params.row.time)} */}
        <p className="span">{params.row.date}</p>
        <p className="span">{params.row.time}</p>
        </>
    
    ),
    // field: 'time',
//     renderCell: (params) => (
        
//       <strong>
//         {params.value}
        
//       </strong>
//     ),
  },

  { field: 'temp',
   headerName: "Tempreture (f)"
   , width: 200 },
  {
    field: 'pulse',
    headerName: 'pulse(bpm)',
    type: 'number',
    width: 150,
  },
  {
    field: 'bloodPressure',
    headerName: 'Blood Pressure(mmHg)',
    width: 300,
  },
  {
    field: 'pain',
    headerName: 'Pain (1-10)',
    width: 150,
  },
  {
    field: 'respiratoryRate',
    headerName: 'Respiratory Rate(rpm)',
    width: 200,
  },
  {
    field: 'OXSat',
    headerName: 'Oxygen Saturation(%)',
    width: 200,
  },
 
  {
    field: 'height',
    headerName: 'Height (in)',
    width: 150,
  },
  {
    field: 'weight',
    headerName: 'weight(lbs)',
    width: 150,
  },

  {
    field: 'BMI',
    headerName: 'BMI (Kg/m2)',
    width: 150,
  },

  {
    field: 'smokingStatus',
    headerName: 'smokingStatus',
    width: 200,
  },
  {
    field: 'headC',
    headerName: 'headCircumfrence(in)',
    width: 200,
  },
                { 
                field: 'Actions',
                headerName: 'Actions',
                width: 250,
                renderCell: (params) => (
                  <strong>
                    {/* {params.value.getFullYear()} */}
                    <Button
                      variant="contained"
                      color="default"
                      size="small"
                      className={this.props.classes.button}
                      startIcon={<EditIcon />}
                     
                      style={{ marginLeft: 16 }}
                      onClick={()=>{
                        this.handleopenModal1();
                        console.log("lsssssssssssssssssssssssssssssssssssss")
                        this.getTypeByID(params.row.id);
                        this.getData()
                      }
                        
                      }
                    >
                       Edit
                      
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      className={this.props.classes.button , this.props.classes.deleteButton}
                      startIcon={<EditIcon />}
                      style={{ marginLeft: 16 }}
                      onClick={async ()=>{
                         console.log("delete function: " , params.row.id);
                        this.handleDelete(params.row.id);
                        // this.refreshAfterDeletion(params.row.id);
                      }}
                    >
                      delete
                    </Button>
                  </strong>
                ),
              }

];
const useStyles = (theme) => ({
    paper: {
      marginTop: theme.spacing(2),
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





class NurseVisit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeDate:[],
            temp:"",
            pulse:"",
            respiratoryRate:"",
            oxygenSaturation:"",
            height:"",
            weight:"",
            BMI:"",
            pain:"",
            smokingStatus:"",
            headCircumference:"",    
            openModal1:false ,
            key:0,
            pId:1  
          }
    }
    handleChange = (event)=>{
        this.setState({
            [event.target.name] :event.target.value
        })
    }
    handleDelete =(id) =>{
      var details = {
        id:id
      }
      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      // formBody = formBody.join("&");
      
      fetch('http://localhost:3000/nurse/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
      }).then(()=>{
        console.log("it is deleted");
      }).catch(()=>{
        console.log("errror")
      })
      this.setState({
        timeDate: this.state.timeDate.filter(row => row.id !== id)
       })
    }

    func2=()=>{
            var obj2 = {
            id:0,
            date:this.getDate(),
            time :this.getTime(),
            temp:"",
            pulse:"" , 
            bloodPressure: "" ,
            respiratoryRate: "" ,
            OXSat:"" ,
            height:"" , 
            weight:"" ,
            BMI :"" ,
            pain:"",
            smokingStatus: "" ,
            headC : ""
        }
        var joined = this.state.timeDate.concat(obj2);
        this.setState({ timeDate: joined });
    }
    sortAfterAdding = () =>{
      const sorted = this.state.timeDate.sort((a, b) => a.id - b.id);
      console.log("sorted: " , sorted);
      this.setState({timeDate : sorted})
    }
    sorting =()=>{
      var Temp = []
      this.state.timeDate.map((time, index)=>{
        
        if(time.id == 0 )
          {
            console.log("yes" , time)
            var obj = {
              id : 0,
              date : time.date,
              time : time.time,
              temp : time.temp,
              pulse : time.pulse, 
              bloodPressure : time.bloodPressure ,
              respiratoryRate : time.respiratoryRate,
              OXSat : time.OXSat,
              height : time.headC, 
              weight : time.weight,
              BMI : time.BMI,
              smokingStatus: time.smokingStatus,
              headC : time.headC,
              pain : time.pain
         }

          }
        if(time.id == -1 )
          {
            console.log("yes" , time)
            var obj = {
              id : 1,
              date : time.date,
              time : time.time,
              temp : time.temp,
              pulse : time.pulse, 
              bloodPressure : time.bloodPressure ,
              respiratoryRate : time.respiratoryRate,
              OXSat : time.OXSat,
              height : time.headC, 
              weight : time.weight,
              BMI : time.BMI,
              smokingStatus: time.smokingStatus,
              headC : time.headC,
              pain : time.pain
         }

          }
         if(time.id >= 1){
            console.log("yes" , time)
                var obj = {
                id : index+2,
                date : time.date,
                time : time.time,
                temp : time.temp,
                pulse : time.pulse, 
                bloodPressure : time.bloodPressure ,
                respiratoryRate : time.respiratoryRate,
                OXSat : time.OXSat,
                height : time.headC, 
                weight : time.weight,
                BMI : time.BMI,
                smokingStatus: time.smokingStatus,
                headC : time.headC,
                pain : time.pain

            
           }
           
         }
         time = obj
         Temp.push(time)


      })
      this.setState({timeDate : Temp})

    }
    getTime = () =>{
      var d = new Date();
      var time = d.getHours()+":"+d.getMinutes()
      return (time);
    }
    getLastVisits = ()=>{
      var details = {
      pId : this.state.pId
      }
      var formBody = [];
          for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
          }
          formBody = formBody.join("&");
         
          fetch(`http://localhost:3000/nurse/getByPId`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody
          }).then((resp)=>{
            console.log("Getting: " , resp);
            resp.json().then((data)=>{
              console.log("ddddddddddddddddd;  " , data[0])

              var obj2 = {
                id:0,
                date:this.getDate(),
                time :this.getTime(),
                temp:"",
                pulse:"" , 
                bloodPressure: "" ,
                respiratoryRate: "" ,
                OXSat:"" ,
                height:"" , 
                weight:"" ,
                BMI :"" ,
                pain:"",
                smokingStatus: "" ,
                headC : ""
            }
            var joined = data.concat(obj2);
            // this.setState({ timeDate: joined });
            console.log("joined: " , joined)



              this.setState({
                timeDate:joined
              })
              
              // object = data
            })
          }).catch(()=>{
            console.log("errror")
          })
    }
    handleAddition = async()=>{

          var details = {
            pId:this.state.pId,
            date: this.getDate(),
            time: this.getTime(),
            temp:this.state.temp,
            pulse: this.state.pulse,
            bloodPressure: this.state.bloodPressure,
            respiratoryRate: this.state.respiratoryRate ,
            OXSat: this.state.oxygenSaturation,
            height: this.state.height,
            weight: this.state.weight,
            BMI: this.state.BMI,
            pain: this.state.pain,
            smokingStatus: this.state.smokingStatus,
            headC: this.state.headCircumference,
          
          }

        
          var formBody = [];
          for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
          }
          formBody = formBody.join("&");
         
          fetch(`http://localhost:3000/nurse/add`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody
          }).then((resp)=>{
            console.log("Getting: " , resp);
            resp.json().then((data)=>{
              console.log("ddddddddddddddddd;  " , data[0])
              // this.setState({
              //   TypeObj:data[0]
              // })
              // object = data
            })
          }).catch(()=>{
            console.log("errror")
          })
        const items = await this.state.timeDate.map(
            (item ) => item.id === 0 ? {
            id:-1,
            date: this.getDate(),
            time: this.getTime(),
            temp:this.state.temp,
            pulse: this.state.pulse,
            bloodPressure: this.state.bloodPressure,
            respiratoryRate: this.state.respiratoryRate ,
            OXSat: this.state.oxygenSaturation,
            height: this.state.height,
            weight: this.state.weight,
            BMI: this.state.BMI,
            pain: this.state.pain,
            smokingStatus: this.state.smokingStatus,
            headC: this.state.headCircumference,
            }: item
          );
          // console.log("obj: " , obj);
          this.setState({timeDate : items});
          await this.func2()
          await this.sorting();
          // await this.sortAfterAdding();

    }

    handleopenModal1 = () => {
        this.setState({openModal1 : true})
      };
    
       handleClose = () => {
        this.setState({openModal1 : false})
      };
  

    getDate = ()=>{
      var d = new Date();
      var date = d.getFullYear()+"-"+d.getMonth()+"-"+d.getDay();
      return date
      }

    async componentDidMount(){
      await this.getLastVisits();
     

      // this.setState({key: this.state.timeDate.length});
      //   var temp =[];
      //   var obj2 = {
      //       id:this.state.key,
      //       date:this.getDate(),
      //       time :this.getTime(),
      //       temp:"",
      //       pulse:"" , 
      //       bloodPressure: "" ,
      //       respiratoryRate: "" ,
      //       OXSat:"" ,
      //       height:"" , 
      //       weight:"" ,
      //       BMI :"" ,
      //       pain:"",
      //       smokingStatus: "" ,
      //       headC : ""
      //   }
      //   temp.push(obj2)
      //   times.map((time,index)=>{
      //       var obj = {
      //           id:this.state.key+1,
      //           date:time.date,
      //           time:time.time,
      //           temp:time.temp,
      //           pulse:time.pulse, 
      //           bloodPressure: time.bloodPressure ,
      //           respiratoryRate: time.respiratoryRate,
      //           OXSat:time.OXSat,
      //           height:time.headC, 
      //           weight:time.weight,
      //           BMI :time.BMI,
      //           smokingStatus: time.smokingStatus,
      //           headC : time.headC,
      //           pain:time.pain

      //       }
      //       temp.push(obj);
      //       this.setState({timeDate:temp})
      //       this.setState({temp:[] , key : this.state.key+1});
            

      //   })
    }
    rendering = ()=>{
      return(
        <DataGrid sortModel={sortModel} rows={this.state.timeDate} columns={[
          { 
           field: 'date',
           
           headerName: 'Date',
           width: 250,
           valueGetter: (params) =>
           `${params.getValue('time') || 'unknown'} - ${params.getValue('time') || 'x'}`,
         sortComparator: (v1, v2, param1, param2) => param1.row.age - param2.row.age,
          
           renderCell: (params) => (       
            <>
                 {/* {console.log("parammmmms:    " , params.row.date)} */}
                 {/* {console.log("parammmmms:    " , params.row.time)} */}
               <p className="span">{params.row.date}</p>
               <p className="span">{params.row.time}</p>
               </>
           
           ),
           // field: 'time',
       //     renderCell: (params) => (
               
       //       <strong>
       //         {params.value}
               
       //       </strong>
       //     ),
         },
       
         { field: 'temp',
          headerName: "Tempreture (f)"
          , width: 200 },
         {
           field: 'pulse',
           headerName: 'pulse(bpm)',
           type: 'number',
           width: 150,
         },

         {
           field: 'bloodPressure',
           headerName: 'Blood Pressure(mmHg)',
           width: 300,
         },
         {
           field: 'pain',
           headerName: 'Pain (1-10)',
           width: 150,
         },
         {
           field: 'respiratoryRate',
           headerName: 'Respiratory Rate(rpm)',
           width: 200,
         },
         {
           field: 'OXSat',
           headerName: 'Oxygen Saturation(%)',
           width: 200,
         },
        
         {
           field: 'height',
           headerName: 'Height (in)',
           width: 150,
         },
         {
           field: 'weight',
           headerName: 'weight(lbs)',
           width: 150,
         },
       
         {
           field: 'BMI',
           headerName: 'BMI (Kg/m2)',
           width: 150,
         },
       
         {
           field: 'smokingStatus',
           headerName: 'smokingStatus',
           width: 200,
         },
         {
           field: 'headC',
           headerName: 'headCircumfrence(in)',
           width: 200,
         },
         { 
           field: 'Actions',
           headerName: 'Actions',
           width: 250,
           renderCell: (params) => (
             <strong>
               {/* {params.value.getFullYear()} */}
               <Button
                 variant="contained"
                 color="default"
                 size="small"
                 className={this.props.classes.button}
                 startIcon={<EditIcon />}
                
                 style={{ marginLeft: 16 }}
                 onClick={()=>{
                   this.handleopenModal1();
                   console.log("lsssssssssssssssssssssssssssssssssssss")
                   this.getTypeByID(params.row.id);
                   this.getData()
                 }
                   
                 }
               >
                  Edit
                 
               </Button>
               <Button
                 variant="contained"
                 color="secondary"
                 size="small"
                 className={this.props.classes.button , this.props.classes.deleteButton}
                 startIcon={<EditIcon />}
                 style={{ marginLeft: 16 }}
                 onClick={async ()=>{
                    console.log("delete function: " , params.row.id);
                   this.handleDelete(params.row.id);
                   // this.refreshAfterDeletion(params.row.id);
                 }}
               >
                 delete
               </Button>
             </strong>
           ),
         }
        ]} pageSize={5} checkboxSelection rowHeight={80} />
      )
    }
    componentDidUpdate () {
      this.rendering();
      // this.sortAfterAdding();
    }
    render() { 
        const { classes } = this.props;
        return (
    <div className="container" style={{ height: 400, width: '100%' }}>
      {console.log(this.state.timeDate)}
          {this.rendering()}
       <Fab color="primary" aria-label="add" className ={this.props.classes.iconPlus} onClick = {()=>{
                          this.handleopenModal1()
                        }} >
            <AddIcon  />
        </Fab> 
<Modal
key = "1"
  open={this.state.openModal1}
  onClose={this.handleClose}
  aria-labelledby="simple-modal-title1"
  aria-describedby="simple-modal-description2"
>
<Container component="main" maxWidth="xs">
      {/* <CssBaseline /> */}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AddBoxIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
              InputProps={{ classes: { input: this.props.classes.input2 } }}
                variant="outlined"
                required
                fullWidth
                id="temp"
                label="Temp"
                name="temp" 
                type="number"
                autoComplete="temp"
                // placeholder={this.state.TypeObj.name}
                onChange = {(event) =>{
                    // console.log(event.target);
                    this.handleChange(event);
                //   this.setState({name : event.target.value});
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
              InputProps={{ classes: { input: this.props.classes.input2 } }}
                variant="outlined"
                required
                fullWidth
                id="pulse"
                label="pulse"
                name="pulse" 
                type="text"
                autoComplete="pulse"
                // placeholder={this.state.TypeObj.name}
                onChange = {(event) =>{
                    this.handleChange(event);

                //   this.setState({name : event.target.value});
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
              InputProps={{ classes: { input: this.props.classes.input2 } }}
                variant="outlined"
                required
                fullWidth
                id="bloodPressure"
                label="Blood Pressure"
                name="bloodPressure" 
                type="text"
                autoComplete="bloodPressure"
                // placeholder={this.state.TypeObj.name}
                onChange = {(event) =>{
                    this.handleChange(event);

                //   this.setState({name : event.target.value});
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
              InputProps={{ classes: { input: this.props.classes.input2 } }}
                variant="outlined"
                required
                fullWidth
                id="respiratoryRate"
                label="Respiratory Rate"
                name="respiratoryRate" 
                type="text"
                autoComplete="RespiratoryRate"
                // placeholder={this.state.TypeObj.name}
                onChange = {(event) =>{
                    this.handleChange(event);

                //   this.setState({name : event.target.value});
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
              InputProps={{ classes: { input: this.props.classes.input2 } }}
                variant="outlined"
                required
                fullWidth
                id="OXYgenSaturation"
                label="Oxygen Saturation"
                name="oxygenSaturation" 
                type="text"
                autoComplete="OXYgenSaturation"
                // placeholder={this.state.TypeObj.name}
                onChange = {(event) =>{
                    this.handleChange(event);

                //   this.setState({name : event.target.value});
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
              InputProps={{ classes: { input: this.props.classes.input2 } }}
                variant="outlined"
                required
                fullWidth
                id="Height"
                label="Height"
                name="height" 
                type="number"
                autoComplete="Height"
                // placeholder={this.state.TypeObj.name}
                onChange = {(event) =>{
                    this.handleChange(event);

                //   this.setState({name : event.target.value});
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
              InputProps={{ classes: { input: this.props.classes.input2 } }}
                variant="outlined"
                required
                fullWidth
                id="weight"
                label="Weight"
                name="weight" 
                type="number"
                autoComplete="weight"
                // placeholder={this.state.TypeObj.name}
                onChange = {(event) =>{
                    this.handleChange(event);

                //   this.setState({name : event.target.value});
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
              InputProps={{ classes: { input: this.props.classes.input2 } }}
                variant="outlined"
                required
                fullWidth
                id="BMI"
                label="BMI"
                name="BMI" 
                type="text"
                autoComplete="BMI"
                // placeholder={this.state.TypeObj.name}
                onChange = {(event) =>{
                    this.handleChange(event);

                //   this.setState({name : event.target.value});
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
              InputProps={{ classes: { input: this.props.classes.input2 } }}
                variant="outlined"
                required
                fullWidth
                id="Pain"
                label="Pain"
                name="Pain" 
                type="number"
                autoComplete="Pain"
                // placeholder={this.state.TypeObj.name}
                onChange = {(event) =>{
                    this.handleChange(event);

                //   this.setState({name : event.target.value});
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
              InputProps={{ classes: { input: this.props.classes.input2 } }}
                variant="outlined"
                required
                fullWidth
                id="smokingStatus"
                label="smokingStatus"
                name="smokingStatus" 
                type="text"
                autoComplete="smokingStatus"
                // placeholder={this.state.TypeObj.name}
                onChange = {(event) =>{
                    this.handleChange(event);

                //   this.setState({name : event.target.value});
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
              InputProps={{ classes: { input: this.props.classes.input2 } }}
                variant="outlined"
                required
                fullWidth
                id="headCircumference"
                label="Head Circumference"
                name="headCircumference" 
                type="number"
                autoComplete="headCircumference"
                // placeholder={this.state.TypeObj.name}
                onChange = {(event) =>{
                    this.handleChange(event);

                //   this.setState({name : event.target.value});
                }}
              />
            </Grid>
            
           
          </Grid>
          <Button
            type="button"
            variant="contained"
            color="primary"
            fullWidth
            className={classes.submit}
            onClick={()=>{
                this.handleAddition()
              
            //   this.handleAdding();
            //   this.getData();
              // console.log("user: " , obj);
              // handleSignup()
            }}
          >
            Add
          </Button>
          
        </form>
      </div>
      {/* <Box mt={5}>
        <Copyright />
      </Box> */}
    </Container>
</Modal>
    </div>
          );
    }
}
 
export default withStyles(useStyles) (NurseVisit);
