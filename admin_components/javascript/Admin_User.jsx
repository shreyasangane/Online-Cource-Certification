import React, {Component} from 'react';
import  '../css/Admin_User.css'
import Adminapi from '../admin_api/Adminapi.js'

//import {Link} from 'react-router-dom';

class Admin_User extends Component {

constructor(props){
    super(props)
    this.state={
        userDetails:[],
        id:"",
        firstName:"Nice",
        lastName:"",
        email:"",
        password:"",
        contact:"",
        url:""
        
    }
    this.deleteUser=this.deleteUser.bind(this);
    this.refreshUser=this.refreshUser.bind(this);
}

    componentDidMount(){
        this.refreshUser()
    }

    refreshUser(){
        Adminapi.retrieveAllUsers()
        .then(response=>{this.setState({
            userDetails:response.data
        })})

    }

    deleteUser(email){
         console.log(email)
        Adminapi.deleteSelectedUser(email)
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
                            <th>Id</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email_Id</th>
                            <th>Password</th>
                            <th>Contact</th>
                            <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            this.state.userDetails.map( userDetails =>
                            <tr key={userDetails.id}>  
                                <td>{userDetails.id}</td>
                                <td>{userDetails.firstName}</td>
                                <td>{userDetails.lastName}</td>                            
                                <td>{userDetails.email}</td>
                                <td>{userDetails.password}</td>
                                <td>{userDetails.contact}</td>                            
                                <td><button onClick={()=>this.deleteUser(userDetails.email)}>Delete</button></td>
                                
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
export default Admin_User;