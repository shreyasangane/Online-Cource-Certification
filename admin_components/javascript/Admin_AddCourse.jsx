import React, {Component} from 'react';
import '../css/Admin_AddUpdateCourse.css'
import Adminapi from '../admin_api/Adminapi.js'
import {BrowserRouter as Router,Route,Switch, Link} from  'react-router-dom'

class Admin_AddCourse extends Component {

constructor(props){
    super(props)
    this.state={       
        cname:"",
       ccontents:"",
       cinfo:"",
       cduration:"",
       fees:""
        
    }
    this.handleChange=this.handleChange.bind(this)
    this.addCourse=this.addCourse.bind(this)

}

    

    addCourse(){
        Adminapi.submitAddCourse(this.state.cname,{            
            cname:this.state.cname,
            ccontents:this.state.ccontents,
            cinfo:this.state.cinfo,
            cduration:this.state.cduration,
            fees:this.state.fees
        })
        .then(response=> {if(response.data==="Success"){
         this.props.history.push("/courses")   
        }})
       

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
                <Link to="/courses" >Admin Home Link</Link>
                <div class="Admin_AddUpdateCoursediv">
                <br/>
                <table >                  

                    <tr>
                        <td>Course Name:</td>
                         <td><input type="text" value={this.state.cname} name="cname" onChange={this.handleChange} ></input></td>
                    </tr>

                    <tr>
                        <td>Course Contents:</td>
                         <td><input type="text" value={this.state.ccontents}name="ccontents" onChange={this.handleChange} ></input></td>
                    </tr>
                    <tr>
                        <td>Course Info: </td>
                         <td><input type="text" value={this.state.cinfo} name="cinfo" onChange={this.handleChange} ></input></td>
                    </tr>

                    <tr>
                        <td>  Course Duration: </td>
                         <td><input type="text" value={this.state.cduration} name="cduration" onChange={this.handleChange} ></input></td>
                    </tr>

                    <tr>
                        <td> Course Fees: </td>
                         <td><input type="text" value={this.state.fees} name="fees" onChange={this.handleChange} ></input></td>
                    </tr>

                    <tr>
                        
                            <button class="submit" onClick={this.addCourse}>Submit </button>
                            
                        

                    </tr>
                </table>                                                         
             </div>
        </div>
               
        );
    }
}
export default Admin_AddCourse;