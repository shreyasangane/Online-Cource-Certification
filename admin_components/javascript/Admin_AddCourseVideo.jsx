import React, {Component} from 'react';
import '../css/Admin_AddUpdateCourse.css'
//import Adminapi from '../admin_api/Adminapi.js'
import {BrowserRouter as Router,Route,Switch, Link} from  'react-router-dom'
import Adminapi from '../admin_api/Adminapi';

class Admin_AddCourseVideo extends Component {

constructor(props){
    super(props)
    this.state={       
        cname:this.props.match.params.cname,
       vheading:"",
       vpath:""              
    }
    this.handleChange=this.handleChange.bind(this)
    this.addCoursevideo=this.addCoursevideo.bind(this)
    this.videoPathChange=this.videoPathChange.bind(this)

}

    

    addCoursevideo(){      
       Adminapi.submitAddCourseVideo(this.state.cname,{
           cname:this.state.cname,
           vheading:this.state.vheading,
           vpath:this.state.vpath
       })
       .then(response=>{if(response.data==="Success"){
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
                        
                         </td>
                    </tr>
                    
                    <tr>
                        
                            <button class="submit" onClick={this.addCoursevideo}>Submit </button>
                    </tr>
                </table>
             </div>
        </div>
               
        );
    }
}
export default Admin_AddCourseVideo;