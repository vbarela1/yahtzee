import React from 'react';
import Dice from './Dice'

const Board = ({ roll, dice, rollDice, toggleKept, keep }) => {
  let maxRoll = roll === 3
  let disabled = maxRoll ? { disabled: true } : {}

  return (
    <div className="row">
      <div className="center">
        <button
          className="btn"
          {...disabled}
          onClick={rollDice}
        >
          {maxRoll ? 'Score Rolls' : 'Roll'}
        </button>
      </div>
      { roll > 0 &&
        dice.map( (d, i) => {
          let kept = keep.includes(i)
          return <Dice key={i} kept={kept} toggleKept={toggleKept} value={d} index={i} />
        })
       }
    </div>
  )
}

export default Board;
