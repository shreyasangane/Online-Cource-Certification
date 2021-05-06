import React, { Component } from "react";
import {BrowserRouter as Router,Route,Switch, Link} from  'react-router-dom'
import Registeration from './Registeration'
import Login from './Login'
import Home from  './Home'
import Contact from './Contact'
import MoreInfo from './MoreInfo'
import HomePageOcc from './HomePageOcc'
import Upage1 from './Upagestart'
import Upage2 from './Upagestart2'
import Upage3 from './Upagestart3'
import Certificate from './Certificate'
import AuthenticatedRoute from './AuthenticatedRoute'




class Occ_Main extends Component {
    render(){
    return (  
      <div>     
          
        <Router>
        
        <>
       
        <Switch>      
        <Route path="/"  exact component={HomePageOcc}></Route>
        <AuthenticatedRoute path="/page1"  exact component={Upage1}></AuthenticatedRoute>
        <AuthenticatedRoute path="/page2"  exact component={Upage2}></AuthenticatedRoute>
        <AuthenticatedRoute path="/page3/:course/:topic/:certificate/:attempt"  exact component={Upage3}></AuthenticatedRoute>
        <AuthenticatedRoute path="/page3/:course/:topic/:certificate"  exact component={Certificate}></AuthenticatedRoute>
        <AuthenticatedRoute path="/page3/:course/:topic"  exact component={Upage3}></AuthenticatedRoute>
        
        <AuthenticatedRoute path="/page3/:course"  exact component={Upage3}></AuthenticatedRoute>

          <Route path="/contact" component={Contact}></Route>
        <Route path="/moreInfo" component={MoreInfo}></Route>
        <Route path="/registeration"  component={Registeration}></Route>
        <Route path="/login"  component={Login}></Route>
        
        
        
      
        
       {/* <Route path="/" exact component={LoginComp}></Route>
            
            <AuthenticatedRoute path="/welcome/:name" component={WelcomeComp}/> 
            <AuthenticatedRoute path="/todos/:id" component={TodosComponent}/>
              { higher priority }
            <AuthenticatedRoute path="/todos" component={ListTodosComponent}/>
           
            <AuthenticatedRoute path="/logout" component={LogoutComp}/>
            <Route component={ErrorComponent}></Route>*/ }
          
        </Switch>

         
        
        </>
            
        
    </Router>
       
        
    
          
        
     
      </div>
    );
  }
}
  
  
  
  
  export default Occ_Main;