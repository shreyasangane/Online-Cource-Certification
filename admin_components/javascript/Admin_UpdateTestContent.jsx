import React, {Component} from 'react';
import '../css/Admin_AddUpdateCourse.css'
//import Adminapi from '../admin_api/Adminapi.js'
import {BrowserRouter as Router,Route,Switch, Link} from  'react-router-dom'
import Adminapi from '../admin_api/Adminapi';

class Admin_UpdateTestContent extends Component {

constructor(props){
    super(props)
    this.state={ 
        qid:this.props.match.params.qid,      
        cname:this.props.match.params.cname,
        qdata:"",
        option1:"",
        option2:"",
        option3:"",
        option4:"",
        answer:""              
    }
    this.handleChange=this.handleChange.bind(this)
   this.reretriveUTest=this.reretriveUTest.bind(this)
    this.updateTestDetails=this.updateTestDetails.bind(this)

}

    componentDidMount(){
        this.reretriveUTest(this.props.match.params.qid);
    }

    reretriveUTest(qid){
        Adminapi.retriveUpdateTestDetails(qid)
        .then(response=>{this.setState({
            qid:response.data.qid,
            cname:response.data.cname,
            qdata:response.data.qdata,
            option1:response.data.option1,
            option2:response.data.option2,
            option3:response.data.option3,
            option4:response.data.option4,
            answer:response.data.answer
            
        })})
    }

    updateTestDetails(){
        Adminapi.submitUpdateTestDetails(this.state.vid,{
            qid:this.state.qid,
            cname:this.state.cname,
            qdata:this.state.qdata,
            option1:this.state.option1,
            option2:this.state.option2,
            option3:this.state.option3,
            option4:this.state.option4,
            answer:this.state.answer         
        })
        .then(response=> {if(response.data==="Success"){
            this.props.history.push("/test")   
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
                <Link to="/test" >Admin Home Link</Link>
                <div class="Admin_AddUpdateCoursediv">
                <br/>
                <table >                  
                <tr>
                        <td>Question Id:</td>
                         <td><input type="text" value={this.state.qid} name="qid" onChange={this.handleChange} readOnly></input></td>
                    </tr>
                    <tr>
                        <td>Course Name:</td>
                         <td><input type="text" value={this.state.cname} maxLength="99" name="cname" onChange={this.handleChange} readOnly></input></td>
                    </tr>

                    <tr>
                        <td> Question:</td>
                         <td><input type="text" value={this.state.qdata} maxLength="490"name="qdata" onChange={this.handleChange} ></input></td>
                    </tr>
                    <tr>
                        <td>Option1: </td>
                        <td><input type="text" value={this.state.option1} maxLength="95" name="option1" onChange={this.handleChange} ></input></td>
                    </tr>
                    
                    <tr>
                        <td>Option2: </td>
                        <td><input type="text" value={this.state.option2} maxLength="95" name="option2" onChange={this.handleChange} ></input></td>
                    </tr>
                    <tr>
                        <td>Option3: </td>
                        <td><input type="text" value={this.state.option3} maxLength="95" name="option3" onChange={this.handleChange} ></input></td>
                    </tr>
                    <tr>
                        <td>Option4: </td>
                        <td><input type="text" value={this.state.option4} maxLength="95" name="option4" onChange={this.handleChange} ></input></td>
                    </tr>
                    <tr>
                        <td>Answer: </td>
                        <td><input type="text" value={this.state.answer} maxLength="95" name="answer" onChange={this.handleChange} ></input></td>
                    </tr>                  
                    <tr>
                        
                            <button class="submit" onClick={this.updateTestDetails}>Submit </button>
                    </tr>
                </table>
             </div>
        </div>
               
        );
    }
}
export default Admin_UpdateTestContent;