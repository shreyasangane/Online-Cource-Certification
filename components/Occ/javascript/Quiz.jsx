import React, { Component } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Timer from 'react-compound-timer';
import Dataservice from "../../../api/occ_api/Dataservice";
import {BrowserRouter as Router,Route,Switch, Link} from  'react-router-dom';
import { Button } from '@material-ui/core';
import AuthenticationService from './AuthenticationService.js';
import { withRouter } from 'react-router-dom';

var permarks=[];

function startTimer() {
  var presentTime = document.getElementById('timer').innerHTML;
  var timeArray = presentTime.split(/[:]+/);
  var m = timeArray[0];
  
  var s = checkSecond((timeArray[1] - 1));
  if(s==59){m=m-1}
  //if(m<0){alert('timer completed')}
  
  document.getElementById('timer').innerHTML =
    m + ":" + s;
  console.log(m)
  if(s=="00") {
    document.getElementById('timer').innerHTML="expired"
    document.getElementById('submitExam').click()
  }
  else{setTimeout(startTimer, 1000);}
  
}

function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
  if (sec < 0) {sec = "59"};
  return sec;
}

if(window.location.pathname=="/page3/Java/examstart/certificate/1" || window.location.pathname=="/page3/Java/examstart/certificate/2"){
    window.onload = function () {
      document.getElementById('timer').innerHTML =
      "000" + ":" + "10";
      startTimer();
    };
  }

class Quiz extends Component {
  constructor(props){
    super(props)
    this.state={
         testdata:this.props.testdata,
         marks:0,
         
         answer:"",
         course:this.props.course ,             
    }
    
  }


  
 

  handleChange(qn,cname,value){
    // console.log(event.target.name,event.target.value)
    console.log(window.location.pathname)

    console.log(qn,cname,value)
    
    console.log("qn",qn);
    console.log("permarks",permarks[qn]);
   
    
    Dataservice.getCorrectAnswer(qn,cname)
    .then(response=>{
    
      
      this.setState({
        answer:response.data
      })

     
     
      
      if(response.data==value && permarks[qn]==1)
      {
        this.setState({
          marks:this.state.marks+1
          
        },()=>{
          console.log("Marks", this.state.marks)
        })
      }else if(response.data==value && permarks[qn]!=1){

        this.setState({
          marks:this.state.marks+1
          
        },()=>{
          console.log("Marks", this.state.marks)
        })

      }else if(response.data !=value && permarks[qn]==1){
        this.setState({
          marks:this.state.marks-1
          
        },()=>{
          console.log("Marks", this.state.marks)
        })
      }
      else {

        this.setState({
          marks:this.state.marks+0
        },()=>{
          console.log("Marks", this.state.marks)
        })

      }

      
      
      if(response.data==value){
        // this.state.permarks[qn]=1;
       permarks[qn]=1;
      }else{
        // this.state.permarks[qn]=0;
        permarks[qn]=0;
      }


    })

    

        
    
    
  }

  submittest(){
    
    const user=AuthenticationService.getLoggedInUserName();
    const { history } = this.props;


    console.log(this.state.marks,this.state.course,user)
      if(this.state.marks>=2){
        console.log("passed")
            Dataservice.updateScore({
              custemail:user,
              cname:this.state.course,
              remattempt:0,
              test1s:this.state.marks,
              test2s:this.state.marks,
              test1st:"passed",
              test2st:"passed",
              cc:"yes"
            })
            .then(response=>console.log(response))
            window.alert("You have Successfully Passed the Test. Your Certificate is Available")
            history.push(`/page3/${this.state.course}`)
            window.location.reload()
      }
      else{
        window.alert("You have Failed the Test. Better Luck Next Time. If remaining Test attempt is 0 then repay for examfees");
        history.push(`/page3/${this.state.course}`)
            window.location.reload()
      }
  }

    render(){
      const{testdata}=this.props;
      const { history } = this.props;

      
            
    return (
      
    
                
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" style={{ backgroundColor: '#cfe8fc' }}>
      <div style={{ display: "flex"}}>
          <Typography variant="h4" style={{ marginLeft: "auto" }}>
           
           <Timer initialTime={1800000} direction="backward" checkpoints={[{time:1000, callback:()=>this.submittest()}]}>
             <React.Fragment>
                <Timer.Minutes /> minutes: <Timer.Seconds /> seconds
             </React.Fragment>

           </Timer>
            


        </Typography>
      </div>
        <div style={{height:"20px"}}></div>

      <Typography variant="h2" style={{color: "#6200ff", marginLeft: "70px" }}> Final Test </Typography>
      <b id="timer" style={{marginLeft: '100px',fontSize:"20px"}}>Duration: 30 Minutes</b>
{testdata.map(data=>( 
  <div>
                  <div style={{height: "20px"}}></div>
                  <FormControl component="fieldset">
                  <FormLabel component="legend">{data.qd}</FormLabel>
                  <RadioGroup aria-label="question" name={data.qn} onChange={(event)=>this.handleChange(data.qn,data.cname,event.target.value)}>
                      <FormControlLabel value={data.op1}  control={<Radio />} label={data.op1} />
                      <FormControlLabel value={data.op2}  control={<Radio />} label={data.op2} />
                      <FormControlLabel value={data.op3}  control={<Radio />} label={data.op3} />
                      <FormControlLabel value={data.op4}  control={<Radio />} label={data.op4} />
                  </RadioGroup>
                  </FormControl></div>))}
       

        <Button style={{color: "red",backgroundColor:"yellow" }} id="submitExam" onClick={()=>this.submittest()} >Submit Test</Button>
    </Container>
    </React.Fragment>
    

    
  );
}
}

export default withRouter(Quiz);