// import "./search.css";
import React from 'react';
const SearchForm = (props) => {
    // console.log("/////////////////")
    // console.log(props);
    return (
            
                <div class="input-group w-50">
                    <input type="text" class="form-control " name="name" id="name"  placeholder="Enter Search Name" aria-label="Username" aria-describedby="basic-addon1" onChange={
                        (e)=>{
                            props.getSearchName(e.target.value);
                        }}/>
                    <div class="input-group-prepend rounded">
                        <span class="input-group-text " id="basic-addon1"><i class="fa fa-search-plus"></i></span>
                    </div>
                </div>
            
                
        
     );
}
 
export default SearchForm;
