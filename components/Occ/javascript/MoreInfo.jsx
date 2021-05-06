import React, {Component} from 'react';
import '../css/HomePageOcc.css';
import {Layout, Header, Navigation, Drawer, Content } from 'react-mdl';
import {Link} from 'react-router-dom';
import AuthenticationService from './AuthenticationService.js';
import Dataservice from "../../../api/occ_api/Dataservice";
import Feedback from './Feedback';
import  Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import CourseDetails from './CourseDetails';

class MoreInfo extends Component {
    constructor(props){
        super(props)
        this.state={
            courseList:[],
            userfname:""
        }
    }

    componentDidMount(){

        const user=AuthenticationService.getLoggedInUserName();

    Dataservice.getUsername(user)
    .then(response=>{
    this.setState({userfname:response.data.fname})
      
     }
    )  

        Dataservice.getCourseList()
        .then(response=>this.setState({
            courseList:response.data
        }))
    }

    render (){
        const isUserLoggedIn=AuthenticationService.isUserLoggedIn();
        return(
            <div className="demo-big-content">
    <Layout>
        <Header className="header-color" title="Online Course Certification" scroll>
            <Navigation>
            <span><u>Login / Sign Up To Apply For Courses</u></span>
            {isUserLoggedIn ? <Link to="/page1">Home</Link> :<Link to="/">Home</Link> }
         {isUserLoggedIn ? <Link >Welcome {this.state.userfname}</Link>:<Link to="/login">Log In</Link> }
         {isUserLoggedIn ? <Link to="/login" onClick={AuthenticationService.logout}>Log Out</Link>: <Link to="/registeration">Sign Up</Link>}
                <Link to="/contact">Contact Us</Link>
                <Link to="/moreinfo">More Info</Link>
            </Navigation>
        </Header>
      {isUserLoggedIn===false ? <Drawer title="Courses">
            <Navigation>
            { this.state.courseList.map(data=>
             <Tooltip title={<CourseDetails course={data}/>} placement="right-top-start" interactive>
                               <Button>{data}</Button>
                               </Tooltip>
                            )
                          }
            
            </Navigation>
        </Drawer> :<span></span>}
        <Content>
            <div className="page-content" />
            <div>
                 <Feedback/>
                </div>
            
        </Content>
    </Layout>
</div>
               
        );
    }
}
export default MoreInfo;