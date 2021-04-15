import React from 'react';
import Navbar from '../components/Navbar';
import {useEffect , useState} from "react"


const DashBoard = () => {
    const [ appBarList , setAppBarList] = useState(["index1" , "index2" , "index3" , "index4"]);
    const [ role , setRole] = useState("Doctor");
    const [ isLogin , setisLogin] = useState(false);
    const [ dropDownFunctions , setdropDownFunctions] = useState(["lolo1" , "lolo2" ,"lolo3"]);
    // var appBarList = ["Alaa" , "Ahmed" , "Mohamed" , "lol"];
    const MainFunctions = [
        {text: "New Doctor Appointement" , role :"doctor"},
        {text: "New patient registration" , role :"doctor"},
        {text: "EMR Electronic Medical Records" , role :"doctor"},
        {text: "Lap Information System" , role :"doctor"},
        {text: "Rediology information system" , role :"doctor"},
        {text: "Path information system " , role :"doctor"},
        {text: "Electronic proception ERX" , role :"doctor"},
        {text: "Document Manegment" , role :"doctor"},
        {text: "System Admin" , role :"doctor"},
        // {text: "New Doctor Appointement" , role :"doctor"},
    ]
    var Icons = [];
    // var role = "user"
    // var isLogin = true;
    // var dropDownFunctions=["lolo1" , "lolo2" ,"lolo3"];

    return (  
        <div>
            <Navbar name = "alaa" appBarList= {appBarList} 
                                  role= {role}
                                  dropDownFunctions= {dropDownFunctions}
                                  isLogin = {isLogin} 
                                  MainFunctions ={MainFunctions} 
                                />
        </div>
    );
}
 
export default DashBoard;