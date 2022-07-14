import SurveyQuestion from "./Files/SurveyQuestion";
//import EndScreen from "./Files/EndScreen";
import { useState } from "react";
import { GameStateContext } from "./helpers/Context";
import Complete from "./Files/Complete";
// ['menu', 'playing', 'finished']
function QuestionList() {
  const [gameState, setGameState] = useState("playing");
  const [score, setScore] = useState(0);
  return (
    <div className="App">
      
      <GameStateContext.Provider
        value={{
          gameState,
          setGameState,
          score,
          setScore,
        }}
      >
       
        {gameState === "playing" && <SurveyQuestion />}
        {gameState === "congratulation" && <Complete />}
        
      </GameStateContext.Provider>
    </div>
  );
}
export default QuestionList;