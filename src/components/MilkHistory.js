import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './table.css';
const MilkHistory=()=>{
    const [loaded,setLoaded]=useState(false);
    const [loading,setLoading]=useState(false);
    const [customerId,setCustomerId]=useState(null);
    const [data,setData]=useState([]);
    const [error,setError]=useState(null);
    const onChanges=(e)=>{       
        setCustomerId(e.target.value);
    }
    const onSubmits=(e)=>{
        e.preventDefault();  //here i stop the default behaviour of form
        // setLoading(true);
        e.target.reset(); //for erase fields after submit form
        console.log(customerId);
         axios.get(`https://dairymilkapi.herokuapp.com/findMilkData/${customerId}`)
       .then((data)=>{
         setLoaded(true);
         if(data.data.message){
             setError(data.data.message);
         }else{
             console.log(data);

             setData(data.data.milkHistory);
         }
        })
        .catch(err=>console.log(err));
         setCustomerId(null);
        //you can submit here
    }
   
   if(!loaded){
    return(
        <>
            <h1>MilkHistory {customerId}</h1>
        
            <form onSubmit={onSubmits}>
                <label>Enter customerId</label><br /><br /> 
                <input type="text" name="customerId" onChange={onChanges} placeholder={customerId}/><br /><br />
                <button type='submit' onClick={()=>{setLoading(true)}}>Show History</button><br />
            </form>
            <br />          
        </>
    );
   }
   else if(loading && !loaded){
        return(
            <h1>Loading...</h1>
        );
   }
   else if(error){
    return(
        <h1>{error}</h1>
    );
}
   else if(loaded){             
       return(
         <div >
             <h1 style={{display:'block'}}>Your milk History for customerId {customerId}</h1>
             <div className="table_div">
            <table>
            <tbody>
                <tr>
                    <th>CustomerId</th>
                    <th>Liter</th>
                    <th>Fat</th>
                    <th>Date</th>
                </tr>
                {data.map(( listValue ) => {
               return (
              <tr key={listValue._id}>
              <td>{listValue.customerId}</td>
              <td>{listValue.liter}</td>
              <td>{listValue.fat}</td>
              <td>{listValue.createdAt}</td>
            </tr>
          );
        })}
             </tbody>
            </table>
            </div>
             
         </div>
       );
   }
}
export default MilkHistory;