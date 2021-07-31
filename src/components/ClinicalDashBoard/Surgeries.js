import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Spinner from '../shared/Spinner';
import DataTableComp from "../typesGenerator/dataTable";

var g = null
const base_url = "https://mvb1.herokuapp.com/"
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
  
const columns = [
    {
        name : "Surgery Name",
        selector : "name"
    },
    {
        name : "Status",
        selector : "date",
    // cell : row => <span className="badge badge-primary">Planned</span>

    cell : row => (row.date?<span className="badge badge-success">Done </span>:<span className="badge badge-primary">Planned</span>)


    },
    {
        name : "Treating Doctor",
        selector : "firstName,lastName",
        cell : row => <span>{row.firstName != null? row.firstName+ " " + row.lastName : ""}</span>
    },
    {
        name : "Actions",
        cell : row => <button className="btn btn-success" onClick={(e)=>g(row.id)}>Done</button>
    }
]

const SurgeriesScreen = ({match})=>{
    const [data,setData] = useState([])
    const [historydata,setHistoryData] = useState([])
    const [loading,setLoading] = useState(false)
    const [value, setValue] = React.useState(0);

    const DoneSurgery = g =  async(id)=>{
        await setLoading(true) 
        await axios.put(`${base_url}/surgery/UpdatePatientSurgeries`,{
            id,
            drId:localStorage.getItem("userId")
        }).then(res=>{
             loadData()
        }).catch(err=>{
        })
       await setLoading(false)

    }
    const loadData = ()=>{
         axios.get(`${base_url}/surgery/getPatientSurgeriesPlanned/${match.params.id}`).then(res=>{
            setData(res.data)
        }).catch(err=>{
        })
        axios.get(`${base_url}/surgery/getPatientSurgeriesPerformed/${match.params.id}`).then(res=>{
            setHistoryData(res.data)
        }).catch(err=>{
        })
    }
    useEffect(async()=>{
        await setLoading(true)
        if(!match.params.id)
            return
         await loadData();
         await setLoading(false)

    },[match])

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
    
    
    return(
        <div className="root">
      <Spinner loading={loading}/>
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
          <Tab label="Planned Surgeries" {...a11yProps(0)} />
          <Tab label="Historical Surgeries" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <div style={{position:'relative'}}>

            <TabPanel value={value} index={0}>

                <DataTableComp  data = {data}
                  columns = {columns}
                  title= ""
            />
            </TabPanel>
            <TabPanel value={value} index={1}>

                <DataTableComp  data = {historydata}
                columns = {columns}
                title= ""
                />
            </TabPanel>
            </div>
        </div>
    )
}

export default SurgeriesScreen;