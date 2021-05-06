import React, { Component ,useState} from 'react';
//import PropTypes from 'prop-types';
import { Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import  '../css/App.css';
import '../css/HomePageOcc.css';
import {Layout, Header, Navigation, Drawer, Content } from 'react-mdl';
import { browserHistory } from 'history'
import {BrowserRouter as Router,Route,Switch, Link} from  'react-router-dom'
import { withStyles } from '@material-ui/styles';
import { render } from '@testing-library/react';
import { white, black } from 'color-name';
import transitions from '@material-ui/core/styles/transitions';
import { useHistory } from "react-router-dom";
import AuthenticationService from './AuthenticationService.js'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Dataservice from "../../../api/occ_api/Dataservice";
import { red } from '@material-ui/core/colors';
import '../css/Userpage.css'


const images = [
  {
    url: 'https://www.bajajfinserv.in/Documentation_needed_to_apply_for_a_course_in_Germany_image1_LAPE-06_Documentation_needed_to_apply_for_a_course_in_Germany_790x345px.jpg',
    title: 'Apply for course',
    width: '50%',
  },
  {
    url: 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/201811/online-3412473_1920_1.jpeg?tz.RfsTe_UTLHiDqxmpG7PY_nTIBjwF7',
    title: 'Choose Your Course',
    width: '50%',
  },
  /*{
    url: '/static/images/grid-list/camera.jpg',
    title: 'Camera',
    width: '30%',
  },*/
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      minWidth: 300,
      width: '100%',
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 2,      
    },
    image: {
      position: 'relative',
      height: 500,
      [theme.breakpoints.down('xs')]: {
        width: '100% !important', // Overrides inline-style
        height: 100,
      },
      '&:hover, &$focusVisible': {
        zIndex: 1,
        '& $imageBackdrop': {
          opacity: 0.15,
        },
        '& $imageMarked': {
          opacity: 0,
        },
        '& $imageTitle': {
          border: '4px solid currentColor',
        },
      },
    },
    focusVisible: {},
    imageButton: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.palette.common.white,
    },
    imageSrc: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundSize: 'cover',
      backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: theme.palette.common.black,
      opacity: 0.4,
      transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
      position: 'relative',
      padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
    },
    imageMarked: {
      height: 3,
      width: 18,
      backgroundColor: theme.palette.common.white,
      position: 'absolute',
      bottom: -2,
      left: 'calc(50% - 9px)',
      transition: theme.transitions.create('opacity'),
    },
  }),
);


  
  export default function Upagestart() {
    const classes = useStyles();

    
    let history= useHistory();
    
    function handelclick(title){
      if(title==='Apply for course'){
          console.log('app')
          history.push("/page2")
          
      } 
      // }else{
      //     console.log('yc')
      //     history.push("/page3")
      // }
    }
  
  const user=AuthenticationService.getLoggedInUserName();
    
  const[state,setState]=useState({
    age:'',
    courseList:[],
    

  });

  
 
  Dataservice.getAppliedCourseList(user)
  .then(response=>{setState({
    courseList:response.data
  })})

  function handleChange (event) {
    history.push(`/page3/${event.target.value}`)
    //setState({ [event.target.name]: event.target.value });
    
  };

  return (
    <div className="demo-big-content">
    <Layout>
        <Header className="header-color" title="Online Course Certification" scroll>
         
            <Navigation>
                <Link className="home" to="/page1">Home</Link>
                <Link to="/page1">Welcome User</Link>
                <Link to="/login" onClick={AuthenticationService.logout}>Log Out</Link>
                <Link to="/contact">Contact Us</Link>
                <Link to="/moreinfo">More Info</Link>
            </Navigation>
        </Header>
       <Content>


    <div className={classes.root}>
      {images.map((image) => (
        <ButtonBase
          focusRipple
          key={image.title}
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          style={{
            width: image.width,
          }}
        >
          <span
            className={classes.imageSrc}
            style={{
              backgroundImage: `url(${image.url})`,
            }}
          />
          <span className={classes.imageBackdrop} />
          <span className={classes.imageButton}  onClick={()=>handelclick(image.title)}>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              className={classes.imageTitle}
            >
              {image.title} {image.title!=="Apply for course"? <Select
            value={state.age}
            onChange={handleChange}
            displayEmpty
            name="age"
            className={classes.selectEmpty}
          >
            {state.courseList.map(clist=> <MenuItem value={clist} className="menuItem">{clist}</MenuItem>)}
           
          
          </Select>:<span></span>}
              <span className={classes.imageMarked} />
            </Typography>
          </span>
        </ButtonBase>
      ))}
    </div>
    </Content>
    </Layout>
    </div>
  );
 }
  


// Upagestart.propTypes={
//   classes:PropTypes.object.isRequired,
// };

//export default withStyles(styles)(Upagestart);


