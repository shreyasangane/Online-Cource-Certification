import React, {Component} from 'react';
import  '../css/Admin_User.css'
import Adminapi from '../admin_api/Adminapi.js'

//import {Link} from 'react-router-dom';

class Admin_Feedback extends Component {

constructor(props){
    super(props)
    this.state={
        feedbackDetails:[],
        
    }
  
}

    componentDidMount(){
        this.refreshUser()
    }

    refreshUser(){
        Adminapi.retriveFeedback()
        .then(response=>{this.setState({
            feedbackDetails:response.data
        })})

    }

    deleteFeedback(sno){
         console.log(sno)
        Adminapi.deleteSelectedFeedback(sno)
        .then(this.refreshUser())
           window.location.reload()     
    }
    render (){
        return(
            <div>
                <div class="userTable">
                     <table >
                        <thead>
                            <tr>
                            <th>Serial_No</th>
                            <th>User_Email</th>
                            <th>Feedback_Content</th>
                            <th>Course</th>
                            <th>First_Name</th>
                            <th>Last_Name</th>                            
                            </tr>
                        </thead>
                        <tbody>
                            {
                            this.state.feedbackDetails.map( feedbackDetails =>
                            <tr key={feedbackDetails.sno}>  
                                <td>{feedbackDetails.sno}</td>
                                <td>{feedbackDetails.email}</td>
                                <td>{feedbackDetails.fc}</td>
                                <td>{feedbackDetails.course}</td>                            
                                <td>{feedbackDetails.fname}</td>
                                <td>{feedbackDetails.lname}</td>                               
                                <td><button onClick={()=>this.deleteFeedback(feedbackDetails.sno)}>Delete</button></td>
                                
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
export default Admin_Feedback;