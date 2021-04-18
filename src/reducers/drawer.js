export function Drawer(state = null , action){
    console.log(action);
    
    
        switch(action.type){
            case "getOpen":{
                return action.payload;
            }
            case "setOpen":{
                return action.payload;
            }
            
            
            default : {
                return state
            }
        }
    
    }
    