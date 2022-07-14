import Questions from "../helpers/Questions";
import { GameStateContext } from "../helpers/Context";
import moment from "moment";
import Axios from "axios";
import "./Question.css";
import GetQuestionList from "./GetQuestionList";
import React, { Component } from "react";
import { event } from "jquery";
import { input } from "aws-amplify";

//var currentQuestion = 0;
//var elem = "";
var urlConcat = window.location.pathname.split("/");
var lastSegment = urlConcat.pop() || urlConcat.pop(); // last segment of the URL contains survey_id. -this will extract that part

let newDate = moment().format("YYYY-MM-DD hh:mm:ss");
//console.log(IP)
var newdatapost = [];
var obj = [];

//const crypto = require("crypto");


var maxNumber = 45023123;
const OneTimeid = Math.floor((Math.random() * maxNumber) + 10);

//prev working
//const url = "https://xitpes6qe7.execute-api.ap-southeast-1.amazonaws.com/staging/submitusersurveyanswer";

const url =
  "https://10461prtj5.execute-api.ap-southeast-1.amazonaws.com/staging/submitUserAnswer";

class SurveyQuestion extends Component {

  
  //console.log(device_info)

  state = {
    surveys: [],
    isPending: true,
    score: "",
    multi_selected_value: [],
    IP: "",
    point: "",
    sorry: "",
    selectedValue: "",
    currentQuestion: 0,
    optionChosen: "",
    gameState: "",
    email: "",
    obj: [],
    data: {
      //survey_id: lastSegment,
      survey_id: parseInt(localStorage.getItem('newsurveyid')),
      question_id: 1,
      selected_answer: "",
      // user_id: localStorage.getItem("user_id"),
      device: "",
      submitted_datetime: newDate,
      //point: ""
    },
    selected_answer_list: [],
  };

  //     const [IP, setIP] = useState('');
  //     //creating function to load ip address from the API
  //     //let device_info

  chooseOption = (option) => {
    this.setState({
      optionChosen: "",
    });
  };

  nextQuestionforSecond = (e) => {
    var scorea = this.state.score;
    if (obj[this.state.currentQuestion].asnwer == this.state.optionChosen) {
      this.setState({
        score: scorea + 1,
      });
    }

    this.setState({
      currentQuestion: this.state.currentQuestion + 2,
    });

    this.setState({
      selectedValue: "",
    });
  };

  nextQuestionforFirst = (e) => {
    var scorea = this.state.score;
    if (obj[this.state.currentQuestion].asnwer == this.state.optionChosen) {
      this.setState({
        score: scorea + 1,
      });
    }

    this.setState({
      currentQuestion: this.state.currentQuestion + 4,
    });

    this.setState({
      selectedValue: "",
    });
  };

  nextQuestion = (e) => {
    var scorea = this.state.score;
    if (obj[this.state.currentQuestion].asnwer == this.state.optionChosen) {
      this.setState({
        score: scorea + 1,
      });
    }

    this.setState({
      currentQuestion: this.state.currentQuestion + 1,
    });

    this.setState({
      selectedValue: "",
    });
  };

  prevQuestion = (e) => {
    this.setState({
      currentQuestion: this.state.currentQuestion - 1,
    });
  };

  finishQuiz = async () => {
    //console.log("23232")

    var scorea = this.state.score;

    if (obj[this.state.currentQuestion].asnwer == this.state.optionChosen) {
      this.setState({
        score: scorea + 1,
      });
    }

    await this.setState({
      gameState: "congratulation",
      obj: [],
      newdatapost: [],
    });

    console.log(this.state.gameState);
  };

  submit = (e) => {
    e.preventDefault();
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    Axios.post(url, newdatapost, axiosConfig).then((res) => {
      //console.log(res.data);
      this.setState({
        point: res.data,
        newdatapost: [],
        obj: [],
        data: [],
      });
    });

    // Axios.get("https://geolocation-db.com/json/").then((response) => {
    //   this.setState({
    //     IP: response.data.IPv4,
    //   })
    // });

    this.setState({
      newdatapost: [],
      gameState: "congratulation",
      obj: [],
    });
  };

  handleCheckbox = (e) => {
    if (e.target.checked) {
      const multi_select_value = { ...this.state.multi_selected_value };
    }
  };

  getEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };


  insertorreplace(element, value_input, objectcheck) {
    if (element.checked) {
      if (!objectcheck.includes(value_input)) {
        //checking weather array contain the id
        objectcheck.push(value_input); //adding to array because value doesnt exists
      }
    } else {
      objectcheck.splice(objectcheck.indexOf(value_input), 1); //deleting
    }

    return objectcheck

  }

  handle = async (e) => {
    // this.multi_selected_value = this.multi_selected_value || {};
    // if (event.target.checked){
    //  var answerValues= Object.keys(this.multi_selected_value)
    // }

    var elementinput = e.target.name;

    const newdata = { ...this.state.data };
    var selected_answer_list = { ...this.state.selected_answer_list };
    var question_id = e.target.getAttribute("question_id");
    var email = { ...this.state.email };
    var status = true;
    var element = e.target;
    var value_input = element.value;

    var objecttrack;

    if (elementinput === "multi_selected_value") {
      var status = false;
      objecttrack = await newdatapost.map((o) => {

        if (o.question_id === parseInt(question_id)) {
          console.log("rrrrrrrrrrrrrrrrrrrrrrrrrr")
          status = true;
          console.log(o["multi_selected_value"]);
          var objectcheck = o["multi_selected_value"];

          console.log(objectcheck);
          if (!objectcheck) {
            console.log("blank");
            objectcheck = [];
          }

          objectcheck = this.insertorreplace(element, value_input, objectcheck)

          var array_to_push = objectcheck;

          o.multi_selected_value = array_to_push;
          newdata["multi_selected_value"] = array_to_push;
          console.log(o.multi_selected_value);
          //status = false
        }
        console.log(o);
        return o;
      });

      if (!status) {
        var objectcheck = [];
        objectcheck = this.insertorreplace(element, value_input, objectcheck)

        var array_to_push = objectcheck;

        // o.multi_selected_value = array_to_push;
        newdata["multi_selected_value"] = array_to_push;
        // console.log(o.multi_selected_value)
      }
    } else {
      objecttrack = await newdatapost.map((o) => {
        if (o.question_id === parseInt(question_id)) {
          console.log("iiiiiiiiiiiiiiiiii")
          o.selected_answer = e.target.value;
          //status = false
        }
        console.log(o);
        return o;
      });
    }

    newdatapost = objecttrack;


    if (selected_answer_list[question_id]) {

      newdatapost = await newdatapost.filter(function (obj) {
        return obj.question_id !== parseInt(question_id);
      });
    }

    selected_answer_list[question_id] = e.target.value;
    newdata["selected_answer"] = e.target.value;
    newdata["question_id"] = parseInt(question_id);
    newdata["feedback_id"] = parseInt(localStorage.getItem('newsurveyid'));
    newdata["device"] = localStorage.getItem("IP_ADDRESS");
    newdata["user_id"] = OneTimeid;

    //newdata['point'] = parseInt(point);
    console.log(newdata)
    this.setState({
      data: newdata,
      selected_answer_list: selected_answer_list,
    });

    // if (status) {
    newdatapost.push(newdata);

    // }

    console.log(newdatapost);
  };

  async componentDidMount() {
    obj = await Questions();
    console.log(obj);
    this.setState({
      obj: obj,
    });
  }

  render() {
    return (
      <div
        style={{
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <GetQuestionList
          obj={this.state.obj}
          currentQuestion={this.state.currentQuestion}
          finishQuiz={this.finishQuiz}
          nextQuestion={this.nextQuestion}
          nextQuestionforFirst={this.nextQuestionforFirst}
          nextQuestionforSecond={this.nextQuestionforSecond}
          prevQuestion={this.prevQuestion}
          submit={this.submit}
          handle={this.handle}
          selected={this.state.data}
          point={this.state.point}
          selected_answer_list={this.state.selected_answer_list}
        />
      </div>
    );
  }
}
export default SurveyQuestion;
