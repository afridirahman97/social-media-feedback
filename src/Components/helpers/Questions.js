import axios from "axios";

import { Auth } from "aws-amplify";

var accessToken;

async function Questions() {

  var urlConcat = window.location.pathname.split("/");
  var lastSegment = urlConcat.pop() || urlConcat.pop(); // last segment of the URL contains survey_id. -this will extract that part

  var access_token = localStorage.getItem('access_token');

  localStorage.setItem('surveyID', lastSegment);

  //console.log(accessToken)
 
 //http://localhost:3000/comments
 //https://6pmwdg0l32.execute-api.ap-southeast-1.amazonaws.com/staging/question/display

  var result = await axios({
    url: 'https://uiq7a9a4q1.execute-api.ap-southeast-1.amazonaws.com/staging/getSurveyQuestion',
    params: {
      survey_id: lastSegment,
    },
    method: 'get',
    // headers: {
    //   'Authorization': access_token,
    // }
  });


  return result.data

}


export default Questions;