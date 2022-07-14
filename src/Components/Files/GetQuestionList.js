// import React, { useEffect } from 'react';
import BackgroundYellow from "../../images/yellow_bg.png";
import "./Question.css";
import React, { Component } from "react";
import Quizking_logo from '../../images/quizking-newlogo.png'


//for complete

import trophy from '../../images/Good_Job.png';
import axios from "axios";

//import Sorry from '../../images/sad.png'
//import { render } from "react-dom";




class GetQuestionList extends Component {

  constructor(props) {
    super(props)


    this.state = {
      loading: true,
      otherValue: "",
      name: "",
      number: "",


    }

    // var link = 'www.yahoo.com'


  }





  componentDidMount() {
    // this simulates an async action, after which the component will render the content
    demoAsyncCall().then(() => this.setState({ loading: false }));


  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value })
  }




  submit = e => {
    e.preventDefault();
    console.log(this.state)

    axios.post('https://mobw0zmhde.execute-api.ap-southeast-1.amazonaws.com/staging/storePlayerDetails', this.state)
      .then(res => {
        console.log(res)
        window.location.assign('/congratulation');

      })

  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }


  render() {
    console.log(this.props.cureentObj)


    const { loading } = this.state;
    var point_earned = this.props.point;
    var obj = this.props.obj;
    var currentQuestion = this.props.currentQuestion;
    //console.log(currentQuestion);
    var Questions = obj;
    var selected = this.props.selectedValue;
    var multi_select_value = this.props.multi_select_value;
    //console.log(selected)
    const { name, number } = this.state
    var congo = false;

    console.log('check', option1)



    if (loading) { // if your component doesn't have to wait for async data, remove this block 


      return (
        <div
          style={{
            height: "100vh",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            overflow: 'hidden auto',
            backgroundImage: `url(${BackgroundYellow})`,
          }}
        >
          <div style={{
            textAlign: "center",
            fontWeight: "bold",
            color: "#1B164E",
            fontFamily: "Oswald",
            width: "auto",
            fontSize: "20px",
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)',

          }}>
            <p>Loading Questions..</p>
          </div>
        </div>
      ); // render null when app is not ready
    }






    if (obj.length > 0) {


      var option1 = (obj[currentQuestion].option_list);
      var survey_id = (obj[currentQuestion].survey_id);
      var question_id = obj[currentQuestion]["id"]
      var store1 = (JSON.parse(option1))

      console.log('check', survey_id)
      localStorage.setItem('newsurveyid', survey_id)


      if (obj[currentQuestion].secondary_type == "Radio") {
        // console.log(obj)
        var Q_number = currentQuestion;
        return (
          <div>
            <div
              style={{
                backgroundImage: `url(${BackgroundYellow})`,
                height: "100vh",
                backgroundSize: "cover",
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px', verticalAlign: 'middle' }}>
                <div>
                  <img src={Quizking_logo} style={{ height: '100px', width: '80px', marginBottom: '10px' }} alt='' />
                </div>
              </div>

              {
                obj.map((id, index) => {
                  if (index === Q_number) {
                    index = index + 1;
                    index = (100 * index) / Questions.length
                    console.log(index);

                    return (
                      <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        backgroundColor: '#502499',
                        paddingTop: '5px',
                        marginLeft: '30px',
                        marginRight: '30px',
                        marginBottom: '20px',
                        paddingRight: '65px',
                        justifyContent: 'space-evenly',
                        height: '40px',

                      }}>
                        <div className="progressBar" style={{
                          paddingRight: '5px',
                          height: '30px',
                          paddingLeft: '65px'

                        }}>

                          <div className="container_progressbar">
                            <div className="progress progress-striped">
                              <div className="progress-bar" style={{
                                width: `${index}%`

                              }}>

                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <p style={{
                            backgroundColor: '#FFFD00',
                            width: '60px',
                            height: '30px',
                            textAlign: 'center',
                            fontFamily: 'Oswald',
                            fontWeight: 'bold'

                          }}>{index.toFixed(2)}%</p>
                        </div>
                      </div>
                    )
                  }
                })
              }


              <div className="questionAnsContainer" style={{
                display: 'flex',
                backgroundColor: '#1B164E',
                marginLeft: '50px',
                marginRight: '50px',
                flexDirection: 'column',
                height: 'auto',
                borderTopLeftRadius: '10px',
                borderTopRightRadius: '10px',
              }}>
                <p
                  style={{
                    color: "#fff",
                    textAlign: "left",
                    padding: "8px",
                    fontFamily: 'Oswald',
                    fontSize: '18px',
                    width: 'auto',
                  }}
                >
                  Q{Q_number + 1}. {obj[currentQuestion].question}
                </p>
                <div className="options">
                  <div>
                    <form onSubmit={(e) => this.props.submit}>
                      {
                        Object.entries(store1).map(([key, value]) => {
                          return (
                            <div>
                              <div className="radio_container">
                                <label className="radio_label">
                                  <input
                                    type="radio"
                                    name="radio"
                                    onClick={this.props.handle}
                                    value={value}
                                    id={"selected_answer" + question_id}
                                    question_id={question_id}
                                    checked={this.props.selected_answer_list[question_id] === value ? true : false}
                                  />
                                  <span className="checkmark">{value}</span>
                                </label>
                              </div>
                            </div>
                          )
                        })
                      }
                    </form>
                  </div>
                </div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginRight: '50px',
                marginLeft: '50px',
                marginTop: '10px'
              }}>
                {currentQuestion === 0 ? (
                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      boxShadow: `1px 1px 1px black`,
                      color: "#99A3A4",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}
                  >
                    back
                  </button>
                ) : (
                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "5px",
                      fontWeight: "bold",
                      //color: "#fff",
                      color: "#99A3A4",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}
                    //onClick={this.props.prevQuestion}
                    id="prevQuestion">
                    back
                  </button>

                )
                }


                {currentQuestion == Questions.length - 1 ? (
                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "5px",
                      fontWeight: "bold",
                      color: "#fff",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}
                    onClick={this.props.submit}
                    id="nextQuestion"
                  >
                    Finish Survey
                  </button>
                ) : this.props.selected_answer_list[question_id] ? (

                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      boxShadow: `1px 1px 1px black`,
                      color: "#fff",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}
                    onClick={this.props.nextQuestion}
                    id="nextQuestion"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      boxShadow: `1px 1px 1px black`,
                      color: "#99A3A4",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}

                  >
                    Select Answer First
                  </button>

                )
                }

              </div>
            </div>
          </div>

        );
      } else if (obj[currentQuestion].secondary_type == "textInput") {
        var Q_number = currentQuestion;
        return (
          <div>
            <div
              style={{
                backgroundImage: `url(${BackgroundYellow})`,
                height: "100vh",
                backgroundSize: "cover",
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px', verticalAlign: 'middle' }}>
                <div>
                  <img src={Quizking_logo} style={{ height: '100px', width: '80px', marginBottom: '10px' }} alt='' />
                </div>
              </div>

              {
                obj.map((id, index) => {
                  if (index === Q_number) {
                    index = index + 1;
                    index = (100 * index) / Questions.length
                    console.log(index);

                    return (
                      <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        backgroundColor: '#502499',
                        paddingTop: '5px',
                        marginLeft: '50px',
                        marginRight: '50px',
                        marginBottom: '20px',
                        paddingRight: '65px',
                        justifyContent: 'space-evenly',
                        height: '40px',

                      }}>
                        <div className="progressBar" style={{
                          paddingRight: '5px',
                          height: '30px',
                          paddingLeft: '65px'

                        }}>

                          <div className="container_progressbar">
                            <div className="progress progress-striped">
                              <div className="progress-bar" style={{
                                width: `${index}%`

                              }}>

                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <p style={{
                            backgroundColor: '#FFFD00',
                            width: '60px',
                            height: '30px',
                            textAlign: 'center',
                            fontFamily: 'Oswald',
                            fontWeight: 'bold'

                          }}>{index.toFixed(2)}%</p>
                        </div>
                      </div>
                    )
                  }
                })
              }


              <div className="questionAnsContainer" style={{
                display: 'flex',
                backgroundColor: '#1B164E',
                marginLeft: '50px',
                marginRight: '50px',
                flexDirection: 'column',
                height: 'auto',
                borderTopLeftRadius: '10px',
                borderTopRightRadius: '10px',
              }}>
                <p
                  style={{
                    color: "#fff",
                    textAlign: "left",
                    padding: "8px",
                    fontFamily: 'Oswald',
                    fontSize: '18px',
                    width: 'auto',
                  }}
                >
                  Q{Q_number + 1}. {obj[currentQuestion].question}
                </p>

                <div className="textInput">
                  <form onSubmit={(e) => this.props.submit}>
                    <textarea className="form-field-text"
                      style={{
                        width: '100%',
                        height: '200px',
                        fontFamily: 'Oswald',
                        backgroundColor: '#502499',
                        color: 'white'
                      }}
                      onChange={this.props.handle}
                      id={"selected_answer" + question_id}
                      question_id={question_id}
                      placeholder="Write Your Answer Here..."
                      type="text"
                    ></textarea>
                  </form>
                </div>
              </div>


              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginRight: '50px',
                marginLeft: '50px',
                marginTop: '10px'
              }}>
                {currentQuestion === 0 ? (
                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      boxShadow: `1px 1px 1px black`,
                      color: "#99A3A4",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}
                  >
                    back
                  </button>
                ) : (
                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "5px",
                      fontWeight: "bold",
                      // color: "#fff",
                      color: "#99A3A4",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}
                    //  onClick={this.props.prevQuestion}
                    id="prevQuestion">
                    back
                  </button>

                )
                }


                {currentQuestion == Questions.length - 1 ? (
                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "5px",
                      fontWeight: "bold",
                      color: "#fff",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}
                    onClick={this.props.submit}
                    id="nextQuestion"
                  >
                    Finish Survey
                  </button>
                ) : this.props.selected_answer_list[question_id] ? (

                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      boxShadow: `1px 1px 1px black`,
                      color: "#fff",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}
                    onClick={this.props.nextQuestion}
                    id="nextQuestion"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      boxShadow: `1px 1px 1px black`,
                      color: "#99A3A4",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}

                  >
                    Select Answer First
                  </button>

                )
                }

              </div>
            </div>
          </div>


        );
      } else if (obj[currentQuestion].secondary_type == "CheckBox") {
        var Q_number = currentQuestion;
        return (
          <div>
            <div
              style={{
                backgroundImage: `url(${BackgroundYellow})`,
                height: "100vh",
                backgroundSize: "cover",
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px', verticalAlign: 'middle' }}>
                <div>
                  <img src={Quizking_logo} style={{ height: '100px', width: '80px', marginBottom: '10px' }} alt='' />
                </div>
              </div>

              {
                obj.map((id, index) => {
                  if (index === Q_number) {
                    index = index + 1;
                    index = (100 * index) / Questions.length
                    console.log(index);

                    return (
                      <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        backgroundColor: '#502499',
                        paddingTop: '5px',
                        marginLeft: '50px',
                        marginRight: '50px',
                        marginBottom: '20px',
                        paddingRight: '65px',
                        justifyContent: 'space-evenly',
                        height: '40px',

                      }}>
                        <div className="progressBar" style={{
                          paddingRight: '5px',
                          height: '30px',
                          paddingLeft: '65px'

                        }}>

                          <div className="container_progressbar">
                            <div className="progress progress-striped">
                              <div className="progress-bar" style={{
                                width: `${index}%`

                              }}>

                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <p style={{
                            backgroundColor: '#FFFD00',
                            width: '60px',
                            height: '30px',
                            textAlign: 'center',
                            fontFamily: 'Oswald',
                            fontWeight: 'bold'

                          }}>{index.toFixed(2)}%</p>
                        </div>
                      </div>
                    )
                  }
                })
              }


              <div className="questionAnsContainer" style={{
                display: 'flex',
                backgroundColor: '#1B164E',
                marginLeft: '50px',
                marginRight: '50px',
                flexDirection: 'column',
                height: 'auto',
                borderTopLeftRadius: '10px',
                borderTopRightRadius: '10px',
              }}>
                <p
                  style={{
                    color: "#fff",
                    textAlign: "left",
                    padding: "8px",
                    fontFamily: 'Oswald',
                    fontSize: '18px',
                    width: 'auto',
                  }}
                >
                  Q{Q_number + 1}. {obj[currentQuestion].question}
                </p>
                <div className="options">
                  <div>
                    <form onSubmit={(e) => this.props.submit}>
                      {
                        Object.entries(store1).map(([key, value]) => {
                          return (
                            <div>
                              <div className="checkbox_container">
                                <label className="container-checkbox">{value}
                                  <input
                                    type="checkbox"
                                    name="multi_selected_value"
                                    onClick={this.props.handle}
                                    value={value}
                                    id={"selected_answer" + question_id}
                                    question_id={question_id}
                                    checked={this.props.checkbocs[question_id] && this.props.checkbocs[question_id][value]}

                                  />

                                  <span class="checkboxmark"></span>
                                </label>
                              </div>
                            </div>
                          )
                        })
                      }

                    </form>
                  </div>
                </div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginRight: '50px',
                marginLeft: '50px',
                marginTop: '10px'
              }}>
                {currentQuestion === 0 ? (
                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      boxShadow: `1px 1px 1px black`,
                      color: "#99A3A4",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}
                  >
                    back
                  </button>
                ) : (
                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "5px",
                      fontWeight: "bold",
                      color: "#fff",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}
                    onClick={this.props.prevQuestion}
                    id="prevQuestion">
                    back
                  </button>

                )
                }


                {currentQuestion == Questions.length - 1 ? (
                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "5px",
                      fontWeight: "bold",
                      color: "#fff",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}
                    onClick={this.props.submit}
                    id="nextQuestion"
                  >
                    Finish Survey
                  </button>
                ) : this.props.selected_answer_list[question_id] ? (

                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      boxShadow: `1px 1px 1px black`,
                      color: "#fff",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}
                    onClick={this.props.nextQuestion}
                    id="nextQuestion"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      boxShadow: `1px 1px 1px black`,
                      color: "#99A3A4",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}

                  >
                    Select Answer First
                  </button>

                )
                }

              </div>
            </div>
          </div>
        );
      } else if (Questions[currentQuestion].secondary_type == "Scale") {
        var Q_number = currentQuestion;
        return (
          <div>
            <div
              style={{
                backgroundImage: `url(${BackgroundYellow})`,
                height: "100vh",
                backgroundSize: "cover",
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px', verticalAlign: 'middle' }}>
                <div>
                  <img src={Quizking_logo} style={{ height: '100px', width: '80px', marginBottom: '10px' }} alt='' />
                </div>
              </div>

              {
                obj.map((id, index) => {
                  if (index === Q_number) {
                    index = index + 1;
                    index = (100 * index) / Questions.length
                    console.log(index);

                    return (
                      <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        backgroundColor: '#502499',
                        paddingTop: '5px',
                        marginLeft: '50px',
                        marginRight: '50px',
                        marginBottom: '20px',
                        paddingRight: '65px',
                        justifyContent: 'space-evenly',
                        height: '40px',

                      }}>
                        <div className="progressBar" style={{
                          paddingRight: '5px',
                          height: '30px',
                          paddingLeft: '65px'

                        }}>

                          <div className="container_progressbar">
                            <div className="progress progress-striped">
                              <div className="progress-bar" style={{
                                width: `${index}%`

                              }}>

                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <p style={{
                            backgroundColor: '#FFFD00',
                            width: '60px',
                            height: '30px',
                            textAlign: 'center',
                            fontFamily: 'Oswald',
                            fontWeight: 'bold'

                          }}>{index.toFixed(2)}%</p>
                        </div>
                      </div>
                    )
                  }
                })
              }

              <div className="questionAnsContainer" style={{
                display: 'flex',
                backgroundColor: '#1B164E',
                marginLeft: '50px',
                marginRight: '50px',
                flexDirection: 'column',
                height: 'auto',
                borderTopLeftRadius: '10px',
                borderTopRightRadius: '10px',
              }}>
                <p
                  style={{
                    color: "#fff",
                    textAlign: "left",
                    padding: "8px",
                    fontFamily: 'Oswald',
                    fontSize: '18px',
                    width: 'auto',
                  }}
                >
                  Q{Q_number + 1}. {obj[currentQuestion].question}
                </p>



              </div>



              <div
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                  marginTop: "0px",
                  padding: '20px',
                  backgroundColor: '#502499',
                  marginLeft: '50px',
                  marginRight: '50px',
                }}
              >
                <div
                  className="options"
                  style={{
                    backgroundColor: "white",
                    height: "68px",
                    width: "300px",
                    alignItems: "center",
                    borderRadius: "12px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: "20px",
                    }}
                  >
                    <div
                      className="custom-select"
                      style={{ color: "white", marginBottom: "10px" }}
                    >
                      <form onSubmit={(e) => this.props.handle}>
                        <input
                          id={"selected_answer" + question_id}
                          type="range"
                          min="0"
                          max="10"
                          defaultValue="3"
                          step="1"
                          className="slider"
                          onChange={this.props.handle}
                          question_id={question_id}
                        />
                      </form>
                      <span className="custom-arrow" color="#ECEA10"></span>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginRight: '50px',
                marginLeft: '50px',
                marginTop: '10px'
              }}>
                {currentQuestion === 0 ? (
                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      boxShadow: `1px 1px 1px black`,
                      color: "#99A3A4",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}
                  >
                    back
                  </button>
                ) : (
                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "5px",
                      fontWeight: "bold",
                      color: "#fff",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}
                    onClick={this.props.prevQuestion}
                    id="prevQuestion">
                    back
                  </button>

                )
                }


                {currentQuestion == Questions.length - 1 ? (
                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "5px",
                      fontWeight: "bold",
                      color: "#fff",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}
                    onClick={this.props.submit}
                    id="nextQuestion"
                  >
                    Finish Survey
                  </button>
                ) : this.props.selected_answer_list[question_id] ? (

                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      boxShadow: `1px 1px 1px black`,
                      color: "#fff",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}
                    onClick={this.props.nextQuestion}
                    id="nextQuestion"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      boxShadow: `1px 1px 1px black`,
                      color: "#99A3A4",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}

                  >
                    Select Answer First
                  </button>

                )
                }

              </div>
            </div>
          </div>

        );
      } else if (obj[currentQuestion].secondary_type == "Yes-Dependent") {
        // console.log(obj)
        var Q_number = currentQuestion;

        return (
          <div>
            <div
              style={{
                backgroundImage: `url(${BackgroundYellow})`,
                height: "100vh",
                backgroundSize: "cover",
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px', verticalAlign: 'middle' }}>
                <div>
                  <img src={Quizking_logo} style={{ height: '100px', width: '80px', marginBottom: '10px' }} alt='' />
                </div>
              </div>

              {
                obj.map((id, index) => {
                  if (index === Q_number) {
                    index = index + 1;
                    index = (100 * index) / Questions.length
                    console.log(index);

                    return (
                      <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        backgroundColor: '#502499',
                        paddingTop: '5px',
                        marginLeft: '50px',
                        marginRight: '50px',
                        marginBottom: '20px',
                        paddingRight: '65px',
                        justifyContent: 'space-evenly',
                        height: '40px',

                      }}>
                        <div className="progressBar" style={{
                          paddingRight: '5px',
                          height: '30px',
                          paddingLeft: '65px'

                        }}>

                          <div className="container_progressbar">
                            <div className="progress progress-striped">
                              <div className="progress-bar" style={{
                                width: `${index}%`

                              }}>

                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <p style={{
                            backgroundColor: '#FFFD00',
                            width: '60px',
                            height: '30px',
                            textAlign: 'center',
                            fontFamily: 'Oswald',
                            fontWeight: 'bold'

                          }}>{index.toFixed(2)}%</p>
                        </div>
                      </div>
                    )
                  }
                })
              }


              <div className="questionAnsContainer" style={{
                display: 'flex',
                backgroundColor: '#1B164E',
                marginLeft: '50px',
                marginRight: '50px',
                flexDirection: 'column',
                height: 'auto',
                borderTopLeftRadius: '10px',
                borderTopRightRadius: '10px',
              }}>
                <p
                  style={{
                    color: "#fff",
                    textAlign: "left",
                    padding: "8px",
                    fontFamily: 'Oswald',
                    fontSize: '18px',
                    width: 'auto',
                  }}
                >
                  Q{Q_number + 1}. {obj[currentQuestion].question}
                </p>
                <div className="options">
                  <div>
                    <form onSubmit={(e) => this.props.submit}>
                      <div>
                        <div className="radio_container">
                          <label class="radio_label">
                            <input
                              type="radio"
                              name="radio"
                              onClick={this.props.handle}
                              value={store1["option1"]}
                              id={"selected_answer" + question_id}
                              question_id={question_id}
                              checked={this.props.selected_answer_list[question_id] === store1["option1"] ? true : false}

                            />
                            <span class="checkmark">{store1["option1"]}</span>
                          </label>
                        </div>
                        <div className="radio_container">
                          <label class="radio_label">
                            <input
                              type="radio"
                              name="radio"
                              onClick={this.props.handle}
                              value={store1["option2"]}
                              id={"selected_answer" + question_id}
                              question_id={question_id}
                              checked={this.props.selected_answer_list[question_id] === store1["option2"] ? true : false}


                            />
                            <span class="checkmark">{store1["option2"]}</span>
                          </label>
                        </div>

                      </div>




                    </form>
                  </div>
                </div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginRight: '50px',
                marginLeft: '50px',
                marginTop: '10px'
              }}>
                {currentQuestion === 0 ? (
                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      boxShadow: `1px 1px 1px black`,
                      color: "#99A3A4",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}
                  >
                    back
                  </button>
                ) : (
                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "5px",
                      fontWeight: "bold",
                      color: "#fff",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}
                    onClick={this.props.prevQuestion}
                    id="prevQuestion">
                    back
                  </button>

                )
                }


                {currentQuestion == Questions.length - 1 ? (
                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "5px",
                      fontWeight: "bold",
                      color: "#fff",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}
                    onClick={this.props.submit}
                    id="nextQuestion"
                  >
                    Finish Survey
                  </button>
                ) : this.props.selected_answer_list[question_id] === "হ্যাঁ" ? (

                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      boxShadow: `1px 1px 1px black`,
                      color: "#fff",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}
                    onClick={this.props.nextQuestion}
                    id="nextQuestion"
                  >
                    Next
                  </button>
                ) : this.props.selected_answer_list[question_id] === "না" ? (
                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      boxShadow: `1px 1px 1px black`,
                      color: "white",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}
                    onClick={this.props.submit}
                    id="nextQuestion"

                  >
                    Finish Survey
                  </button>

                )

                  : (
                    <button
                      style={{
                        textAlign: "center",
                        backgroundColor: "#1B164E",
                        padding: "11px",
                        borderRadius: "10px",
                        fontWeight: "bold",
                        boxShadow: `1px 1px 1px black`,
                        color: "#99A3A4",
                        fontFamily: "Oswald",
                        width: "auto",
                        marginTop: "10px",
                        border: 'solid #1B164E'
                      }}

                    >
                      Select Answer First
                    </button>

                  )
                }

              </div>
            </div>
          </div>

        );
      } else if (obj[currentQuestion].secondary_type == "No-Dependent") {
        // console.log(obj)
        var Q_number = currentQuestion;

        return (
          <div>
            <div
              style={{
                backgroundImage: `url(${BackgroundYellow})`,
                height: "100vh",
                backgroundSize: "cover",
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px', verticalAlign: 'middle' }}>
                <div>
                  <img src={Quizking_logo} style={{ height: '100px', width: '80px', marginBottom: '10px' }} alt='' />
                </div>
              </div>

              {
                obj.map((id, index) => {
                  if (index === Q_number) {
                    index = index + 1;
                    index = (100 * index) / Questions.length
                    console.log(index);

                    return (
                      <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        backgroundColor: '#502499',
                        paddingTop: '5px',
                        marginLeft: '50px',
                        marginRight: '50px',
                        marginBottom: '20px',
                        paddingRight: '65px',
                        justifyContent: 'space-evenly',
                        height: '40px',

                      }}>
                        <div className="progressBar" style={{
                          paddingRight: '5px',
                          height: '30px',
                          paddingLeft: '65px'

                        }}>

                          <div className="container_progressbar">
                            <div className="progress progress-striped">
                              <div className="progress-bar" style={{
                                width: `${index}%`

                              }}>

                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <p style={{
                            backgroundColor: '#FFFD00',
                            width: '60px',
                            height: '30px',
                            textAlign: 'center',
                            fontFamily: 'Oswald',
                            fontWeight: 'bold'

                          }}>{index.toFixed(2)}%</p>
                        </div>
                      </div>
                    )
                  }
                })
              }


              <div className="questionAnsContainer" style={{
                display: 'flex',
                backgroundColor: '#1B164E',
                marginLeft: '50px',
                marginRight: '50px',
                flexDirection: 'column',
                height: 'auto',
                borderTopLeftRadius: '10px',
                borderTopRightRadius: '10px',
              }}>
                <p
                  style={{
                    color: "#fff",
                    textAlign: "left",
                    padding: "8px",
                    fontFamily: 'Oswald',
                    fontSize: '18px',
                    width: 'auto',
                  }}
                >
                  Q{Q_number + 1}. {obj[currentQuestion].question}
                </p>
                <div className="options">
                  <div>
                    <form onSubmit={(e) => this.props.submit}>
                      <div>
                        <div className="radio_container">
                          <label class="radio_label">
                            <input
                              type="radio"
                              name="radio"
                              onClick={this.props.handle}
                              value={store1["option1"]}
                              id={"selected_answer" + question_id}
                              question_id={question_id}
                              checked={this.props.selected_answer_list[question_id] === store1["option1"] ? true : false}

                            />
                            <span class="checkmark">{store1["option1"]}</span>
                          </label>
                        </div>
                        <div className="radio_container">
                          <label class="radio_label">
                            <input
                              type="radio"
                              name="radio"
                              onClick={this.props.handle}
                              value={store1["option2"]}
                              id={"selected_answer" + question_id}
                              question_id={question_id}
                              checked={this.props.selected_answer_list[question_id] === store1["option2"] ? true : false}


                            />
                            <span class="checkmark">{store1["option2"]}</span>
                          </label>
                        </div>

                      </div>




                    </form>
                  </div>
                </div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginRight: '50px',
                marginLeft: '50px',
                marginTop: '10px'
              }}>
                {currentQuestion === 0 ? (
                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      boxShadow: `1px 1px 1px black`,
                      color: "#99A3A4",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}
                  >
                    back
                  </button>
                ) : (
                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "5px",
                      fontWeight: "bold",
                      color: "#fff",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}
                    onClick={this.props.prevQuestion}
                    id="prevQuestion">
                    back
                  </button>

                )
                }


                {currentQuestion == Questions.length - 1 ? (
                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "5px",
                      fontWeight: "bold",
                      color: "#fff",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}
                    onClick={this.props.submit}
                    id="nextQuestion"
                  >
                    Finish Survey
                  </button>
                ) : this.props.selected_answer_list[question_id] === "না" ? (

                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      boxShadow: `1px 1px 1px black`,
                      color: "#fff",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}
                    onClick={this.props.nextQuestion}
                    id="nextQuestion"
                  >
                    Next
                  </button>
                ) : this.props.selected_answer_list[question_id] === "হ্যাঁ" ? (
                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      boxShadow: `1px 1px 1px black`,
                      color: "white",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}
                    onClick={this.props.submit}
                    id="nextQuestion"

                  >
                    Finish Survey
                  </button>

                )

                  : (
                    <button
                      style={{
                        textAlign: "center",
                        backgroundColor: "#1B164E",
                        padding: "11px",
                        borderRadius: "10px",
                        fontWeight: "bold",
                        boxShadow: `1px 1px 1px black`,
                        color: "#99A3A4",
                        fontFamily: "Oswald",
                        width: "auto",
                        marginTop: "10px",
                        border: 'solid #1B164E'
                      }}

                    >
                      Select Answer First
                    </button>

                  )
                }

              </div>
            </div>
          </div>

        );

      } else if (obj[currentQuestion].secondary_type == "CheckBoxText") {
        var Q_number = currentQuestion;
        return (
          <div>
            <div
              style={{
                backgroundImage: `url(${BackgroundYellow})`,
                height: "100vh",
                backgroundSize: "cover",
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px', verticalAlign: 'middle' }}>
                <div>
                  <img src={Quizking_logo} style={{ height: '100px', width: '80px', marginBottom: '10px' }} alt='' />
                </div>
              </div>

              {
                obj.map((id, index) => {
                  if (index === Q_number) {
                    index = index + 1;
                    index = (100 * index) / Questions.length
                    console.log(index);

                    return (
                      <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        backgroundColor: '#502499',
                        paddingTop: '5px',
                        marginLeft: '50px',
                        marginRight: '50px',
                        marginBottom: '20px',
                        paddingRight: '65px',
                        justifyContent: 'space-evenly',
                        height: '40px',

                      }}>
                        <div className="progressBar" style={{
                          paddingRight: '5px',
                          height: '30px',
                          paddingLeft: '65px'

                        }}>

                          <div className="container_progressbar">
                            <div className="progress progress-striped">
                              <div className="progress-bar" style={{
                                width: `${index}%`

                              }}>

                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <p style={{
                            backgroundColor: '#FFFD00',
                            width: '60px',
                            height: '30px',
                            textAlign: 'center',
                            fontFamily: 'Oswald',
                            fontWeight: 'bold'

                          }}>{index.toFixed(2)}%</p>
                        </div>
                      </div>
                    )
                  }
                })
              }


              <div className="questionAnsContainer" style={{
                display: 'flex',
                backgroundColor: '#1B164E',
                marginLeft: '50px',
                marginRight: '50px',
                flexDirection: 'column',
                height: 'auto',
                borderTopLeftRadius: '10px',
                borderTopRightRadius: '10px',
              }}>
                <p
                  style={{
                    color: "#fff",
                    textAlign: "left",
                    padding: "8px",
                    fontFamily: 'Oswald',
                    fontSize: '18px',
                    width: 'auto',
                  }}
                >
                  Q{Q_number + 1}. {obj[currentQuestion].question}
                </p>
                <div className="options">
                  <div>
                    <form onSubmit={(e) => this.props.submit}>
                      {
                        Object.entries(store1).map(([key, value]) => {
                          return (
                            <div>

                              {
                                (value === "Other") ? (
                                  <div className="checkbox_container">
                                    <label>
                                      <input
                                        type='text'
                                        typeof="SpecialCaseforOther"
                                        onChange={this.props.handleForInputField}
                                        id={"selected_answer" + question_id}
                                        question_id={question_id}
                                        placeholder='other'
                                      //value={this.props.handle}
                                      //defaultValue='213'
                                      />
                                    </label>
                                    <input
                                      type="checkbox"
                                      typeof="SpecialCaseforOther"
                                      name="multi_selected_value"
                                      onClick={this.props.handle}
                                      value={value}
                                      id={"selected_answer" + question_id}
                                      question_id={question_id}
                                      checked={this.props.checkbocs[question_id] && this.props.checkbocs[question_id][value]}
                                    />

                                    <span class="checkboxmark"></span>
                                  </div>


                                ) : (
                                  <div className="checkbox_container">
                                    <label className="container-checkbox">{value}
                                      <input
                                        type="checkbox"
                                        name="multi_selected_value"
                                        onClick={this.props.handle}
                                        value={value}
                                        id={"selected_answer" + question_id}
                                        question_id={question_id}
                                        checked={this.props.checkbocs[question_id] && this.props.checkbocs[question_id][value]}
                                      />
                                      <span class="checkboxmark"></span>
                                    </label>
                                  </div>
                                )
                              }



                            </div>
                          )
                        })
                      }

                    </form>
                  </div>
                </div>
              </div >

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginRight: '50px',
                marginLeft: '50px',
                marginTop: '10px'
              }}>
                {currentQuestion === 0 ? (
                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      boxShadow: `1px 1px 1px black`,
                      color: "#99A3A4",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}
                  >
                    back
                  </button>
                ) : (
                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "5px",
                      fontWeight: "bold",
                      color: "#fff",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}
                    onClick={this.props.prevQuestion}
                    id="prevQuestion">
                    back
                  </button>

                )
                }


                {currentQuestion == Questions.length - 1 ? (
                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "5px",
                      fontWeight: "bold",
                      color: "#fff",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}
                    onClick={this.props.submit}
                    id="nextQuestion"
                  >
                    Finish Survey
                  </button>
                ) : this.props.selected_answer_list[question_id] ? (

                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      boxShadow: `1px 1px 1px black`,
                      color: "#fff",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}
                    onClick={this.props.nextQuestion}
                    id="nextQuestion"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      boxShadow: `1px 1px 1px black`,
                      color: "#99A3A4",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}

                  >
                    Select Answer First
                  </button>

                )
                }

              </div>
            </div >
          </div >
        );
      } else if (obj[currentQuestion].secondary_type == "numberInput") {
        var Q_number = currentQuestion;
        return (
          <div>
            <div
              style={{
                backgroundImage: `url(${BackgroundYellow})`,
                height: "100vh",
                backgroundSize: "cover",
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px', verticalAlign: 'middle' }}>
                <div>
                  <img src={Quizking_logo} style={{ height: '100px', width: '80px', marginBottom: '10px' }} alt='' />
                </div>
              </div>

              {
                obj.map((id, index) => {
                  if (index === Q_number) {
                    index = index + 1;
                    index = (100 * index) / Questions.length
                    console.log(index);

                    return (
                      <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        backgroundColor: '#502499',
                        paddingTop: '5px',
                        marginLeft: '50px',
                        marginRight: '50px',
                        marginBottom: '20px',
                        paddingRight: '65px',
                        justifyContent: 'space-evenly',
                        height: '40px',

                      }}>
                        <div className="progressBar" style={{
                          paddingRight: '5px',
                          height: '30px',
                          paddingLeft: '65px'

                        }}>

                          <div className="container_progressbar">
                            <div className="progress progress-striped">
                              <div className="progress-bar" style={{
                                width: `${index}%`

                              }}>

                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <p style={{
                            backgroundColor: '#FFFD00',
                            width: '60px',
                            height: '30px',
                            textAlign: 'center',
                            fontFamily: 'Oswald',
                            fontWeight: 'bold'

                          }}>{index.toFixed(2)}%</p>
                        </div>
                      </div>
                    )
                  }
                })
              }


              <div className="questionAnsContainer" style={{
                display: 'flex',
                backgroundColor: '#1B164E',
                marginLeft: '50px',
                marginRight: '50px',
                flexDirection: 'column',
                height: 'auto',
                borderTopLeftRadius: '10px',
                borderTopRightRadius: '10px',
              }}>
                <p
                  style={{
                    color: "#fff",
                    textAlign: "left",
                    padding: "8px",
                    fontFamily: 'Oswald',
                    fontSize: '18px',
                    width: 'auto',
                  }}
                >
                  Q{Q_number + 1}. {obj[currentQuestion].question}
                </p>

                <div className="textInput">
                  <form onSubmit={(e) => this.props.submit}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#502499', padding: '20px' }}>
                      <input style={{ backgroundColor: '#ECEA10', padding: '15px', borderRadius: '10px', borderColor: "#ECEA10", fontWeight: 'bold', fontFamily: 'Oswald' }}
                        type='number'
                        onChange={this.props.handle}
                        id={"selected_answer" + question_id}
                        question_id={question_id}
                        placeholder='Phone Number'

                      />

                    </div>
                  </form>
                </div>
              </div>


              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginRight: '50px',
                marginLeft: '50px',
                marginTop: '10px'
              }}>
                {currentQuestion === 0 ? (
                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      boxShadow: `1px 1px 1px black`,
                      color: "#99A3A4",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}
                  >
                    back
                  </button>
                ) : (
                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "5px",
                      fontWeight: "bold",
                      color: "#fff",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}
                    onClick={this.props.prevQuestion}
                    id="prevQuestion">
                    back
                  </button>

                )
                }


                {currentQuestion == Questions.length - 1 ? (
                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "5px",
                      fontWeight: "bold",
                      color: "#fff",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}
                    onClick={this.props.submit}
                    id="nextQuestion"
                  >
                    Finish Survey
                  </button>
                ) : this.props.selected_answer_list[question_id] ? (

                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      boxShadow: `1px 1px 1px black`,
                      color: "#fff",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}
                    onClick={this.props.nextQuestion}
                    id="nextQuestion"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      boxShadow: `1px 1px 1px black`,
                      color: "#99A3A4",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}

                  >
                    Select Answer First
                  </button>

                )
                }

              </div>
            </div>
          </div>


        );
      } else if (obj[currentQuestion].secondary_type == "SpecialYes") {
        // console.log(obj)
        var Q_number = currentQuestion;

        return (
          <div>
            <div
              style={{
                backgroundImage: `url(${BackgroundYellow})`,
                height: "100vh",
                backgroundSize: "cover",
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px', verticalAlign: 'middle' }}>
                <div>
                  <img src={Quizking_logo} style={{ height: '100px', width: '80px', marginBottom: '10px' }} alt='' />
                </div>
              </div>

              {
                obj.map((id, index) => {
                  if (index === Q_number) {
                    index = index + 1;
                    index = (100 * index) / Questions.length
                    console.log(index);

                    return (
                      <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        backgroundColor: '#502499',
                        paddingTop: '5px',
                        marginLeft: '50px',
                        marginRight: '50px',
                        marginBottom: '20px',
                        paddingRight: '65px',
                        justifyContent: 'space-evenly',
                        height: '40px',

                      }}>
                        <div className="progressBar" style={{
                          paddingRight: '5px',
                          height: '30px',
                          paddingLeft: '65px'

                        }}>

                          <div className="container_progressbar">
                            <div className="progress progress-striped">
                              <div className="progress-bar" style={{
                                width: `${index}%`

                              }}>

                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <p style={{
                            backgroundColor: '#FFFD00',
                            width: '60px',
                            height: '30px',
                            textAlign: 'center',
                            fontFamily: 'Oswald',
                            fontWeight: 'bold'

                          }}>{index.toFixed(2)}%</p>
                        </div>
                      </div>
                    )
                  }
                })
              }


              <div className="questionAnsContainer" style={{
                display: 'flex',
                backgroundColor: '#1B164E',
                marginLeft: '50px',
                marginRight: '50px',
                flexDirection: 'column',
                height: 'auto',
                borderTopLeftRadius: '10px',
                borderTopRightRadius: '10px',
              }}>
                <p
                  style={{
                    color: "#fff",
                    textAlign: "left",
                    padding: "8px",
                    fontFamily: 'Oswald',
                    fontSize: '18px',
                    width: 'auto',
                  }}
                >
                  Q{Q_number + 1}. {obj[currentQuestion].question}
                </p>
                <div className="options">
                  <div>
                    <form onSubmit={(e) => this.props.submit}>
                      <div>
                        <div className="radio_container">
                          <label class="radio_label">
                            <input
                              type="radio"
                              name="radio"
                              onClick={this.props.handle}
                              value={store1["option1"]}
                              id={"selected_answer" + question_id}
                              question_id={question_id}
                              checked={this.props.selected_answer_list[question_id] === store1["option1"] ? true : false}

                            />
                            <span class="checkmark">{store1["option1"]}</span>
                          </label>
                        </div>
                        <div className="radio_container">
                          <label class="radio_label">
                            <input
                              type="radio"
                              name="radio"
                              onClick={this.props.handle}
                              value={store1["option2"]}
                              id={"selected_answer" + question_id}
                              question_id={question_id}
                              checked={this.props.selected_answer_list[question_id] === store1["option2"] ? true : false}


                            />
                            <span class="checkmark">{store1["option2"]}</span>
                          </label>
                        </div>

                      </div>




                    </form>
                  </div>
                </div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginRight: '50px',
                marginLeft: '50px',
                marginTop: '10px'
              }}>
                {currentQuestion === 0 ? (
                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      boxShadow: `1px 1px 1px black`,
                      color: "#99A3A4",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}
                  >
                    back
                  </button>
                ) : (
                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "5px",
                      fontWeight: "bold",
                      color: "#fff",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}
                    onClick={this.props.prevQuestion}
                    id="prevQuestion">
                    back
                  </button>

                )
                }


                {currentQuestion == Questions.length - 1 ? (
                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "5px",
                      fontWeight: "bold",
                      color: "#fff",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}
                    onClick={this.props.submit}
                    id="nextQuestion"
                  >
                    Finish Survey
                  </button>
                ) : this.props.selected_answer_list[question_id] === "হ্যাঁ" ? (

                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      boxShadow: `1px 1px 1px black`,
                      color: "#fff",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}
                    onClick={this.props.nextQuestionforFirst}
                    id="nextQuestionforFirst"
                  >
                    Next
                  </button>
                ) : this.props.selected_answer_list[question_id] === "না" ? (
                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      boxShadow: `1px 1px 1px black`,
                      color: "white",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}
                    onClick={this.props.nextQuestion}
                    id="nextQuestion"

                  >
                    Next
                  </button>

                )

                  : (
                    <button
                      style={{
                        textAlign: "center",
                        backgroundColor: "#1B164E",
                        padding: "11px",
                        borderRadius: "10px",
                        fontWeight: "bold",
                        boxShadow: `1px 1px 1px black`,
                        color: "#99A3A4",
                        fontFamily: "Oswald",
                        width: "auto",
                        marginTop: "10px",
                        border: 'solid #1B164E'
                      }}

                    >
                      Select Answer First
                    </button>

                  )
                }

              </div>
            </div>
          </div>

        );
      } else if (obj[currentQuestion].secondary_type == "SecondSpecialYes") {
        // console.log(obj)
        var Q_number = currentQuestion;

        return (
          <div>
            <div
              style={{
                backgroundImage: `url(${BackgroundYellow})`,
                height: "100vh",
                backgroundSize: "cover",
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px', verticalAlign: 'middle' }}>
                <div>
                  <img src={Quizking_logo} style={{ height: '100px', width: '80px', marginBottom: '10px' }} alt='' />
                </div>
              </div>

              {
                obj.map((id, index) => {
                  if (index === Q_number) {
                    index = index + 1;
                    index = (100 * index) / Questions.length
                    console.log(index);

                    return (
                      <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        backgroundColor: '#502499',
                        paddingTop: '5px',
                        marginLeft: '50px',
                        marginRight: '50px',
                        marginBottom: '20px',
                        paddingRight: '65px',
                        justifyContent: 'space-evenly',
                        height: '40px',

                      }}>
                        <div className="progressBar" style={{
                          paddingRight: '5px',
                          height: '30px',
                          paddingLeft: '65px'

                        }}>

                          <div className="container_progressbar">
                            <div className="progress progress-striped">
                              <div className="progress-bar" style={{
                                width: `${index}%`

                              }}>

                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <p style={{
                            backgroundColor: '#FFFD00',
                            width: '60px',
                            height: '30px',
                            textAlign: 'center',
                            fontFamily: 'Oswald',
                            fontWeight: 'bold'

                          }}>{index.toFixed(2)}%</p>
                        </div>
                      </div>
                    )
                  }
                })
              }


              <div className="questionAnsContainer" style={{
                display: 'flex',
                backgroundColor: '#1B164E',
                marginLeft: '50px',
                marginRight: '50px',
                flexDirection: 'column',
                height: 'auto',
                borderTopLeftRadius: '10px',
                borderTopRightRadius: '10px',
              }}>
                <p
                  style={{
                    color: "#fff",
                    textAlign: "left",
                    padding: "8px",
                    fontFamily: 'Oswald',
                    fontSize: '18px',
                    width: 'auto',
                  }}
                >
                  Q{Q_number + 1}. {obj[currentQuestion].question}
                </p>
                <div className="options">
                  <div>
                    <form onSubmit={(e) => this.props.submit}>
                      <div>
                        <div className="radio_container">
                          <label class="radio_label">
                            <input
                              type="radio"
                              name="radio"
                              onClick={this.props.handle}
                              value={store1["option1"]}
                              id={"selected_answer" + question_id}
                              question_id={question_id}
                              checked={this.props.selected_answer_list[question_id] === store1["option1"] ? true : false}

                            />
                            <span class="checkmark">{store1["option1"]}</span>
                          </label>
                        </div>
                        <div className="radio_container">
                          <label class="radio_label">
                            <input
                              type="radio"
                              name="radio"
                              onClick={this.props.handle}
                              value={store1["option2"]}
                              id={"selected_answer" + question_id}
                              question_id={question_id}
                              checked={this.props.selected_answer_list[question_id] === store1["option2"] ? true : false}


                            />
                            <span class="checkmark">{store1["option2"]}</span>
                          </label>
                        </div>

                      </div>




                    </form>
                  </div>
                </div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginRight: '50px',
                marginLeft: '50px',
                marginTop: '10px'
              }}>
                {currentQuestion === 0 ? (
                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      boxShadow: `1px 1px 1px black`,
                      color: "#99A3A4",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}
                  >
                    back
                  </button>
                ) : (
                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "5px",
                      fontWeight: "bold",
                      color: "#fff",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}
                    onClick={this.props.prevQuestion}
                    id="prevQuestion">
                    back
                  </button>

                )
                }


                {currentQuestion == Questions.length - 1 ? (
                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "5px",
                      fontWeight: "bold",
                      color: "#fff",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}
                    onClick={this.props.submit}
                    id="nextQuestion"
                  >
                    Finish Survey
                  </button>
                ) : this.props.selected_answer_list[question_id] === "হ্যাঁ" ? (

                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      boxShadow: `1px 1px 1px black`,
                      color: "#fff",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}
                    onClick={this.props.nextQuestionforSecond}
                    id="nextQuestionforSecond"
                  >
                    Next
                  </button>
                ) : this.props.selected_answer_list[question_id] === "না" ? (
                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      boxShadow: `1px 1px 1px black`,
                      color: "white",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}
                    onClick={this.props.nextQuestion}
                    id="nextQuestion"

                  >
                    Next
                  </button>

                )

                  : (
                    <button
                      style={{
                        textAlign: "center",
                        backgroundColor: "#1B164E",
                        padding: "11px",
                        borderRadius: "10px",
                        fontWeight: "bold",
                        boxShadow: `1px 1px 1px black`,
                        color: "#99A3A4",
                        fontFamily: "Oswald",
                        width: "auto",
                        marginTop: "10px",
                        border: 'solid #1B164E'
                      }}

                    >
                      Select Answer First
                    </button>

                  )
                }

              </div>
            </div>
          </div>

        );
      } else if (obj[currentQuestion].secondary_type == "ThirdSpecialYes") {
        // console.log(obj)
        var Q_number = currentQuestion;

        return (
          <div>
            <div
              style={{
                backgroundImage: `url(${BackgroundYellow})`,
                height: "100vh",
                backgroundSize: "cover",
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px', verticalAlign: 'middle' }}>
                <div>
                  <img src={Quizking_logo} style={{ height: '100px', width: '80px', marginBottom: '10px' }} alt='' />
                </div>
              </div>

              {
                obj.map((id, index) => {
                  if (index === Q_number) {
                    index = index + 1;
                    index = (100 * index) / Questions.length
                    console.log(index);

                    return (
                      <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        backgroundColor: '#502499',
                        paddingTop: '5px',
                        marginLeft: '50px',
                        marginRight: '50px',
                        marginBottom: '20px',
                        paddingRight: '65px',
                        justifyContent: 'space-evenly',
                        height: '40px',

                      }}>
                        <div className="progressBar" style={{
                          paddingRight: '5px',
                          height: '30px',
                          paddingLeft: '65px'

                        }}>

                          <div className="container_progressbar">
                            <div className="progress progress-striped">
                              <div className="progress-bar" style={{
                                width: `${index}%`

                              }}>

                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <p style={{
                            backgroundColor: '#FFFD00',
                            width: '60px',
                            height: '30px',
                            textAlign: 'center',
                            fontFamily: 'Oswald',
                            fontWeight: 'bold'

                          }}>{index.toFixed(2)}%</p>
                        </div>
                      </div>
                    )
                  }
                })
              }


              <div className="questionAnsContainer" style={{
                display: 'flex',
                backgroundColor: '#1B164E',
                marginLeft: '50px',
                marginRight: '50px',
                flexDirection: 'column',
                height: 'auto',
                borderTopLeftRadius: '10px',
                borderTopRightRadius: '10px',
              }}>
                <p
                  style={{
                    color: "#fff",
                    textAlign: "left",
                    padding: "8px",
                    fontFamily: 'Oswald',
                    fontSize: '18px',
                    width: 'auto',
                  }}
                >
                  Q{Q_number + 1}. {obj[currentQuestion].question}
                </p>
                <div className="options">
                  <div>
                    <form onSubmit={(e) => this.props.submit}>
                      <div>
                        <div className="radio_container">
                          <label class="radio_label">
                            <input
                              type="radio"
                              name="radio"
                              onClick={this.props.handle}
                              value={store1["option1"]}
                              id={"selected_answer" + question_id}
                              question_id={question_id}
                              checked={this.props.selected_answer_list[question_id] === store1["option1"] ? true : false}

                            />
                            <span class="checkmark">{store1["option1"]}</span>
                          </label>
                        </div>
                        <div className="radio_container">
                          <label class="radio_label">
                            <input
                              type="radio"
                              name="radio"
                              onClick={this.props.handle}
                              value={store1["option2"]}
                              id={"selected_answer" + question_id}
                              question_id={question_id}
                              checked={this.props.selected_answer_list[question_id] === store1["option2"] ? true : false}


                            />
                            <span class="checkmark">{store1["option2"]}</span>
                          </label>
                        </div>

                      </div>




                    </form>
                  </div>
                </div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginRight: '50px',
                marginLeft: '50px',
                marginTop: '10px'
              }}>
                {currentQuestion === 0 ? (
                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      boxShadow: `1px 1px 1px black`,
                      color: "#99A3A4",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}
                  >
                    back
                  </button>
                ) : (
                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "5px",
                      fontWeight: "bold",
                      // color: "#fff",
                      color: "#99A3A4",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}
                    // onClick={this.props.prevQuestion}
                    id="prevQuestion">
                    back
                  </button>

                )
                }


                {currentQuestion == Questions.length - 1 ? (
                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "5px",
                      fontWeight: "bold",
                      color: "#fff",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}
                    onClick={this.props.submit}
                    id="nextQuestion"
                  >
                    Finish Survey
                  </button>
                ) : this.props.selected_answer_list[question_id] === "হ্যাঁ" ? (

                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      boxShadow: `1px 1px 1px black`,
                      color: "#fff",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}
                    onClick={this.props.nextQuestionforSecond}
                    id="nextQuestionforSecond"
                  >
                    Next
                  </button>
                ) : this.props.selected_answer_list[question_id] === "না" ? (
                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      boxShadow: `1px 1px 1px black`,
                      color: "white",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}
                    onClick={this.props.nextQuestion}
                    id="nextQuestion"

                  >
                    Next
                  </button>

                )

                  : (
                    <button
                      style={{
                        textAlign: "center",
                        backgroundColor: "#1B164E",
                        padding: "11px",
                        borderRadius: "10px",
                        fontWeight: "bold",
                        boxShadow: `1px 1px 1px black`,
                        color: "#99A3A4",
                        fontFamily: "Oswald",
                        width: "auto",
                        marginTop: "10px",
                        border: 'solid #1B164E'
                      }}

                    >
                      Select Answer First
                    </button>

                  )
                }

              </div>
            </div>
          </div>

        );
      } else if (obj[currentQuestion].secondary_type == "SecondSpecialNo") {
        // console.log(obj)
        var Q_number = currentQuestion;

        return (
          <div>
            <div
              style={{
                backgroundImage: `url(${BackgroundYellow})`,
                height: "100vh",
                backgroundSize: "cover",
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px', verticalAlign: 'middle' }}>
                <div>
                  <img src={Quizking_logo} style={{ height: '100px', width: '80px', marginBottom: '10px' }} alt='' />
                </div>
              </div>

              {
                obj.map((id, index) => {
                  if (index === Q_number) {
                    index = index + 1;
                    index = (100 * index) / Questions.length
                    console.log(index);

                    return (
                      <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        backgroundColor: '#502499',
                        paddingTop: '5px',
                        marginLeft: '50px',
                        marginRight: '50px',
                        marginBottom: '20px',
                        paddingRight: '65px',
                        justifyContent: 'space-evenly',
                        height: '40px',

                      }}>
                        <div className="progressBar" style={{
                          paddingRight: '5px',
                          height: '30px',
                          paddingLeft: '65px'

                        }}>

                          <div className="container_progressbar">
                            <div className="progress progress-striped">
                              <div className="progress-bar" style={{
                                width: `${index}%`

                              }}>

                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <p style={{
                            backgroundColor: '#FFFD00',
                            width: '60px',
                            height: '30px',
                            textAlign: 'center',
                            fontFamily: 'Oswald',
                            fontWeight: 'bold'

                          }}>{index.toFixed(2)}%</p>
                        </div>
                      </div>
                    )
                  }
                })
              }


              <div className="questionAnsContainer" style={{
                display: 'flex',
                backgroundColor: '#1B164E',
                marginLeft: '50px',
                marginRight: '50px',
                flexDirection: 'column',
                height: 'auto',
                borderTopLeftRadius: '10px',
                borderTopRightRadius: '10px',
              }}>
                <p
                  style={{
                    color: "#fff",
                    textAlign: "left",
                    padding: "8px",
                    fontFamily: 'Oswald',
                    fontSize: '18px',
                    width: 'auto',
                  }}
                >
                  Q{Q_number + 1}. {obj[currentQuestion].question}
                </p>
                <div className="options">
                  <div>
                    <form onSubmit={(e) => this.props.submit}>
                      {
                        Object.entries(store1).map(([key, value]) => {
                          return (
                            <div>
                              <div className="radio_container">
                                <label className="radio_label">
                                  <input
                                    type="radio"
                                    name="radio"
                                    onClick={this.props.handle}
                                    value={value}
                                    id={"selected_answer" + question_id}
                                    question_id={question_id}
                                    checked={this.props.selected_answer_list[question_id] === value ? true : false}
                                  />
                                  <span className="checkmark">{value}</span>
                                </label>
                              </div>
                            </div>
                          )
                        })
                      }
                    </form>
                  </div>
                </div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginRight: '50px',
                marginLeft: '50px',
                marginTop: '10px'
              }}>
                {currentQuestion === 0 ? (
                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      boxShadow: `1px 1px 1px black`,
                      color: "#99A3A4",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}
                  >
                    back
                  </button>
                ) : (
                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "5px",
                      fontWeight: "bold",
                      //color: "#fff",
                      color: "#99A3A4",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}
                    //onClick={this.props.prevQuestion}
                    id="prevQuestion">
                    back
                  </button>

                )
                }


                {currentQuestion == Questions.length - 1 ? (
                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "5px",
                      fontWeight: "bold",
                      color: "#fff",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}
                    onClick={this.props.submit}
                    id="nextQuestion"
                  >
                    Finish Survey
                  </button>
                ) : this.props.selected_answer_list[question_id] ? (

                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      boxShadow: `1px 1px 1px black`,
                      color: "#fff",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}
                    onClick={this.props.submit}
                    id="submit"
                  >
                    Finish Survey
                  </button>
                ) : (
                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "#1B164E",
                      padding: "11px",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      boxShadow: `1px 1px 1px black`,
                      color: "#99A3A4",
                      fontFamily: "Oswald",
                      width: "auto",
                      marginTop: "10px",
                      border: 'solid #1B164E'
                    }}

                  >
                    Select Answer First
                  </button>

                )
                }

              </div>
            </div>
          </div>

        );
      }

    }


    console.log(congo)



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
        <div style={{ display: "flex", justifyContent: "space-around", paddingTop: '30px' }}>

          <div>
            <h2 style={{ color: '#FF565E', fontFamily: 'Oswald', fontSize: '20px', fontWeight: 'bold' }}>One more step!</h2>
          </div>

        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: "150px", flexDirection: 'column' }}>

          <form onSubmit={this.submit}>
            <div style={{ backgroundColor: '#502499', display: 'flex', flexDirection: 'column', padding: '10px', width: '50vh', borderRadius: "8px", fontFamily: "Oswald", fontWeight: 'bold', borderColor: '#1B164E', borderWidth: '5px', alignItems: 'center' }}>


              <div>
                <p style={{ color: 'white' }}>Please Fill This Out! </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', flexDirection: "column", width: '100%' }}>
                <label style={{ color: 'white' }}> Name :
                  <input
                    style={{
                      margin: '4px',
                      backgroundColor: '#ECEA10',
                      borderWidth: '0px'
                    }}
                    type='text'
                    name="name"
                    value={name}
                    onChange={this.changeHandler}
                  ></input>
                </label>
                <label style={{ color: 'white' }}> Phone Number :
                  <input
                    style={{
                      margin: '4px',
                      backgroundColor: '#ECEA10',
                      borderWidth: '0px'
                    }}
                    type='number'
                    name="number"
                    value={number}
                    onChange={this.changeHandler}

                  >
                  </input>
                </label>

              </div>

              <button style={{ width: 'auto', padding: '4px', borderWidth: '0px', borderRadius: '8px', backgroundColor: '#1B164E', color: 'white' }} type="submit">Submit</button>
            </div>
          </form>

        </div>
        <div style={{
          bottom: '0',
          position: "absolute",
          left: '0',
          right: '0',
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '100%' /* Need a specific value to work */
        }}>
          {/* <div>
            <FooterNew />
          </div> */}


        </div>
      </div>

    )
  }
}

function demoAsyncCall() {
  return new Promise((resolve) => setTimeout(() => resolve(), 2000));
}

export default GetQuestionList;