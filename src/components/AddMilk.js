import axios from 'axios';
import React, { useState } from 'react';
import Noty from 'noty';
// import '../../node_modules'  
import "../../node_modules/noty/lib/noty.css";  
import "../../node_modules/noty/lib/themes/mint.css";  

const AddMilk=()=>{
    const [formData,setFormData]=useState({
        customerId:null,
        liter:null,
        fat:null
    });
    const onChanges=(e)=>{
        // console.log(e.target.value);
        // console.log(e.target.name);
        setFormData({...formData,[e.target.name]:Number(e.target.value)});
    }
    const onSubmits=(e)=>{
        e.preventDefault();
        e.target.reset();
        // console.log(formData);
        var config = {
            method: 'post',
            url: 'https://dairymilkapi.herokuapp.com/addMilk',
            headers: { },
            data : formData
        };
        axios(config).then(res=>{
            
            if(res.data.User){
                console.log(res.data.User);
               
                    new Noty({
                        text: `${res.data.User}`,
                        layout:'topCenter',
                        timeout:1000,
                        type:'error'
                    }).show();
                
            }
            else{
                setTimeout(function() {  
                    new Noty({
                        text: `milk added in customerId ${res.data.customerId}`,
                        layout:'topCenter',
                        type:'success'
                    }).show();
                  }, 500);
                console.log("done");
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }
    return(
        <>
            <h1>AddMilk</h1>
            <div>
                <form onSubmit={onSubmits}>
                    <label htmlFor="">Enter customerId</label><br />
                    <input type="text" name="customerId" onChange={onChanges} /><br /><br />
                    <label htmlFor="">Enter milk in liter</label><br />
                    <input type="text" name="liter" onChange={onChanges} /><br /><br />
                    <label htmlFor="">Enter fat</label><br />
                    <input type="text" name="fat" onChange={onChanges} /><br /><br />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    );
}
export default AddMilk;



// {
//     "customerId":3,
//     "liter":7,
//     "fat":6.6
// }