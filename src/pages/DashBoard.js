import React from 'react';
import Navbar from '../components/Navbar';
import {useEffect , useState} from "react"


const DashBoard = () => {
    const [ appBarList , setAppBarList] = useState(["index1" , "index2" , "index3" , "index4"]);
    const [ role , setRole] = useState("user");
    const [ isLogin , setisLogin] = useState(false);
    const [ dropDownFunctions , setdropDownFunctions] = useState(["lolo1" , "lolo2" ,"lolo3"]);
    // var appBarList = ["Alaa" , "Ahmed" , "Mohamed" , "lol"];
    var Icons = [];
    // var role = "user"
    // var isLogin = true;
    // var dropDownFunctions=["lolo1" , "lolo2" ,"lolo3"];

    return (  
        <div>
            <Navbar name = "alaa" appBarList= {appBarList} 
                                  role= {role}
                                  dropDownFunctions= {dropDownFunctions}
                                  isLogin = {isLogin} />
        </div>
    );
}
 
export default DashBoard;