import axios from 'axios';


export const AddPrescriptionToDB = (data)=>{
    return new Promise((resolve,reject)=>{
        axios.post('http://localhost:8080/visit/addPrescription',data)
        .then(res=>{
              resolve(res.data.insertId)
          }).catch(err=>{
            reject(err)
          })
    })
}

export const loadDrugs = ()=>{
    return new Promise((resolve,reject)=>{
        axios.get('http://localhost:8080/drug/getAll').then(res=>{
                resolve(res.data)
            })
            .catch(err=>{
                reject(err)
            })  
    })
}

export const AddPrescriptionDrug = (data)=>{
    return new Promise((resolve,reject)=>{
        axios.post('http://localhost:8080/visit/addPrescription_Drugs_single',data).then(res=>{
            resolve(res.data.insertId)

          }).catch(err=>{
            reject(err)
          })
    })
}