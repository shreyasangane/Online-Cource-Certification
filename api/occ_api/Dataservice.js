import axios from 'axios'

class Dataservice{

      getUsername(email)
      {
         return axios.get(`http://localhost:8080/welcomeuser/${email}`)
         
      }

    createAccount(custDetails){
        return axios.post(`http://localhost:8080/createaccount`,custDetails) 
     }

     loginAccount(loginDetails){
     //   console.log(loginDetails);
        return axios.post(`http://localhost:8080/loginaccount`,loginDetails) 
     }

     getCourseList(){
        return axios.get(`http://localhost:8080/courselist`)
     }

     applyForCourse(appliedcourseDetails){
        return axios.post(`http://localhost:8080/appliedCourse`,appliedcourseDetails)
     }

     getAppliedCourseList(email){
        return axios.get(`http://localhost:8080/getAppliedCourseList/${email}`)
     }
     
     getCourseTopicList(cname){
        return axios.get(`http://localhost:8080/getTopicList/${cname}`) 
     }

     getTestContent(cname){
      return axios.get(`http://localhost:8080/gettestquestions/${cname}`) 
     }

     getCorrectAnswer(qn,cname){
      return axios.get(`http://localhost:8080/getcorrectanswer/${qn}/${cname}`) 
     }

     getBoughtCourseDetails(cname,email){
      return axios.get(`http://localhost:8080/getBoughtCourseDetails/${cname}/${email}`) 
     }

     updateRemattempt(cname,email,attempt){
      return axios.put(`http://localhost:8080/updateRemattempt/${cname}/${email}/${attempt}`) 
     }

     updateScore(testdetails){
        return axios.put(`http://localhost:8080/updateTestScore`,testdetails)
     }

     submitFeedback(feedbackdetails){
        return axios.post(`http://localhost:8080/submitfeedback`,feedbackdetails)
     }

     getFeedbackList(courseselected){
      return axios.get(`http://localhost:8080/getfeedback/${courseselected}`)
     }

     getCertificateData(course,email){
        return axios.get(`http://localhost:8080/getcertificate/${course}/${email}`)
     }

     getusercoursedetails(course){
        return axios.get(`http://localhost:8080/usercoursedetails/${course}`)
     }
     
}

export default new Dataservice()