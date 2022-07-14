import React, { Component } from "react";
import "./SurveyHome.css";
import BackgroundYellow from "../images/yellow_bg.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import Logo from "../images/quizking-newlogo.png";
import User from "../images/user.png";
import { Auth } from "aws-amplify";

const divStyle = {
  display: "flex",
  alignItems: "center",
};


class SurveyHome extends Component {

  state = {
    surveys: [],
    isPending:true
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
        console.log(user)
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
      params: { User_id: localStorage.getItem('user_id') },
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
    const { surveys } = this.state;
    const { isPending } = this.state;
    const surveyList = surveys.length ? (
      surveys.map((survey) => {
        return (
          <div>
            <div className="col s12 m6">
              {isPending && <div> Loading...</div>}
              <Link to={"/survey/" + survey.id} key={survey.id}>
                <div
                  className="card"
                  style={{
                    borderRadius: "10px",
                    margin: "10px",
                    backgroundColor: "#1B164E",
                    color: "white",
                  }}
                >
                  <div className="center">
                    {isPending}
                    <div style={divStyle}>
                      <span
                        className="card-title"
                        style={{
                          textAlign: "center",
                          width: "45%",
                          float: "left",
                          fontFamily: "KongshoMJ_Regular",
                          fontSize: "23px",
                        }}
                      >
                        {survey.name}
                      </span>
                      <span
                        className="card-title"
                        style={{
                          textAlign: "center",
                          float: "right",
                          width: "45%",
                          fontSize: "16px",
                        }}
                      >
                        {survey.budget}
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
          backgroundImage: `url(${BackgroundYellow})`,
          height: "100vh",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div>
            <Link to={"/UserHome"}>
              <img src={User} style={{ height: "50px" }} alt="" />
            </Link>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div>
            <img src={Logo} style={{ height: "150px" }} alt="" />
          </div>
        </div>
        <div style={{ marginTop: "40px" }}>{surveyList}</div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    surveys: state.surveys,
  };
};
export default connect(mapStateToProps)(SurveyHome);