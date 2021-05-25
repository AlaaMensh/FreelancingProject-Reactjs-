import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
const useStyles = makeStyles((theme) => ({
  root: {
    padding:5,
    backgroundColor:'#fff',
    borderRadius:10,
    marginLeft:10
  },
  formControl: {
    marginRight: 2,
    marginTop:10,
    width:'100%'
  },
  button: {
    marginRight: 2,
    marginTop:40,
    width:'100%'
  },
}));
export default function BasicTextFields({add_row,PID}) {
  const classes = useStyles();

  const [drugs,setDrugs]=React.useState([]);

  const DrugSchema = Yup.object({
    quantity:Yup.number().required().min(1),
    drug:Yup.string().required(),
    duration:Yup.number().required()
})

const AddToDB = (row)=>{
  console.log(row)
  var t = row.drug.split(',')
  console.log(t)
  axios.post('http://localhost:3000/visit/addPrescription_Drugs_single',{
    Quantity : row.quantity,
    Duration : row.duration,
    drug_id : t[0],
    PId : PID
  }).then(res=>{
    add_row({
      drugName:t[1],
      Quantity:row.quantity,
      Duration:row.duration,
      id:res.data.insertId
  })
  }).catch(err=>{
    console.log(err+" err in create drugs_prescription")
  })

}

React.useEffect(async()=>{
  await loadDrugs()
},[])

const loadDrugs = ()=>{
  console.log(drugs)
  if(drugs.length >0){
    return;
  }

axios.get('http://localhost:3000/drug/getAll').then(res=>{
  setDrugs(res.data)
  console.log("mostafa",res.data)
}).catch(err=>{
})
}
  return (
    <form className={classes.root} noValidate autoComplete="off">
        <h1 style={{textAlign:'center'}}>Drugs</h1>
        <Formik 
        validationSchema={DrugSchema}
        initialValues={{quantity:1,duration:7,drug:''}}
        onSubmit={(values,actions)=>{
            AddToDB(values)
            actions.resetForm()
        }}
        >
            {(formikprops)=>(
                <div>
                <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Drug Name</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formikprops.values.drug}
                onChange={formikprops.handleChange('drug')}
                onBlur={formikprops.handleBlur('drug')}
                error={(formikprops.touched.drug && formikprops.errors.drug)?true:false}
                >
                  {
                  drugs.length >0 && drugs.map(drug=>
                  <MenuItem key={drug.id} value={drug.id+","+drug.genricName}>
                    {drug.genricName}
                    </MenuItem>)
                    }
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
            <TextField
             type="number"
              InputProps={{ inputProps: { min: 1, max: 6 } }}
               error={(formikprops.touched.quantity && formikprops.errors.quantity)?true:false} id="standard-basic" label="Quantity Per Day"
               value={formikprops.values.quantity}
               onChange={formikprops.handleChange('quantity')}
               onBlur={formikprops.handleBlur('quantity')} />
            </FormControl>
            <FormControl className={classes.formControl}>
            <TextField type="number" InputProps={{ inputProps: { min: 1 } }}
             error={(formikprops.touched.duration && formikprops.errors.duration)?true:false}
            id="standard-basic"
              label="Duration Per Day"
              value={formikprops.values.duration}
              onChange={formikprops.handleChange('duration')}
              onBlur={formikprops.handleBlur('duration')}
               />
            </FormControl>

            <Button onClick={formikprops.handleSubmit}  className={classes.button} variant="contained" color="primary">
                Add
            </Button>
            </div>
            )}
        </Formik>
    </form>
  );
}