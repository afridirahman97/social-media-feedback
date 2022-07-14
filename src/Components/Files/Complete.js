import React from "react";
import BackgroundYellow from "../../images/yellow_bg.png";
import Close from "../../images/close.png";
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { GameStateContext } from "../helpers/Context";
import trophy from '../../images/Good_Job.png';
import Share from '../../images/share.png';



const Complete = () => {
  const { score, setScore, setGameState, userName } = useContext(
    GameStateContext
  );

  const restartQuiz = () => {
    setScore(0);
    setGameState("playing");
  };


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
          <h2 style={{ color: '#FF565E', fontFamily: 'Oswald', fontSize: '18px', fontWeight: '600' }}>Congratulations !</h2>
        </div>
        
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: "150px", flexDirection: 'column' }}>
        <img src={trophy} />
        <p style={{
          marginTop: '10px',
          fontFamily: 'Oswald',
          fontWeight: '600',
          fontSize: '16px',
          color: '#1B164E',
        }}>Thank you for your valuable information</p>
      </div>

     
    </div>

  );
};

export default Complete;
