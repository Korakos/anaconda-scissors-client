import { useEffect, useState } from "react";

function evaluateGame(pickOne, pickTwo) {
    console.log('evaluating', pickOne, ' vs ', pickTwo);
    if(pickOne === pickTwo){
        return 0
    }
    if(pickTwo === 3 && pickOne === 1) {
        return -1
    }
    if(pickTwo === 1 && pickOne === 3){
        return 1
    }
    return pickTwo > pickOne? 1 : -1
}

export default function Game({ socket }) {
    const [pickOne, setPickOne] = useState(null);
    const [pickTwo, setPickTwo] = useState(null);
    const [result, setResult] = useState(-2);

  const handlePick = (player, _pick) => {
    if(player === 1){
        
    if(_pick !== pickOne){
        setPickOne(_pick);
    }
    } else {
        
    if(_pick !== pickTwo){
        setPickTwo(_pick);
    }
    }
  }

  useEffect(() => {
    if(pickOne && pickTwo){
        setResult(evaluateGame(pickOne,pickTwo));
    }
  }, [pickOne, pickTwo])

  return (
    <div>
        <div>
        <h1>player 1</h1>
      <div style={{
          backgroundColor: pickOne === 1 ? 'salmon' : '',
          color: pickOne === 1 ? 'white' : '',
        }} onClick={() => handlePick(1,1)}>Rock</div>
      <div style={{
          backgroundColor: pickOne === 2 ? 'salmon' : '',
          color: pickOne === 2 ? 'white' : '',
        }} onClick={() => handlePick(1,2)}>Paper</div>
      <div style={{
          backgroundColor: pickOne === 3 ? 'salmon' : '',
          color: pickOne === 3 ? 'white' : '',
        }} onClick={() => handlePick(1,3)}>Scissors</div>
        </div>
        
        <div>
        <h1>player 2</h1>
      <div style={{
          backgroundColor: pickTwo === 1 ? 'salmon' : '',
          color: pickTwo === 1 ? 'white' : '',
        }} onClick={() => handlePick(2,1)}>Rock</div>
      <div style={{
          backgroundColor: pickTwo === 2 ? 'salmon' : '',
          color: pickTwo === 2 ? 'white' : '',
        }} onClick={() => handlePick(2,2)}>Paper</div>
      <div style={{
          backgroundColor: pickTwo === 3 ? 'salmon' : '',
          color: pickTwo === 3 ? 'white' : '',
        }} onClick={() => handlePick(2,3)}>Scissors</div>
        </div>
        {result !== -2?(
            <div>
                <h1>Result</h1>
                {result === 0? (
                <h1>DRAW!!!</h1>
                ) : (
                <h1>Player {result > 0? 'Two':'One'} Won!!!</h1>
                )}
            </div>
        ):''}
        
    </div>
  );
}