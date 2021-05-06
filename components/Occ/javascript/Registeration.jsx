import React, { Component } from "react";
import {BrowserRouter as Router,Route,Switch, Link} from  'react-router-dom'
import "../css/Registeration.css";
import '../css/HomePageOcc.css';
import {Layout, Header, Navigation, Drawer, Content } from 'react-mdl';
import Dataservice from '../../../api/occ_api/Dataservice.js';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';
import CourseDetails from './CourseDetails';

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class Registeration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open:false,
      firstName: "",
      lastName: "",
      Contact:"",
      email: "",
      password: "",
      isAlreadyUser:false,
      formErrors: {
        firstName: "",
        lastName: "",
        Contact:"",
        email: "",
        password: ""
      },
      courseList:[]
    };
  }

  componentDidMount(){
    Dataservice.getCourseList()
    .then(response=>this.setState({
        courseList:response.data
    }))
  }

  handleClose = () => {
    this.setState({ open: false,isAlreadyUser:false });
  };
  handleSubmit = e => {
    e.preventDefault();

    if(this.state.email=="" && this.state.password==""){
      this.setState({
          open:true
      })
  }else if (formValid(this.state)) {
        Dataservice.createAccount({firstName:this.state.firstName,
            lastName:this.state.lastName,
            email:this.state.email,
            contact:this.state.Contact,
            password:this.state.password})
        .then(response=>{if(response.data=="Success"){
          window.alert("You Have Successfully Registered.\nYou Are Just 1 Step Away From Applying For Your Desire Course.\nLogin with registered email id and password before applying for any course.")
          this.props.history.push("/login");
        }else{this.setState({isAlreadyUser:true,open:true})}})
        .catch(error=>console.log(error.response))
     
        console.log(`
        --SUBMITTING--
        First Name: ${this.state.firstName}
        Last Name: ${this.state.lastName}
        Contact: ${this.state.contact}
        Email: ${this.state.email}
        Password: ${this.state.password}
      `);

    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
        case "Contact":
          formErrors.Contact =
          value.length < 10 ? "Invalid Contact" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;

    return (
    <div>
            <div className="demo-big-content">
              <Layout>
                  <Header className="header-color" title="Online Course Certification" >
                      <Navigation>
                          <Link to="/">Home</Link>
                          <Link to="/login">Log In</Link>
                          <Link to="/registeration">Sign Up</Link>
                          <Link to="/contact">Contact Us</Link>
                          <Link to="/moreinfo">More Info</Link>
                      </Navigation>
                  </Header>
                  <Drawer  title="Courses">
                      <Navigation>
                      { this.state.courseList.map(data=>
             <Tooltip title={<CourseDetails course={data}/>} placement="right-top-start" interactive>
                               <Button>{data}</Button>
                               </Tooltip>
                            )
                          }
            
                      </Navigation>
                  </Drawer>
                  <Content>
                      <div className="page-content" />
                      <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
          >
         {this.state.isAlreadyUser ? <DialogTitle id="alert-dialog-title">{"User Already Exist."}</DialogTitle>:<DialogTitle id="alert-dialog-title">{"All Fields Are Mandatory"}</DialogTitle> } 
          <DialogContent>
            {this.state.isAlreadyUser ? <DialogContentText>Try to register with different email id</DialogContentText>:<DialogContentText id="alert-dialog-description">
          {this.state.firstName=="" && "Enter First Name"}<br/>
          {this.state.lastName=="" && "Enter Last Name"}<br/>
          {this.state.Contact=="" && "Enter Contact"}<br/>
          {this.state.email=="" && "Enter Email"}<br/>
          {this.state.password=="" && "Enter Password"}
          </DialogContentText>}
          
          </DialogContent>
          <DialogActions>

          <Button onClick={this.handleClose} color="primary" autoFocus>
          Ok
          </Button>
          </DialogActions>
          </Dialog>
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Create Account</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="firstName">
              <label htmlFor="firstName">First Name</label>
              <input
                className={formErrors.firstName.length > 0 ? "error" : null}
                placeholder="First Name"
                type="text"
                name="firstName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.firstName.length > 0 && (
                <span className="errorMessage">{formErrors.firstName}</span>
              )}
            </div>
            <div className="lastName">
              <label htmlFor="lastName">Last Name</label>
              <input
                className={formErrors.lastName.length > 0 ? "error" : null}
                placeholder="Last Name"
                type="text"
                name="lastName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.lastName.length > 0 && (
                <span className="errorMessage">{formErrors.lastName}</span>
              )}
            </div>
            <div className="Contact">
              <label htmlFor="Contact">Contact No:</label>
              <input
                className={formErrors.Contact.length > 0 ? "error" : null}
                placeholder="Contact Number"
                type="number"
                name="Contact"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.Contact.length > 0 && (
                <span className="errorMessage">{formErrors.Contact}</span>
              )}
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email"
                type="email"
                name="email"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder="Password"
                type="password"
                name="password"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>
            <div className="createAccount">
              <button type="submit">Create Account</button>
                             
               <strong>Already Have an Account?</strong><Link to="/login"><small>Click Here</small></Link>
            </div>
          </form>
        </div>
      </div>
                  </Content>
              </Layout>
            </div>

               
      </div>  
    );
  }
}

export default Registeration