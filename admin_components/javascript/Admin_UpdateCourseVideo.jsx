import React, {Component} from 'react';
import '../css/Admin_AddUpdateCourse.css'
//import Adminapi from '../admin_api/Adminapi.js'
import {BrowserRouter as Router,Route,Switch, Link} from  'react-router-dom'
import Adminapi from '../admin_api/Adminapi';

class Admin_UpdateCourseVideo extends Component {

constructor(props){
    super(props)
    this.state={       
        vid:this.props.match.params.vid,
        cname:this.props.match.params.cname,
        vheading:"",
        vpath:""              
    }
    this.handleChange=this.handleChange.bind(this)
   this.reretriveUCourseVideo=this.reretriveUCourseVideo.bind(this)
    this.videoPathChange=this.videoPathChange.bind(this)
    this.updateCourseVideo=this.updateCourseVideo.bind(this)

}

    componentDidMount(){
        this.reretriveUCourseVideo(this.props.match.params.vid);
    }

    reretriveUCourseVideo(vid){
        Adminapi.retriveUpdateCourseVideo(vid)
        .then(response=>{this.setState({
            vid:response.data.vid,
            cname:response.data.cname,
            vheading:response.data.vheading,
            vpath:response.data.vpath
        })})
    }

    updateCourseVideo(){
        Adminapi.submitUpdateCourseVideo(this.state.vid,{
            vid:this.state.vid,
            cname:this.state.cname,
            vheading:this.state.vheading,
            vpath:this.state.vpath           
        })
        .then(response=> {if(response.data==="Success"){
            this.props.history.push("/coursevideo")   
           }})

    }
   

    videoPathChange(){
       var name=document.getElementById('fileInput');
       
        this.setState({
        
            vpath: name.files.item(0).name
        })
    }
    handleChange(event){
        console.log(this.state)
        this.setState({
        
            [event.target.name]: event.target.value
        })
    }
   
    render (){
        return(
            <div>
                <Link to="/coursevideo" >Admin Home Link</Link>
                <div class="Admin_AddUpdateCoursediv">
                <br/>
                <table >                  
                <tr>
                        <td>Video Id:</td>
                         <td><input type="text" value={this.state.vid} name="vid" onChange={this.handleChange} readOnly></input></td>
                    </tr>
                    <tr>
                        <td>Course Name:</td>
                         <td><input type="text" value={this.state.cname} name="cname" onChange={this.handleChange} readOnly></input></td>
                    </tr>

                    <tr>
                        <td> Video Heading:</td>
                         <td><input type="text" value={this.state.vheading} name="vheading" onChange={this.handleChange} ></input></td>
                    </tr>
                    <tr>
                        <td>Video Path: </td>
                         <td><input type="file"   id="fileInput" name="vpath" onChange={this.videoPathChange} ></input> 
                         <input type="text"    value={this.state.vpath} readOnly onChange={this.videoPathChange} ></input>                        
                        
                         </td>
                    </tr>
                    
                    <tr>
                        
                            <button class="submit" onClick={this.updateCourseVideo}>Submit </button>
                    </tr>
                </table>
             </div>
        </div>
               
        );
    }
}
export default Admin_UpdateCourseVideo;