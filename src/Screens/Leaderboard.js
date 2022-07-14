import { useEffect, useState, React } from "react";
//import PropTypes from 'prop-types';
//import Tabs from '@mui/material/Tabs';
//import Tab from '@mui/material/Tab';
//import Typography from '@mui/material/Typography';
//import Box from '@mui/material/Box';
//import Player1 from '../images/player1.png';
//import Player2 from '../images/player2.png';
//import Player3 from '../images/player3.png';
import BackgroundYellow from '../images/yellow_bg.png';
import BottomNavBar from "../Components/BottomNavBar";
import Players from '../Components/Players';
import first_frame from '../images/first_frame.png';
//import user_image from '../images/user.png';
import user_image from '../images/user.png';
//import BaseBackground from "../images/base_background.png";
//import axios from "axios";
//import { param } from "jquery";
//import { fontFamily } from '@mui/system';


//leaderboard allTime api call





const baseURL = "https://mobw0zmhde.execute-api.ap-southeast-1.amazonaws.com/staging/getTopPlayer";

function Leaderboard() {

   // const [three] = useState(localStorage.getItem('playerthree_name'));
  //  const [two] = useState(localStorage.getItem('playertwo_name'));
  //  const [one] = useState(localStorage.getItem('playerone_name'));

    const [post, setPost] = useState(null)

    useEffect(() => {
        fetch('https://mobw0zmhde.execute-api.ap-southeast-1.amazonaws.com/staging/getTopPlayer')
          .then(res => {
            return res.json();
          })
          .then(data => {
            setPost(data);
            console.log(data)
          })
      }, [])
    if (!post) return null;

    return (



        <div
            style={{
                backgroundColor: '#F6F7FA',
                height: "150vh",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundImage: `url(${BackgroundYellow})`,
            }}
        >
            <div style={{ display: "flex", justifyContent: "space-around", paddingTop: '30px' }}>
              
                <div>
                    <h2 style={{
                        color: '#1B164E',
                        fontFamily: 'Oswald',
                        fontSize: '22px',
                        fontWeight: '600',
                        
                    }}>Leaderboard</h2>
                </div>
              
            </div>



            <div style={{ display: "flex", justifyContent: "space-around", paddingTop: '30px' }}>
                <img src={user_image} style={{
                    width: '66.88px',
                    height: '66.88px',
                    marginTop: '25px',
                    
                }} alt=" " />
                <img src={user_image} style={{
                    width: '104.4px',
                    height: '104.4px',
                    borderRadius: '50%',
                    borderImage: `url(${first_frame})`
                }}
                    alt=" " />
                <img src={user_image} style={{
                    width: '66.88px',
                    height: '66.88px',
                    marginTop: '25px',
                   
                }}
                    alt=" " />
            </div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                <p style={{
                    color: '#1B164E',
                    fontFamily: 'Oswald',
                    fontSize: '16px',
                    fontWeight: '600',
                    
                }}>{post[1].name}</p>
                <p style={{
                    color: '#1B164E',
                    fontFamily: 'Oswald',
                    fontSize: '16px',
                    fontWeight: '600',
                    
                }}>{post[0].name}</p>
                <p style={{
                    color: '#1B164E',
                    fontFamily: 'Oswald',
                    fontSize: '16px',
                    fontWeight: '600',
                }}>{post[2].name}</p>
            </div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                <p style={{
                    color: 'white',
                    fontFamily: 'Oswald',
                    fontSize: '16px',
                    fontWeight: '600',
                    backgroundColor: '#1B164E',
                    padding: '6px',
                    borderRadius: '4px',
                    
                }}>{post[1].lifetime_point} pts</p>
                <p style={{
                    color: 'white',
                    fontFamily: 'Oswald',
                    fontSize: '16px',
                    fontWeight: '600',
                    backgroundColor: '#1B164E',
                    padding: '6px',
                    borderRadius: '4px',
                   
                }}>{post[0].lifetime_point} pts</p>
                <p style={{
                    color: 'white',
                    fontFamily: 'Oswald',
                    fontSize: '16px',
                    fontWeight: '600',
                    backgroundColor: '#1B164E',
                    padding: '6px',
                    borderRadius: '4px',
                    
                }}>{post[2].lifetime_point} pts</p>
            </div>

            <div
                style={{
                   paddingLeft:'15px',
                   paddingRight:'15px'
                }}>
                <div>
                    <Players />
                </div>
            </div>

            <div>
                <BottomNavBar name='leaderboard' />
            </div>
        </div>
    );
}

export default Leaderboard;