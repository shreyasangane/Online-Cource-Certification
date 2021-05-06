import React, {Component} from 'react';
import  '../css/Admin_index.css'

import Admin_Course from  './Admin_Course'
import Admin_User from './Admin_User';
import Admin_CourseVideo from './Admin_CourseVideo';
import Admin_Test from './Admin_Test';
import Admin_Feedback from './Admin_Feedback';



class Admin_Index extends Component {

    constructor(props){
        super(props)
        this.state={
            isAdminUser:false,
            isAdminCourse:false,
            isAdminCourseVideo:false,
            isAdminTest:false,
            isAdminFeedback:false
        }
        //this.userClicked=this.userClicked.bind(this)
    }
    componentDidMount(){
        if(window.location.pathname==="/users"){
            this.setState({
                isAdminUser:true
            })
        }else if(window.location.pathname==="/courses"){
            this.setState({                
                isAdminCourse:true
            })
        }else if(window.location.pathname==="/coursevideo"){
            this.setState({                
                isAdminCourseVideo:true
            })
        }else if(window.location.pathname==="/test"){
            this.setState({                
                isAdminTest:true
            })
        }else if(window.location.pathname==="/feedback"){
            this.setState({                
                isAdminFeedback:true
            })
        }
    }

     userClicked(){  
        // console.log(window.location.pathname)       
       this.props.history.push('/users')
       this.setState({
           isAdminUser:true,
           isAdminCourse:false,
           isAdminCourseVideo:false,
           isAdminTest:false,
           isAdminFeedback:false
       })
     }
     courseClicked(){  
        // console.log(window.location.pathname)       
       this.props.history.push('/courses')
       this.setState({
           isAdminCourse:true,
           isAdminUser:false,
           isAdminCourseVideo:false,
           isAdminTest:false,
           isAdminFeedback:false
       })
     }
     courseVideoClicked(){
        this.props.history.push('/coursevideo')  
        this.setState({
            isAdminCourseVideo:true,
            isAdminCourse:false,
            isAdminUser:false,
            isAdminTest:false,
            isAdminFeedback:false
        })
     }

     testClicked(){
        this.props.history.push('/test') 
        this.setState({
            isAdminCourseVideo:false,
            isAdminCourse:false,
            isAdminUser:false,
            isAdminTest:true,
            isAdminFeedback:false
        }) 
     }

     feedbackClicked(){
        this.props.history.push('/feedback') 
        this.setState({
            isAdminCourseVideo:false,
            isAdminCourse:false,
            isAdminUser:false,
            isAdminTest:false,
            isAdminFeedback:true
        }) 
     }
    render (){
        return(
          
        <div class="outside">
            
        <div class="header">
            Admin Page
        </div>
        <div class="inner">
            <div class="leftinner">

              <button class="btn-admin" onClick={()=>this.userClicked()}>User</button><br/>
                <button class="btn-admin" onClick={()=>this.courseClicked()}>Courses</button><br/>
                <button class="btn-admin" onClick={()=>this.courseVideoClicked()}>Course Videos</button><br/>
                <button class="btn-admin">Certificate</button><br/>
                <button class="btn-admin" onClick={()=>this.testClicked()}>Test</button><br/>
                <button class="btn-admin"onClick={()=>this.feedbackClicked()}>Feedback</button><br/>
                <button class="btn-admin">Acknowledgement</button>
            </div>
            <div class="rightinner">

            {this.state.isAdminUser && <Admin_User />}
            {this.state.isAdminCourse && <Admin_Course />}
             {this.state.isAdminCourseVideo && <Admin_CourseVideo/>}  
             {this.state.isAdminTest && <Admin_Test/>} 
             {this.state.isAdminFeedback && <Admin_Feedback/>}
            </div>
        </div>
    </div>
               
        );
    }
}
export default Admin_Index;