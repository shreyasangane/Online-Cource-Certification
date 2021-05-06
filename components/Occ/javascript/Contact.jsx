import React, {Component} from 'react';
import '../css/HomePageOcc.css';
import {Layout, Header, Navigation, Drawer, Content ,Grid, Cell, List, ListItem, ListItemContent} from 'react-mdl';
import {Link} from 'react-router-dom';
import AuthenticationService from './AuthenticationService.js';
import Dataservice from "../../../api/occ_api/Dataservice";
import  Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import CourseDetails from './CourseDetails';


class Contact extends Component {
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
         {isUserLoggedIn ? <Link >Welcome {this.state.userfname} </Link>:<Link to="/login">Log In</Link> }
         {isUserLoggedIn ? <Link to="/login" onClick={AuthenticationService.logout}>Log Out</Link>: <Link to="/registeration">Sign Up</Link>}
                <Link to="/contact">Contact Us</Link>
                <Link to="/moreinfo">More Info</Link>
            </Navigation>
        </Header>
        {isUserLoggedIn===false ?    <Drawer title="Courses">
            <Navigation>
            { this.state.courseList.map(data=>
             <Tooltip title={<CourseDetails course={data}/>} placement="right-top-start" interactive>
                               <Button>{data}</Button>
                               </Tooltip>
                            )
                          }
            
            </Navigation>
        </Drawer> : <span></span>}
        <Content>
            <div className="page-content" />
           

            <div className="contact-body">
        <Grid className="contact-grid">
          <Cell col={6}>

            <h3>Saurabh M Sawant</h3>
            <img
              src="https://cdn2.iconfinder.com/data/icons/avatar-2/512/Fred_man-512.png" //Replace with out photos
              alt="avatar"
              style={{height: '150px'}}
               />

               <h3>Shreyas Angane</h3>
               <img
              src="https://cdn2.iconfinder.com/data/icons/avatar-2/512/Fred_man-512.png"
              alt="avatar"
              style={{height: '150px'}}
               />
               
               <h3>Tanmay Joshi</h3>
               <img
              src="https://cdn2.iconfinder.com/data/icons/avatar-2/512/Fred_man-512.png"
              alt="avatar"
              style={{height: '150px'}}
               />
               
            {/* <p style={{ width: '75%', margin: 'auto', paddingTop: '1em'}}>This website is the topic we had chosen during our Post Graduation, Mini project. If there are any queries related to this website, feel free to contact us.</p> */}

          </Cell>
          <Cell col={6}>
            <h2>Contact us</h2>
            <hr/>

            <div className="contact-list">
              <List>
                <ListItem>
                  <ListItemContent style={{fontSize: '30px', fontFamily: 'Anton'}}>
                    <i className="fa fa-phone-square" aria-hidden="true"/>
                    Saurabh M Sawant : 9930459987
                  </ListItemContent>
                </ListItem>

                <ListItem>
                  <ListItemContent style={{fontSize: '30px', fontFamily: 'Anton'}}>
                    <i className="fa fa-phone-square" aria-hidden="true"/>
                    Shreyas Angane : 7715924989
                  </ListItemContent>
                </ListItem>

                <ListItem>
                  <ListItemContent style={{fontSize: '30px', fontFamily: 'Anton'}}>
                    <i className="fa fa-phone-square" aria-hidden="true"/>
                    Tanmay Joshi : 9820108473
                  </ListItemContent>
                </ListItem>

                <ListItem>
                  <ListItemContent style={{fontSize: '30px', fontFamily: 'Anton'}}>
                    <i className="fa fa-envelope" aria-hidden="true"/>
                    OnlineCourseCertification@vjti.co.in
                  </ListItemContent>
                </ListItem>

                <ListItem>
                  <ListItemContent style={{fontSize: '30px', fontFamily: 'Anton'}}>
                    <i className="fa fa-linkedin" aria-hidden="true"/>
                    linkedin ID
                  </ListItemContent>
                </ListItem>


              </List>
            </div>
          </Cell>
        </Grid>
      </div>



        </Content>
    </Layout>
</div>
               
        );
    }
}
export default Contact;