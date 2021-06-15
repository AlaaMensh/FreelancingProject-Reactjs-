import Fab from '@material-ui/core/Fab';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MyModal from '../Prescription/modal';
import Prescription from '../Prescription/Prescription';
import MyDialog from './MyDialog';
const PColumns = [
    { field: 'id', headerName: 'ID', hide:true },
    { field: 'PNotes', headerName: 'Notes', width:500},
    { field: 'PDate', headerName: 'Date',width:150},
  
  ];

const PDColumns = [
    { field: 'id', headerName: 'ID', hide:true },
    { field: 'drug', headerName: 'drug', width:150},
    { field: 'notes', headerName: 'notes',width:150},
    { field: 'date', headerName: 'date',width:150},
    { field: 'Quantity', headerName: 'Quantity',type:'number',width:150},
    {
      field: 'Duration',
      headerName: 'Duration',
      type: 'number',
      width:150
    },
  ];


const MyPrescriptions = ({match}) =>{
    const [rows,setRows] = useState([])
    const [data,setData] = useState([])
    const [drug_rows,setDrugRows] = useState([])
    const [open, setOpen] = React.useState(false);
    const [drugModal, setDrugModal] = React.useState(false);

    const ptId = match.params.id  

    useEffect(async()=>{
        await MyPrescriptions()
      },[])

     const MyPrescriptions = ()=>{
        axios.post("http://localhost:8080/visit/myPrescriptions",{
            ptId : ptId
        }).then(res=>{
            if(res.data && res.data.length > 0)
            {
                setData([...res.data])
                setRows([...res.data])
            }
        }).catch(err=>{
            alert(err)
        })
     } 

    const SelectRow = (row)=>{
        let index = rows.findIndex(r=>r.id == row.id)
        if(index != -1)
        {
            setDrugRows([...rows[index].drugs])
            setDrugModal(true)
        }
    }

    const JobFinish = ()=>{
         MyPrescriptions()
        
    }

    //handle Modal Open
     const handleOpen = () => {
         setOpen(true);
    };
    //handle Modal CLose
    const handleClose = () => {
         setOpen(false);
    };

    //handle Modal Open
    const handleDrugOpen = () => {
        setDrugModal(true);
    };
    //handle Modal CLose
    const handleDrugClose = () => {
        setDrugModal(false);
    };

    return (
        <>
        <MyDialog open={open} handleClose={handleClose}>
            <Prescription match={match} patient_id={ptId} finish_method={JobFinish}/>
        </MyDialog>
        <MyModal open={drugModal} handleClose={handleDrugClose}>
        <div style={{position:'relative', height: 400, width: '100%',backgroundColor:'#fff' }}>
            <DataGrid rows={drug_rows} columns={PDColumns} pageSize={5} checkboxSelection  components={{
                Toolbar: GridToolbar,
            }}
            />
        </div>
        </MyModal>
        <div style={{position:'relative', height: 400, width: '100%',backgroundColor:'#fff' }}>
            <div style={{ position:'absolute',top:0,right:0,textAlign:"center",zIndex:999}}>
                <Fab color="primary"  aria-label="add" onClick={()=>handleOpen()} >
                    <AddIcon  />
                </Fab> 
            </div>
            <DataGrid id={Math.random()}  onRowDoubleClick={(row)=>SelectRow(row)} rows={rows} columns={PColumns} pageSize={5}  components={{
                Toolbar: GridToolbar,
            }}
            />
        </div>
        </>
    )
}

export default MyPrescriptions;