import axios from 'axios';
// const baseUrl = "http://localhost:4200/students";
var open = false;
export async function handleChangeOpen(){
     return {
         type:"getOpen",
         payload:open
     }

    }
export async function setChangeOpen(value){
    open = value;
     return {
         type:"setOpen",
         payload:"Open is changed"
     }

    }