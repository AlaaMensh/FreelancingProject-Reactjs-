import { Grid } from '@material-ui/core';
import React from 'react';
import PDF from './PDF';
import Form from './PrescriptionForm';
import Table from './Table';
import  { useState , useEffect } from 'react';
// import StepperForms from './Stepper';
export default function Prescription({match})
{
        // In order to gain access to the child component instance,
  // you need to assign it to a `ref`, so we call `useRef()` to get one
  const childRef = React.useRef();
  const pdfRef = React.useRef();
  const AddRow = (data)=>{
    console.log(data)
      childRef.current.addRow(data);
      pdfRef.current.addRow(data);
  }
  const DeleteRows = (data)=>{
      pdfRef.current.updateData(data);
  }
  useEffect (()=>{
    console.log("visitID : " , match.params.visitId)
  })
  const PrintElem=()=>
  {
      var mywindow = window.open('', 'PRINT', 'height=400,width=600');
      // mywindow.document.write('<html><head><title>' + document.title  + '</title>');
      // mywindow.document.write('</head><body >');
      // mywindow.document.write('<h1>' + document.title  + '</h1>');
      // mywindow.document.write(document.getElementById('printme').innerHTML);
      const printableElements = document.getElementById('printme').innerHTML;
      mywindow.document.write( '<html><head><title></title></head><body>' + printableElements + '</body></html>');
      mywindow.document.close(); // necessary for IE >= 10
      mywindow.focus(); // necessary for IE >= 10*/
      mywindow.print();
      //mywindow.close();
      return true;
  }
  const printOrder = () => {
    const printableElements = document.getElementById('printme').innerHTML;
    const temp = '<html><head><title></title></head><body>' + printableElements + '</body></html>'
    const oldPage = document.body.innerHTML;
    document.body.innerHTML = temp;
    window.print();
    document.body.innerHTML = oldPage
}
    return(
        <div>
        <Grid style={{position:'absolute',marginTop:25}} container spacing={3}>
        <Grid item xs={4}>
          <Form add_row={AddRow}/>
        </Grid>
        <Grid item xs={4}>
        <Table DelteFromPDF={DeleteRows} visitId = {match.params.visitId} ref={childRef}/>
        </Grid>
        <Grid item xs={4}>
          <PDF printableId='printme' ref={pdfRef}/>
        </Grid>
      </Grid>
      </div>
    )
}