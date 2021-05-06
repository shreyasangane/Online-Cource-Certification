import React, { Component} from "react";
import "../css/Feedback.css";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Authentication from './AuthenticationService.js';
import Dataservice from "../../../api/occ_api/Dataservice";




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

class Feedback extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courseList:[],
      allcourseList:[],
      user:Authentication.getLoggedInUserName(),
      Courses: null,
      email: null,
      YourFeedback: "",
      isloggedin:Authentication.isUserLoggedIn(),
      formErrors: {
        
        Courses: "",
        email: "",
        YourFeedback: ""
      },
      courseName:"",
      nlcourseName:"",
      feedbackList:[],

    };

    this.courseSelected=this.courseSelected.bind(this)
    this.courseSelected2=this.courseSelected2.bind(this)
  }

  componentDidMount(){

  
    Dataservice.getAppliedCourseList(this.state.user)
  .then(response=>{this.setState({
    courseList:response.data
  })})

  
  Dataservice.getCourseList()
  .then(response=>{this.setState({
      allcourseList:response.data
  })})

}

courseSelected(event){
  this.setState({
    courseName:event.target.value
  },console.log(this.state.courseName, this.state.YourFeedback))

}
courseSelected2(event){

      this.setState({
        nlcourseName:event.target.value
      },()=>Dataservice.getFeedbackList(this.state.nlcourseName)
      .then(response=>this.setState({
        feedbackList:response.data
      })))
                            
    

}
  handleSubmit = e => {
    e.preventDefault();

  

    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
       Courses: ${this.state.Courses}
        Email: ${this.state.email}
        Password: ${this.state.YourFeedback}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR ");       //Changes here for manditory fields.
     

    }


    if(this.state.YourFeedback==="" ){
      window.alert("You can't submit feedback by keeping feeback textbox empty")
    }
    else if( this.state.courseName===""){
      window.alert("You can't submit feedback without selecting coursename ")
    }else{

        Dataservice.submitFeedback({
          uemail:Authentication.getLoggedInUserName(),
          fdcontent:this.state.YourFeedback,
          course:this.state.courseName,
          fname:"dummy",
          lname:"dummy"
        })
        .then(response=>console.log(response.data))
      window.alert("Your Feedback Has Been Submitted.", this.state.YourFeedback)
      window.location.reload()
    }


  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      
      case "Courses":
         
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "YourFeedback":
        
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;

    return (
    <div className="MainDiv">
         <div className="wrapperleft">
          <div className="innerwrapper">
               <h2 className="viewhead">View Course Feedback</h2> 
               <div className="innerleftdiv1">
                    <span >Select Course   </span>  
                    
                     <select name="nlcourseName" value={this.state.nlcourseName} onChange={this.courseSelected2}>
                      <option value=""></option>

                      {this.state.allcourseList.map(clist=>
                      <option value={clist}>{clist}</option>
                      )}
                      
                    </select>
                  {this.state.feedbackList.map(flist=>
                    <Paper className="paper" elevation={1}>
                          <Typography variant="h6" component="h3">
                             {flist.fname}_{flist.lname} Says
                                </Typography>
                            <Typography component="p">
                                  {flist.fdcontent}
                          </Typography>
                    </Paper>
                   )}
               </div>
          </div>     
      </div>
      <div className="wrapperright">
      {this.state.isloggedin ?<span></span> :<div className="shadow"> <h2 className="blurtitle">Please Log In To Submit Feedback</h2></div>}
        <div    className={this.state.isloggedin?"form-wrapper":"form-wrapperdup"}>
          <h1>Your Feedback</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            
            <div className="Courses">
              <label htmlFor="Courses">Course:</label>
            <select name="courseslist" value={this.state.courseName} onChange={this.courseSelected}> 
            <option value=""></option>)}            
              {this.state.courseList.map(course=>
                    <option value={course}>{course}</option>)}
            </select>
             
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email"
                type="email"
                name="email"
                value={this.state.user}
                noValidate
                onChange={this.handleChange}
                readOnly
                
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <div className="YourFeedback">
              <label htmlFor="YourFeedback">Your Feedback : 
              <textarea 
              name="YourFeedback" placeholder="Write something..Max 150 words" 
              value={this.state.YourFeedback} 
              onChange={this.handleChange} 
              maxLength="150"
              />
              </label>
              
            </div>
            <div className="Feedback">
              <button type="submit" onSubmit>Submit Your Feedback</button>
              
              
            </div>
          </form>
        </div>
      </div>
     
    </div>    
    );
  }
}

export default Feedback;