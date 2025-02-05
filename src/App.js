import './App.css';
import React from 'react';
import { reducer, getInitialState } from './state/reducer';
import { GAME_STATUS_TEXT, NEXT_TURN } from './enum';
import { DIMENSIONS, SQUARE_DIMS } from './utils';


// gamestore?? TODO
function Game() {
  // Game state
  const [state, dispatch] = React.useReducer(reducer, null, getInitialState)
  const { grid, turn, status } = state

  function handleClick(x) {
    dispatch({type: 'CLICK', payload: {x}})

    // Bad idea to use stacked dispatch? the state does not update like
    // I imagine TODO.
    dispatch({type: "AI_MOVE", payload: {}})
  }

  function reset() {
    dispatch({type: 'RESET'})
  }

  return (
    <>
      <div>Next turn is {NEXT_TURN[turn]}</div>
      <div>{GAME_STATUS_TEXT[status](turn)}</div>
      <button onClick={reset}>reset</button>
      <Grid grid={grid} handleClick={handleClick} />
    </>
    
  )
}


function Grid({grid, handleClick}) {
  return (
    <div
      style={{
        display: "flex",
        width: `calc(${DIMENSIONS} * ${(SQUARE_DIMS + 5)}px)`,
        justifyContent: "center",
        flexFlow: "wrap",
        position: "relative",
      }}
    >
      {grid.map((x, i) => {
        return (
          <Cell key={i} cell={x} handleClick={() => handleClick(i)} />
        )
      })}        
    </div>      
    
  )
}


const cellStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: `${SQUARE_DIMS}px`,
  height: `${SQUARE_DIMS}px`,
  border: "1px solid black",
 
}

function Cell({ cell, handleClick}) {
  return <div style={cellStyle} onClick={handleClick}>{NEXT_TURN[cell]}</div>
}


export default Game;
