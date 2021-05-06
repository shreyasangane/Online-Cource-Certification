import React, { Component } from 'react';
import Card from './Card';
import data from './Data'
import logo from '../../../assets/logo.svg';
import {Layout, Header, Navigation, Drawer, Content } from 'react-mdl';
import  '../css/App.css';
import '../css/HomePageOcc.css';
import {BrowserRouter as Router,Route,Switch, Link} from  'react-router-dom'
import AuthenticationService from './AuthenticationService.js'
import Dataservice from "../../../api/occ_api/Dataservice";




// class component
class Upagestart2 extends Component {

  
  constructor(props){
    super(props);
    this.state = {
      properties: data.properties,
      property: data.properties[0],
      userfname:""
      //st: "S.mp4".split(".")[0],
    }

    
  }

  componentDidMount(){

    const user=AuthenticationService.getLoggedInUserName();

    Dataservice.getUsername(user)
    .then(response=>{
    this.setState({userfname:response.data.fname})
      
     }
    )  
  }


  nextProperty = () => {
    const newIndex = this.state.property.index+1;
    this.setState({
      property: data.properties[newIndex]
    })
  }

  prevProperty = () => {
    const newIndex = this.state.property.index-1;
    this.setState({
      property: data.properties[newIndex]
    })
  }

  render() {
    
    const {properties, property,isApplied} = this.state;
    //const classes = useStyles();
    return (
      <div className="demo-big-content">
    
        <Header className="header-color" title="Online Course Certification" >
            <Navigation>
                <Link className="home" to="/page1">Home</Link>
                <Link >Welcome {this.state.userfname}</Link>
                <Link to="/login" onClick={AuthenticationService.logout}>Log Out</Link>
                <Link to="/contact">Contact Us</Link>
                <Link to="/moreinfo">More Info</Link>
            </Navigation>
        </Header>
       
      <div className="App">

        

        <div className="page">
            <section>
                <img src={logo} className="App-logo" alt="logo" />
                                            
                <h1>Search & Apply </h1>
            </section>

            <div className="buttonSection"> <button color="primary"
          onClick={() => this.nextProperty()} 
          disabled={property.index === data.properties.length-1}
        >Next</button>
        <button 
          onClick={() => this.prevProperty()} 
          disabled={property.index === 0}
        >Previous</button></div>
           

            {/* <div className="col"> */}
              <div className={`cards-slider active-slide-${property.index}`}>
                <div className="cards-slider-wrapper" style={{
                  'transform': `translateX(-${property.index*(100/properties.length)}%)`
                }}>
                  {
                    properties.map(property => <Card key={property._id} property={property}  />)
                  }
                </div>
              </div>
            {/* </div> */}

        </div>
      </div>
      
      </div>
    );
  }
}

export default Upagestart2;