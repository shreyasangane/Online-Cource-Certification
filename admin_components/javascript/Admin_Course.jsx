import React, {Component} from 'react';
import  '../css/Admin_Course.css'
import Adminapi from '../admin_api/Adminapi.js'
import {BrowserRouter as Router,Route,Switch, Link} from  'react-router-dom'

//import {Link} from 'react-router-dom';

class Admin_Course extends Component {

constructor(props){
    super(props)
    this.state={
      courseDetails:[],
      cname:[]
        
    }
    this.deleteCourse=this.deleteCourse.bind(this);
    this.refreshCourse=this.refreshCourse.bind(this);    
}

    componentDidMount(){
        this.refreshCourse();
    }


    refreshCourse(){
       Adminapi.retrieveAllCourses()
       .then(response =>this.setState({
           courseDetails:response.data
       })) 
    }

    deleteCourse(cname){
        console.log(cname)
        Adminapi.deleteSelectedCourse(cname)
        .then(this.refreshCourse())
          window.location.reload()     
   }
  
 
    render (){
        return(
            <div>
                <div class="courseTable">
                  <span class="addcourse">Add Course By Clicking  <Link to="/addcourse">Here</Link></span> 
                     <table >
                        <thead>
                            <tr>
                            <th>Course_Id</th>
                            <th>Course_Name</th>
                            <th>Course_Contents</th>
                            <th>Course_Info</th>
                            <th>Course_Duration</th>
                            <th>Course_Fees</th>
                            <th colSpan="2">Action</th>
                            </tr>
                        </thead>
                       <tbody>
                            {
                            this.state.courseDetails.map( courseDetails =>
                            <tr key={courseDetails.cid}>  
                                <td >{courseDetails.cid}</td>
                                <td >{courseDetails.cname}</td>
                                <td>{courseDetails.ccontents}</td>                            
                                <td>{courseDetails.cinfo}</td>
                                <td>{courseDetails.cduration}</td>
                                <td>{courseDetails.fees}</td>    
                                <td><Link to={{pathname:`/updatecourse/${courseDetails.cid}`}}><button >Update</button></Link></td>                        
                                <td><button onClick={()=>this.deleteCourse(courseDetails.cname)}>Delete</button></td>
                                
                            </tr>
                            )
                        }
                        </tbody>

                       
                     </table>

             </div>
        </div>
               
        );
    }
}
export default Admin_Course;