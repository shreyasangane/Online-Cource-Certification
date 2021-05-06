import React, {Component} from 'react';
import {BrowserRouter as Router,Route,Switch, Link} from  'react-router-dom'
import Adminapi from '../admin_api/Adminapi.js'
import '../css/Admin_CourseVideo.css'

class Admin_CourseVideo extends Component{

    constructor(props){
        super(props)
        this.state={
            courseName:"",
            iscourseSelected:false,
            courseList:[],
            videoList:[]
        }
        this.courseSelected=this.courseSelected.bind(this)
        this.refreshCourseVideo=this.refreshCourseVideo.bind(this);
        this.deleteCourseVideo=this.deleteCourseVideo.bind(this);
    }


    componentDidMount(){
        this.refreshCourseVideo()
    }
        refreshCourseVideo(){
            Adminapi.retrieveCourses()
            .then(response=>this.setState({
                courseList:response.data
            }))
        }
   

    courseSelected(event){
        this.setState({
            iscourseSelected:true,
            courseName:event.target.value
        },()=> Adminapi.retrieveCourseVideos(this.state.courseName)
        .then(response=>this.setState({
            videoList:response.data
        })))                      
    }


    deleteCourseVideo(vid){
        Adminapi.deleteSelectedCourseVideo(vid)
         .then(this.refreshCourseVideo())
          window.location.reload()     

    }
    render(){

       
        return(

            <div className="CourseVideo_MainDiv">
                        <div>
                                Select Course Name : <select class="course" value={this.state.courseName} onChange={this.courseSelected}>
                                        <option value="" ></option> 
                                        {this.state.courseList.map(courseList=>
                                        
                                        <option value={courseList} >{courseList}</option>                   
                                        )}                  
                                    
                                        
                                        
                                    </select>

                            {this.state.iscourseSelected && <span style={{marginLeft:20}}>Add Course Video for <span style={{fontWeight:"bold"}}>{this.state.courseName}</span> By Clicking <Link to={{pathname:`/addcoursevideo/${this.state.courseName}`}}>Here</Link></span>}      
                        </div>

                    <div class="courseVideoTable">
                  
                        <table >
                            <thead>
                                <tr>
                                <th>Video_Id</th>
                                <th>Course_Name</th>
                                <th>Video_Heading</th>
                                <th>Video_Path</th>                                
                                <th colSpan="2">Action</th>
                                </tr>
                            </thead>
                         <tbody>
                                {
                                this.state.videoList.map(videoList  =>
                                <tr key={videoList.vid}>  
                                    <td >{videoList.vid}</td>
                                    <td >{videoList.cname}</td>
                                    <td>{videoList.vheading}</td>                            
                                    <td>{videoList.vpath}</td>
                
                                    <td><Link to={{pathname:`/updatecoursevideo/${videoList.cname}/${videoList.vid}`}}><button >Update</button></Link></td>                        
                                                        
                                    <td><button onClick={()=>this.deleteCourseVideo(videoList.vid)}>Delete</button></td>
                                    
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

export default Admin_CourseVideo;