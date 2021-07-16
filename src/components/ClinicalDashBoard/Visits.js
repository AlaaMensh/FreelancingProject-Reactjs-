import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Spinner from '../shared/Spinner';
import DataTableComp from "../typesGenerator/dataTable";

const columns = [
    {
        name : "diagnosis",
        selector : "diagnosis"
    },
    {
        name : "Chief Complains",
        selector : "chiefComplains"

    },
    {
        name : "Treating Doctor",
        selector : "firstName,lastName",
        cell : row => <span>{row.firstName + " " + row.lastName}</span>
    },
    {
        name : "Date of Creation",
        selector : "createdAt"
    }
]

const VisitScreen = ({match})=>{
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true)
        if(!match.params.id)
            return
        axios.post(`https://mvb1.herokuapp.com/visit/getPatientVisits`,{
            ptId : match.params.id,
            type : 'patient'
        }).then(res=>{
            setData(res.data)
        }).catch(err=>{
            alert(err)
        })
        setLoading(false)

    },[match])

    
    return(
        <Container>
      <Spinner loading={loading}/>

                <DataTableComp  data = {data}
                  columns = {columns}
                  title= ""
            />
        </Container>
    )
}

export default VisitScreen;