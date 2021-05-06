import React ,{Component}from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Logo from '../../../images/logo192.png';
import VJTI from '../../../images/vjti.png';
import Dataservice from "../../../api/occ_api/Dataservice";
import AuthenticationService from './AuthenticationService.js';

class Certificate extends Component {

  constructor(props){
    super(props)
    this.state={
      course:this.props.match.params.course,
      certificateData:{}
    }

  }

  componentDidMount(){

    const user= AuthenticationService.getLoggedInUserName();

    Dataservice.getCertificateData(this.state.course,user)
    .then(response=>{this.setState({

      certificateData:response.data

    })})

  }


  render(){
    const{certificateData}=this.state
    return (
      <div >
        <React.Fragment>
      <CssBaseline />
      <Container fixed style={{marginLeft: "120px", 
                                backgroundColor: '#fff', 
                                height: '100%', 
                                display: "flex",
                                textAlign: 'center',
                                justifyContent: 'center',
                                width: 'auto',
                                border: '10px dashed orange',                               
                                overflowY:"auto" }} >
        <div >
            <img src={Logo} alt="LOGO" style={{marginTop:"30px", height: "90px", width: "90px"}}></img>
            <div style={{height: "5px"}}/>
            <b style={{fontSize: "30px", color: "#6e6363"}}>CERTIFICATE OF</b>
            <div style={{height: "1px"}}/>
            <b style={{fontSize: "55px", color: "orange"}}>COMPLETION</b>
            <div style={{height: "10px"}}/>
            <h4>This is to certify that</h4>
            <h1 style={{color: "orange"}}><u>{certificateData.fname} {certificateData.lname} </u></h1>
            <b>has completed the course: "{certificateData.coursen}" of duration {certificateData.coursed}  with grade</b>
            <div style={{height: "1px"}}/>
            <b style={{fontSize: "40px", color: "orange"}}>{certificateData.grade} </b>
            <div style={{height: "40px"}}/>
           <div> <b style={{paddingLeft:"10px"}}>Dated: </b> <b style={{color: "orange"}}>{certificateData.cdate} </b>
            <b style={{paddingLeft:"90px"}}>CERTIFICATE ID:</b> <b style={{color: "orange"}}>{certificateData.cid}  </b></div>
           <div><img src={VJTI} alt="LOGO" style={{ width: "110px",marginTop:"20px"}}></img></div> 
            <h4>Affiliated with VJTI College.</h4>
      </div>
      </Container>
    </React.Fragment>
    </div>
        );}

}

export default Certificate;