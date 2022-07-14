//import { padding } from '@mui/system';
import React, { Component } from 'react';
import { connect } from "react-redux";
import Photo from '../images/Photo.png';
import axios from "axios";
import BackgroundYellow from '../images/yellow_bg.png';

class Players extends Component {
    state = {
        players: [],
    };
    componentDidMount() {
        //leaderboard allTime api call
        axios({
            url:'https://t4tcacthp7.execute-api.ap-southeast-1.amazonaws.com/staging/leaderBoard',
           // url: 'https://mobw0zmhde.execute-api.ap-southeast-1.amazonaws.com/staging/leaderBoard',
            params: { type: 'allTime' },
            method: 'get',
            // headers: {
            //     'Authorization': accessToken,
            // }
        })
            .then((res) => {
                console.log(res);

                this.setState({
                    players: res.data.slice(0, 8), // will show the first 100 objects

                });
            });
    }


    render() {
        const { players } = this.state;
        const playerList = players.length ? (
            players.map((player,index) => {
                return (
                    <div>
                            <div
                                style={{
                                    borderRadius: "10px",
                                    marginBottom: '10px',
                                    backgroundColor: "white",
                                    color: "#1B164E",
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat",
                                    padding: '10px 0px 0px 0px',
                                    border: 'solid #000',
                                    borderWidth:"2px",
                                    borderColor:'#1B164E'

                                }}
                            >
                                <div className="center" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <p style={{ fontFamily: 'Oswald', fontWeight: '700', fontSize: '18px', paddingLeft: '6px' }}>{index+1}.</p>
                                    <div style={{ display: 'flex', flexDirection: "row" }}>
                                        <p style={{ fontFamily: 'Oswald', fontWeight: '700', fontSize: '20px' }}>{player.name}</p>
                                    </div>
                                    <p style={{ fontFamily: 'Oswald', fontWeight: '700', fontSize: '20x', paddingRight: '6px' }}> {player.lifetime_point} pts</p>
                                </div>
                            </div>
                        </div>
                );
            })
        ) : (
            <div className="loading_state">
                <p style={{ fontFamily: 'Poppins', color: 'white', fontWeight: '500', textAlign: 'center' }}>Loading Players</p>
            </div>
        );
        return (

            <div>
                <div style={{ marginBottom: '50px' }}>
                </div>
                <div>
                    {playerList}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        players: state.players,
    };
};



export default connect(mapStateToProps)(Players);