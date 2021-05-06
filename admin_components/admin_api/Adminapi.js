import axios from 'axios'

class Adminapi{
/*---------------------------------User-----------------------------------------*/
    retrieveAllUsers(){
        return axios.get(`http://localhost:8080/users`)
     }

    deleteSelectedUser(email){
        console.log(email)
        return axios.delete(`http://localhost:8080/users/${email}`) 
     }

     /*--------------------------------Courses------------------------------------------*/

     retrieveAllCourses(){
        return axios.get(`http://localhost:8080/courses`)
     } 

     deleteSelectedCourse(cname){
      console.log(cname)
      return axios.delete(`http://localhost:8080/courses/${cname}`) 
   }    


   retriveUpdateCourse(cid){
      return axios.get(`http://localhost:8080/updatecourse/${cid}`)
      
   }

   submitUpdateCourse(cid,updateDetails){
         return axios.put(`http://localhost:8080/updatecourse/${cid}`,updateDetails)
   }

   submitAddCourse(cname,addCourseDetails){
      return axios.post(`http://localhost:8080/addcourse/${cname}`,addCourseDetails)
   }

/*-----------------------------Course Videos---------------------------------------------*/

  retrieveCourses(){
     return axios.get(`http://localhost:8080/coursevideo`)
  }

  submitAddCourseVideo(cname,addVideoDetails){
   return axios.post(`http://localhost:8080/addcoursevideo/${cname}`,addVideoDetails)
   }

   retrieveCourseVideos(cname){
      return axios.get(`http://localhost:8080/coursevideo/${cname}`)
   } 

   retriveUpdateCourseVideo(vid){
      return axios.get(`http://localhost:8080/updatecoursevideo/${vid}`)
      
   }

   submitUpdateCourseVideo(vid,updateDetails){
      return axios.put(`http://localhost:8080/updatecoursevideo/${vid}`,updateDetails)
   }

   
   deleteSelectedCourseVideo(vid){      
      return axios.delete(`http://localhost:8080/coursevideo/${vid}`) 
   }
   
/*-----------------------------Test ---------------------------------------------*/

retrieveTest(cname){
   return axios.get(`http://localhost:8080/test/${cname}`)
} 

submitAddTestDetails(cname,addTestDetails){
   return axios.post(`http://localhost:8080/test/${cname}`,addTestDetails)
   }

   retriveUpdateTestDetails(qid){
      return axios.get(`http://localhost:8080/updatetestdetails/${qid}`)
      
   }

   submitUpdateTestDetails(qid,updateDetails){
      return axios.put(`http://localhost:8080/updatetestdetails/${qid}`,updateDetails)
   }

   deleteSelectedTestQuestion(qid){      
      return axios.delete(`http://localhost:8080/test/${qid}`) 
   }

   /*-----------------------------Feedback ---------------------------------------------*/

   retriveFeedback(){
      return axios.get(`http://localhost:8080/getAdminFeedback`)
   }

   deleteSelectedFeedback(sno){
      return axios.delete(`http://localhost:8080/deletefeedback/${sno}`)
   }

}

export default new Adminapi()
