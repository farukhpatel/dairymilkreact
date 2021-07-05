import React from 'react';
import AddCustomer from './components/AddCustomer';
import AddMilk from './components/AddMilk';
import MilkHistory from './components/MilkHistory';
import './style.css';
import './component.css';
import {BrowserRouter as Router,Route,Link,Switch} from 'react-router-dom'
const Navbar=()=>{
  return(
    <div>
        <Router>
        <nav className="navbar" >
        <ul >
          <li>
            {/* link is a anchor tag */}
            <Link  to='/'>Add Customer</Link> 
          </li>
          
           <li>
           <Link to='/addMilk'>Add Milk</Link>
           </li>
          <li>
          <Link to='/milkHiostory'>Milk History</Link>

          </li>
        </ul>
        </nav>
       
        <div className="component" >
        <Switch>
          
          <Route exact path='/'> <AddCustomer/> </Route>
          <Route exact path='/addMilk'> <AddMilk/> </Route>
          <Route exact path='/milkHiostory'> <MilkHistory/ ></Route>
        
        </Switch>
             
        </div>

        </Router>
        <footer><p>@copyright all right reserved @farukh patel</p></footer>
    </div>
  );
}

export default Navbar;
