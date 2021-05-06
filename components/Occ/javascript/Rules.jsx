import React,{useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import { useParams} from "react-router";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Dataservice from "../../../api/occ_api/Dataservice";
import AuthenticationService from './AuthenticationService.js';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      overflow: 'auto',
      maxHeight: 500,
    },
    listSection: {
      backgroundColor: 'inherit',
    },
    ul: {
      backgroundColor: 'inherit',
      padding: 0,
    },
  }));

export default function Rules(props) {

    let history= useHistory();
    let param= useParams();
    const user=AuthenticationService.getLoggedInUserName();
    let remattempt;
    const[state,setState]=useState({
      attempt:''
  
    });

    function startExam(){
        console.log("Hello")
        console.log(`${param.course}`)

        Dataservice.getBoughtCourseDetails(param.course, user)
        .then(response=>{   
        
        remattempt=response.data.remattempt;
        
        console.log(response.data.remattempt, remattempt)

        Dataservice.updateRemattempt(param.course,user,remattempt)
        .then(response=>console.log(response))
        history.push(`/page3/${param.course}/examstart/certificate/${remattempt}`)
        window.location.reload();
        })

        

        

     //  history.push(`/page3/${param.course}/examstart/test/${remattempt}`)
     
    }
    const classes = useStyles();
    return (
    <React.Fragment>
    <CssBaseline />
    <Container style={{width: '750px',  textAlign: 'center', justifyContent: 'center', backgroundColor: '#cfe8fc', height: '600px'}}>
    <List className={classes.root} subheader={<li />}>
    <li className={classes.listSection}>
      <ul className={classes.ul}>
        <ListSubheader>Rules For The Quiz</ListSubheader>
        <ListItem><ListItemText>1. This quiz will comprise of 30 questions.</ListItemText></ListItem>
        <ListItem><ListItemText>2. These questions are solely based on the chapters that you have learnt in this course.</ListItemText></ListItem>
        <ListItem><ListItemText>3. You will have 30 minutes to complete this quiz after which it will be auto-submitted.</ListItemText></ListItem>
        <ListItem><ListItemText>4. Each right answer will get you 1 point while each wrong will get you 0 point.Passing percentage is 60% i.e 18 marks.</ListItemText></ListItem>
        <ListItem><ListItemText>5. Please do not use any other tool, if caught, action will be taken.</ListItemText></ListItem>
        <ListItem><ListItemText>6. If a question is unmarked, it will not be evaluated.</ListItemText></ListItem>
        <ListItem><ListItemText>7. We recommend you keep a proper internet connection, any progress lost will not be recovered.</ListItemText></ListItem>
        <ListItem><ListItemText>8. If this is your first two attempts, you can retry this quiz but if you have exhaused your first two attempts, this is your last try.</ListItemText></ListItem>
        <ListItem><ListItemText>9. Some questions may have more than two answers in which case, you should mark both.</ListItemText></ListItem>
        <ListItem><ListItemText>10. Once you click on the Start button the timer will automatically start.</ListItemText></ListItem>
        <ListItem><ListItemText style={{color:"red"}}>11. Once you click on the Start button, test attempt count will be reduced by 1. So don't click on any link on screen except your answer choice. </ListItemText></ListItem>

    </ul>
    <div style={{height:'10px'}}/>
        <b style={{color: 'blue'}}>All The Best</b>
        <div style={{height:'5px'}}/>
        <Button variant="contained" size="medium" color="primary" className={classes.margin} onClick={()=>startExam()}>
          Start Quiz
        </Button>
    </li>
</List>

    </Container>
    </React.Fragment>
    );
}