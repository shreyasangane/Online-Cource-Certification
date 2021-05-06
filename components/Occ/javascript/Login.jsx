import React, { Component } from "react";
import {BrowserRouter as Router,Route,Switch, Link} from  'react-router-dom'
import '../css/HomePageOcc.css';
import "../css/Login.css";
import {Layout, Header, Navigation, Drawer, Content } from 'react-mdl';
import Registeration from './Registeration'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dataservice from "../../../api/occ_api/Dataservice";
import AuthenticationService from './AuthenticationService.js'
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

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open:false,
      email: "",
      password: "",
      isInvalidUser:false,
      formErrors: {
        
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
    this.setState({ open: false ,isInvalidUser:false});
  };
  handleSubmit = e => {
    e.preventDefault();

    if(this.state.email=="" && this.state.password==""){
        this.setState({
            open:true
        })
    }
    else if (formValid(this.state)) {
        Dataservice.loginAccount({
            email:this.state.email,
            password:this.state.password
        }).then(response =>{if(response.data=="Success"){
          AuthenticationService.registerSuccessfulLogin(this.state.email,this.state.password)
            this.props.history.push("/page1");
          }else{this.setState({isInvalidUser:true,open:true})}})
        .catch(error=>console.log(error.response))
      console.log(`
        --SUBMITTING--
        
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
      
      case "email":                                             //CHANGES HERE TO CHECK WITH DATABASE (email)
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : ""; //CHANGE HERE TO CHECK WITH DATABASE (Password)
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;
    const data=["cc1","cc2","cc3"]

    return (
        <div>
           <div className="demo-big-content">
                <Layout>
                    <Header className="header-color" title="Online Course Certification" scroll>
                        <Navigation>
                            <Link to="/">Home</Link>
                            <Link to="/login">Log In</Link>
                            <Link to="/registeration">Sign Up</Link>
                            <Link to="/contact">Contact Us</Link>
                            <Link to="/moreinfo">More Info</Link>
                        </Navigation>
                    </Header>
                    <Drawer title="Courses">
                        <Navigation>
                        { this.state.courseList.map(data=>
             <Tooltip title={<CourseDetails course={data}/>} placement="right-top-start" interactive>
                               <Button>{data}</Button>
                               </Tooltip>
                            )
                          }
            
                            {/* <a href="">Course 2</a>
                            <a href="">Course 3</a>
                            <a href="">Course 4</a> */}
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
         {this.state.isInvalidUser ? <DialogTitle id="alert-dialog-title">{"Invalid Email id.Try Again"}</DialogTitle>:<DialogTitle id="alert-dialog-title">{"All Fields Are Mandatory"}</DialogTitle> } 
        {this.state.isInvalidUser ===false && <DialogContent>
          <DialogContentText id="alert-dialog-description">
           {this.state.email=="" && "Enter Email"}<br/>
           {this.state.password=="" && "Enter Password"}
          </DialogContentText>
        </DialogContent> }
        <DialogActions>
          
          <Button onClick={this.handleClose} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <div className="wrapper">
         
        <div className="form-wrapper">
          <h1>Login</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                //className={formErrors.email.length > 0 ? "error" : null}
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
              <label htmlFor="password">Enter your password:</label>
              <input
                //className={formErrors.password.length > 0 ? "error" : null}
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
                <button type="submit" handleSubmit>Login</button>
              
              <strong>New User?</strong><Link to="/registeration"><small>Click Here</small></Link>
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

export default Login;