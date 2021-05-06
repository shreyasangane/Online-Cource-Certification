import React, { Component } from 'react';
import Dataservice from "../../../api/occ_api/Dataservice";
import '../css/HomePageOcc.css';
import Occ_Main from './Occ_Main';
import Home from  './Home'
import {Layout, Header, Navigation, Drawer, Content } from 'react-mdl';
import {Link} from 'react-router-dom';
import  Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import CourseDetails from './CourseDetails';

class HomePageOcc extends Component {
    constructor(props){
        super(props)
        this.state={
            courseList:[],
            open:false
        }
    }

    componentDidMount(){

        Dataservice.getCourseList()
        .then(response=>this.setState({
            courseList:response.data
        }))
    }

  render(){
  return (
    <div className="demo-big-content">
    <Layout>
        <Header className="header-color" title="Online Course Certification" scroll>
            <Navigation>
                <span><u>Login / Sign Up To Apply For Courses</u></span>
                <Link to="/">Home</Link>
                <Link to="/login">Log In</Link>
                <Link to="/registeration">Sign Up</Link>
                <Link to="/contact">Contact Us</Link>
                <Link to="/moreinfo">More Info</Link>
            </Navigation>
        </Header>
        <Drawer className="homepagedrawer" title="Courses">
            <Navigation>
           
              
            { this.state.courseList.map(data=>
             <Tooltip title={<CourseDetails course={data} />} placement="right-top-start" interactive >
                               <Button>{data}</Button>
                               </Tooltip>
                            )
                          }
            
                               
            </Navigation>
        </Drawer>
        <Content>
            <div className="page-content" />
            <Home/>
        </Content>
    </Layout>
</div>
  );
}
}

export default HomePageOcc;