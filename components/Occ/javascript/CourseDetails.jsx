import React, { Component } from "react";
import {BrowserRouter as Router,Route,Switch, Link} from  'react-router-dom'
import '../css/HomePageOcc.css';
import "../css/Login.css";
import Dataservice from "../../../api/occ_api/Dataservice";
import AuthenticationService from './AuthenticationService.js'




class CourseDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {     
        courseDetails:[],
      course:this.props.course,
    }
  }

  componentDidMount(){

    Dataservice.getusercoursedetails(this.state.course)
    .then(response=>{this.setState({

        courseDetails:response.data

    })})
   
    }
  
  render() {
   const{courseDetails}=this.state;

    return (
        <div style={{width:"500px"}}>
            
                <h3>{courseDetails.cname}</h3>      
                <h6>(Login/Register To Apply For Course)</h6>          
                
                <div style={{height:"5px"}}></div>
                
                <h4>Course Description:</h4>
                <p>{courseDetails.cinfo}</p>

                <h4>Course Content:</h4>
                
                <p>{courseDetails.ccont}</p>

                <h4>Course Duration:</h4>
                
                <p>{courseDetails.cd}</p>

                <h4>Course Fees:</h4>
                
                <p>{courseDetails.cfees}</p>
           
        </div>
    );
  }
}

export default CourseDetails;