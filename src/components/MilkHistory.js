
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Noty from 'noty';
import moment from 'moment';
import "../../node_modules/noty/lib/noty.css";  
import "../../node_modules/noty/lib/themes/mint.css";  
import './table.css';
const MilkHistory=()=>{
    const [total,setTotal]=useState(0);
    const [loaded,setLoaded]=useState(false);
    const [loading,setLoading]=useState(false);
    const [customerId,setCustomerId]=useState(null);
    const [data,setData]=useState([]);
    const [error,setError]=useState(null);
    const onChanges=(e)=>{       
        setCustomerId(Number(e.target.value));
    }
    const onSubmits=(e)=>{
        e.preventDefault();  //here i stop the default behaviour of form
        setLoading(true);
        setLoaded(false);
        e.target.reset(); //for erase fields after submit form
        // console.log(customerId);
         axios.get(`https://dairymilkapi.herokuapp.com/findMilkData/${customerId}`)
       .then((data)=>{
        setLoading(false);
         setLoaded(true);
         if(data.data.message){
             setLoaded(false);
             setError(data.data.message);
             new Noty({
                text: `${data.data.message}`,
                layout:'topCenter',
                timeout:1000,
                type:'error'
            }).show();
         }
         else{
             setData(data.data.milkHistory);
             var total_liter=0;
             data.data.milkHistory.map((t)=>{
                 total_liter+=t.liter;
             });
             setTotal(total_liter);
         }
        })
        .catch(err=>{
            new Noty({
                text: `${err}`,
                layout:'topCenter',
                timeout:1000,
                type:'error'
            }).show();
        });
         setCustomerId(null);
        //you can submit here
    }
   
   if(!loaded && !loading){
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
   else if(loading && data.length==0){
        return(
            <h1>Loading...</h1>
        );
   }
//    else if(error){
//     return(
//         <h1>{error}</h1>
//     );
// }
   else if(loaded){             
       return(
         <div >
             <h1 style={{display:'block'}}>Your milk History for customerId {customerId}</h1>
             <div className="table_div">
            <table>
            <tbody>
                <tr>
                    <th>CustomerId</th>
                    <th>Date</th>
                    <th>Liter</th>
                    <th>Fat</th>
                </tr>
                {data.map(( listValue ) => {
                    return (
                   
              <tr key={listValue._id}>
              <td>{listValue.customerId}</td>
              <td>{moment(listValue.updatedAt).format('MMMM Do YYYY, h:mm')}</td>
              <td>{listValue.liter}</td>
              <td>{listValue.fat}</td>
            </tr>
          );
        })}
             </tbody>
             <tfoot>
    <tr>
      <th id="total" colSpan="2">Total Liter :</th>
      <td>{total}</td>
      </tr>
      </tfoot>
            </table>
            </div>
             
         </div>
       );
   }
}
export default MilkHistory;
