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
import BackButton from "../images/off_arrow.png";
import Notification from "../images/notification_p.png";
import BaseBackground from "../images/base_background.png";
import BottomNavBar from "../Components/BottomNavBar";
import Loader from "../iconComponent/Loader";
import Quizking_logo from '../images/quizking-newlogo.png'
import BackgroundYellow from '../images/yellow_bg.png';


const divStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "left",
    flexDirection: "column",
};



class Survey extends Component {

    state = {
        // id_user: '',
        loading: true,
        surveys: [],
        defaultSurveys: [],

    };


    async componentDidMount() {

        demoAsyncCall().then(() => this.setState({ loading: false }));

        if (!window.location.hash) {
            window.location = window.location + '#loaded';
            window.location.reload();
        }


        var IP_Address
        const res = await axios.get('https://geolocation-db.com/json/')
        // console.log(res.data);
        IP_Address = res.data.IPv4
        localStorage.setItem('IP_ADDRESS', IP_Address);




        var accessToken;

        await Auth.currentAuthenticatedUser()
            .then(user => {
                //console.log(user)
                accessToken = (user['signInUserSession']['accessToken']['jwtToken'])
                // userID = (user['storage']['user_id'])
                // console.log(userID)

                // console.log(accessToken)
                this.setState({
                    //  id_user: userID,
                    user,
                    "userLogin": true,

                })
            })
            .catch(() => console.log("Not signed in"));


        //main survey api call
        axios({

            //url: `https://t4tcacthp7.execute-api.ap-southeast-1.amazonaws.com/staging/getsurveylist?user_id=${localStorage.getItem('user_id')}`,
            url: `https://t4tcacthp7.execute-api.ap-southeast-1.amazonaws.com/staging/getSurvey?user_id=${localStorage.getItem('user_id')}`,
            // params: { user_id: (parseInt(id)) },
            method: 'get',
            headers: {
                'Authorization': accessToken,
            }
        })
            .then((res) => {
                console.log(res);

                // console.log(accessToken),
                this.setState({
                    surveys: res.data, // show the first 6 objects
                    isPending: false,

                });
            });


        //default survey api call
        axios({
            url: 'https://hepoobz475.execute-api.ap-southeast-1.amazonaws.com/staging/getdefaultsurvey',
            params: { user_id: localStorage.getItem('user_id') },
            method: 'get',
            //   headers: {
            //      'Authorization': accessToken,
            //  }
        })
            .then((res) => {
                console.log(res);

                // console.log(accessToken),
                this.setState({
                    defaultSurveys: res.data, // show the first 6 objects
                    isPending: false
                });
            });

    }


    render() {
        const { loading } = this.state;
        const { surveys } = this.state;

        if (loading) { // if your component doesn't have to wait for async data, remove this block 
            return null; // render null when app is not ready
        }
        const surveyList = surveys.length ? (
            surveys.map((survey) => {
                return (
                    <div>
                        <div className="col s12 m6">

                            <Link style={{ textDecoration: 'none' }} to={"/survey/" + survey.id} key={survey.id}>
                                <div
                                    className="card"
                                    style={{
                                        borderRadius: "16px",
                                        margin: "15px",
                                        backgroundColor: "#502499",
                                        color: "white",
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
                                                    fontFamily: "Oswald",
                                                    fontWeight: "700",
                                                    fontSize: "16px",
                                                    paddingTop: '15px',
                                                    paddingLeft: '20px',
                                                    textDecorationLine: 'none',
                                                    fontSize:'18px'
                                                }}
                                            >
                                                {survey.name}
                                            </h3>

                                        </div>
                                        <div style={{ display: "flex", flexDirection: 'row' }}>
                                         
                                           
                                        </div>
                                        <div style={{ display: "flex", flexDirection: 'row', paddingTop: '20px', }}>
                                            <p style={{ marginLeft: '15px', padding: '4px', fontFamily: 'Oswald', float: "left", backgroundColor: '#FF565E', marginBottom: '15px', borderRadius: '4px', textDecorationLine: 'none', fontSize: '12px' }}>
                                                {survey.points} Points
                                            </p>
                                            <p style={{ marginLeft: '10px', padding: '4px', fontFamily: 'Oswald', float: "left", backgroundColor: '#FCD034', marginBottom: '15px', borderRadius: '4px', color: '#163E72', textDecorationLine: 'none', fontSize: '12px' }}>
                                                {survey.no_of_question} Questions
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                );
            })
        ) : (
            <div className="center" style={{ paddingLeft: '20px', paddingRight: '20px', display: 'flex', alignItems: "center", justifyContent: 'center', flexDirection: 'column' }}>
                <p style={{
                    fontFamily: "Oswald",
                    fontWeight: "700",
                    fontSize: "20px",
                    color: '#1B164E'

                }}>All surveys are completed</p>
                <p style={{
                    fontFamily: "Oswald",
                    fontWeight: "700",
                    fontSize: "20px",
                    color: '#1B164E'
                }}>We will have more for you soon</p>
            </div>
        );

        const { defaultSurveys } = this.state;
        const defaultsurveyList = defaultSurveys.length ? (
            defaultSurveys.map((defaultsurvey) => {
                return (
                    <div>
                        <div className="col s12 m6">
                            <Link to={"/default-survey/" + defaultsurvey.id} key={defaultsurvey.id}>
                                <div
                                    className="card"
                                    style={{
                                        borderRadius: "16px",
                                        margin: "15px",
                                        backgroundColor: "#163E72",
                                        color: "white",
                                        backgroundColor: '#1B164E',
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
                                                    textDecorationLine: 'none'
                                                }}
                                            >
                                                {defaultsurvey.name}
                                            </h3>

                                        </div>
                                        <div style={{ display: "flex", flexDirection: 'row' }}>
                                            <img src={StopWatch} style={{ height: '14.25px', paddingLeft: '15px' }} alt='' />
                                            <p
                                                className="card-title"
                                                style={{
                                                    textAlign: "left",
                                                    float: "left",
                                                    fontFamily: "Poppins",
                                                    fontWeight: "500",
                                                    fontSize: "10px",
                                                    color: '#00E3B6',
                                                    textDecorationLine: 'none'
                                                }}
                                            >
                                                {defaultsurvey.time} min
                                            </p>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: 'row', paddingTop: '20px', }}>
                                            <p style={{ marginLeft: '15px', padding: '4px', fontFamily: 'Poppins', float: "left", backgroundColor: '#FF565E', marginBottom: '15px', borderRadius: '4px', textDecorationLine: 'none', fontSize: '10px' }}>
                                                {defaultsurvey.points} Points
                                            </p>
                                            <p style={{ marginLeft: '10px', padding: '4px', fontFamily: 'Poppins', float: "left", backgroundColor: '#FCD034', marginBottom: '15px', borderRadius: '4px', color: '#163E72', textDecorationLine: 'none', fontSize: '10px' }}>
                                                {defaultsurvey.no_of_question} Questions
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                );
            })
        ) : (
            <div className="center"></div>
        );


        return (
            <div
                className="body_container"
                style={{
                    height: "120vh",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    overflow: 'hidden auto',
                    backgroundImage: `url(${BackgroundYellow})`,
                }}
            >
                <div style={{ display: "flex", justifyContent: "space-around", paddingTop: '30px' }}>
                   
                    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px', verticalAlign: 'middle' }}>
                        <div>
                            <img src={Quizking_logo} style={{ height: '100px', width: '80px', marginBottom: '10px' }} alt='' />
                        </div>
                    </div>
                   
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                </div>
                <div style={{ marginTop: "40px" }}>
                    {surveyList}
                </div>
                <div>
                    {defaultsurveyList}
                </div>
                <div>
                    <BottomNavBar name='survey' />
                </div>

            </div>
        );
    }



}

function demoAsyncCall() {
    return new Promise((resolve) => setTimeout(() => resolve(), 1150));
}
const mapStateToProps = (state) => {
    return {
        surveys: state.surveys,
    };
};

export default connect(mapStateToProps)(Survey);