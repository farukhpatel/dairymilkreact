import axios from 'axios';
import React, { useState } from 'react';
import Noty from 'noty';
// import '../../node_modules'  
import "../../node_modules/noty/lib/noty.css";  
import "../../node_modules/noty/lib/themes/mint.css";  

const AddCustomer=()=>{
    const [form,setForm]=useState({
        customerName:null,
        customerId:null
    });
    const onChanges=(e)=>{
        if(e.target.name==="customerId"){
            setForm({...form,[e.target.name]:Number(e.target.value)});    
            // Number(e.target.value);
        }else{
        setForm({...form,[e.target.name]:e.target.value});
        }
    }
    const onSubmits=(e)=>{
        e.preventDefault();
        e.target.reset();
        // console.log(form);
        var config = {
            method: 'post',
            url: 'https://dairymilkapi.herokuapp.com/addCustomer',
            headers: { },
            data : form
            };
        axios(config)
        .then(res=>{
            // console.log(res);
            if(res.data.customer){
                setTimeout(function() {  
                    new Noty({
                        text: `${res.data.customer}`,
                        layout:'topCenter',
                        type:'error'
                    }).show();
                  }, 500);
            }
            else{
                setTimeout(function() {  
                    new Noty({
                        text: `User saved with customer ID;- ${res.data.saved.customerId}`,
                        layout:'topCenter',
                        type:'success'
                    }).show();
                  }, 500);
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }
    return(

        <>
            <h1> AddCustomer </h1>
            <form onSubmit={onSubmits}>
                <label htmlFor="">Enter customer name:-</label><br />
                <input type="text" name="customerName" onChange={onChanges} /><br /><br />
                <label htmlFor="">Enter customer name:-</label><br />
                <input type="text" name="customerId" onChange={onChanges} /><br /><br />
                <button type='submit'>submit</button>
            </form>
        </>
    );
}
export default AddCustomer;


// {
//     "customerName":"Test Name",
//     "customerId":3
// }