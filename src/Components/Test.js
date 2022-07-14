import React from 'react';
import BackgroundYellow from "../images/yellow_bg.png";
import QuestionBackground from '../images/design.png';
import { Link } from 'react-router-dom';
import { Radio } from 'antd';

function Test() {
    const check='new'
    const a = 'radio'
    const b = 'new'

    if (check == b) {

        return (
            <div>
                <div style={{ backgroundImage: `url(${BackgroundYellow})`, height: '100vh', backgroundSize: 'cover', }}>
                    <div className="ImageContainer" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                    </div>
                    <div style={{
                        alignItems: "center",
                        backgroundColor: "#453179",
                        position: "absolute",
                        bottom: 0,
                        width: "100%",
                        height: "50%",
                        borderTopLeftRadius: "45px",
                        borderTopRightRadius: "45px",
                        justifyContent: "center",
                        paddingLeft: "70px",
                        paddingRight: "70px",
                        backgroundImage: `url(${QuestionBackground})`,
                        //backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column'
                    }}>
                        <p
                            style={{
                                backgroundColor: "#1B164E",
                                textAlign: "center",
                                padding: "10px",
                                marginTop: "30px",
                                color: "white",
                                borderRadius: "5px",
                                fontFamily: 'KongshoMJ_Regular',
                                fontSize: '20px'
                            }}
                        >
                            Pvwiw`‡K  KuvUvi ‡eZ, gv_vq gyKzU Lvb mv‡ne ?
                        </p>

                        <div>

                            <Radio.Group buttonStyle="solid">

                                <div style={{ alignItems: "center", display: "flex" }}>

                                    <div style={{ paddingBottom: '10px', fontFamily: 'KongshoMJ_Regular', color:'white' }}>
                                        <Radio.Button value="a">ivRv</Radio.Button>
                                    </div>
                                </div>
                                <div style={{ paddingBottom: '10px', fontFamily: 'KongshoMJ_Regular', color:'white' }}>
                                    <Radio.Button value="b">mewRIqvjv</Radio.Button>
                                </div>
                                <div style={{ paddingBottom: '10px', fontFamily: 'KongshoMJ_Regular', color:'white' }}>
                                    <Radio.Button value="c">Wvwjg</Radio.Button>
                                </div>
                                <div style={{
                                    paddingBottom: '10px', fontFamily: 'KongshoMJ_Regular', color:'white'
                                }}>
                                    <Radio.Button value="d">Avbvim</Radio.Button>
                                </div>
                            </Radio.Group>
                        </div>

                        <div className="submitSection" >
                            <div style={{ paddingLeft: '60px', paddingRight: '70px' }}>
                                <Link to={'/next/' + 4} key={4} style={{ textDecoration: 'none' }} >
                                    <p style={{ textAlign: 'center', backgroundColor: '#FFFD00', padding: '11px', borderRadius: '10px', fontWeight: 'bold', boxShadow: `1px 1px 1px black`, color: '#124589' }}>Next</p>
                                </Link>
                            </div>
                        </div>


                    </div>
                </div>



            </div>
        );
    }
    else{
        return(
            <div>
                <p>working</p>
            </div>

        );
    }
}

export default Test;