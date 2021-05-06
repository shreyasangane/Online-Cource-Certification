import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";
import  '../css/App.css';
import Dataservice from "../../../api/occ_api/Dataservice";
import AuthenticationService from './AuthenticationService.js'


const Card = ({property,isApplied}) => {

    const [isApply]=useState(isApplied);

    useEffect(() => {
     const check=["Java","Html"];
    
     
   
    }, [])

    const {index, picture, info, additional, price,course} = property;
    
    let history= useHistory();

    
    
    

    const [state,setState]=useState({
        cust_email:AuthenticationService.getLoggedInUserName(),
        no_attempt:"2",
        rem_no_attempt:"2",
        test1_score:"0",
        test2_score:"0",
        test1_status:"",
        test2_status:"",
        course_completed:"no",       
    });

   
    function goToCourse(course,index){
       console.log(index)
       console.log(state.cust_email)
       //history.push("/page3");

       Dataservice.applyForCourse({
           cust_email:state.cust_email,
           course_name:course,
           no_attempt:state.no_attempt,
           rem_no_attempt:state.rem_no_attempt,
           test1_score:state.test1_score,
           test2_score:state.test2_score,
           test1_status:state.test1_status,
           test2_status:state.test2_status,
           course_completed:state.course_completed
       })
       .then(response=>{console.log(response);
        if(response.data==="CourseTaken"){
        console.log("Taken");
        window.alert("You Have Already Applied For This Course");
    }else{
        window.alert("Successfully Applied For This Course");
    }})

    }
    // On page2 load , courses for which user has applied
    return (
        <div id={`card-${index}`} className="card" >
            <img src={picture} alt={info} className="image" />
            <div className="details">
                <span className="index">{index+1}</span>
                <p className="location">
                    {info}<br />
                    {additional}
                </p>
                <ul className="features">
                    
                    {/* <li className="icon">Price:{price} <span></span></li> */}
                    
                    <input type="button" value="Apply For Course" onClick={()=>goToCourse(course,index) }/>
                </ul>
            </div>
        </div>
    )
}

Card.propTypes = {
    property: PropTypes.object.isRequired
}

export default Card;