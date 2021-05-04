import { Button } from '@material-ui/core';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import axios from 'axios';
import * as React from 'react';
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'drugName', headerName: 'Drug', width: 130 },
  { field: 'Quantity', headerName: 'Quantity',type:'number', width: 130 },
  {
    field: 'Duration',
    headerName: 'Duration',
    type: 'number',
    width: 130,
  },
//   {
//     field: 'fullName',
//     headerName: 'Full name',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 160,
//     valueGetter: (params) =>
//       `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
//   },
];
const { forwardRef, useRef, useImperativeHandle } = React;
const Table =  forwardRef((props,ref)=>{
  let fromdata= new FormData()
      // The component instance will be extended
    // with whatever you return from the callback passed
    // as the second argument
    useImperativeHandle(ref, () => ({
        addRow(data) {
            var max = 0
            if(rows.length > 0)
            {
                max = rows[rows.length-1].id
            }
            rows.push({id:parseInt(max+1),drugName:data.drug.split(",")[1],drug:data.drug.split(",")[0],Quantity:data.quantity,Duration:data.duration});
            setRows([...rows]);
        }
    }));
    const [rows,setRows] = React.useState([
      ]);
      const AddToDB = ()=>{
        if(rows.length == 0){
          alert("empty data");
          return;
        }else{
          let postData = {}
          postData.notes = "test notes"
          postData.visit_id = props.visitId
          postData.data = []
          console.log(rows)
          rows.map(row=>{
            return postData.data.push({
              drug_id : row.drug,
              Quantity:row.Quantity,
              Duration:row.Duration
            })
          })
          console.log(postData.data)
          axios.post('http://localhost:3000/visit/addPrescription_Drugs',postData).then(result=>{
            setRows([])
          }).catch(err=>{
            console.log(err)
          })
        }
      }
    const [selectionModel,setSelectionModel]=React.useState([]);
    const handleRowSelection = (e)=>{
        if(e.isSelected)
        {
            // let temp = rows.filter(row=>row.id !== e.data.id)
            selectionModel.push(e.data)
            setSelectionModel([...selectionModel])
        }else{
            let index = selectionModel.findIndex(row=>row.id == e.data.id)
            if(index != -1)
            {
                selectionModel.splice(index,1)
                setSelectionModel([...selectionModel])
            }
        }
    }
    const DeleteRows = ()=>{
        let temp = rows
        var index = -1
        selectionModel.map(row=>{
            index = temp.findIndex(r=>r.id == row.id)
            console.log(index)
            if(index != -1)
            {
                console.log('deleted')
                temp.splice(index,1)
            }
            return row
        })
        // console.log(temp)
        setRows([...temp])
        props.DelteFromPDF(rows)
        console.log(rows)
    }
  return (
    <div style={{ height: 400, width: '100%',backgroundColor:'#fff' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection  components={{
    Toolbar: GridToolbar,
  }}
  onRowSelected={handleRowSelection}
//   selectionModel={selectionModel}
//   onSelectionModelChange={(newSelection)=>{
//       setSelectionModel(newSelection.selectionModel)
//   }}
/>
<Button onClick={AddToDB}  variant="contained" color="primary"
  style={{width:'420px',margin:10}} >
            Save
    </Button>
  <Button onClick={DeleteRows}  variant="contained" color="secondary"
  style={{width:'420px',margin:10}} >
            Delete
    </Button>
    </div>
  );
}) 
export default Table