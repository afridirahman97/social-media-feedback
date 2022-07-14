import React, { Component } from "react";
//import "./SurveyHome.css";
//import BackgroundYellow from "../images/yellow_bg.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
//import Logo from "../images/quizking-newlogo.png";
//import User from "../images/user.png";
import { Auth } from "aws-amplify";
import StopWatch from "../images/stopwatch.png";
import BackButton from "../images/CTA Small_Icon.png";
import Notification from "../images/notifications.png";
import BaseBackground from "../images/base_background.png";
//import BottomNavBar from "../Components/BottomNavBar";


const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "left",
  flexDirection: "column",
};


class Survey extends Component {

  state = {
    surveys: [],
    isPending: true
  };


  // componentDidMount() {

  //   const id = 3000
  //   axios
  //     .get(
  //       "https://1qkgfpljs7.execute-api.ap-southeast-1.amazonaws.com/staging/getsurveylist?User_id=3000"
  //      )
  //     .then((res) => {
  //       console.log(res);
  //       this.setState({
  //         surveys: res.data.slice(0, 5), // show the first 6 objects
  //       });
  //     });
  //  }



  async componentDidMount() {

    // var myHeaders = new Headers();
    var accessToken;


    await Auth.currentAuthenticatedUser()
      .then(user => {
        //console.log(user)
        accessToken = (user['signInUserSession']['accessToken']['jwtToken'])
        //console.log(accessToken)
        this.setState({
          user,
          "userLogin": true
        })
      })
      .catch(() => console.log("Not signed in"));

    //console.log(accessToken)






    axios({
      url: 'https://1qkgfpljs7.execute-api.ap-southeast-1.amazonaws.com/staging/getsurveylist',
      params: localStorage.getItem('user_id'),
      method: 'get',
      headers: {
        'Authorization': accessToken,


      }
    })
      .then((res) => {
        console.log(res);

        // console.log(accessToken),
        this.setState({
          surveys: res.data.slice(0, 2), // show the first 6 objects
          isPending: false
        });
      });

  }



  render() {
    const { surveys } = this.props;
    const surveyList = surveys.length ? (
      surveys.map((survey) => {
        return (
          <div>
            <div className="col s12 m6">
              <Link to={"/survey/" + survey.id} key={survey.id}>
                <div
                  className="card"
                  style={{
                    borderRadius: "16px",
                    margin: "15px",
                    backgroundColor: "#163E72",
                    color: "white",
                    backgroundImage: `url(${BaseBackground})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    
                  }}
                >
                  <div className="center">
                    <div style={divStyle}>
                      <h3
                        className="card-title"
                        style={{
                          textAlign: "left",
                          width: "100%",
                          float: "left",
                          fontFamily: "Poppins",
                          fontWeight: "700",
                          fontSize: "16px",
                          paddingTop: '15px',
                          paddingLeft: '20px',
                        }}
                      >
                        {survey.name}
                      </h3>

                    </div>
                    <div style={{ display: "flex", flexDirection: 'row' }}>
                      <img src={StopWatch} style={{ height: '14.25px', paddingLeft: '15px' }} alt='' />
                      <span
                        className="card-title"
                        style={{
                          textAlign: "left",
                          float: "left",
                          fontFamily: "Poppins",
                          fontWeight: "500",
                          fontSize: "10px",
                          color: '#00E3B6',
                        }}
                      >
                        {survey.budget}
                      </span>
                    </div>
                    <div style={{ display: "flex", flexDirection: 'row', paddingTop: '20px', }}>
                      <span style={{ marginLeft: '15px', padding: '4px', fontFamily: 'Poppins', float: "left", backgroundColor: '#FF565E', marginBottom: '15px', borderRadius: '4px', }}>
                        {survey.points}
                      </span>
                      <span style={{ marginLeft: '10px', padding: '4px', fontFamily: 'Poppins', float: "left", backgroundColor: '#FCD034', marginBottom: '15px', borderRadius: '4px', color: '#163E72' }}>
                        {survey.question}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        );
      })
    ) : (
      <div className="center">No surveys left</div>
    );
    return (
      <div
        className="body_container"
        style={{
          backgroundColor: '#F6F7FA',
          height: "100vh",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-around", paddingTop: '30px' }}>
          <div>
            <img src={BackButton} style={{ height: '30px' }} alt='' />
          </div>
          <div>
            <h2 style={{ color: '#004277', fontFamily: 'Poppins', fontSize: '18px', fontWeight: '600' }}>All Surveys</h2>
          </div>
          <div>
            <img src={Notification} style={{ height: '30px' }} alt='' />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
        </div>
        <div style={{ marginTop: "40px" }}>
          {surveyList}
        </div>
      
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    surveys: state.surveys,
  };
};

export default connect(mapStateToProps)(Survey);