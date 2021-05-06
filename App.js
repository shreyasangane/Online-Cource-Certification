import React from 'react';
import './App.css';
import './bootstrap.css';

// import TodoAPP from './components/To-do/TodoAPP';
import Occ_Main from './components/Occ/javascript/Occ_Main'
// import {BrowserRouter as Router,Route,Switch, Link} from  'react-router-dom'
// import Registeration from './components/Occ/javascript/Registeration'
// import Login from './components/Occ/javascript/Login'
// import Home from  './components/Occ/javascript/Home'
// import Contact from './components/Occ/javascript/Contact'
// import MoreInfo from './components/Occ/javascript/MoreInfo'
// import HomePageOcc from './components/Occ/javascript/HomePageOcc'
import Admin_index from '../src/admin_components/javascript/Admin_Index'
import {BrowserRouter as Router,Route,Switch, Link} from  'react-router-dom'
import Admin_UpdateCourse from './admin_components/javascript/Admin_UpdateCourse'
import Admin_AddCourse from './admin_components/javascript/Admin_AddCourse'
import Admin_AddCourseVideo from './admin_components/javascript/Admin_AddCourseVideo'
import Admin_UpdateCourseVideo from './admin_components/javascript/Admin_UpdateCourseVideo'
import Admin_AddTestContent from './admin_components/javascript/Admin_AddTestContent'
import Admin_UpdateTestContent from './admin_components/javascript/Admin_UpdateTestContent'
function App() {
  return (  //render is not present
    <div className="App">     
      {/*<App2/
      <TodoAPP/>
      
      */
      
      }
<Occ_Main/>
{/* <Router>
        
        <>
       
        <Switch>      
        <Route path="/updatetestcontent/:cname/:qid"  component={Admin_UpdateTestContent}></Route>
        <Route path="/addtestcontent/:cname"  component={Admin_AddTestContent}></Route>  
        <Route path="/updatecoursevideo/:cname/:vid"  component={Admin_UpdateCourseVideo}></Route>  
        <Route path="/addcoursevideo/:cname"  component={Admin_AddCourseVideo}></Route>  
        <Route path="/addcourse"  component={Admin_AddCourse}></Route>  
        <Route path="/updatecourse/:cid"  component={Admin_UpdateCourse}></Route>  
        <Route path="/feedback"  component={Admin_index}></Route>
        <Route path="/test"  component={Admin_index}></Route>
        <Route path="/coursevideo"  component={Admin_index}></Route>
        <Route path="/courses"  component={Admin_index}></Route>
        <Route path="/users"  component={Admin_index}></Route>
        <Route path="/" exact component={Admin_index}></Route>
       
        </Switch>

         
        
        </>
            
        
    </Router>

      */}

    </div>
  );
}




export default App;
