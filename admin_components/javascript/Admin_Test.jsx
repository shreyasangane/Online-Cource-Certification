import React, {Component} from 'react';
import {BrowserRouter as Router,Route,Switch, Link} from  'react-router-dom'
import Adminapi from '../admin_api/Adminapi.js'
import '../css/Admin_CourseVideo.css'

class Admin_Test extends Component{

    constructor(props){
        super(props)
        this.state={
            courseName:"",
            iscourseSelected:false,
            courseList:[],
            questionList:[]
        }
        this.courseSelected=this.courseSelected.bind(this)
        this.refreshCourseVideo=this.refreshCourseVideo.bind(this);
        this.deleteTestQuestion=this.deleteTestQuestion.bind(this);
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
        },()=> Adminapi.retrieveTest(this.state.courseName)
        .then(response=>this.setState({
            questionList:response.data
        })))                      
    }


    deleteTestQuestion(vid){
        Adminapi.deleteSelectedTestQuestion(vid)
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

                            {this.state.iscourseSelected && <span style={{marginLeft:20}}>Add Test for <span style={{fontWeight:"bold"}}>{this.state.courseName}</span> By Clicking <Link to={{pathname:`/addtestcontent/${this.state.courseName}`}}>Here</Link></span>}      
                        </div>

                    <div class="courseVideoTable">
                  
                        <table >
                            <thead>
                                <tr>
                                <th>Question_Id</th>
                                <th>Course_Name</th>
                                <th>Question</th>
                                <th>Option1</th>                                
                                <th>Option2</th>                                
                                <th>Option3</th>                                
                                <th>Option4</th>
                                <th>Answer</th>                                
                                <th colSpan="2">Action</th>
                                </tr>
                            </thead>
                          <tbody>
                                {
                                this.state.questionList.map(questionList  =>
                                <tr key={questionList.qid}>  
                                    <td >{questionList.qid}</td>
                                    <td >{questionList.cname}</td>
                                    <td >{questionList.qdata}</td>
                                    <td>{questionList.option1}</td>                            
                                    <td>{questionList.option2}</td>
                                    <td>{questionList.option3}</td>
                                    <td>{questionList.option4}</td>
                                    <td>{questionList.answer}</td>                
                                    <td><Link to={{pathname:`/updatetestcontent/${questionList.cname}/${questionList.qid}`}}><button >Update</button></Link></td>                        
                                                        
                                    <td><button onClick={()=>this.deleteTestQuestion(questionList.qid)}>Delete</button></td>
                                    
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

export default Admin_Test;