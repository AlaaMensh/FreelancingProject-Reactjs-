import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import React from 'react';
import MyModal from '../Prescription/modal';
import Form from '../Prescription/PrescriptionForm';
import { loadMYDrugs } from '../Prescription/request';

const columns = [
    { field: 'id', headerName: 'ID', hide:true },
    { field: 'drugName', headerName: 'Drug', width:150},
    { field: 'Quantity', headerName: 'Quantity',type:'number',width:150},
    {
      field: 'Duration',
      headerName: 'Duration',
      type: 'number',
      width:150
    },
    {
        field: 'createdAt',
        headerName: 'Date',
        width:150
      }
  
  ];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonAuto({match}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [rows,setRows] = React.useState([])
  const [active_rows,setActiveRows] = React.useState([])
  const [un_active_rows,setUnActiveRows] = React.useState([])
  const [open, setOpen] = React.useState(false);
  const ptId = match.params.id  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(async()=>{
    await MYDrugs()
  },[])

      //handle Modal Open
      const handleOpen = () => {
        setOpen(true);
    };
    //handle Modal CLose
    const handleClose = () => {
        setOpen(false);
    };

  const CheckStatus = (row)=>{
    var d = new Date(row.createdAt)
    var newDate = new Date()
    if(
        (d.getDate() + row.Duration) >= newDate.getDate()
     && d.getMonth() >= newDate.getMonth() 
     && d.getFullYear() >= newDate.getFullYear())
     {
         return true
     }

     return false
  }

  const MYDrugs = ()=>{
    loadMYDrugs().then(data=>{
        data.map(row=>{
            let index =  rows.findIndex(r=>r.id == row.id)
            if(index == -1)
            {
                let date = new Date(row.createdAt)
                rows.push({
                    id : row.id,
                    drugName : row.name,
                    Quantity : row.Quantity,
                    Duration : row.Duration,
                    createdAt : date.getDate()+
                    "/"+(date.getMonth()+1)+
                    "/"+date.getFullYear(),
                    status : CheckStatus(row)?"active":"inactive"
                })
            }
        })
        setRows([...rows])
        setActiveRows(rows.filter(r=>r.status == "active"))
        setUnActiveRows(rows.filter(r=>r.status == "inactive"))
    }).catch(err=>{
        alert(err)
    })
  
  }

  const add_row = (data)=>{
      let date = new Date()
      let index =  active_rows.findIndex(r=>r.id == data.id)
      if(index == -1)
      {
        active_rows.push({
            ...data,
            createdAt : date.getDate()+
            "/"+(date.getMonth()+1)+
            "/"+date.getFullYear()
        })
      }
    setActiveRows([...active_rows])
  }

  return (
    <div className={classes.root}>
        <MyModal open={open} handleClose={handleClose}>
         <Form ptId={ptId} PID={0} add_row={add_row}/>
      </MyModal>

      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Active Drugs" {...a11yProps(0)} />
          <Tab label="In Active Drugs" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <div style={{position:'relative'}}>
      <div style={{ position:'absolute',top:0,right:0,textAlign:"center",zIndex:999}}>
          <Fab color="primary"  aria-label="add" onClick={()=>handleOpen()} >
          <AddIcon  />
          </Fab> 
        </div>
      <TabPanel value={value} index={0}>
      <div style={{position:'relative', height: 400, width: '100%',backgroundColor:'#fff' }}>
      <DataGrid rows={active_rows} columns={columns} pageSize={5} checkboxSelection  components={{
            Toolbar: GridToolbar,
        }}
        />
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <div style={{position:'relative', height: 400, width: '100%',backgroundColor:'#fff' }}>
      <DataGrid rows={un_active_rows} columns={columns} pageSize={5} checkboxSelection  components={{
            Toolbar: GridToolbar,
        }}
        />
        </div>
      </TabPanel>
      </div>
    </div>
  );
}
