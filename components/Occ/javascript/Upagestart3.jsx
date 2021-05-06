import React,{useState, Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import {Layout, Header, Navigation,  Content } from 'react-mdl';
import {BrowserRouter as Router, Link} from  'react-router-dom'
import "../css/Userpage3.css"
import { useHistory } from "react-router-dom";
import AuthenticationService from './AuthenticationService.js';
import Dataservice from "../../../api/occ_api/Dataservice";
import { withStyles } from '@material-ui/styles';
import { style } from '@material-ui/system';
import PropTypes from 'prop-types';
import file from '../../../Java/Java3.mp4'
import Quiz from '../javascript/Quiz';
import Rules from '../javascript/Rules'


const drawerWidth = 240;


//const useStyles = makeStyles(theme => ({
const styles=(theme=>({  
  // appBar: {
  //   width: `calc(100% - ${drawerWidth}px)`,
  //   marginLeft: drawerWidth,
  //   height:65,
  //   marginTop:80
  // },
  
  // necessary for content to be below app bar
  //toolbar: theme.mixins.toolbar,
  
}));

//export default function Upagestart3(props)
class Upagestart3 extends Component{

  //const classes = useStyles();
  //let history= useHistory();

  constructor(props){
    super(props)
    this.state={
      course:this.props.match.params.course,
      arr:[],
      vidpath:this.props.match.params.topic,
      isTest:false,
      examparam:this.props.match.params.topic,
      isStart:false,
      testcontent:[],
      isCertificate:false,
      isFinalTest:true,
      data:{},
      remattempt:this.props.match.params.attempt,
      userfname:""
     
    }

    this.SelectTopic=this.SelectTopic.bind(this);
    this.GetBoughtCourse=this.GetBoughtCourse.bind(this);
  }

  componentDidMount(){
    const user=AuthenticationService.getLoggedInUserName();
   
    this.GetBoughtCourse(user);    
   
    Dataservice.getUsername(user)
    .then(response=>{
    this.setState({userfname:response.data.fname})
      
     })

    if(this.state.examparam==="exam"){
      this.setState({
        isTest:true,
        isStart:false
      })
    }
    
    if(this.state.examparam==="examstart"){
          this.setState({
            isTest:true,
            isStart:true,          
          })
                      

      
      }

      
      
      Dataservice.getCourseTopicList(this.props.match.params.course)
      .then(response=>{this.setState({
        arr:response.data,    
      })})
      
     
     
      Dataservice.getTestContent(this.props.match.params.course)
      .then(response=>{this.setState({
      testcontent:response.data
    })});

   
   
  }

  GetBoughtCourse(user){
      
    Dataservice.getBoughtCourseDetails(this.props.match.params.course, user)
    .then(response=>{   

      if(response.data.remattempt==="0"){
        this.setState({
          isFinalTest:false
        })
      }
      
      if(response.data.cc==="yes"){
        this.setState({
          isCertificate:true,
          isFinalTest:false
  
        })
      }else{
  
        this.setState({
          isCertificate:false
        })
      }

      this.setState({
        remattempt:response.data.remattempt,
        data:response.data,
      
    })})

    


  }
  


  hello(){
      console.log("Brab")
      this.props.history.push("/page1")
    }

  // const [state,setState]=useState({
    
  //   arr:[],
  //   course:"",
  //   vidpath:"Java1"
  // });


  
  // Dataservice.getCourseTopicList(props.match.params.course)
  // .then(response=>{setState({
  //   arr:response.data,
  //   vidpath:"Java1",
  //   course:props.match.params.course
  // })})
  
 

  // const SelectTopic=(vheading)=>{
  //   loga=state.arr.filter(item=>item.vhead===vheading);
  //   path=loga[0].vpath.split(".")[0];  
        
  //   console.log(path);
    
    // try by calling api function onclick

    
 // };

 SelectTopic(vheading){
   const loga=this.state.arr.filter(item=>item.vhead===vheading);
    const path=loga[0].vpath.split(".")[0]; 

       
    console.log(path);
    this.props.history.push(`/page3/${this.state.course}/${path}`)
       
    this.setState({
      vidpath:path
    })

    
    window.location.reload();
  

    
 };

 giveTest(){
  this.props.history.push(`/page3/${this.state.course}/exam`)
  window.location.reload()
    this.setState({
      isTest:true,
      vidpath:"open"
    })
 }
  


 getCertificate(){
   window.open(`/page3/${this.state.course}/MyCertificate/passed`, "_blank");
 }
   
  // const loga=state.arr.filter(item=>item.Vhead==="Core");
  // const path=loga[0].Vname.split(".")[0];
  

render(){
  const {classes} =this.props; 
  const{isFinalTest,isCertificate,remattempt}=this.state;

  
  return (
    <div className="root">
             
                <Header className="header-color" title="Online Course Certification" >
                    <Navigation>
                        <Link className="home" to="/page1">Home</Link>
                        <Link >Welcome {this.state.userfname}</Link>
                        <Link to="/login" onClick={AuthenticationService.logout}>Log Out</Link>
                        <Link to="/contact">Contact Us</Link>
                        <Link to="/moreinfo">More Info</Link>
                    </Navigation>
                </Header>
             
      <div className="maindiv">
        <div className="drawerdiv">

                  <Drawer
                  className="drawer"
                  variant="permanent"
                  // classes={{
                  //   paper: classes.drawerPaper,
                  // }}
                  anchor="left"
                >
                  <div className={classes.toolbar} />
                  <Divider />
                  <List>
                    {this.state.arr.map((text, index) => (
                      <ListItem button key={text.vhead} onClick={()=>this.SelectTopic(text.vhead)}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <InboxIcon />}</ListItemIcon>
                        <ListItemText primary={text.vhead}  />
                      </ListItem>
                    ))}
                  </List>
                          
                  <Divider />
                  <List>
                    
               {isFinalTest===true ?  <ListItem button key="Take Final Test" onClick={()=>this.giveTest()}>
                        <ListItemIcon> <InboxIcon /> </ListItemIcon>
                        <ListItemText primary="Take Final Test" />
                    </ListItem> :<span></span>  }
                   
               {isCertificate ===true?    <ListItem button key="My Certificate" onClick={()=>this.getCertificate()}>
                        <ListItemIcon> <InboxIcon />  </ListItemIcon>
                        <ListItemText primary="My Certificate" />
                    </ListItem>:<span></span> }
                  </List>
                </Drawer>
                  
        
        </div>
        
        <div className="contentdiv">
          
          <div className="appbardiv">
             <AppBar position="static" className={classes.appBar}>
               <Toolbar>
                   <Typography variant="h6" noWrap>
                     Course : {this.state.course} &nbsp;&nbsp;&nbsp;&nbsp; Test Attempts Remain : {remattempt}
                    </Typography>
               </Toolbar>
              </AppBar>
          </div>

            <div className="datadiv">
                    {  this.state.vidpath    && <main className="content">
                         
              
                          { this.state.isTest===false &&  <video  className="videomain" width="100%"  controls autoPlay >
                                      <source src={`/static/media/${this.state.vidpath}.c938fd58.mp4`} type="video/mp4"/> 
                                      <source src={`/static/media/${this.state.vidpath}.b4a66f6d.mp4`} type="video/mp4"/>      
                                      <source src={`/static/media/${this.state.vidpath}.86a61510.mp4`} type="video/mp4"/>     
                                                                                                
                                      
                                      <source src={file} type="video/mp4"/> 
                              </video> 
                          }

                        {/* <video width="320" height="240" controls>
                          <source src={s} type="video/mp4"/>      /static/media/Java1.f06804d4.mp4        
                                    
                        </video> */}
                        {this.state.isTest ? this.state.isStart ?<Quiz testdata={this.state.testcontent} course={this.state.course}/>:<Rules/>:<span></span>}
                        

                        </main>}
            </div>
          
          </div>
      </div>
     
      
    
    </div>
    );
  }
}

Upagestart3.propTypes={
  classes:PropTypes.object.isRequired,
};

export default withStyles(styles)( Upagestart3);